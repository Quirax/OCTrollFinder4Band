import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.scss';
import { Destination, getBrowserMessenger } from '../../modules/messenger';
import { ViewByState } from './state';

/**
 * @typedef CriteriaRegistry
 * @type {object}
 * @property {() => object} get
 */

const Popup = () => {
    const messenger = getBrowserMessenger(
        Destination.Popup,
        Destination.Content
    );

    const [message, setMessage] = useState('');

    useEffect(() => {
        // messenger.send(Destination.Inject, 'getPosts', (msg) => {
        //     console.log(msg);
        //     setMessage(JSON.stringify(msg));
        // });
    }, []);

    return (
        <>
            <header>
                <img src={logo} />
                <h1>Band PDF Export</h1>
            </header>
            <main>
                <ViewByState />
            </main>
        </>
    );
};

export default Popup;
