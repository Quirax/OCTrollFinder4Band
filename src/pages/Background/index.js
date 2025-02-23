import { Destination, getBrowserMessenger } from '../../modules/messenger';
import { getBrowser } from '../util';

console.log('This is the background page.');
console.log('Put the background scripts here.');

const messenger = getBrowserMessenger(Destination.Background);

messenger.addListener((message, sendResponse) => {
    sendResponse(`RESPONSE[Background]: ${JSON.stringify(message)}`);
});

// Clear expired data from the local extension storage
// ref: https://developer.chrome.com/docs/extensions/reference/api/storage
const browser = getBrowser();

const clearExpired = (values) => {
    const expiresIn = 86400; // seconds

    const removeImmediately = [];

    for (let id in values) {
        const value = values[id].newValue || values[id];

        if (!value.ts) continue;

        const expDate = new Date(value.ts);
        expDate.setSeconds(expDate.getSeconds() + expiresIn);

        const now = new Date();

        console.log(value, expDate);
        // If it has been expired, remove it immediately
        if (now >= expDate) removeImmediately.push(id);
        // Or, remove it after expired date
        // https://developer.chrome.com/docs/extensions/reference/api/alarms
        // https://my-chair.tistory.com/6
        else
            browser.alarms.create('expire_' + id, {
                when: Number(expDate),
            });
    }

    browser.storage.local.remove(removeImmediately);
};

browser.storage.local.get(null).then(clearExpired); // When worker is launched
browser.storage.local.onChanged.addListener(clearExpired); // While worker is running

// Remove item when alarm is fired.
browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('expire_')) {
        const id = alarm.name.replace('expire_', '');
        browser.storage.local.remove(id);
    }
});
