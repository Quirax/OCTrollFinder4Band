import React, { useState } from 'react';
import './Print.css';
import { createEnum } from '../../modules/util';
import { useBrowser } from '../util';
import { example } from './example'; // TODO: remove after complete
import { Document } from './Document';

const State = createEnum('Retrieving', 'NotFound', 'Ready');

const StateProcessor = ({ state }) => {
    const [st, arg] = state;

    switch (st) {
        case State.Retrieving:
            return <p>Retrieving</p>;
        case State.NotFound:
            return <p>Not Found</p>;
        case State.Ready:
            return <Document data={arg} />;
    }
};

const Print = () => {
    const [state, setState] = useState([State.Retrieving, {}]);

    // Get id from query string
    // ref: https://velog.io/@nnakki/Javascript-URL-Query-String-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
    const id = new URLSearchParams(location.search).get('id');

    useBrowser((browser) => {
        // Get data with key = id from the local extension storage
        // ref: https://developer.chrome.com/docs/extensions/reference/api/storage
        browser.storage.local.get([id]).then((result) => {
            console.log(result);

            if (result[id]) setState([State.Ready, result[id]]);
            else setState([State.NotFound, {}]);
        });
    }, []);

    return (
        <div className="container">
            <h1>Print Screen</h1>
            {/* <Document data={example} /> */}
            <StateProcessor state={state} />
        </div>
    );
};

export default Print;
