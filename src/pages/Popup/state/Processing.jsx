import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';
import { useMessenger } from '../util';
import { getBrowser } from '../../util';

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

const processPosts = (messenger, after) =>
    new Promise((resolve) =>
        messenger.send(messenger.Destination.Inject, { api: 'getPosts', after }, (response) => {
            (async () => {
                if (response.result_code !== 1) {
                    // TODO: 오류 처리
                    console.error(response);
                    return;
                }

                await processFragment(messenger, response.result_data.items);

                resolve({
                    after: response.result_data.paging.next_params?.after,
                    max: response.result_data.items[0].post_no,
                });
            })();
        })
    );

const forwardToStat = (bandInfo, posts) => {
    const browser = getBrowser();
    const id = crypto.randomUUID(); // create UUID for the export

    // Set bandInfo and posts with id key into the local extension storage
    // ref: https://developer.chrome.com/docs/extensions/reference/api/storage
    browser.storage.local.set(Object.fromEntries([[id, { bandInfo, posts, ts: Date.now() }]])).then(() => {
        console.log(id);
    });

    // Open print tab with id
    // ref: https://developer.chrome.com/docs/extensions/reference/api/tabs#open_an_extension_page_in_a_new_tab
    browser.tabs.create({
        url: `stat.html?id=${id}`,
    });
};

export const Processing = ({ transition, bandInfo }) => {
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

            // Stat screen으로 변경
            forwardToStat(bandInfo, posts);
        }
    };

    useMessenger(
        (messenger) => {
            if (!max) {
                posts = [];

                processPosts(messenger).then(({ after, max }) => {
                    processAfter(after);
                    setMax(max);
                });
            } else if (remain >= 0) processPosts(messenger, remain).then(({ after }) => processAfter(after));
        },
        [max, remain]
    );

    return (
        <>
            <label>
                분석을 준비하는 중...
                <ProgressBar value={Number.isInteger(max) && Number.isInteger(remain) && max - remain} max={max} />
                {Number.isInteger(max) && Number.isInteger(remain) && `(${max - remain} / ${max})`}
            </label>
            <CancelButton onClick={() => transition(State.Prepare)}>취소</CancelButton>
        </>
    );
};
