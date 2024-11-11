import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ArticlePerUser } from './ArticlePerUser';
import { TotalReactsPerUser } from './TotalReactsPerUser';
import { AvgReactsPerUser } from './AvgReactsPerUser';

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
        padding-left: 1rem;
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

        h1 {
            padding-left: 0;
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

const statViews = [ArticlePerUser, TotalReactsPerUser, AvgReactsPerUser];

export const StatView = ({ data }) => {
    const [showNav, setShowNav] = useState(false);
    const [currentView, setCurrentView] = useState(0);

    const onToggleNav = () => {
        setShowNav(!showNav);
    };

    const onSelectView = (idx) => {
        setCurrentView(idx);
        setShowNav(false);
    };

    useEffect(() => {
        const media = matchMedia(`(max-width: ${mediaMinWidth()}px)`);

        const onMatchChange = (e) => {
            if (!e.matches) setShowNav(false);
        };

        media.addEventListener('change', onMatchChange);

        return () => media.removeEventListener('change', onMatchChange);
    }, []);

    const View = statViews[currentView].View;

    return (
        <>
            <Variables />
            <Header $bandName={data.bandInfo.name} $showNav={showNav} $onToggleNav={onToggleNav} />
            <Main>
                <StatList $show={showNav}>
                    {statViews.map((view, idx) => (
                        <Item
                            key={`statView-${idx}`}
                            title={view.description}
                            $selected={idx === currentView}
                            onClick={() => onSelectView(idx)}
                        >
                            {view.title}
                        </Item>
                    ))}
                </StatList>
                <View data={data} />
            </Main>
        </>
    );
};
