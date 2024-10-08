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
