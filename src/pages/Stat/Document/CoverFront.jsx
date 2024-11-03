import React from 'react';
import { styled } from 'styled-components';
import { Page } from './common';

const CoverPage = styled(Page)`
    text-align: center;
`;

const Cover = styled.img`
    width: 300px;
`;

export const CoverFront = ({ cover, leaderName, memberCount, name, since, themeColor, updatedAt, webUrl }) => {
    return (
        <CoverPage>
            <Cover src={cover} />
            <h1>{name}</h1>
            <p>
                {leaderName} 및 {String(memberCount - 1)}명의 멤버
            </p>
            <p>
                {since} ~ {updatedAt}
            </p>
            <p>URL: {webUrl}</p>
        </CoverPage>
    );
};
