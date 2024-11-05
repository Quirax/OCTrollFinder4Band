import React from 'react';
import styled from 'styled-components';

const Header = styled.header.attrs(({}) => ({
    children: (
        <>
            <h1>OCTrollFinder4Band</h1>
        </>
    ),
}))`
    height: 3rem;
    width: 100%;
    background-color: white;
    line-height: 3rem;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    position: fixed;
    top: 0;

    h1 {
        margin: 0;
    }
`;

const Main = styled.main.attrs({})`
    min-height: calc(100vh - 3rem);
    width: 100%;
    margin-top: 3rem;
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
    width: 300px;
    border-right: 1px solid black;
    box-sizing: border-box;
    position: fixed;

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

const AbstractStatView = styled.section.attrs(({ $title, $description, $chartData, $chartOptions }) => ({
    children: (
        <>
            <h2>{$title}</h2>
            <p>{$description}</p>
            <div className="graph">Graph!</div>
        </>
    ),
}))`
    padding: 1rem;
    margin-left: 300px;
    min-height: calc(100% - 2rem);

    & > div.graph {
        width: 100%;
        aspect-ratio: 16 / 9;
        border: 1px solid black;
        box-sizing: border-box;
    }
`;

export const StatView = ({ data }) => {
    return (
        <>
            <Header />
            <Main>
                <StatList>
                    <Item $selected>사용자당 게시물 수</Item>
                    <Item>사용자당 게시물 당 반응 수</Item>
                </StatList>
                <AbstractStatView $title="사용자당 게시물 수" $description="각 사용자가 작성한 게시물의 개수입니다." />
            </Main>
        </>
    );
};
