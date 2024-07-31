import {
    getBrowserMessenger,
    Destination,
    getWindowMessenger,
    initIntermediateMessenger,
} from '../../modules/messenger';

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

const browser = window.browser || window.chrome;

injectScript(browser.runtime.getURL('injectScript.bundle.js'), 'body');

const ME = Destination.Content;

const messenger = {
    toInject: getWindowMessenger(ME),
    toOther: getBrowserMessenger(ME),
};

messenger.toInject.addListener((message, sendResponse) => {
    sendResponse(`RESPONSE[Inject]: ${JSON.stringify(message)}`);
});

initIntermediateMessenger(ME);
