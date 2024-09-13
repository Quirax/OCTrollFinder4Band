import React, { useState } from 'react';
import { DateConstraints } from '../Criteria';
import { State } from '.';
import { styled } from 'styled-components';
import { BottomButton } from '../common';
import { useMessenger } from '../util';

const BandInfo = styled.div`
    display: flex;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem;
    align-items: center;
    margin-bottom: 1rem;

    & > img {
        height: 4rem;
        margin-right: 0.5rem;
    }

    & > h2 {
        font-size: 1rem;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        text-align: left;
        margin: 0;
    }
`;

const CriteriaContainer = styled.details`
    margin-bottom: 1em;

    summary {
        &::marker {
            display: none;
            content: '';
        }

        &::before {
            content: '▶';
            margin-right: 0.25em;
        }

        &::after {
            content: '◀';
            margin-left: 0.25em;
        }
    }

    &[open] summary {
        &::before,
        &::after {
            content: '▼';
        }
    }
`;

// ref: https://java119.tistory.com/76
const sinceToDate = (since) => {
    let ymd = String(since);
    let y = ymd.substring(0, 4),
        m = ymd.substring(4, 6),
        d = ymd.substring(6, 8);
    return new Date(Number(y), Number(m) - 1, Number(d));
};

export const Prepare = ({ transition }) => {
    /** @type {import('../Popup').CriteriaRegistry[]} */
    const registry = [];
    const [bandInfo, setBandInfo] = useState({});

    useMessenger((messenger) => {
        messenger.send(
            messenger.Destination.Inject,
            'getBandInformation',
            (response) => {
                if (response.result_code !== 1) {
                    // TODO: 오류 처리
                    console.error(response);
                    return;
                }

                setBandInfo(response.result_data.band);
            }
        );
    }, []);

    const onStart = () => {
        let criteria = registry.reduce(
            (curr, reg) => Object.assign(curr, reg.get()),
            {}
        );
        transition(State.Processing, { criteria, bandInfo });
    };

    if (Object.entries(bandInfo).length === 0) return <></>;

    return (
        <>
            <BandInfo>
                <img src={bandInfo.cover} />
                <h2>{bandInfo.name}</h2>
            </BandInfo>
            <CriteriaContainer>
                <summary>세부 조건</summary>
                <DateConstraints
                    criteriaRegistry={registry}
                    defaultStart={sinceToDate(bandInfo.since)}
                    defaultEnd={new Date(bandInfo.updated_at_status.post)}
                />
            </CriteriaContainer>
            <BottomButton onClick={onStart}>
                현재 밴드를 PDF로 내보내기
            </BottomButton>
        </>
    );
};
