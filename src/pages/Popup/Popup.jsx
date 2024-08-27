import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.scss';
import { State, ViewByState } from './state';
import { useBrowser, useMessenger } from './util';

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
        // browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     const tab = tabs[0];
        //     console.log(tab.url);
        //     if (tab.url.match(/band.us\/band\//))
        //         setDefaultState(State.Prepare);
        //     else setDefaultState(State.Processing); // TODO: set to State.Non_Band
        // });
        setDefaultState(State.Completed);
    }, []);

    return (
        <>
            <header>
                <img src={logo} />
                <h1>Band PDF Export</h1>
            </header>
            <main>
                {defaultState && <ViewByState defaultState={defaultState} />}
            </main>
        </>
    );
};

export default Popup;
