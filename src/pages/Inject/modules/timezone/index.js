import { initCountries } from './countries';
import { initTimezones } from './timezones';
import moment from 'moment-timezone';
import _ from 'underscore';

const timezone = {
    _countryCode: window.countryCode,
    _lang: window.messageLang,
    _currentTimezoneId: 'America/Los_Angeles',

    _timezones: {},
    _countries: {},

    _hasIntlTimeZone: function () {
        try {
            return !!Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
            return false;
        }
    },

    _guessTimeZoneId: function () {
        let guess = moment.tz.guess(); // momentjs
        return this._hasIntlTimeZone() ||
            'KR' != this._countryCode ||
            'Asia/Tokyo' != guess
            ? guess
            : 'Asia/Seoul';
    },

    getTimezone: function (e) {
        return this._timezones[e];
    },

    getTimezoneCountry: function (e) {
        return this._countries[e];
    },

    getTimezones: function (t) {
        let tz = this.getTimezoneCountry(t);
        if (!tz) return null;

        let list = [];

        _.each(tz, (e) => {
            list.push(this._timezones[e]);
        });

        return _.sortBy(list, function (e) {
            return e.utcOffset + e.cityName;
        });
    },

    _initTimezoneId: function () {
        let tz = this.getTimezone(this._guessTimeZoneId());

        if (tz) this._currentTimezoneId = tz.id;
        else {
            var tzList = this.getTimezones(this._countryCode);
            if (tzList) {
                tz = _.find(
                    tzList,
                    (e) => {
                        var tz = moment.tz(n);
                        return moment.tz(e.id).utcOffset() == tz.utcOffset();
                    },
                    this
                );

                if (!tz) tz = tzList[0];
                this._currentTimezoneId = tz.id;
            }
        }
    },

    getCurrentTimezoneId: function () {
        return this._currentTimezoneId;
    },
};

export const getTimezone = () => {
    timezone._timezones = initTimezones();
    timezone._countries = initCountries();
    timezone._initTimezoneId();

    return timezone;
};
