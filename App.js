
import React, { Component } from 'react';
import HomeScreen from './src/components/Home';
import ScannerScreen from './src/components/Scanner';
import {
  StackNavigator,
} from 'react-navigation';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

export default class App extends React.Component  {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <AppStack/>
      </ThemeProvider>
      )
  }
}
const AppStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: { HomeScreen: null },

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
