import { getAuth } from './auth';
import { printLine } from './print';
import { getTimezone } from './timezone';
import moment from 'moment-timezone';
import { bandNo } from './util';
import { Destination, getWindowMessenger } from '../../../modules/messenger';

let isLoaded = false;

async function get(url, query, options) {
    Object.keys(query).forEach(
        (key) => query[key] === undefined && delete query[key]
    );

    let uri =
        url +
        '?' +
        new URLSearchParams({
            ts: new Date().getTime(),
            ...query,
        }).toString();

    let resp = await fetch(uri, {
        headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            akey: main.auth.akey(),
            'device-time-zone-id': main.tz.getCurrentTimezoneId(),
            'device-time-zone-ms-offset': 60 * moment().utcOffset() * 1000,
            language: window.messageLang,
            md: main.auth.createMd(uri),
        },
        credentials: 'include',
        ...options,
    });

    return await resp.json();
}

const main = {
    tz: null,
    auth: null,
    getPosts: (after, limit) =>
        get('https://api.band.us/v2.0.0/get_posts', {
            band_no: bandNo(),
            direction: 'before',
            resolution_type: 4,
            limit: limit || 20,
            after: after,
        }),
    getBandInformation: () =>
        get('https://api.band.us/v2.1.2/get_band_information', {
            band_no: bandNo(),
        }),
    messenger: getWindowMessenger(Destination.Inject, Destination.Content),
};

const init = async () => {
    main.tz = await getTimezone();
    main.auth = await getAuth();

    isLoaded = true;
};

export const getMain = async () => {
    if (!isLoaded) await init();
    return main;
};
