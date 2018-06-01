import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import { ActionButton,Button } from 'react-native-material-ui';
import WalletService from '../service/walletService';
export default class BuyConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      processing: false,
      valorTransacao: '',
    };
  }
  onChange(state) {
    this.setState(state);
  }
  componentDidMount(){
    this.settingsService = WalletService.getInstance();
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
      return (
        <View style={styles.container}>
          <ActionButton
          icon='arrow-back'
          onPress={() => this.props.navigation.navigate('Home')}/>
          <Text>Deseja comprar:{'\n'}
          { this.props.navigation.state.params.name}</Text>
          <Button 
              primary 
              text="Comprar"  title="" onPress={()=> this.buy()} />
        </View>

      );
    }
  }
  buy(){

       this.setState({processing:true});
      this.settingsService.execSmartContract().then(() => 
      {
        this.setState({processing:false,});
      });
    
}
 
}
const styles = StyleSheet.create({
  scanner:{
    height: '90%'
  },
  container: {
    paddingTop: '30%',
    flex: 1,
    alignItems: 'center',
  },
  textInput:{
    marginTop:50,
    height: 40, 
    width:'80 %',
    borderColor: 'gray',
  },
});
