import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// printLine("Using the 'printLine' function from the Print Module");

const onEnterBandPage = async () => {
    const main = await getMain();

    main.messenger.addListener(async (message, sendResponse) => {
        let api = typeof message === 'object' ? message.api : message;

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
            default:
                sendResponse('UNKNOWN requests');
        }
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
