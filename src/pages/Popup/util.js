import React from 'react';
import { useEffect } from 'react';
import { Destination, getBrowserMessenger } from '../../modules/messenger';

const messenger = getBrowserMessenger(Destination.Popup, Destination.Content);

/**
 * @param {(messenger: {
 *     send: (to: any, message: any, callback: any) => void;
 *     addListener: (callback: any) => void;
 *     removeListener: (callback: any) => void;
 *     Destination: Readonly<{
 *         Content: "content";
 *         Inject: "inject";
 *         Background: "background";
 *         Popup: "popup";
 *     }>;
 * }) => (void | () => void)} effect
 * @param {React.DependencyList | undefined} deps
 */
export const useMessenger = (effect, deps) => useEffect(() => effect(messenger), deps);

export const getDateString = (today) =>
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, '0')}-` +
    `${String(today.getDate()).padStart(2, '0')}`;

Array.prototype.promiseAll = function (callback) {
    return Promise.all(this.map(callback));
};
