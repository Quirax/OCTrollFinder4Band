import React, { useEffect, useState } from 'react';
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

    useMessenger(
        (messenger) => {
            if (!max) {
                posts = [];

                messenger.send(
                    messenger.Destination.Inject,
                    { api: 'getPosts' },
                    (response) => {
                        if (response.result_code !== 1) {
                            // TODO: 오류 처리
                            console.error(response);
                            return;
                        }

                        posts.push(
                            filterPosts(response.result_data.items, criteria)
                        );

                        setMax(response.result_data.items[0].post_no);
                        setRemain(
                            Number(
                                response.result_data.paging.next_params.after
                            )
                        );
                    }
                );
            } else if (remain >= 0) {
                messenger.send(
                    messenger.Destination.Inject,
                    { api: 'getPosts', after: remain },
                    (response) => {
                        if (response.result_code !== 1) {
                            // TODO: 오류 처리
                            console.error(response);
                            return;
                        }
                        posts.push(
                            filterPosts(response.result_data.items, criteria)
                        );

                        let after =
                            response.result_data.paging.next_params?.after;

                        if (after) setRemain(Number(after));
                        else {
                            posts = posts.flat();
                            transition(State.Completed, { bandInfo, posts });
                        }
                    }
                );
            }
        },
        [max, remain]
    );

    return (
        <>
            <label>
                PDF로 내보내는 중...
                <ProgressBar value={max - remain} max={max} />
                {Number.isInteger(max) &&
                    Number.isInteger(remain) &&
                    `(${max - remain} / ${max})`}
            </label>
            <CancelButton onClick={() => transition(State.Prepare)}>
                취소
            </CancelButton>
        </>
    );
};
