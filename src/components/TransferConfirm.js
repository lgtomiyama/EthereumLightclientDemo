import React from 'react';
import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import { ActionButton } from 'react-native-material-ui';

export default class TransferConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActionButton
        icon='arrow-back'
        onPress={() => this.props.navigation.navigate('Home')}/>
        <Text>Transferir para:{'\n'}
        {this.props.navigation.state.params}</Text>
      </View>

    );
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
