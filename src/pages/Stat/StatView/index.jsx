import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { createStatView } from './AbstractStatView';
import { CartesianGrid, Legend, Line, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const statTypeWidth = 320;

const mediaMinWidth = () => statTypeWidth * 3;

const Variables = createGlobalStyle`
    :root {
        --header-height: 3rem;
        --stattype-width: ${() => statTypeWidth}px;
        --content-padding: 1rem;
    }
`;

const Header = styled.header.attrs(({ $bandName, $onToggleNav, $showNav }) => ({
    children: (
        <>
            <button onClick={$onToggleNav}>
                <FontAwesomeIcon icon={$showNav ? faXmark : faBars} />
            </button>
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
    display: flex;

    h1 {
        margin: 0;
    }

    button {
        height: var(--header-height);
        width: var(--header-height);
        flex: 0 0 auto;
        color: black;
        background-color: transparent;
        padding: 0;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        display: none;
    }

    @media screen and (max-width: ${mediaMinWidth}px) {
        button {
            display: initial;
        }
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

    @media screen and (max-width: ${mediaMinWidth}px) {
        ${({ $show }) =>
            $show
                ? css`
                      position: fixed;
                      top: var(--header-height);
                      left: 0;
                      width: 100%;
                      background-color: white;
                      z-index: 1;
                  `
                : css`
                      display: none;
                  `}
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
    cursor: pointer;
`;

const SampleStatView = createStatView(
    '사용자당 게시물 수',
    '각 사용자가 작성한 게시물의 개수입니다.',
    (data) => ({}),
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
    const onToggleNav = () => {};

    return (
        <>
            <Variables />
            <Header $bandName={data.bandInfo.name} $showNav={false} $onToggleNav={onToggleNav} />
            <Main>
                <StatList $show={false}>
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
