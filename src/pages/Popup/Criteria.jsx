import React, { useState } from 'react';
import { classNames, makeId } from '../../modules/util';

const Criteria = ({ label, option }) => {
    const checkboxId = 'criteria_' + makeId(10);
    const [isEnabled, setIsEnabled] = useState(false);

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

export const DateConstraints = () => {
    const [dateStart, setDateStart] = useState(formatDate(new Date()));
    const [dateEnd, setDateEnd] = useState(formatDate(new Date()));

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

    return <Criteria label="특정 기간 내 게시물만 내보내기" option={Option} />;
};
