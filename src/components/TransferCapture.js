import React from 'react';
import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions';
import { ActionButton } from 'react-native-material-ui';

export default class TransferCaptureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrScanned:"",
    };
  }
  componentDidMount(){
    this._requestCammeraPermission();
  }
  _requestCammeraPermission = async () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
        this.setState({
          cameraPermission: response.camera,
          photoPermission: response.photo,
        })
      });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeScanner
          style={styles.scanner}
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Escaneado: {this.state.qrScanned}
            </Text>
          }
        />
            <ActionButton
            icon='arrow-back'
            onPress={() => this.props.navigation.goBack()}/>
      </View>

    );
  }
  onSuccess(e) {
    this.setState(previousState => {
      return { qrScanned: e.data};
    });
    this.props.navigation.navigate('TransferConfirm', e.data)
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
