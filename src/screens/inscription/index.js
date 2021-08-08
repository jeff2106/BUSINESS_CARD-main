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
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Inscription({ navigation }) {
  const [checkPassword, setCheckPassword] = React.useState(true);
  const [checkPasswordC, setCheckPasswordC] = React.useState(true);
  const [UserNumber, setUserNumber] = React.useState('none');
  const [UserMail, setUserMail] = React.useState('none');
  const [UserPsw1, setUserPsw1] = React.useState('none');
  const [UserPsw2, setUserPsw2] = React.useState('none');
  const [Spinner, setSpinner] = React.useState(false);
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
        setSpinner(!Spinner);
        fetch(
          'https://agnesmere-sarl.com/carte_visite/api/register',
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setSpinner(!Spinner);
            if (!result.message) {
              setSpinner(false);
              console.log(result);
              navigation.navigate('AccueilScanne', {
                id: result.user.id,
                Token: result.token,
              });
              setSpinner(false);
              console.log('Notre Token ' + Token);
            } else {
              setSpinner(false);
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

  const [googleSubmitting, setGoogleSubmitting] = React.useState(false);
  //Connexion avec facebook
  async function logInFB() {
    try {
      await Facebook.initializeAsync({
        appId: '857776271524158',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email', 'user_friends'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
          .then((responses) => responses.json())
          .then((results) => {
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');

            var formdata = new FormData();
            formdata .append("email", null);
            formdata .append("phone_number", "");
            formdata .append("password", "");
            formdata .append("password_confirmation", "");
            formdata .append("is_log_with_social_network", 1);
            formdata .append("social_network_name", results.name);
            formdata .append("social_network_account_id", results.id);
            formdata .append("social_picture", null);

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow',
            };


            setSpinner(!Spinner);
            fetch(
              'https://agnesmere-sarl.com/carte_visite/api/register',
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setSpinner(!Spinner);
                if (!result.message) {
                  setSpinner(false);
                  console.log(result);
                  navigation.navigate('AccueilScanne', {
                    id: result.user.id,
                    Token: result.token,
                  });
                  setSpinner(false);
                } else {
                  setSpinner(false);
                  alert('Vous avez mal saisie une donnée');
                }
              })
              .catch((error) => console.log('error', error));
          })
          .catch((error) => console.log('Notre erreur ', error));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  // connexion google
  const loginGoogle = () => {
    setGoogleSubmitting(true);
    const config = {
      androidClientId:
        '150680783491-dlpm321mfh8l6eg09ov4lg1buch1oa7u.apps.googleusercontent.com',
      iosClientId:
        '150680783491-il7jas27b8bhbmruk1pacte5qr1vimum.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        console.log(result.user.name);
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          var myHeaders = new Headers();
          myHeaders.append("Accept", "application/json");
          var formdata = new FormData();
          formdata .append("email", result.user.email);
          formdata .append("phone_number", "");
          formdata .append("password", "");
          formdata .append("password_confirmation", "");
          formdata .append("is_log_with_social_network", 1);
          formdata .append("social_network_name", result.user.name);
          formdata .append("social_network_account_id", result.user.id);
          formdata .append("social_picture", result.user.photoUrl);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch("https://agnesmere-sarl.com/carte_visite/api/register", requestOptions)
            .then(response => response.json())
            .then((result) => {
              setSpinner(!Spinner);
              if (!result.message) {
                setSpinner(false);
                console.log(result);
                navigation.navigate('AccueilScanne', {
                  id: result.user.id,
                  Token: result.token,
                });
                setSpinner(false);
              } else {
                setSpinner(false);
                alert('Vous avez mal saisie une donnée');
              }
        })
            .catch(error => console.log('error', error));
        } else {
          Alert.alert("INFOS",'Connexion avec google a été interrompu');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Loader = (
    <OrientationLoadingOverlay
      visible={Spinner}
      color="white"
      indicatorSize="large"
      messageFontSize={10}
      message="Veillez patienter un moment!!"
    />
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        {Loader}
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
          onPress={loginGoogle}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            S'Inscription avec Email
          </Text>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logInFB}
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
