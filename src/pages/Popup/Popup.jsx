import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.scss';
import { Destination, getBrowserMessenger } from '../../modules/messenger';

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
                <details>
                    <summary>세부 조건</summary>
                    <p>
                        <div className="criteria_label">
                            <input type="checkbox" id="date_constraints" />
                            <label for="date_constraints">
                                특정 기간 내 게시물만 내보내기
                            </label>
                        </div>
                        <div className="criteria_option">
                            기간: <input type="date" id="date_start" /> ~{' '}
                            <input type="date" id="date_end" />
                        </div>
                    </p>
                </details>
                <button>현재 밴드를 PDF로 내보내기</button>
            </main>
        </>
    );
};

export default Popup;
