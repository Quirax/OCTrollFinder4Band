import React from 'react';
import './Print.css';

const Print = () => {
    // Get id from query string
    // ref: https://velog.io/@nnakki/Javascript-URL-Query-String-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
    const id = new URLSearchParams(location.search).get('id');

    // Get data with key = id from the local extension storage
    // ref: https://developer.chrome.com/docs/extensions/reference/api/storage
    chrome.storage.local.get([id]).then((result) => {
        console.log(result);
        // if none => {}
        // else => {id: {...}}
    });

    return (
        <div className="container">
            <h1>Print Screen</h1>
            {id}
        </div>
    );
};

export default Print;
