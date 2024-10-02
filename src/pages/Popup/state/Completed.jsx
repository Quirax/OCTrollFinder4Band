import React from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';
import { getBrowser, getDateString } from '../util';

const H2 = styled.h2`
    margin: 0;
`;

const ExportInfo = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem;
    align-items: center;
    margin: 1rem 0;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    & > img {
        height: 4rem;
        width: 4rem;
        margin-right: 0.5rem;
        flex: auto 0 0;
    }

    & > span {
        font-size: 1rem;
        text-align: left;
        margin: 0;
        font-weight: bold;
    }
`;

// ref: https://stackoverflow.com/a/65882955
const FileName = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: break-word;
    max-width: 100%;
`;

const Extension = styled.span``;

const DownloadButton = styled.button`
    background-color: green;
    color: white;
    padding: 1em;
    border-radius: 3em;
    text-wrap: nowrap;
    width: 100%;
    margin-bottom: 1em;
`;

const CreateNewButton = styled(BottomButton)`
    background-color: #aaa;
`;

export const Completed = ({ transition, bandInfo, posts }) => {
    const fileName = `${bandInfo.name} (${getDateString(new Date())})`;

    const onDownload = () => {
        const browser = getBrowser();
        const id = crypto.randomUUID();

        // ref: https://developer.chrome.com/docs/extensions/reference/api/storage
        browser.storage.local.set(Object.fromEntries([[id, { bandInfo, posts }]])).then(() => {
            console.log(id);
        });

        // TODO: 확장의 print page를 표시 (이 때, ID를 함께 제공)
        alert('TODO: implement download routine');
    };

    return (
        <>
            <H2>작업을 완료하였습니다</H2>
            <ExportInfo>
                <img src={bandInfo.cover} />
                <FileName>{fileName}</FileName>
                <Extension>.pdf</Extension>
            </ExportInfo>
            <DownloadButton onClick={onDownload}>다운로드</DownloadButton>
            <CreateNewButton onClick={() => transition(State.Prepare)}>새로 만들기</CreateNewButton>
        </>
    );
};
