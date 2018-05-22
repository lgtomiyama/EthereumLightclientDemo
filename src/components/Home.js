
import React from 'react';
import { StyleSheet,View, Text,Button ,AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import WalletService from '../service/walletService'
import { ActionButton } from 'react-native-material-ui';
import QRCode from 'react-native-qrcode';
let settingsService;
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceText: "",
      accountText: ""
    };
    
  }
  clickMenu(e){
    switch (e) {
      case 'perfil':
        
      break;
      case 'quiz':
        console.log(this.settingsService.getWalletAdderess());
      break;
      case 'transferir':
        this.props.navigation.navigate('Scanner')
      break;
      case 'comprar':
        this.props.navigation.navigate('Scanner')
      break;    
      default:
        break;
    }

  }
  async componentWillMount(){
    this.settingsService = WalletService.getInstance();
    var balance = await this.settingsService.getWalletBallance();
    this.setState({ 
      balanceText: balance
    })
  }
  render() {
    
    return (
      <View style={styles.container}>
    
        <Text style={styles.instructions}>
          Seu saldo é: 
        </Text>
        <Text style={styles.instructions}>
          {this.state.balanceText}</Text>

        <QRCode
          value={this.state.accountText}
          bgColor='purple'
          fgColor='white'/>

        <ActionButton
          onPress={(e) => { this.clickMenu(e); }}
          actions={[{ name: 'perfil', icon: 'account-circle', label: 'Perfil'},
                    { name: 'quiz', icon: 'games', label: 'Quiz' },
                    { name: 'comprar', icon: 'local-grocery-store', label: 'Comprar' },
                    { name: 'transferir', icon: 'send', label: 'Transferir' },]}
          icon="account-balance-wallet"
          transition="speedDial"
          />
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
