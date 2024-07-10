export const Destination = Object.freeze({
    Content: 'content',
    Injection: 'injection',
    Background: 'background',
    Popup: 'popup',
});

const ME = Destination.Content;

const callbacks = [];

window.addEventListener('message', (e) => {
    const message = e.data;

    if (typeof message !== 'object') return;
    if (message.to !== ME) return;

    callbacks.forEach((cb) => cb(message));
});

export const send = (to, message) =>
    window.postMessage({
        from: ME,
        to: to,
        message: message,
    });

export const addListener = (callback) => callbacks.push(callback);

export const removeListener = (callback) => {
    const idx = callbacks.indexOf(callback);
    if (idx > -1) callbacks.splice(idx, 1);
};
