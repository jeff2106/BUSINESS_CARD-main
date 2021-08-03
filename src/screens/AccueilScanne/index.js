import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomBar from '../BottomBar';
import IconVerticale from '../iconVerticale';
import Swipeout from 'react-native-swipeout';
import {SearchBar} from 'react-native-elements';
import {data} from '../../components/data';
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated';
import { CarteForme } from '../../components/carteForme';
import { Ionicons, AntDesign, Foundation } from '@expo/vector-icons';


export default  function AccueilScanne({ route, navigation }) {
  const { id, Token } = route.params;
  const [SecondData, setSecondData] = React.useState();
  const [DataHistorique, setDataHistorique] = React.useState();
  const [HistoriqueS, setHistoriqueS] = React.useState(false);
  const [Favoris, setFavoris] = React.useState(false);
  const [Agenda, setAgenda] = React.useState(false);
  const [Home, setHome] = React.useState(true);
  
  React.useEffect( () => {
    // Update the document title using the browser API

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer 58|8CiW6XY1GSSvwuyRIxd7maWnMr7L2R5ubnic81yq');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/user/'+id+'',
      requestOptions
    )
      .then((response) => response.json())
      .then( (result) => setSecondData(result))
      .catch((error) => console.log('error', error));
  });

  //HISTORIQUE
  function ShowDataHistorique(){
    var myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
              myHeaders.append('Authorization', 'Bearer 58|8CiW6XY1GSSvwuyRIxd7maWnMr7L2R5ubnic81yq');
              
              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
              
              fetch("https://agnesmere-sarl.com/carte_visite/api/card/show_scanned_card/"+id+"", requestOptions)
                .then(response => response.json())
                .then(result => setDataHistorique(result.data))
                .catch(error => console.log('error', error))
  }

  const transitionRef = React.useRef();
  const transition = <Transition.Change interpolation="easeInOut" />;
  const onPress = () => {
    transitionRef.current.animateNextTransition();
  };
  
  React.useEffect(() => {
    ShowDataHistorique();
  })
  
 const Historique = <View>
          <Text style={{ fontSize: 16, margin: 10}}>
          Scanners récents
          </Text> 
          <Transitioning.View
            ref={transitionRef}
            transition={transition}
            >

          <FlatList
            style={{marginBottom: 100}}
            data={DataHistorique}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <CarteForme 
             Data={item} 
             name_proprietaire = {item.name_proprietaire}
             adresse_proprietaire = {item.adresse_proprietaire}
             entreprise_name={item.card_informations.entreprise_name}
             photo_proprietaire = {item.photo_proprietaire}
             user_job_position = {item.card_informations.user_job_position}
             entreprise_website = {item.card_informations.entreprise_website}
             email_proprietaire = {item.email_proprietaire}
             card_qrcode =  {item.card_informations.card_qrcode}
             id_user_card={item.id_proprietaire_card}
             id_scanneur = {item.id_scanneur}
             Token = {Token}

             />}
          />
          </Transitioning.View>
        </View>

  const SearchEntreprise = <View
                  style={{
                    elevation: 3,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    margin: 20,
                    borderRadius: 10,
                  }}>
                  <TextInput
                    style={{marginLeft: 5, color: '#C2C1C1', width: '90%'}}
                    keyboardType="default"
                    placeholder="Rechercher une entreprise"
                    placeholderTextColor="#C2C1C1"
                    selectionColor="red"
                  />
                  <Icon
                    style={{alignSelf: 'center'}}
                    name="magnify"
                    pack="material"
                    size={20}
                    color={'#DA7200'}
                  />
                </View>

  //END

  
  //ACCUEILL
  const Accueil =( <View  style={{ flex: 1 }}>
                <View style={{ marginTop:10 }}>
                      <Text style={{ textAlign: 'center' }}>
                        Vous n'avez pas de carte de visite
                      </Text>
                    </View>

                    <View style={{ margin:40 }}>
                      <Icon
                        style={{ alignSelf: 'center' }}
                        name="plus"
                        pack="material"
                        size={50}
                        color={'#CACACA'}
                      />
                    </View>
                    <View style={{ margin:40 }}>
                      <Text style={{ textAlign: 'center', color: '#CACACA' }}>
                        Touchez ici pour créer une carte de visite
                      </Text>
                    </View>
                </View>)

 
  
//END
//CARTE//
const Card = (
  <View style={{ marginTop: 20 }}>
  <View style={styles.cardCentral}>
    <View style={styles.headers}>
      <View
        style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={styles.cardPhoto}>
          {SecondData?.data.user_picture == null ? (
            <Image
              source={require('../../assets/id.jpg')}
              style={{ width: 74, height: 74, borderRadius: 10 }}
            />
          ) : (
            <Image
              style={{ width: 74, height: 74, borderRadius: 10 }}
              source={{
                uri: SecondData?.data.user_picture,
              }}
            />
          )}
        </View>
        <View style={{ marginRight: -20 }}>
          <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>
            {SecondData?.data.name}
          </Text>
          <Text style={{ textAlign: 'center', opacity: 0.5 }}>
            {SecondData?.data.card_informations.user_job_position}
          </Text>
        </View>
        <View style={[styles.cardPhoto]}>
          {/* <FontAwesome5 name="user-alt" size={24} color="grey" /> */}
          <Image
            style={[styles.ImageQr, { height: '100%', width: '100%' }]}
            source={{ uri: SecondData?.data.card_informations.card_qrcode }}
          />
        </View>
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableOpacity>
          <Foundation
            name="telephone"
            size={18}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="mail"
            size={18}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="linkedin-square"
            size={18}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="facebook-square"
            size={18}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          margin: 5,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="location-sharp" size={18} color="black" />
          <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3 }}>
            {SecondData?.data.user_adresse}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Foundation name="web" size={18} color="black" />
          <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3 }}>
            www.{SecondData?.data.card_informations.entreprise_website}
          </Text>
        </View>
      </View>
    </View>
    <View style={styles.footer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 10, color: 'white', marginTop: 3 }}>
          {SecondData?.data.card_informations.entreprise_name}
        </Text>
        <AntDesign name="chrome" size={24} color="white" />
      </View>
    </View>
  </View>
</View> 
)
  

//END
  return  (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.4 }}>
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
          

      <View style={{flexDirection: 'row',justifyContent:"space-between",marginLeft:10,marginRight:10}}>
        {/* Accueil */}
        {Home == true ? <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#DA7200',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => {
              setHistoriqueS(!HistoriqueS)
              setHome(!Home)}}
                
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="home"
              pack="material"
              size={30}
              color={'#fff'}
            />
          </TouchableOpacity>
          <Text style={{color: '#DA7200', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
            Accueil
          </Text>
        </View> : <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CFCFCF',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => {
              setHistoriqueS(!HistoriqueS)
              setHome(!Home)}}
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="home"
              pack="material"
              size={30}
              color={'#707070'}
            />
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
            Accueil
          </Text>
        </View> }
        


        
        {/* Historique */}
        {HistoriqueS == true ? <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#DA7200',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => {
              setHistoriqueS(!HistoriqueS)
              setHome(!Home)
              var myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
              myHeaders.append('Authorization','Bearer 58|8CiW6XY1GSSvwuyRIxd7maWnMr7L2R5ubnic81yq');
              
              var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
              
              fetch("https://agnesmere-sarl.com/carte_visite/api/card/show_scanned_card/"+id+"", requestOptions)
                .then(response => response.json())
                .then(result => setDataHistorique(result.data))
                .catch(error => console.log('error', error))
                console.log("ok"+DataHistorique);
            }}
                
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="history"
              pack="material"
              size={30}
              color={'#fff'}
            />
          </TouchableOpacity>
          <Text style={{color: '#DA7200', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
          Historique
          </Text>
        </View> : <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CFCFCF',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => {
              setHistoriqueS(!HistoriqueS)
              setHome(!Home)}}
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="history"
              pack="material"
              size={30}
              color={'#707070'}
            />
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
            Historique
          </Text>
        </View> }
        {/* Favoris */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CFCFCF',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('AjoutRecent')}
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="star"
              pack="material"
              size={30}
              color={'#707070'}
            />
          </TouchableOpacity>
          <Text style={{color: '#707070', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
            Favoris
          </Text>
        </View>
        {/* Agenda de rappel  */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CFCFCF',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Agendas')}
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="view-agenda"
              pack="material"
              size={30}
              color={'#707070'}
            />
          </TouchableOpacity>
          <Text style={{color: '#707070', fontSize: 11, marginHorizontal: 5,textAlign:"center"}}>
            Agenda
          </Text>
        </View>
        {/* Toutes les cartes */}
       
      </View>
      <View style={{ flex: 1,backgroundColor:"red" }}>
          {Home && (!SecondData?.data.card_informations.user_job_position) && (
            <View style={{ marginTop: 40 }}>
            <View style={[styles.cardCentral,{backgroundColor:null,borderRadius:null}]}>
              {Accueil}
              </View>
              </View>
          )}
          
          {Home && (SecondData?.data.card_informations.user_job_position != null) && (
            Card
          )}
          {HistoriqueS ==  true ? Historique : <Text></Text>}
          
      </View>
    </View>
      </View>

      
      <BottomBar id={id} Token={Token} Data={SecondData} />
    </SafeAreaView>
  )
}
