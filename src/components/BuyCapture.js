import React from 'react';
import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions';
import { ActionButton } from 'react-native-material-ui';

export default class BuyCaptureScreen extends React.Component {
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
              Escaneie um QR Code de compra 
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
    console.log(e.data);
    this.props.navigation.navigate('BuyConfirm',JSON.parse(e.data));
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
});
