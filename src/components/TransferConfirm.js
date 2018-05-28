import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActionButton
          icon='arrow-back'
          onPress={() => this.props.navigation.navigate('Home')}/>
          <Text>Transferir para:{'\n'}
          {this.props.navigation.state.params}</Text>
          <Button 
              primary 
              text="Transferir 1"  title="" onPress={()=> this.transfer()} />
        </View>

      );
    }
  }
  transfer(){
    this.setState({processing:true});
      this.settingsService.transfer(this.props.navigation.state.params,1).then(() => 
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
