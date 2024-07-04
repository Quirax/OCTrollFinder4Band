import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// printLine("Using the 'printLine' function from the Print Module");

const onEnterBandPage = async () => {
    const main = await getMain();

    printLine(main.tz.getCurrentTimezoneId());
    printLine(main.auth);
};

const onLeaveBandPage = async () => {
    function createMd(auth, str) {
        if (!auth || !auth.makeMd) return null;
        $.browser.msie || $.browser.msedge || (str = str.replace(/'/gi, '%27'));
        var str_refined = str.replace(/^.*?:\/\//g, '').replace(/^[^/]+/g, '');
        return (
            auth.makeMd(str_refined, isInAppWebViewSignedUserWithToken(auth)) ||
            {}
        ).md;
    }

    function akey(auth) {
        return isInAppWebViewSignedUserWithToken(auth)
            ? '3ef815416f775098fe977004015c6193'
            : 'bbc59b0b5f7a1c6efe950f6236ccda35';
    }

    async function get(auth, url, query, options) {
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
                akey: akey(auth),
                'device-time-zone-id': n(177).getCurrentTimezoneId(),
                'device-time-zone-ms-offset': 60 * moment().utcOffset() * 1000, // momentjs
                language: window.messageLang,
                md: createMd(auth, uri),
            },
            credentials: 'include',
            ...options,
        });

        return await resp.json();
    }

    const getPosts = (auth, bandNo, after, limit) =>
        get(auth, 'https://api.band.us/v2.0.0/get_posts', {
            band_no: bandNo,
            direction: 'before',
            resolution_type: 4,
            limit: limit || 20,
            after: after,
        });
};

const isBandPage = (href) => {
    if (href.match(/band.us\/band\//)) onEnterBandPage();
    else onLeaveBandPage();
};

// ref: https://stackoverflow.com/a/46428962
const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector('body');
    const observer = new MutationObserver((mutations) => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            /* Changed ! your code here */
            isBandPage(oldHref);
        }
    });
    observer.observe(body, { childList: true, subtree: true });

    isBandPage(oldHref);
};

window.onload = observeUrlChange;
