/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './shim.js'
import React, { Component } from 'react';

import Web3 from 'web3';
import lightwallet from 'eth-lightwallet';
import HookedWeb3Provider from 'hooked-web3-provider';
import {
  Platform,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  Linking,
  Text,
  View,
  Button,Alert ,AsyncStorage
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions';
import crypto from 'react-native-crypto';
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      balanceText: ""
    };
  }
  async createWallet(){
    var password = 'everis@2018';
    var seed = 'hungry gentle confirm before glue office pen tissue accuse fix black thunder';
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: seed,
        hdPathString: "m/0'/0'/0'"
    }, async function (err, ks ) {
        ks.keyFromPassword(password,async function (err, pwDerivedKey) {
            if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
                throw new Error("Incorrect derived key!");
            }

            try {
                ks.generateNewAddress(pwDerivedKey, 1);
            } catch (err) {
                console.log(err);
                console.trace();
            }
            this.address = ks.getAddresses()[0];
            this.prv_key = ks.exportPrivateKey(this.address, pwDerivedKey);

            console.log('address and key: ', this.address, this.prv_key);
            var web3Provider = new HookedWeb3Provider({
              host: "",
              transaction_signer: keystoreWallet
            });
             const web3 = new Web3(web3Provider);
             await web3.eth.getBalance(this.address, async (err, data) => {
              if (err) {
                console.log(err);
              } else {
                let acBalance = web3.utils.fromWei( data, 'ether');
                await AsyncStorage.setItem('@waletBalance:key', acBalance);
              }
            });
        });
    });
    const value = await AsyncStorage.getItem('@waletBalance:key');
     console.log('balance: '+ JSON.stringify(value) );
    this.setState(previousState => {
      return { balanceText: value};
    });
  }
    onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
  async getBalance(){
   

  }
  componentDidMount(){
    this._requestCammeraPermission();
  }
  _requestCammeraPermission = async () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
        //response is an object mapping type to permission
        this.setState({
          cameraPermission: response.camera,
          photoPermission: response.photo,
        })
      });
  }
  render() {
    
    // this.createWallet();
    //this.getBalance();
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Seu saldo é: 
        </Text>
        <Text style={styles.instructions}>
          {this.state.balanceText}
          
        </Text>
        <Button
          onPress={() => { this.createWallet(); }}
            title="createWallet"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
                  <Button
          onPress={() => { this.getBalance(); }}
            title="getBalance"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
                <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
