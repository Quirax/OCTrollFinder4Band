import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// A timestamp stores last request time
let lastRequestTime = Date.now();

const onEnterBandPage = async () => {
    const main = await getMain();

    main.messenger.addListener((message, sendResponse) => {
        let api = typeof message === 'object' ? message.api : message;

        // Next request must be sent at least after 10ms of last request time
        let runAfter = Math.max(lastRequestTime + 10 - Date.now(), 0);
        // Set last request time during printing debug messages

        lastRequestTime = Date.now() + runAfter;
        // console.debug(
        //     `lastRequestTime = ${lastRequestTime}\t` +
        //         `api = ${api}\t` +
        //         `current ts = ${Date.now()}\t` +
        //         `will run after ${runAfter}\t` +
        //         `will run at ${(lastRequestTime = Date.now() + runAfter)}`
        // );

        setTimeout(async () => {
            switch (api) {
                case 'getPosts':
                    const { after, limit } = message;
                    const posts = await main.getPosts(after, limit);
                    sendResponse(posts);
                    break;
                case 'getComments':
                    const { postNo, previousParams, commentId } = message;
                    const comments = await main.getComments(postNo, previousParams, commentId);
                    sendResponse(comments);
                    break;
                case 'getBandInformation':
                    const bandInfo = await main.getBandInformation();
                    sendResponse(bandInfo);
                    break;
                case 'getMembersOfBand':
                    const membersOfBand = await main.getMembersOfBand();
                    sendResponse(membersOfBand);
                    break;
                default:
                    sendResponse('UNKNOWN requests');
            }
        }, runAfter);
    });
};

const onLeaveBandPage = async () => {};

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
            isBandPage(oldHref);
        }
    });
    observer.observe(body, { childList: true, subtree: true });

    isBandPage(oldHref);
};

window.onload = observeUrlChange;
