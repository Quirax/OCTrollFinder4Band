import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';
import { useMessenger } from '../util';
import { getBrowser } from '../../util';
import { TEST_FLAGS } from '..';
import { ErrorMessage } from './Error';

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
                if (response.result_code !== 1 || TEST_FLAGS.CommentsOfBandRespondWithError) {
                    return reject({
                        at: 'Popup/Processing/getComments',
                        response,
                    });
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
    new Promise((resolve, reject) =>
        messenger.send(messenger.Destination.Inject, { api: 'getPosts', after }, (response) => {
            if (response.result_code !== 1 || TEST_FLAGS.PostOfBandRespondWithError) {
                return reject({
                    at: 'Popup/Processing/getPosts',
                    response,
                });
            }

            processFragment(messenger, response.result_data.items)
                .then(() => {
                    resolve({
                        after: response.result_data.paging.next_params?.after,
                        max: response.result_data.items[0].post_no,
                    });
                })
                .catch((err) => reject(err));
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

                processPosts(messenger)
                    .then(({ after, max }) => {
                        processAfter(after);
                        setMax(max);
                    })
                    .catch((err) =>
                        transition(State.Error, {
                            message: ErrorMessage.RespondWithError,
                            ...err,
                        })
                    );
            } else if (remain >= 0)
                processPosts(messenger, remain)
                    .then(({ after }) => processAfter(after))
                    .catch((err) =>
                        transition(State.Error, {
                            message: ErrorMessage.RespondWithError,
                            ...err,
                        })
                    );
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
