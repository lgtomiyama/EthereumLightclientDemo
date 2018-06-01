import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import { ActionButton,Button } from 'react-native-material-ui';
import WalletService from '../service/walletService';
export default class TransferConfirmScreen extends React.Component {
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
          <Text>Transferir para:{'\n'}
          {this.props.navigation.state.params}</Text>
          <TextInput 
              placeholder='Valor'
              keyboardType='numeric'
              style={styles.textInput}
              onChangeText={(text) => this.setState({valorTransacao: text})}
            />
          <Button 
              primary 
              text="Transferir"  title="" onPress={()=> this.transfer()} />
        </View>

      );
    }
  }
  transfer(){
    if(this.state.valorTransacao && this.state.valorTransacao!=='0' ){
      this.setState({processing:true});
      this.settingsService.transfer(this.props.navigation.state.params,this.state.valorTransacao).then(() => 
      {
        this.setState({processing:false,});
      });
    }
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
