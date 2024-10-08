import { styled } from 'styled-components';

export const Page = styled.div.attrs({
    className: 'page',
})`
    height: 297mm;
    width: 210mm;
    background-color: white;
    box-sizing: border-box;
    margin-bottom: 1rem;
    break-after: page;
    color: black;
    padding: 3cm;

    @media print {
        & {
            display: block;
            height: auto;
            width: auto;
            margin: 0;
            padding: 0;
        }
    }
`;
