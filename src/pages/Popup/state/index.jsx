import React, { useCallback, useState } from 'react';
import { Prepare } from './Prepare';
import { createEnum } from '../../../modules/util';
import { Processing } from './Processing';
import { Completed } from './Completed';
import { Non_Band } from './Non_Band';

export const State = createEnum(
    'Non_Band',
    'Prepare',
    'Processing',
    'Completed'
);

export const ViewByState = ({ defaultState }) => {
    const [state, setState] = useState([defaultState || State.Prepare, {}]);

    const transition = useCallback((state, args) => {
        setState([state, args]);
    }, []);

    const args = { transition, ...state[1] };

    switch (state[0]) {
        case State.Prepare:
            return <Prepare {...args} />;
        case State.Processing:
            return <Processing {...args} />;
        case State.Completed:
            return <Completed {...args} />;
        case State.Non_Band:
            return <Non_Band {...args} />;
        default:
            return <></>;
    }
};
