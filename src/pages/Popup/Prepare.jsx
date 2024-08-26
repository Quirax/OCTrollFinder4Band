import React from 'react';
import { DateConstraints } from './Criteria';

export const Prepare = () => {
    /** @type {import('./Popup').CriteriaRegistry[]} */
    const registry = [];

    const onStart = () => {
        let criteria = registry.reduce(
            (curr, reg) =>
                console.log(reg.isEnabled()) ||
                (reg.isEnabled() ? Object.assign(curr, reg.get()) : curr),
            {}
        );
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
