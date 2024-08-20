import React, { useEffect, useState } from 'react';
import { classNames, makeId } from '../../modules/util';

/**
 * @param {{
 *   label: string,
 *   option: (isEnabled: boolean) => React.JSX.Element,
 *   criteriaRegistry: import('./Popup').CriteriaRegistry[],
 *   get: () => object
 * }}
 */
const Criteria = ({ label, option, criteriaRegistry, get }) => {
    const checkboxId = 'criteria_' + makeId(10);
    const [isEnabled, setIsEnabled] = useState(false);

    const registry = { isEnabled: () => isEnabled, get };

    useEffect(() => {
        criteriaRegistry.push(registry);

        let idx;

        return () =>
            (idx = criteriaRegistry.findIndex((v) => v === registry)) > -1 &&
            criteriaRegistry.splice(idx, 1);
    }, [isEnabled]);

    return (
        <div className="criteria">
            <div className="criteria_label">
                <input
                    type="checkbox"
                    id={checkboxId}
                    checked={isEnabled}
                    onClick={() => setIsEnabled(!isEnabled)}
                    readOnly
                />
                <label htmlFor={checkboxId}>{label}</label>
            </div>
            <div
                className={classNames(
                    'criteria_option',
                    !isEnabled && 'disabled'
                )}
            >
                {option(isEnabled)}
            </div>
        </div>
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

export const DateConstraints = ({ criteriaRegistry }) => {
    const [dateStart, setDateStart] = useState(formatDate(new Date()));
    const [dateEnd, setDateEnd] = useState(formatDate(new Date()));

    const get = () => ({
        dateConstraints: {
            start: dateStart,
            end: dateEnd,
        },
    });

    const Option = (isEnabled) => (
        <>
            기간:{' '}
            <input
                type="date"
                id="date_start"
                disabled={!isEnabled}
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
            />
            {' ~ '}
            <input
                type="date"
                id="date_end"
                disabled={!isEnabled}
                value={dateEnd}
                min={dateStart}
                onChange={(e) => setDateEnd(e.target.value)}
            />
        </>
    );

    return (
        <Criteria
            criteriaRegistry={criteriaRegistry}
            get={get}
            label="특정 기간 내 게시물만 내보내기"
            option={Option}
        />
    );
};
