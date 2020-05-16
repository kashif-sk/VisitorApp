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
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Visitor from '../common/VisitorService';
import Button from '../components/Button';

class HomePage extends Component {

  componentDidMount(){
    Visitor.startService(); //Starting the continuous service in background
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <Button
            onPress={() => navigation.navigate('Visitor Entry')}
            children='Visitor Entry'
          />
          <Button
            onPress={() => navigation.navigate('Visitor List')}
            children='Visiors List'
          />
          <Button
            onPress={() => navigation.navigate('Latest News')}
            children='Watch News'
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <HomePage {...props} navigation={navigation} />;
}
