import { timestamp } from './util';
import $ from 'jquery';

const extendAuth = (auth) =>
    _.extend(auth, {
        isInAppWebViewSignedUserWithToken: function () {
            return (
                this.isWebViewUserAgent() &&
                this.isSignedUser() &&
                this.isInAppWebViewToken()
            );
        },
    });

export function getAuth() {
    const executor = (resolve, reject, retry = 0) => {
        if (retry === 5) {
            // 5회 이상 재시도 시
            // TODO: 로그인 과정에서 오류가 지속적으로 발생하는 경우에 대한 처리
            reject();
            return; // 더 이상 아무 작업도 하지 않음
        }

        let ts = timestamp();
        let callback = 'authCallBack_' + ts;
        let url = `https://${window.authDomain}/s/login/getKey?_t=${ts}&callback=${callback}`;

        window[callback] = (auth) => {
            window[callback] = null;
            resolve(extendAuth(auth));
        };

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'script',
            cache: false,
            timeout: 10000,
            error: (e) => {
                console.error('getAuth > $.ajax > error', e);
                window[callback] = null;
                executor(resolve, reject, retry + 1);
            },
        });
    };

    return new Promise(executor);
}
