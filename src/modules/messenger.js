export const Destination = Object.freeze({
    Content: 'content',
    Inject: 'inject',
    Background: 'background',
    Popup: 'popup',
});

const generateMessenger = (me, addListener, sendMessage) => {
    const callbacks = [];

    addListener((packet, sendResponse) => {
        if (typeof packet !== 'object') return;
        if (packet.to !== me) return;

        callbacks.forEach((cb) => cb(packet.message, sendResponse));
    });

    return {
        send: function (to, message, callback) {
            sendMessage(
                {
                    from: me,
                    to: to,
                    message: message,
                },
                callback
            );
        },

        addListener: function (callback) {
            callbacks.push(callback);
        },

        removeListener: function (callback) {
            const idx = callbacks.indexOf(callback);
            if (idx > -1) callbacks.splice(idx, 1);
        },
        Destination,
    };
};

export const getWindowMessenger = (me) => {
    const addListener = (callback) => {
        window.addEventListener('message', (e) => {
            const packet = e.data;

            callback(packet, (message) =>
                window.postMessage({
                    from: packet.to,
                    to: packet.from,
                    ts: packet.ts,
                    message: message,
                })
            );
        });
    };

    const sendMessage = (packet, callback) => {
        const ts = new Date().getTime();

        window.addEventListener('message', (e) => {
            const packet = e.data;

            if (typeof packet !== 'object') return;
            if (packet.to !== me) return;
            if (packet.ts !== ts) return;

            callback(packet.message);
        });

        window.postMessage({
            ...packet,
            ts: ts,
        });
    };

    return generateMessenger(me, addListener, sendMessage);
};

export const getBrowserMessenger = (me) => {
    const browser = window.browser || window.chrome;

    const addListener = (callback) =>
        browser.runtime.onMessage.addListener((packet, _, sendResponse) => {
            callback(packet, (message) =>
                sendResponse({
                    from: packet.to,
                    to: packet.from,
                    message: message,
                })
            );
        });

    const sendMessage = (packet, callback) =>
        browser.runtime.sendMessage(packet, (resp) => callback(resp.message));

    return generateMessenger(me, addListener, sendMessage);
};
