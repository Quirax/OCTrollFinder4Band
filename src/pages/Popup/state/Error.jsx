import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const errorMessage = (title, description) => ({ title, description });

const applyArgs = (message, args) => (typeof message === 'function' ? message(...args) : message);

export const ErrorMessage = Object.freeze({
    NonBand: errorMessage('현재 탭에서 사용할 수 없습니다', '밴드 페이지 탭에서 다시 시도하세요'),
});

const ExclamationIcon = styled.div.attrs({
    children: <FontAwesomeIcon icon={faTriangleExclamation} />,
})`
    font-size: 48px;
    color: red;
`;

const Head = styled.h2`
    margin-top: 0;
`;

export const Error = ({ errorMessage = ErrorMessage.NonBand, ...args }) => {
    return (
        <>
            <Head>
                <ExclamationIcon />
                <div>{applyArgs(errorMessage?.title, args)}</div>
            </Head>
            <p>{applyArgs(errorMessage?.description, args)}</p>
        </>
    );
};
