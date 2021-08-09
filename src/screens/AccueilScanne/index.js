import React from 'react';
import { addDays, format } from 'date-fns';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
  Linking
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomBar from '../BottomBar';
import IconVerticale from '../iconVerticale';
import Swipeout from 'react-native-swipeout';
import { SearchBar } from 'react-native-elements';
import { data } from '../../components/data';
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated';
import { CarteForme } from '../../components/carteForme';
import { CarteFormeFav } from '../../components/carteFormeF';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
  Foundation,
  FontAwesome5,
  Feather,
  Fontisto,
  Platform
  
} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Agendas from '../agendas/index'
import email from 'react-native-email'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AccueilScanne({ route, navigation }) {
  const { id, Token } = route.params;
  const [SecondData, setSecondData] = React.useState();
  const [DataHistorique, setDataHistorique] = React.useState([]);
  const [DataFav, setDataFav] = React.useState([]);
  const [HistoriqueS, setHistoriqueS] = React.useState(false);
  const [Favoris, setFavoris] = React.useState(false);
  const [Agenda, setAgenda] = React.useState(false);
  const [Home, setHome] = React.useState(true);
  const [Spinner, setSpinner] = React.useState(true);
  const _Linkedin = () => {
    Linking.openURL(Data.data.card_informations.reseau.linkedin_acound);
  };

  const _Facebook = () => {
    Linking.openURL(Data.data.card_informations.reseau.facebook_account);
  };

  const _InstaGram = () => {
    Linking.openURL(Data.data.card_informations.reseau.instagram_account);
  };

  const _Twitter = () => {
    Linking.openURL(Data.data.card_informations.reseau.tweeter_acound);
  };

  const onPressWrite = () => navigation.navigate('WriteAgenda',{
    id:id
  })

  React.useEffect(() => {
    // Update the document title using the browser API

    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/user/' + id + '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSecondData(result))
      .catch((error) => console.log('error user', error));
  });

  //HISTORIQUE
  function ShowDataHistorique() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/card/show_scanned_card/' +
        id +
        '',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setDataHistorique(result))
      .catch((error) => console.log('error fff', error));
  }

  const transitionRef = React.useRef();
  const transition = <Transition.Change interpolation="easeInOut" />;
  const onPress = () => {
    transitionRef.current.animateNextTransition();
  };

  React.useEffect(() => {
      ShowDataHistorique();
    },[]);

    function refreshData(){
      console.log("called");
  }
  setInterval(() => {
    refreshData();
  }, 10000);

  const Historique = (
    <View>
      <Text style={{ fontSize: 16, margin: 10 }}>Scanners récents</Text>
      <Transitioning.View ref={transitionRef} transition={transition}>
        <FlatList
          style={{ marginBottom: 370 }}
          data={DataHistorique?.data}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <CarteForme
              Data={item}
              name_proprietaire={item.name_proprietaire}
              adresse_proprietaire={item.title}
              entreprise_name={item.card_informations.entreprise_name}
              photo_proprietaire={item.photo_proprietaire}
              user_job_position={item.card_informations.user_job_position}
              entreprise_website={item.card_informations.entreprise_website}
              email_proprietaire={item.email_proprietaire}
              card_qrcode={item.card_informations.card_qrcode}
              id_user_card={item.id_proprietaire_card}
              id_scanneur={item.id_scanneur}
              adresse_proprietaire={item.adresse_proprietaire}
              Token={Token}
              onPress={onPress}
            />
          )}
        />
      </Transitioning.View>
    </View>
  );

  const SearchEntreprise = (
    <View
      style={{
        elevation: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        margin: 20,
        borderRadius: 10,
      }}>
      <TextInput
        style={{ marginLeft: 5, color: '#C2C1C1', width: '90%' }}
        keyboardType="default"
        placeholder="Rechercher une entreprise"
        placeholderTextColor="#C2C1C1"
        selectionColor="red"
      />
      <Icon
        style={{ alignSelf: 'center' }}
        name="magnify"
        pack="material"
        size={20}
        color={'#DA7200'}
      />
    </View>
  );
  //FAVORIS
  function ShowDataFavoris() {
  
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://agnesmere-sarl.com/carte_visite/api/card/show_user_card_in_favoris/"+
      id +"", requestOptions)
        .then(response => response.json())
        .then(result => setDataFav(result))
        .catch(error => console.log('error', error));
  }

  const transitionRefs = React.useRef();
  const transitions = <Transition.Change interpolation="easeInOut" />;
  const onPressFav = () => {
    transitionRefs.current.animateNextTransition();
  };

  React.useEffect(() => {
    ShowDataFavoris();
  },[]);

  const FavorisCard = (
    <View>
      <Text style={{ fontSize: 16, margin: 10 }}>Carte en Favoris</Text>
      <Transitioning.View ref={transitionRefs} transition={transitions}>
        <FlatList
          style={{ marginBottom: 370 }}
          data={DataFav?.data}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <CarteFormeFav
              Data={item}
              name_proprietaire={item.name_proprietaire}
              adresse_proprietaire={item.title}
              entreprise_name={item.card_informations.entreprise_name}
              photo_proprietaire={item.photo_proprietaire}
              user_job_position={item.card_informations.user_job_position}
              entreprise_website={item.card_informations.entreprise_website}
              email_proprietaire={item.email_proprietaire}
              card_qrcode={item.card_informations.card_qrcode}
              id_user_card={item.id_proprietaire_card}
              id_scanneur={item.id_scanneur}
              adresse_proprietaire={item.adresse_proprietaire}
              Token={Token}
              onPress={onPress}
            />
          )}
        />
      </Transitioning.View>
    </View>
  );

 //AGENDA//
 
 const openDialScreen = () => {
  let number = '';
  let numero = "0237934963949364"
  if (Platform.OS === 'ios') {
    number = `telprompt:${numero}`;
  } else {
    number = `tel:${numero}`;
    
  }
  Linking.openURL(number);
};
  //ACCUEILL
  const Accueil = (
    <TouchableOpacity
    onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('EditProfile', {
            id: id,
            Token: Token,
            Data: SecondData,
          });
        }}>
      <View
        
        >
        <Text style={{color:'red',textAlign:'center',fontWeight:'bold',fontSize:20}}>Notification</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ textAlign: 'center', color: '#CACACA' }}>
          Completer les informations
        </Text>
      </View>
    </TouchableOpacity>
  );
  //CARTE//
  const Card = (
    <SafeAreaView >
      <View style={styles.CarteForme}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          margin: 10,
          width: "78%",
        }}
      >
          <View>
            {SecondData?.data.user_picture == null ? (
              <Image
                source={require("../../assets/id.jpg")}
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#DA7200",
                  borderRadius: 5,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#DA7200",
                  borderRadius: 5,
                }}
                source={{
                  uri: SecondData?.data.user_picture,
                }}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "78%",
            }}
          >
            <View
              style={{
                margin: 10,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  color: "#DA7200",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {SecondData?.data.name}
              </Text>
            </View>

            <Text style={{}}>
              {SecondData?.data.card_informations.user_job_position}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "#DA7200",
              width: "70%",
              alignSelf: "flex-start",
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Icon
                name="map-marker"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{ marginHorizontal: 10 }}>
                {SecondData?.data.user_adresse}
              </Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Icon name="web" size={20} color="#A2A2A2" pack="material" />
              <Text style={{ marginHorizontal: 10 }}>
                www.{SecondData?.data.card_informations.entreprise_website}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#000",
                borderBottomEndRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Icon name="email" size={20} color="#A2A2A2" pack="material" />
                <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                {SecondData?.data.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 10 }}>
          <Image 
                style={{
                  width: 70,
                  height: 70,
                  borderWidth: 3,
                  borderColor: '#DA7200',
                  borderRadius: 5,
                }}
                source={{
                  uri: SecondData?.data.card_informations.card_qrcode,
              }}
            />
          </View>
          {/* <QR code */}
          {/* <Image
            style={[styles.ImageQr, { height: "100%", width: "100%" }]}
            source={{ uri: SecondData?.data.card_informations.card_qrcode }}
          /> */}
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DA7200' }}>
          {SecondData?.data.card_informations.entreprise_name}
          </Text>
        </View>
        </View>
    </SafeAreaView>
  );
//Spinner
let Loader 
if(SecondData?.data){
   Loader = <OrientationLoadingOverlay
  visible={false}
  color="white"
  indicatorSize="large"
  messageFontSize={10}
  message="Veillez patienter un moment!!"
/>
}else{
   Loader = <OrientationLoadingOverlay
  visible={true}
  color="white"
  indicatorSize="large"
  messageFontSize={10}
  message="Veillez patienter un moment!!"
/>
}
  return (
    <SafeAreaView style={styles.container}>
      {Loader}
      <View style={{ flex: 0.2 }}>
        <View style={styles.header}>
          <StatusBar animated={true} backgroundColor="#DA7200" />
          <Image
            source={require('../../assets/iconBar.png')}
            style={styles.headerLogo}
          />

          <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Profile', {
                  id: id,
                  Token: Token,
                  Data: SecondData,
                });
              }}>
              <Icon
                name="account-circle"
                size={30}
                color="#602873"
                pack="material"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginRight: 10,
            }}>
            {/* Accueil */}
            {Home == true ? (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#DA7200',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(true);
                    setHistoriqueS(false);
                    setAgenda(false)
                  }}>
                  <Icon
                    style={{ alignSelf: 'center' }}
                    name="home"
                    pack="material"
                    size={30}
                    color={'#fff'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#DA7200',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Accueil
                </Text>
              </View>
            ) : (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CFCFCF',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(true);
                    setHistoriqueS(false);
                    setAgenda(false)
                  }}>
                  <Icon
                    style={{ alignSelf: 'center' }}
                    name="home"
                    pack="material"
                    size={30}
                    color={'#707070'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Accueil
                </Text>
              </View>
            )}

            {/* Historique */}
            {HistoriqueS == true ? (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#DA7200',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(true);
                    setHistoriqueS(false);
                    setAgenda(false)
                  }}>
                  <Icon
                    style={{ alignSelf: 'center' }}
                    name="history"
                    pack="material"
                    size={30}
                    color={'#fff'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#DA7200',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Historique
                </Text>
              </View>
            ) : (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CFCFCF',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(false);
                    setHistoriqueS(true);
                    setAgenda(false)
                  }}>
                  <Icon
                    style={{ alignSelf: 'center' }}
                    name="history"
                    pack="material"
                    size={30}
                    color={'#707070'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Historique
                </Text>
              </View>
            )}
            {/* Favoris */}
            {Favoris == true ? (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#DA7200',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(true);
                    setHistoriqueS(false);
                    setAgenda(false)
        
                  }}>
                  <Icon
                  style={{ alignSelf: 'center' }}
                  name="star"
                  pack="material"
                  size={30}
                  color={'#fff'}
                />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#DA7200',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Favoris
                </Text>
              </View>
            ) : (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CFCFCF',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(true);
                    setHome(false);
                    setHistoriqueS(false);
                    setAgenda(false)
        
                  }}>
                  <Icon
                  style={{ alignSelf: 'center' }}
                  name="star"
                  pack="material"
                  size={30}
                  color={'#707070'}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 11,
                  marginHorizontal: 5,
                  textAlign: 'center',
                }}>
                Favoris
              </Text>
              </View>
            )}
            {/* Agenda de rappel  */}
            {Agenda == true ? (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#DA7200',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(true);
                    setHistoriqueS(false);
                    setAgenda(false)
        
                  }}>
                <Icon
                  style={{ alignSelf: 'center' }}
                  name="view-agenda"
                  pack="material"
                  size={30}
                  color={'#fff'}
                />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#DA7200',
                    fontSize: 11,
                    marginHorizontal: 5,
                    textAlign: 'center',
                  }}>
                  Agenda
                </Text>
              </View>
            ) : (
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#CFCFCF',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFavoris(false);
                    setHome(false);
                    setHistoriqueS(false);
                    setAgenda(true)
        
                  }}>
                  <Icon
                  style={{ alignSelf: 'center' }}
                  name="view-agenda"
                  pack="material"
                  size={30}
                  color={'#707070'}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 11,
                  marginHorizontal: 5,
                  textAlign: 'center'
                }}>
                Agenda
              </Text>
              </View>
            )}
            
            {/* Toutes les cartes */}
          </View>
          <View style={{ height: windowHeight }}>
          {Home && !SecondData?.data.card_informations.user_job_position && Card}
          {Home &&
              SecondData?.data.card_informations.user_job_position != null &&
              Card}
            {Home && !SecondData?.data.card_informations.user_job_position && (
              <View style={{ marginTop: 10 }}>
                <View
                  >
                  {Accueil}
                </View>
              </View>
            )}
            
            
            <View style={{ marginTop: 40 }}>
              <View
                style={[
                  {
                    backgroundColor: null,
                    borderRadius: null,
                    width: windowWidth,
                    height: windowHeight,
                  },
                ]}>
            {HistoriqueS && DataHistorique?.data?.length > 0 && Historique}
            {HistoriqueS && DataHistorique?.data?.length < 0 && (
                  <View
                    style={[
                      styles.cardCentral,
                      { backgroundColor: null, borderRadius: null },
                    ]}>
                    <Text>Aucun Historique</Text>
                  </View>
                )}
                
            {Favoris && DataFav?.data?.length > 0 && FavorisCard}
            {Favoris && DataFav?.data?.length < 0 && (
                  <View
                    style={[
                      styles.cardCentral,
                      { backgroundColor: null, borderRadius: null },
                    ]}>
                    <Text>Aucune Carte en favoris</Text>
                  </View>
                )}
                {Agenda && <Agendas onPress={onPressWrite} Alert="ok"/>}
            
              </View>
            </View>
          </View>
        </View>
      </View>
      <BottomBar id={id} Token={Token} Data={SecondData} />
    </SafeAreaView>
  );
}

