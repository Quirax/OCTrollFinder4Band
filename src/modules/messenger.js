// ref: https://velog.io/@broccolism/크롬-익스텐션-컴포넌트끼리-통신하는-방법
// ref: https://velog.io/@goban/구글-확장프로그램-개발-2-스크립트간-통신

export const Destination = Object.freeze({
    Content: 'content',
    Inject: 'inject',
    Background: 'background',
    Popup: 'popup',
});

// ref: https://stackoverflow.com/a/1349426
export function makeId(length) {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

export const generateMessenger = (me, addListener, sendMessage) => {
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

export const getWindowMessenger = (me, via) => {
    const addListener = (callback) => {
        window.addEventListener('message', (e) => {
            const packet = e.data;

            callback(packet, (message) =>
                window.postMessage({
                    from: packet.to,
                    to: packet.from,
                    via: via,
                    ts: packet.ts,
                    message: message,
                    isResponse: true,
                })
            );
        });
    };

    const sendMessage = (packet, callback) => {
        const ts = new Date().getTime() + makeId(10);

        window.addEventListener('message', function (e) {
            const packet = e.data;

            if (typeof packet !== 'object') return;
            if (packet.to !== me) return;
            if (packet.ts !== ts) return;

            callback(packet.message);
            window.removeEventListener('message', this);
        });

        window.postMessage({
            ...packet,
            via: via,
            ts: ts,
            isResponse: false,
        });
    };

    return generateMessenger(me, addListener, sendMessage);
};

export const getBrowserMessenger = (me, via) => {
    // service worker에서 사용하는 경우, window 객체 대신 self 객체를 사용
    // ref: https://stackoverflow.com/a/73785852
    const browser = self.browser || self.chrome;

    const addListener = (callback) =>
        browser.runtime.onMessage.addListener((packet, _, sendResponse) => {
            callback(packet, (message) => {
                sendResponse({
                    from: packet.to,
                    to: packet.from,
                    via: via,
                    message: message,
                });
            });

            return true;
        });

    const sendMessage = (packet, callback) =>
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            browser.tabs.sendMessage(
                tab.id,
                {
                    ...packet,
                    via: via,
                },
                (resp) => callback(resp.message)
            );
        });

    return generateMessenger(me, addListener, sendMessage);
};

export const initIntermediateMessenger = (me) => {
    const browser = window.browser || window.chrome;

    window.addEventListener('message', (e) => {
        const packet = e.data;

        if (typeof packet !== 'object') return;
        if (packet.via !== me) return;
        if (packet.to === me) return;
        if (packet.isResponse) return;

        browser.runtime.sendMessage(packet, (resp) => {
            window.postMessage({
                ...resp,
                ts: packet.ts,
                isResponse: true,
            });
        });
    });

    browser.runtime.onMessage.addListener((packet, _, sendResponse) => {
        if (typeof packet !== 'object') return;
        if (packet.via !== me) return;
        if (packet.to === me) return;

        const ts = new Date().getTime() + makeId(10);

        window.addEventListener('message', function (e) {
            const resp = e.data;

            if (typeof resp !== 'object') return;
            if (resp.to !== packet.from) return;
            if (resp.from !== packet.to) return;
            if (!resp.isResponse) return;
            if (resp.ts !== ts) return;

            sendResponse(resp);
        });

        window.postMessage({
            ...packet,
            ts: ts,
            isResponse: false,
        });

        return true;
    });
};
