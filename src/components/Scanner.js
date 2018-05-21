import React from 'react';
import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './Home'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions';
class ScannerScreen extends React.Component {
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
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              Escaneado: {this.state.qrScanned}
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          }
        />

      </View>

    );
  }
  onSuccess(e) {
    this.setState(previousState => {
      return { qrScanned: e.data};
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

export default createStackNavigator( {
  Scanner: {
    screen: ScannerScreen,
    navigationOptions: { Home: null },

  },
},);
