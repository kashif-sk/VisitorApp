/* eslint-disable handle-callback-err */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Navigator from './src/common/Navigator';

class App extends Component {
  state = {
    signedIn: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
