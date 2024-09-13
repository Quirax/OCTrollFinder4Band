import React from 'react';
import { createGlobalStyle, styled } from 'styled-components';

const BottomButtonGlobal = createGlobalStyle`
    body {
        padding-bottom: 4em;
    }
`;

export const BottomButton = styled.button.attrs((props) => ({
    children: (
        <>
            <BottomButtonGlobal />
            {props.children}
        </>
    ),
}))`
    background-color: green;
    color: white;
    padding: 1em;
    border-radius: 3em;
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translate(-50%, 0);
    text-wrap: nowrap;
    width: calc(100% - 2em);
`;
