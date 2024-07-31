import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { Destination, getBrowserMessenger } from '../../modules/messenger';

const Popup = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const messenger = getBrowserMessenger(
            Destination.Popup,
            Destination.Content
        );

        messenger.send(Destination.Inject, 'getPosts', (msg) => {
            console.log(msg);
            setMessage(JSON.stringify(msg));
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/pages/Popup/Popup.jsx</code> and save to
                    reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {message}
                </a>
            </header>
        </div>
    );
};

export default Popup;
