import { styled } from 'styled-components';

export const BottomButton = styled.button`
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
