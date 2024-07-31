import { Destination, getBrowserMessenger } from '../../modules/messenger';

console.log('This is the background page.');
console.log('Put the background scripts here.');

const messenger = getBrowserMessenger(Destination.Background);

messenger.addListener((message, sendResponse) => {
    sendResponse(`RESPONSE[Background]: ${JSON.stringify(message)}`);
});
