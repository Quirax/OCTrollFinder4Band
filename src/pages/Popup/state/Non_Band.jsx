import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const ExclamationIcon = styled.div.attrs({
    children: <FontAwesomeIcon icon={faTriangleExclamation} />,
})`
    font-size: 48px;
    color: red;
`;

const Head = styled.h2`
    margin-top: 0;
`;

export const Non_Band = () => {
    return (
        <>
            <Head>
                <ExclamationIcon />
                <div>현재 탭에서 사용할 수 없습니다</div>
            </Head>
            <p>밴드 페이지 탭에서 다시 시도하세요</p>
        </>
    );
};
