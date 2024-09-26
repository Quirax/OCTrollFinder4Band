import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';
import { filterPosts } from '../Criteria';
import { useMessenger } from '../util';

const CancelButton = styled(BottomButton)`
    background-color: #aaa;
`;

const ProgressBar = styled.progress`
    display: block;
    width: 100%;
`;

let posts = [];

const processComments = (messenger, post, previousParams, commentId) =>
    new Promise((resolve, reject) => {
        messenger.send(
            messenger.Destination.Inject,
            { api: 'getComments', postNo: post.post_no, previousParams, commentId },
            (response) => {
                if (response.result_code !== 1) {
                    // TODO: 오류 처리
                    console.error(response);
                    return reject();
                }

                (async () => {
                    let items = response.result_data.items;

                    if (!commentId) {
                        items = await items.promiseAll(async (comment) => ({
                            ...comment,
                            comments:
                                comment.comment_count === 0
                                    ? []
                                    : comment.comment_count === comment.latest_comment.length
                                    ? comment.latest_comment
                                    : await processAllComments(messenger, comment, comment.comment_id),
                        }));
                    }

                    resolve({
                        items: items,
                        previousParams: response.result_data.paging.previous_params,
                    });
                })();
            }
        );
    });

const processAllComments = async (messenger, post, commentId) => {
    let comments = [];

    for (let pp; ; ) {
        let result = await processComments(messenger, post, pp, commentId).catch((e) => reject(e));
        comments.push(result.items);
        if (!(pp = result.previousParams)) break;
    }

    return comments.flat();
};

export const Processing = ({ transition, criteria, bandInfo }) => {
    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [max, setMax] = useState(undefined);

    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [remain, setRemain] = useState(undefined);

    const processFragment = useCallback(async (messenger, fragment) => {
        let fragmentWithComment = await fragment?.promiseAll(async (post) => ({
            ...post,
            comments: post.comment_count === 0 ? [] : await processAllComments(messenger, post),
        }));
        posts.push(fragmentWithComment);
    }, []);

    useMessenger(
        (messenger) => {
            if (!max) {
                posts = [];

                messenger.send(messenger.Destination.Inject, { api: 'getPosts' }, (response) => {
                    (async () => {
                        if (response.result_code !== 1) {
                            // TODO: 오류 처리
                            console.error(response);
                            return;
                        }

                        await processFragment(messenger, filterPosts(response.result_data.items, criteria));

                        setMax(response.result_data.items[0].post_no);
                        setRemain(Number(response.result_data.paging.next_params.after));
                    })();
                });
            } else if (remain >= 0) {
                messenger.send(messenger.Destination.Inject, { api: 'getPosts', after: remain }, (response) => {
                    (async () => {
                        if (response.result_code !== 1) {
                            // TODO: 오류 처리
                            console.error(response);
                            return;
                        }

                        await processFragment(messenger, filterPosts(response.result_data.items, criteria));

                        let after = response.result_data.paging.next_params?.after;

                        if (after) setRemain(Number(after));
                        else {
                            posts = posts.flat();
                            console.log(posts);
                            transition(State.Completed, { bandInfo, posts });
                        }
                    })();
                });
            }
        },
        [max, remain]
    );

    return (
        <>
            <label>
                PDF로 내보내는 중...
                <ProgressBar value={Number.isInteger(max) && Number.isInteger(remain) && max - remain} max={max} />
                {Number.isInteger(max) && Number.isInteger(remain) && `(${max - remain} / ${max})`}
            </label>
            <CancelButton onClick={() => transition(State.Prepare)}>취소</CancelButton>
        </>
    );
};
