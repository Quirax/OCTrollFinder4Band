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

export const DateConstraints = () => {
    const Option = (isEnabled) => (
        <>
            기간: <input type="date" id="date_start" disabled={!isEnabled} /> ~{' '}
            <input type="date" id="date_end" disabled={!isEnabled} />
        </>
    );

    return <Criteria label="특정 기간 내 게시물만 내보내기" option={Option} />;
};
