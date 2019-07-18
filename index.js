/**
 * @format
 */

 import React from "react";
 import Setup from "./src/boot/setup";

 // export default class App extends React.Component {
 //   render() {
 //     return <Setup />;
 //   }
 // }

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Setup);
