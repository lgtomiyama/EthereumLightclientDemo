
import React, { Component } from 'react';
import HomeScreen from './src/components/Home';
import ScannerScreen from './src/components/Scanner';
import {
  StackNavigator,
} from 'react-navigation';
export default class App extends React.Component  {
  render() {
    return (<AppStack/>)
  }
}
const AppStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: { ScannerScreen: null },

    },
    Scanner: {
      screen: ScannerScreen,
      navigationOptions: { ScannerScreen: null },

    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);
