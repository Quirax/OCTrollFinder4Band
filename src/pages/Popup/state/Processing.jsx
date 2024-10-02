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

const sortComments = (comments) => comments.sort((a, b) => a.comment_id - b.comment_id);

const sortPosts = (posts) => posts.sort((a, b) => a.post_no - b.post_no);

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
        let result = await processComments(messenger, post, pp, commentId).catch(function (e) {
            throw e;
        });
        comments.push(result.items);
        if (!(pp = result.previousParams)) break;
    }

    return sortComments(comments.flat());
};

const processFragment = async (messenger, fragment) => {
    let fragmentWithComment = await fragment?.promiseAll(async (post) => ({
        ...post,
        comments: post.comment_count === 0 ? [] : await processAllComments(messenger, post),
    }));
    posts.push(fragmentWithComment);
};

const processPosts = (messenger, criteria, after) =>
    new Promise((resolve) =>
        messenger.send(messenger.Destination.Inject, { api: 'getPosts', after }, (response) => {
            (async () => {
                if (response.result_code !== 1) {
                    // TODO: 오류 처리
                    console.error(response);
                    return;
                }

                await processFragment(messenger, filterPosts(response.result_data.items, criteria));

                resolve({
                    after: response.result_data.paging.next_params?.after,
                    max: response.result_data.items[0].post_no,
                });
            })();
        })
    );

export const Processing = ({ transition, criteria, bandInfo }) => {
    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [max, setMax] = useState(undefined);

    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [remain, setRemain] = useState(undefined);

    const processAfter = (after) => {
        if (after) setRemain(Number(after));
        else {
            posts = sortPosts(posts.flat());
            console.log(posts);
            transition(State.Completed, { bandInfo, posts });
        }
    };

    useMessenger(
        (messenger) => {
            if (!max) {
                posts = [];

                processPosts(messenger, criteria).then(({ after, max }) => {
                    processAfter(after);
                    setMax(max);
                });
            } else if (remain >= 0) processPosts(messenger, criteria, remain).then(({ after }) => processAfter(after));
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
