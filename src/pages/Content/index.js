import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// printLine("Using the 'printLine' function from the Print Module");

const onEnterBandPage = async () => {
    const main = await getMain();

    printLine(await main.getPosts());
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
            /* Changed ! your code here */
            isBandPage(oldHref);
        }
    });
    observer.observe(body, { childList: true, subtree: true });

    isBandPage(oldHref);
};

window.onload = observeUrlChange;
