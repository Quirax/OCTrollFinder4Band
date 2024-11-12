import { useEffect } from 'react';

/**
 * @returns {typeof chrome}
 */
export const getBrowser = () => self.browser || self.chrome;

/**
 * @param {(browser: typeof chrome) => (void | () => void)} effect
 * @param {React.DependencyList | undefined} deps
 */
export const useBrowser = (effect, deps) => useEffect(() => effect(getBrowser()), deps);

/**
 * @param {Date} start start date
 * @param {Date} end end date
 * @returns {boolean} Whether this is between start and end date, including both start and end date.
 */
Date.prototype.isBetween = function (start, end) {
    let _end = new Date(end);
    _end.setDate(_end.getDate() + 1);
    _end.setMilliseconds(_end.getMilliseconds() - 1);

    return start <= this && this <= _end;
};

Date.prototype.truncTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
};
