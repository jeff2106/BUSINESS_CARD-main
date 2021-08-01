import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Connexion({ navigation }) {
  const [checkPassword, setCheckPassword] = React.useState(true);
  const [UserMail, setUserMail] = React.useState('');
  const [UserPsw, setUserPsw] = React.useState('');
  const [Spinner, setSpinner] = React.useState(false);

  function SendData() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append('email', UserMail);
    formdata.append('password', UserPsw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://agnesmere-sarl.com/carte_visite/api/login', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (!result.message) {
          navigation.navigate('AccueilScanne', {
            id: result.user.id,
            Token: result.token,
          });
          console.log("Notre Token "+Token);
        }else {
          alert('Vous avez mal saisie une donnée');
        }
        console.log('Patience');
      })
      .catch((error) => console.log('Notre erreur ', error));
  }

  React.useEffect(() => {
    setInterval(() => {
    setSpinner(true) 
    }, 3000);
    })
  return (
    <ScrollView>
      <View style={styles.container}>
      
        <Image
          style={styles.images}
          source={require('../../assets/icon.png')}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Numéro de téléphone ou email"
          onChangeText={(text) => setUserMail(text)}
        />
        <View style={[styles.row, styles.justifyCenter, styles.shadow]}>
          <TextInput
            secureTextEntry={checkPassword}
            style={styles.textInput2}
            placeholder="Mot de passe"
            onChangeText={(UserPsw) => setUserPsw(UserPsw)}
          />
          {checkPassword ? (
            <Feather
              onPress={() => {
                setCheckPassword(!checkPassword);
              }}
              name="eye-off"
              size={18}
              color="black"
            />
          ) : (
            <Feather
              onPress={() => {
                setCheckPassword(!checkPassword);
              }}
              name="eye"
              size={18}
              color="black"
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => SendData()}
          style={[styles.btnLogin, styles.row, styles.justifyCenter]}>
          <Text style={[{ color: 'white' }]}>Connexion</Text>
        </TouchableOpacity>
        <Text style={[styles.color2Text, styles.bold, { marginBottom: '5%' }]}>
          Mot de passe oublié ?
        </Text>
        <Text
          style={[styles.color2Text, styles.bold, { marginBottom: '5%' }]}
          onPress={() => navigation.navigate('Inscription')}>
          S'Inscrire
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Agendas')}
          style={[styles.btnSocialG, styles.row, styles.justifyCenter]}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            Se connecter avec Email
          </Text>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnSocialF, styles.row, styles.justifyCenter]}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            Se connecter avec Facebook
          </Text>
          <FontAwesome5 name="facebook" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#fff',
  },
  images: {
    resizeMode: 'contain',
    width: '40%',
    marginBottom: '15%',
  },
  textInput: {
    height: 50,
    width: '90%',
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 10,
    marginBottom: 25,
  },
  textInput2: {
    height: 50,
    width: '90%',
  },
  shadow: {
    height: 50,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 10,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    backgroundColor: '#F07D00',
    width: '75%',
    height: '7%',
    borderRadius: 15,
    marginBottom: 10,
  },
  btnSocialG: {
    backgroundColor: '#EC002A',
    width: '90%',
    height: '7%',
    borderRadius: 20,
    marginBottom: '2%',
  },
  btnSocialF: {
    backgroundColor: '#125D98',
    width: '90%',
    height: '7%',
    borderRadius: 20,
    marginBottom: '2%',
  },
  bold: {
    fontWeight: 'bold',
  },
});
