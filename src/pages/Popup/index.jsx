import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import './index.css';
import Popup from './Popup';

const GlobalStyle = createGlobalStyle`
    #app-container {
        display: flex;
        flex-direction: column;
        align-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        padding: 1em;
        box-sizing: border-box;
        font-size: 1rem;
        user-select: none;
    }
`;

export const TEST_FLAGS =
    process.env.NODE_ENV === 'production'
        ? {}
        : {
              BandInfoRespondWithError: false,
              MemberOfBandRespondWithError: false,
          };

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <>
        <GlobalStyle />
        <Popup />
    </>
);
