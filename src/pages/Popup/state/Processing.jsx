import React from 'react';
import { styled } from 'styled-components';
import { BottomButton } from '../common';

const CancelButton = styled(BottomButton)`
    background-color: #aaa;
`;

const ProgressBar = styled.progress`
    display: block;
    width: 100%;
`;

export const Processing = ({ transition, criteria }) => {
    return (
        <>
            <label>
                PDF로 내보내는 중...
                <ProgressBar max={100} />
                (50/100)
            </label>
            <CancelButton>취소</CancelButton>
        </>
    );
};
