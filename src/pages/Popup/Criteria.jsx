import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { classNames, makeId } from '../../modules/util';

const CriteriaElement = styled.div`
    background-color: #ccc;
    padding: 0.5em;
    margin: 0;
    text-align: left;
`;

const CriteriaLabel = styled.div``;

const CriteriaOption = styled.div`
    margin-left: 20px;

    &,
    & * {
        font-size: 0.9em;
    }

    &.disabled {
        color: #666;
    }
`;

export const filterPosts = (posts, criteria) => {
    let list = posts;
    criteria.forEach((c) => (list = list.filter(c)));
    return list;
};

/**
 * @param {{
 *   label: string,
 *   children: React.JSX.Element,
 *   criteriaRegistry: import('./Popup').CriteriaRegistry[],
 *   value: object
 * }}
 */
const Criteria = ({ label, children, criteriaRegistry, value }) => {
    const checkboxId = 'criteria_' + makeId(10);
    const [isEnabled, setIsEnabled] = useState(false);

    const registry = { get: () => isEnabled && value };

    useEffect(() => {
        criteriaRegistry.push(registry);

        let idx;

        return () =>
            (idx = criteriaRegistry.findIndex((v) => v === registry)) > -1 &&
            criteriaRegistry.splice(idx, 1);
    }, [isEnabled, value]);

    return (
        <CriteriaElement>
            <CriteriaLabel>
                <input
                    type="checkbox"
                    id={checkboxId}
                    checked={isEnabled}
                    onClick={() => setIsEnabled(!isEnabled)}
                    readOnly
                />
                <label htmlFor={checkboxId}>{label}</label>
            </CriteriaLabel>
            {isEnabled && <CriteriaOption>{children}</CriteriaOption>}
        </CriteriaElement>
    );
};

// ref: https://velog.io/@rkio/Javascript-YYYY-MM-DD-%ED%98%95%ED%83%9C%EC%9D%98-%EB%82%A0%EC%A7%9C-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90
const formatDate = (date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

/**
 * @param {{
 *   criteriaRegistry: import('./Popup').CriteriaRegistry[]
 * }}
 */

export const DateConstraints = ({
    criteriaRegistry,
    defaultStart = new Date(),
    defaultEnd = new Date(),
} = {}) => {
    const [dateStart, setDateStart] = useState(formatDate(defaultStart));
    const [dateEnd, setDateEnd] = useState(formatDate(defaultEnd));

    return (
        <Criteria
            criteriaRegistry={criteriaRegistry}
            value={(post) => {
                let date = new Date(post.created_at);
                return new Date(dateStart) <= date && date <= new Date(dateEnd);
            }}
            label="특정 기간 내 게시물만 내보내기"
        >
            기간:{' '}
            <input
                type="date"
                id="date_start"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
            />
            {' ~ '}
            <input
                type="date"
                id="date_end"
                value={dateEnd}
                min={dateStart}
                onChange={(e) => setDateEnd(e.target.value)}
            />
        </Criteria>
    );
};
