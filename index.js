/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const MyHeadlessTask = async () => {
    console.log('Running service!');
};

AppRegistry.registerHeadlessTask('Visitor', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
