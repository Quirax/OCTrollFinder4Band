import { getAuth } from './auth';
import { printLine } from './print';
import { getTimezone } from './timezone';

let isLoaded = false;

const main = {
    tz: null,
    auth: null,
};

const init = async () => {
    main.tz = await getTimezone();
    main.auth = await getAuth();
};

export const getMain = async () => {
    if (!isLoaded) await init();
    return main;
};
