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
  Alert
} from 'react-native';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import ImageView from "react-native-image-viewing";
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Connexion({ navigation }) {
  const [checkPassword, setCheckPassword] = React.useState(true);
  const [UserMail, setUserMail] = React.useState('');
  const [UserPsw, setUserPsw] = React.useState('');
  const [Spinner, setSpinner] = React.useState(false);
  const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
  const [visible, setIsVisible] = React.useState(false);
  function SendData() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append("email", UserMail);
    formdata.append("password", UserPsw);
    formdata.append("is_login_with_social_network", 0);
    formdata.append("account_id", null);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    setSpinner(!Spinner);
    fetch('https://agnesmere-sarl.com/carte_visite/api/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSpinner(!Spinner);
        if (!result.message) {
          setSpinner(false);
          
          navigation.navigate('AccueilScanne', {
            id: result.user.id,
            Token: result.token,
          });
          setSpinner(false);
          console.log("Notre Token "+Token);
        }else {
          setSpinner(false);
          Alert.alert("Alert Connexion ",'Vous avez mal saisie une donnée ou votre compte existe pas');
        }
        console.log('Patience');
      })
      .catch((error) => console.log('Notre erreur ', error));
  }

  async function logInFB() {
    try {
      await Facebook.initializeAsync({
        appId: "  ",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        var formdata = new FormData();

        formdata.append("email", null);
        formdata.append("password", null);
        formdata.append("is_login_with_social_network", 1);
        formdata.append("account_id", `${(await response.json()).id}`);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
          setSpinner(!Spinner);
          fetch('https://agnesmere-sarl.com/carte_visite/api/login', requestOptions)
            .then((responses) => responses.json())
            .then((result) => {
              setSpinner(!Spinner);
              if (!result.message) {
                setSpinner(false);
                
                navigation.navigate('AccueilScanne', {
                  id: result.user.id,
                  Token: result.token,
                });
                setSpinner(false);
                console.log("Notre Token "+Token);
              }else {
                setSpinner(false);
                alert('Vous avez mal saisie une donnée');
              }
              console.log('Patience');
            })
          .catch((error) => console.log('Notre erreur ', error));
        console.log("Logged in!", `Hi ${(await response.json())}!`);
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
  const [googleSubmitting, setGoogleSubmitting] = React.useState(false);
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
      console.log(result.user.id);
      if (type == 'success') {
        const { email, name, photoUrl } = user;
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        var formdata = new FormData();
        formdata.append("email", null);
        formdata.append("password", null);
        formdata.append("is_login_with_social_network", 1);
        formdata.append("account_id", result.user.id);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        fetch("https://agnesmere-sarl.com/carte_visite/api/login", requestOptions)
          .then(response => response.json())
          
          .then((result) => {
            setSpinner(!Spinner);
            console.log(result);
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


  const Loader = <OrientationLoadingOverlay
  visible={Spinner}
  color="white"
  indicatorSize="large"
  messageFontSize={10}
  message="Veillez patienter un moment!!"
/>
  return (
    <ScrollView>
      <View style={styles.container}>
      {Loader}
        <Image
          style={styles.images}
          source={require('../../assets/icon.png')}
        />
        
        <TextInput
          style={styles.textInput}
          placeholder="Votre email"
          onChangeText={(text) => setUserMail(text)}
        />
        <View style={[styles.row, styles.justifyCenter, styles.colorGray]}>
          <TextInput
            secureTextEntry={checkPassword}
            style={styles.textInput2}
            placeholder="Votre mot de passe"
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
        onPress={() => navigation.navigate('Inscription')}
          style={[styles.color2Text, styles.bold, { marginBottom: '5%' }]}
          >
          S'Inscrire
        </Text>
        <ImageView
          images={images}
          imageIndex={1}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <TouchableOpacity
          onPress={loginGoogle}
          style={[styles.btnSocialG, styles.row, styles.justifyCenter]}>
          <Text style={{ color: 'white', marginRight: 10 }}>
            Se connecter avec Email
          </Text>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={logInFB}
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
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
  },
  textInput2: {
    height: 50,
    width: '90%',
  },
  colorGray: {
    height: 50,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 25
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
