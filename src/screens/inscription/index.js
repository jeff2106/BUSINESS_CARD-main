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
  Alert,
  AsyncStorage,
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import localStorage from 'react-native-sync-localstorage';
import { clearStorage, getStorage, setStorage } from 'react-native-storer';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Inscription({ navigation }) {
  const [checkPassword, setCheckPassword] = React.useState(true);
  const [checkPasswordC, setCheckPasswordC] = React.useState(true);
  const [UserNumber, setUserNumber] = React.useState('none');
  const [UserMail, setUserMail] = React.useState('none');
  const [UserPsw1, setUserPsw1] = React.useState('none');
  const [UserPsw2, setUserPsw2] = React.useState('none');

  //CONNEXION AVEC L API //
  const SendData = () => {
    if (
      UserNumber != 'none' &&
      UserMail != 'none' &&
      UserPsw1 != 'none' &&
      UserPsw2 != 'none'
    ) {
      var myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      var formdata = new FormData();
      formdata.append('email', UserMail);
      formdata.append('phone_number', UserNumber);
      formdata.append('password', UserPsw1);
      formdata.append('password_confirmation', UserPsw2);

      if (UserPsw1 == UserPsw2) {
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        fetch(
          'https://agnesmere-sarl.com/carte_visite/api/register',
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (!result.message) {
              navigation.navigate('AccueilScanne', {
                id: result.user.id,
                Token: result.token,
              });
            } else {
              alert('Vous avez mal saisie une donnée');
            }
            console.log('Patience');
          })
          .catch((error) => console.log('error', error));
      } else {
        alert('Vos Mot de passe sont different');
      }
    } else {
      alert('Les champs doivent etre renseigner');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.images}
          source={require('../../assets/logo.png')}
        />
        <TextInput
          onChangeText={(UserNumber) => setUserNumber(UserNumber)}
          style={styles.textInput}
          placeholder="Numéro de téléphone"
          keyboardAppearance="dark"
        />

        <TextInput
          style={styles.textInput}
          onChangeText={(UserMail) => setUserMail(UserMail)}
          keyboardAppearance="dark"
          keyboardType="email-address"
          placeholder="Email"
        />
        <View style={[styles.row, styles.justifyCenter, styles.shadow]}>
          <TextInput
            secureTextEntry={checkPassword}
            style={styles.textInput2}
            placeholder="Mot de passe"
            keyboardAppearance="dark"
            onChangeText={(UserPsw1) => setUserPsw1(UserPsw1)}
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
        <View style={[styles.row, styles.justifyCenter, styles.shadow]}>
          <TextInput
            secureTextEntry={checkPasswordC}
            style={styles.textInput2}
            placeholder="Confirmer le Mot de passe"
            keyboardAppearance="dark"
            onChangeText={(UserPsw2) => setUserPsw2(UserPsw2)}
          />
          {checkPasswordC ? (
            <Feather
              onPress={() => {
                setCheckPasswordC(!checkPasswordC);
              }}
              name="eye-off"
              size={18}
              color="black"
            />
          ) : (
            <Feather
              onPress={() => {
                setCheckPasswordC(!checkPasswordC);
              }}
              name="eye"
              size={18}
              color="black"
            />
          )}
        </View>

        <TouchableOpacity
          style={[styles.btnLogin, styles.row, styles.justifyCenter]}
          onPress={() => SendData()}>
          <Text style={[{ color: 'white' }]}>Inscription</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: 'center' }}
          onPress={() => navigation.navigate('Connexion')}>
          Se connecter
        </Text>

        <TouchableOpacity
          style={[styles.btnSocialG, styles.row, styles.justifyCenter]}
          onPress={() => DisplayData()}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            S'Inscription avec Email
          </Text>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnSocialF, styles.row, styles.justifyCenter]}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            S'Inscription avec Facebook
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
    marginTop: -50,
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  images: {
    resizeMode: 'contain',
    width: '20%',
    height: '20%',
    marginBottom: 20,
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
    marginBottom: 6,
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
    marginBottom: 5,
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
    marginBottom: 5,
    marginTop: 10,
  },
  btnSocialG: {
    backgroundColor: '#EC002A',
    width: '90%',
    height: '7%',
    borderRadius: 20,
    position: 'absolute',
    bottom: '8%',
  },
  btnSocialF: {
    backgroundColor: '#125D98',
    width: '90%',
    height: '7%',
    borderRadius: 20,
    position: 'absolute',
    bottom: '0.5%',
  },
});
