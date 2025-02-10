import React, { useCallback, useState } from 'react';
import { Prepare } from './Prepare';
import { createEnum } from '../../../modules/util';
import { Processing } from './Processing';
import { Error } from './Error';

export const State = createEnum('Error', 'Prepare', 'Processing');

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
        case State.Error:
            return <Error {...args} />;
        default:
            return <></>;
    }
};
