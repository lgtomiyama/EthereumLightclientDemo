
import React from 'react';
import { StyleSheet,View, Text,Button ,AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import crypto from 'react-native-crypto';
import Web3 from 'web3';
import lightwallet from 'eth-lightwallet';
import HookedWeb3Provider from 'hooked-web3-provider';
import QRCode from 'react-native-qrcode';
 
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceText: "",
      accountText: ""
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
            await AsyncStorage.setItem('walletAddress', this.address);
            await AsyncStorage.setItem('walletPrivateKey', this.prv_key);
            
            console.log('address and key: ', this.address, this.prv_key);
            var web3Provider = new HookedWeb3Provider({
              host: "https://net.everchain.tk",
              transaction_signer: ks
            });
            const web3 = new Web3(web3Provider);
            await web3.eth.getBalance(this.address, async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let acBalance = web3.utils.fromWei( data, 'ether');
              await AsyncStorage.setItem('walletBalance', acBalance);
            }
            });
        });
    });
    const walletBalance = await AsyncStorage.getItem('walletBalance');
    const walletAddress = await AsyncStorage.getItem('walletAddress');
     console.log('balance: '+ JSON.stringify(walletBalance) );
    this.setState(previousState => {
      return { 
        accountText: walletAddress,
        balanceText: walletBalance,
        };
    });
    
  }
    onSuccess(e) {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Seu saldo é: 
        </Text>
        <Text style={styles.instructions}>
          {this.state.balanceText}</Text>
          <Button
          onPress={() => { this.createWallet(); }}
            title="getBalance"
            color="#841584"
          />
        <QRCode
          value={this.state.accountText}
          bgColor='purple'
          fgColor='white'/>
        <Button
          title="QR Sacanner"
          onPress={() => this.props.navigation.navigate('Scanner')}/>
      </View>

    );
  }
}
export default createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { ScannerScreen: null },
    
  },
  
});

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
