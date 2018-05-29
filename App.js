
import React, { Component } from 'react';
import HomeScreen from './src/components/Home';
import ScannerScreen from './src/components/Scanner';
import TransferCaptureScreen from './src/components/TransferCapture';
import TransferConfirmScreen from './src/components/TransferConfirm';
import BuyCaptureScreen from './src/components/BuyCapture';
import BuyConfirmScreen from './src/components/BuyConfirm';
import PerfilScreen from './src/components/Perfil';
import WalletService from './src/service/walletService';
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
    Perfil: {
      screen: PerfilScreen,
      navigationOptions: { PerfilScreen: null },

    },
    Scanner: {
      screen: ScannerScreen,
      navigationOptions: { ScannerScreen: null },

    },
 
    TransferCapture: {
      screen: TransferCaptureScreen,
      navigationOptions: { TransferCapture: null },

    },
    TransferConfirm: {
      screen: TransferConfirmScreen,
      navigationOptions: { TransferConfirm: null },

    },
    BuyCapture: {
      screen: BuyCaptureScreen,
      navigationOptions: { BuyCapture: null },

    },
    BuyConfirm: {
      screen: BuyConfirmScreen,
      navigationOptions: { BuyConfirm: null },

    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);
