import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import logo from '../../assets/img/logo.png';
import { State, ViewByState } from './state';
import { useBrowser } from '../util';

// ref: https://velog.io/@ayaan92/styled-components-.attrs%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC
const LogoImg = styled.img.attrs(() => ({ src: logo }))`
    height: 100px;
    width: 100px;
`;

const Title = styled.h1.attrs(() => ({
    children:
        chrome.i18n
            .getMessage('extension_display')
            .split('\n')
            .flatMap((v, i) => [v, <br key={i} />])
            .slice(0, -1) || 'OCTrollFinder4Band',
}))``;

/**
 * @typedef CriteriaRegistry
 * @type {object}
 * @property {() => object} get
 */

const Popup = () => {
    /**
     * @type {[string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]}
     */
    const [defaultState, setDefaultState] = useState(undefined);

    useBrowser((browser) => {
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            console.log(tab.url);
            if (tab.url.match(/band.us\/band\//)) setDefaultState(State.Prepare);
            else setDefaultState(State.Non_Band);
        });
    }, []);

    return (
        <>
            <header>
                <LogoImg />
                <Title />
            </header>
            <main>{defaultState && <ViewByState defaultState={defaultState} />}</main>
        </>
    );
};

export default Popup;
