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

export const Processing = ({ transition, criteria, bandInfo }) => {
    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [max, setMax] = useState(undefined);

    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [remain, setRemain] = useState(undefined);

    const processComments = useCallback(
        (messenger, post, previousParams) =>
            new Promise((resolve, reject) => {
                messenger.send(
                    messenger.Destination.Inject,
                    { api: 'getComments', postNo: post.post_no, previousParams },
                    (response) => {
                        if (response.result_code !== 1) {
                            // TODO: 오류 처리
                            console.error(response);
                            return reject();
                        }
                        resolve({
                            items: response.result_data.items,
                            previousParams: response.result_data.paging.previous_params,
                        });
                    }
                );
            }),
        []
    );

    const processFragment = useCallback(async (messenger, fragment) => {
        let fragmentWithComment = await Promise.all(
            fragment?.map(
                (post) =>
                    new Promise((resolve, reject) => {
                        if (post.comment_count === 0) return resolve(post);

                        let comments = [];

                        (async () => {
                            for (let pp; ; ) {
                                let result = await processComments(messenger, post, pp);
                                comments.push(result.items);
                                if (!(pp = result.previousParams)) break;
                            }

                            resolve({ ...post, comments: comments.flat() });
                        })();
                    })
            )
        );

        console.log(fragmentWithComment);

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
                <ProgressBar value={max - remain} max={max} />
                {Number.isInteger(max) && Number.isInteger(remain) && `(${max - remain} / ${max})`}
            </label>
            <CancelButton onClick={() => transition(State.Prepare)}>취소</CancelButton>
        </>
    );
};
