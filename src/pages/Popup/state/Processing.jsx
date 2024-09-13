import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';
import { useMessenger } from '../util';

const CancelButton = styled(BottomButton)`
    background-color: #aaa;
`;

const ProgressBar = styled.progress`
    display: block;
    width: 100%;
`;

export const Processing = ({ transition, criteria }) => {
    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [max, setMax] = useState(undefined);

    /**
     * @type {[number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]}
     */
    const [progress, setProgress] = useState(undefined);

    useMessenger(
        (messenger) => {
            let timeout, interval;

            if (!max) {
                timeout = setTimeout(() => {
                    setMax(100);
                    setProgress(0);
                }, 2000);
            } else {
                let progress = 0;

                interval = setInterval(() => {
                    if (progress === max) {
                        clearInterval(interval);
                        return transition(State.Completed);
                    }
                    setProgress((progress += 10));
                }, 500);
            }

            return () => {
                clearTimeout(timeout);
                clearInterval(interval);
            };
        },
        [max]
    );

    return (
        <>
            <label>
                PDF로 내보내는 중...
                <ProgressBar value={progress} max={max} />
                {Number.isInteger(max) &&
                    Number.isInteger(progress) &&
                    `(${progress} / ${max})`}
            </label>
            <CancelButton onClick={() => transition(State.Prepare)}>
                취소
            </CancelButton>
        </>
    );
};
