/**
 * @format
 */

if (__DEV__) {
    const originalConsoleWarn = console.warn;

    console.warn = (message, ...args) => {
        if (!message.startsWith('Non-serializable')) {
            originalConsoleWarn(message, ...args);
        }
    };
}

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);