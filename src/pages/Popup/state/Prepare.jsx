import React from 'react';
import { DateConstraints } from '../Criteria';
import { State } from '.';

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
            <div>
                {/* TODO: get data from Inject */}
                <img src="https://coresos-phinf.pstatic.net/a/34j97h/6_he1Ud018svctfwtlkzqahzf_rvsjem.jpg?type=cover_a264" />
                <h2>우리의 세계는 0과 1로 이뤄졌다 ::Betatest on</h2>
            </div>
            <details>
                <summary>세부 조건</summary>
                <DateConstraints criteriaRegistry={registry} />
            </details>
            <button onClick={onStart}>현재 밴드를 PDF로 내보내기</button>
        </>
    );
};
