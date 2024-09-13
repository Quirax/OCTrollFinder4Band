import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// printLine("Using the 'printLine' function from the Print Module");

const onEnterBandPage = async () => {
    const main = await getMain();

    main.messenger.addListener(async (message, sendResponse) => {
        switch (message) {
            case 'getPosts':
                const posts = await main.getPosts();
                sendResponse(posts);
            case 'getBandInformation':
                const bandInfo = await main.getBandInformation();
                sendResponse(bandInfo);
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
