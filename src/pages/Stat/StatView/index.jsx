import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { createStatView } from './AbstractStatView';

const Variables = createGlobalStyle`
    :root {
        --header-height: 3rem;
        --stattype-width: 320px;
        --content-padding: 1rem;
    }
`;

const Header = styled.header.attrs(({ $bandName }) => ({
    children: (
        <>
            <h1>'{$bandName}' 통계</h1>
        </>
    ),
}))`
    height: var(--header-height);
    width: 100%;
    background-color: white;
    line-height: var(--header-height);
    border-bottom: 1px solid black;
    box-sizing: border-box;

    h1 {
        margin: 0;
    }
`;

const Main = styled.main.attrs({})`
    height: calc(100vh - var(--header-height));
    width: 100%;
    display: flex;
`;

const StatList = styled.nav.attrs(({ children }) => ({
    children: (
        <>
            <h2>통계 목록</h2>
            <ul>{children}</ul>
        </>
    ),
}))`
    height: 100%;
    width: var(--stattype-width);
    border-right: 1px solid black;
    box-sizing: border-box;
    flex: 0 0 auto;

    h2 {
        padding-left: 1rem;
    }

    ul {
        list-style: none;
        padding: 0;
        border-top: 1px solid black;
    }
`;

const Item = styled.li.attrs({})`
    height: 3rem;
    width: 100%;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${({ $selected }) => ($selected ? 'black' : 'auto')};
    color: ${({ $selected }) => ($selected ? 'white' : 'auto')};
`;

const SampleStatView = createStatView(
    '사용자당 게시물 수',
    '각 사용자가 작성한 게시물의 개수입니다.',
    () => ({}),
    () => [
        {
            name: 'Page A',
            value: 2400,
        },
        {
            name: 'Page B',
            value: 2210,
        },
        {
            name: 'Page C',
            value: 2290,
        },
        {
            name: 'Page D',
            value: 2000,
        },
        {
            name: 'Page E',
            value: 2181,
        },
        {
            name: 'Page F',
            value: 2500,
        },
        {
            name: 'Page G',
            value: 2100,
        },
    ]
);

export const StatView = ({ data }) => {
    return (
        <>
            <Variables />
            <Header $bandName={data.bandInfo.name} />
            <Main>
                <StatList>
                    <Item title={SampleStatView.description} $selected>
                        {SampleStatView.title}
                    </Item>
                    <Item>사용자당 게시물 당 반응 수</Item>
                </StatList>
                <SampleStatView.View />
            </Main>
        </>
    );
};
