
import React from 'react';
import { StyleSheet,View, Text ,AsyncStorage,ActivityIndicator, TextInput} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import WalletService from '../service/walletService';
import { ActionButton,Button } from 'react-native-material-ui';
import QRCode from 'react-native-qrcode';
let settingsService;
export default class HomeScreen extends React.Component {
  constructor(props) {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      balanceText: "",
      accountText: "",
      isLogged: false,
      senha: "",
      processing: true,
    };

  }
  onChange(state) {
    this.setState(state);
  }
  componentDidMount(){
    this.settingsService = WalletService.getInstance();
    var balance;
    this.settingsService.getLogged().then((result) => {
      console.log('Logado:'+JSON.stringify(result));
      if(result.account){
        this.setState(
          {
            isLogged: true,
            accountText: result.account,
            balanceText: result.balance,
            
          });
      }
      this.setState({processing:false,});
    });
  }
  render() {
    if(this.state.processing){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else{
      if(this.state.isLogged){
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
              actions={[
                { name: 'reload', icon: 'autorenew', label: 'Atualizar Saldo' },
                { name: 'perfil', icon: 'account-circle', label: 'Perfil'},
                { name: 'comprar', icon: 'local-grocery-store', label: 'Comprar' },
                { name: 'transferir', icon: 'send', label: 'Transferir' },]}
              icon="account-balance-wallet"
              transition="speedDial"
              />
          </View>

        );
      }else{
        return(
          <View style={styles.container}>
            <Text style={styles.instructions}>
                Crie uma conta!{'\n'}
                
            </Text>
            <TextInput 
              secureTextEntry={true} 
              placeholder='Insira sua senha'
              style={{height: 40, width:'60 %', borderColor: 'gray'}}
              onChangeText={(text) => this.setState({senha: text})}
            />
            <Button 
            primary 
            text="Login" 
            onPress={()=> this.login()} />
          </View>
        );
      }
    }
  }
  clickMenu(e){
    switch (e) {
      case 'perfil':
        this.props.navigation.navigate('Perfil');
      break;
      case 'reload':
        this.reloadBalance();
        //this.settingsService.execSmartContract();
      break;
      case 'transferir':
        this.props.navigation.navigate('TransferCapture');
      break;
      case 'comprar':
        this.props.navigation.navigate('BuyCapture');
      break;    
      default:
        break;
    }

  }
  login(){
    this.setState({processing:true});
     this.settingsService.createAccount(this.state.senha,null).then(() => {
      this.reloadAcc();
      this.setState({processing:false,});
    });
  }
  reloadAcc(){
    this.setState({processing:true,});
    this.settingsService.getWalletAdderess().then((account) => {
      console.log('Acc:'+ account);
      this.setState({ 
        accountText: account,
        isLogged: true,
        processing:false,
      });
      this.reloadBalance();
    });
  }
  reloadBalance(){
    this.setState({processing:true,});
    this.settingsService.getWalletBallance((balance) => {
      this.setState({
        balanceText:balance,
        processing: false,
      })
    });
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
