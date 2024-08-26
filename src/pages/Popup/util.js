import React from 'react';
import { useEffect } from 'react';
import { Destination, getBrowserMessenger } from '../../modules/messenger';

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
export const useMessenger = (effect, deps) =>
    useEffect(
        () =>
            effect(getBrowserMessenger(Destination.Popup, Destination.Content)),
        deps
    );

/**
 * @param {(browser: typeof chrome) => (void | () => void)} effect
 * @param {React.DependencyList | undefined} deps
 */
export const useBrowser = (effect, deps) =>
    useEffect(() => effect(self.browser || self.chrome), deps);
