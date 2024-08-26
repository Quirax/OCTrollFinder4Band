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
            <details>
                <summary>세부 조건</summary>
                <DateConstraints criteriaRegistry={registry} />
            </details>
            <button onClick={onStart}>현재 밴드를 PDF로 내보내기</button>
        </>
    );
};
