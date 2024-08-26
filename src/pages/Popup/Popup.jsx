import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.scss';
import { Destination, getBrowserMessenger } from '../../modules/messenger';
import { Prepare } from './Prepare';
import { createEnum } from '../../modules/util';

const State = createEnum('Non_Band', 'Prepare', 'Processing', 'Completed');

/**
 * @typedef CriteriaRegistry
 * @type {object}
 * @property {() => boolean} isEnabled
 * @property {() => object} get
 */

const Popup = () => {
    const messenger = getBrowserMessenger(
        Destination.Popup,
        Destination.Content
    );

    const [message, setMessage] = useState('');

    const [state, setState] = useState(State.Prepare);

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
                {(() => {
                    switch (state) {
                        case State.Prepare:
                            return <Prepare />;
                        default:
                            return <></>;
                    }
                })()}
            </main>
        </>
    );
};

export default Popup;
