import { getMain } from './modules/main';
import { printLine } from './modules/print';

// Must reload extension for modifications to take effect.

// printLine("Using the 'printLine' function from the Print Module");

const onEnterBandPage = async () => {
    const main = await getMain();

    main.messenger.send(
        main.messenger.Destination.Content,
        'Hello, Content!',
        (message) => console.log('RESPONSE >>', message)
    );

    main.messenger.send(
        main.messenger.Destination.Background,
        'Hello, Background!',
        (message) => console.log('RESPONSE >>', message)
    );
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
