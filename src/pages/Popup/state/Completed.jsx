import React from 'react';
import { styled } from 'styled-components';
import { State } from '.';
import { BottomButton } from '../common';

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

export const Completed = ({ transition }) => {
    return (
        <>
            <H2>작업을 완료하였습니다</H2>
            <ExportInfo>
                {/* TODO: get data from Inject */}
                <img src="https://coresos-phinf.pstatic.net/a/34j97h/6_he1Ud018svctfwtlkzqahzf_rvsjem.jpg?type=cover_a264" />
                <FileName>
                    우리의 세계는 0과 1로 이뤄졌다 ::Betatest on (2024-08-27)
                </FileName>
                <Extension>.pdf</Extension>
            </ExportInfo>
            <DownloadButton>다운로드</DownloadButton>
            <CreateNewButton onClick={() => transition(State.Prepare)}>
                새로 만들기
            </CreateNewButton>
        </>
    );
};
