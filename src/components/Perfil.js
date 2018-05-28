import React from 'react';
import { View, Text,StyleSheet,TouchableOpacity ,TextInput} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import { ActionButton, Button } from 'react-native-material-ui';
import WalletService from '../service/walletService';
export default class PerfilScreen extends React.Component {
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
    }else{
    return ( 
      
        <View style={styles.container}>
            <TextInput 
              placeholder='Nome'
              style={styles.textInput}
              onChangeText={(text) => this.setState({nome: text})}
            />
            <TextInput 
              placeholder='Empresa'
              style={styles.textInput}
              onChangeText={(text) => this.setState({empresa: text})}
            />
            <TextInput 
              placeholder='Telefone'
              style={styles.textInput}
              onChangeText={(text) => this.setState({telefone: text})}
            />
            <TextInput 
              placeholder='Cargo'
              style={styles.textInput}
              onChangeText={(text) => this.setState({cargo: text})}
            />
            <TextInput 
              placeholder='e-mail'
              style={styles.textInput}
              onChangeText={(text) => this.setState({email: text})}
            />
            <Button 
              primary 
              text="Salvar" />
            <ActionButton
            icon='arrow-back'
            onPress={() => this.props.navigation.goBack()}/>
        </View>

      );
    }
  }
}
const styles = StyleSheet.create({
  textInput:{
    height: 40, 
    width:'80 %', 
    borderColor: 'gray',
  },
  scanner:{
    height: '90%'
  },
  container: {
    paddingTop: '20%',
    flex: 1,
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
