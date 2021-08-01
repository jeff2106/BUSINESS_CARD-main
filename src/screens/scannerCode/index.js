import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ScannerCode({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { id, Token, Data } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + Token + '');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var formdata = new FormData();
    formdata.append('id_card_scanned', data);
    formdata.append('id_scanneur', id);
    formdata.append('id_style_de_carte', 1);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/card/store_scanned_card',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + Token + '');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/user/' + data + '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        navigation.navigate('ResultQrcode', {
          Data: Data,
          Token: Token,
          id: id,
          DetailsUserScanner: result,
          idCartScaner: data,
        })
      )
      .catch((error) => console.log('error', error));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.headback}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#F07D00"
        />
      </View>

      <Image style={styles.Image} source={require('../../assets/qr.png')} />

      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.footer}>
          <MaterialIcons name="center-focus-weak" size={24} color="#F07D00" />
          <Text style={{ color: '#F07D00' }}>SCAN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    paddingTop: '5%',
  },
  Image: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    opacity: 0.3,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 231, 211, 1)',
    height: windowHeight / 4,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
  },
  headback: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
});
