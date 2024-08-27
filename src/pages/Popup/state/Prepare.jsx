import React from 'react';
import { DateConstraints } from '../Criteria';
import { State } from '.';
import { styled } from 'styled-components';
import { BottomButton } from '../common';

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

export const Prepare = ({ transition }) => {
    /** @type {import('../Popup').CriteriaRegistry[]} */
    const registry = [];

    const onStart = () => {
        let criteria = registry.reduce(
            (curr, reg) => Object.assign(curr, reg.get()),
            {}
        );
        transition(State.Processing, { criteria });
    };

    return (
        <>
            <BandInfo>
                {/* TODO: get data from Inject */}
                <img src="https://coresos-phinf.pstatic.net/a/34j97h/6_he1Ud018svctfwtlkzqahzf_rvsjem.jpg?type=cover_a264" />
                <h2>우리의 세계는 0과 1로 이뤄졌다 ::Betatest on</h2>
            </BandInfo>
            <details>
                <summary>세부 조건</summary>
                <DateConstraints criteriaRegistry={registry} />
            </details>
            <BottomButton onClick={onStart}>
                현재 밴드를 PDF로 내보내기
            </BottomButton>
        </>
    );
};
