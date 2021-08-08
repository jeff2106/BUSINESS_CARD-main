import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
  FlatList,
  LogBox,
  Alert
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';
import BottomBar from '../BottomBar';
import style from '../Login/style';
import { data } from '../../components/dataMacarte';
import { useNavigation } from '@react-navigation/native';
import IconVerticale from '../iconVerticale';
import { Avatar, Layout } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

export default function EditProfile({ route, navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  });
  const { Data, Token, id } = route.params;

  const [Nom, setNom] = React.useState(null);
  const [PostEntreprise, setPostEntreprise] = React.useState(null);
  const [NomEntreprise, setNomEntreprise] = React.useState(null);
  const [Bio, setBio] = React.useState(null);
  const [Addresse, setAddresse] = React.useState(null);
  const [WebSite, SetWebSite] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [Instagram, setInstagram] = React.useState(null);
  const [Twitter, setTwitter] = React.useState(null);
  const [Facebook, setFacebook] = React.useState(null);
  const [Linkedin, setLinkedin] = React.useState(null);
  const [Mail, setMail] = React.useState(null);
  const [Number, setNumber] = React.useState(null);
  const [Spinner, setSpinner] = React.useState(false);

  const Img =
    'data:image/jpeg;base64,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';

  function senData() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + Token + '');

    var formdata = new FormData();
    Nom == null ? Data.data.name : formdata.append('name', Nom);
    Mail == null ? Data.data.email : formdata.append('email', Mail);
    Number == null
      ? Data.data.phone_number
      : formdata.append('phone_number', Number);
    Facebook == null
      ? Data.data.card_informations.reseau.facebook_account
      : formdata.append('user_facebook_account', Facebook);
    Instagram == null
      ? Data.data.card_informations.reseau.instagram_account
      : formdata.append('user_instagram_account', Instagram);
    Linkedin == null
      ? Data.data.card_informations.reseau.linkedin_acound
      : formdata.append('user_linkedin_acound', Linkedin);
    Twitter == null
      ? Data.data.card_informations.reseau.tweeter_acound
      : formdata.append('user_tweeter_acound', Twitter);
    'user_adresse', "abidjan, cote d'ivoire";
    NomEntreprise == null
      ? Data.data.card_informations.entreprise_name
      : formdata.append('entreprise_name', NomEntreprise);
    Addresse == null
      ? Data.data.user_adresse
      : formdata.append('user_adresse', Addresse);
    PostEntreprise == null
      ? Data.data.card_informations.user_job_position
      : formdata.append('user_job_position', PostEntreprise);

    WebSite == null
      ? Data.data.card_informations.entreprise_website
      : formdata.append('entreprise_website', WebSite);
    Img == null ? Data.data.user_picture : Data.data.user_picture;
    Bio == null
      ? Data.data.user_biographie
      : formdata.append('user_biographie', Bio);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setSpinner(!Spinner);
    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/user/update/' + id + '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
      {
        setSpinner(!Spinner);
        if (!result.message) {
          setSpinner(false);
          
          navigation.navigate('AccueilScanne', {
            Data: result,
            Token: Token,
            id: id,
          });
          setSpinner(false);
        }else {
          setSpinner(false);
          alert('Vous avez mal saisie une donnée');
        }
        console.log('Patience');
      }
        
      )
      .catch((error) => {
        console.log('errorf', error);
        Alert.alert('Champs Incomplet','Vos données sont incomplet');
        setSpinner(false);

      });
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const Loader = <OrientationLoadingOverlay
  visible={Spinner}
  color="white"
  indicatorSize="large"
  messageFontSize={10}
  message="Veillez patienter un moment!!"
/>
  return (
    <SafeAreaView style={styles.container}>
      {Loader}
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="arrow-left" size={30} color="#DA7200" pack="material" />
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ color: '#DA7200' }}>Retour</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Informations personnels
          </Text>
        </View>
        {/* vue importé fichier  */}
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Importer depuis
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <View style={{ margin: 10 }}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{ alignSelf: 'center' }}
                  name="email"
                  pack="material"
                  size={30}
                  color={'#383838'}
                />
              </TouchableOpacity>
            </View>

            <View style={{ margin: 10 }}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{ alignSelf: 'center' }}
                  name="contacts"
                  pack="material"
                  size={30}
                  color={'#FD8C04'}
                />
              </TouchableOpacity>
            </View>

            <View style={{ margin: 10 }}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{ alignSelf: 'center' }}
                  name="linkedin"
                  pack="material"
                  size={30}
                  color={'#0E76A8'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Image
                source={require('../../assets/id.jpg')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputSpace}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Bio</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.user_biographie}
              placeholderTextColor="#CFCFCF"
              onChangeText={(Bio) => setBio(Bio)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Nom</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.name}
              placeholderTextColor="#CFCFCF"
              onChangeText={(Nom) => setNom(Nom)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Email</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.email}
              placeholderTextColor="#CFCFCF"
              onChangeText={(Mail) => setMail(Mail)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Telephone</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.phone_number}
              placeholderTextColor="#CFCFCF"
              onChangeText={(Number) => setNumber(Number)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Poste dans l'entrprise</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.card_informations.user_job_position}
              placeholderTextColor="#CFCFCF"
              onChangeText={(PostEntreprise) =>
                setPostEntreprise(PostEntreprise)
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Nom de l'entreprise</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.card_informations.entreprise_name}
              placeholderTextColor="#CFCFCF"
              onChangeText={(NomEntreprise) => setNomEntreprise(NomEntreprise)}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Site web</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.card_informations.entreprise_website}
              placeholderTextColor="#CFCFCF"
              onChangeText={(WebSite) => SetWebSite(WebSite)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Addresse</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder={Data.data.user_adresse}
              placeholderTextColor="#CFCFCF"
              onChangeText={(Addresse) => setAddresse(Addresse)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Lien Linkedin</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder="Linkedin"
              placeholderTextColor="#CFCFCF"
              onChangeText={(Linekdin) => setLinkedin(Linekdin)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Lien Facebook</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder="Facebook"
              placeholderTextColor="#CFCFCF"
              onChangeText={(Facebook) => setFacebook(Facebook)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Lien Twitter</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder="Twitter"
              placeholderTextColor="#CFCFCF"
              onChangeText={(Twitter) => setTwitter(Twitter)}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.label_Style}>
              <Text>Lien Instagram</Text>
            </View>

            <TextInput
              style={styles.textInput_form}
              placeholder="Instagram"
              placeholderTextColor="#CFCFCF"
              onChangeText={(Instagram) => setInstagram(Instagram)}
            />
          </View>
        </View>

        <View style={{ alignSelf: 'flex-end', marginHorizontal: 10, top: -10 }}>
          <TouchableOpacity
            onPress={() => senData()}
            style={{
              backgroundColor: '#DA7200',
              width: 70,
              height: 70,
              borderRadius: 50,
              justifyContent: 'center',
              elevation: 5,
            }}>
            <Icon
              style={{ alignSelf: 'center' }}
              name="check"
              pack="material"
              size={30}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
