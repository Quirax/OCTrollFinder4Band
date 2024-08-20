import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.scss';
import { Destination, getBrowserMessenger } from '../../modules/messenger';
import { DateConstraints } from './Criteria';

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

    /** @type {CriteriaRegistry[]} */
    const registry = [];

    const onStart = () => {
        let criteria = registry.reduce(
            (curr, reg) =>
                console.log(reg.isEnabled()) ||
                (reg.isEnabled() ? Object.assign(curr, reg.get()) : curr),
            {}
        );
        console.log(criteria);
    };

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
                <details>
                    <summary>세부 조건</summary>
                    <DateConstraints criteriaRegistry={registry} />
                </details>
                <button onClick={onStart}>현재 밴드를 PDF로 내보내기</button>
            </main>
        </>
    );
};

export default Popup;
