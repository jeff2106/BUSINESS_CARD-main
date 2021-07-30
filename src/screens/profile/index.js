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
  Linking,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Ionicons,
  AntDesign,
  Foundation
} from '@expo/vector-icons';

export default function Profile({ route, navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const { Data, Token, id } = route.params;

  //console.log( Data, Token, id);
  
  const [show, setshow] = React.useState(true);


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

  const Body = (
    <View>
      {/* coordonnée */}
      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{ flex: 1 }}>
          {Data.data.user_picture == null ? (
            <Image
              source={require('../../assets/id.jpg')}
              style={{ width: 150, height: 150, borderRadius: 10 }}
            />
          ) : (
            <Image
              style={styles.tinyLogo}
              style={{ width: 150, height: 150, borderRadius: 10 }}
              source={{
                uri: Data.data.user_picture,
              }}

            />
          )}
          
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {Data.data.name == null ? (
              <Text>Vous n'avez pas definit</Text>
            ) : (
              <Text> {Data.data.name} </Text>
            )}
          </Text>
          <Text style={{ fontSize: 15, color: '#1B1717', marginBottom: 5 }}>
            {Data.data.card_informations.user_job_position == null ? (
              <Text>Vous n'avez pas definit</Text>
            ) : (
              <Text> {Data.data.card_informations.user_job_position} </Text>
            )}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {Data.data.user_biographie == null ? (
              <Text>Vous n'avez pas definit</Text>
            ) : (
              <Text>{Data.data.user_biographie} </Text>
            )}
          </Text>
        </View>
      </View>

      {/* social icon */}
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <View style={{ margin: 10 }}>
          {Data.data.card_informations.reseau.linkedin_acound != null ? (
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => _Linkedin()}>
              <Icon
                style={{ alignSelf: 'center' }}
                name="linkedin"
                pack="material"
                size={30}
                color={'#007BB5'}
              />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={{ margin: 10 }}>
          {Data.data.card_informations.reseau.facebook_account != null ? (
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => _Facebook()}>
              <Icon
                style={{ alignSelf: 'center' }}
                name="facebook"
                pack="material"
                size={30}
                color={'#3B5998'}
              />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={{ margin: 10 }}>
          {Data.data.card_informations.reseau.instagram_account != null ? (
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => _InstaGram()}>
              <Icon
                style={{ alignSelf: 'center' }}
                name="instagram"
                pack="material"
                size={30}
                color={'#C32AA3'}
              />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={{ margin: 10 }}>
          {Data.data.card_informations.reseau.tweeter_acound != null ? (
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => _Twitter()}>
              <Icon
                style={{ alignSelf: 'center' }}
                name="twitter"
                pack="material"
                size={30}
                color={'#1DA1F2'}
              />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>

      {/* contact */}
      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '20%',
            backgroundColor: '#CFCFCF',
            borderRadius: 5,
            justifyContent: 'center',
            height: 60,
          }}>
          <Icon
            name="phone-outline"
            size={25}
            color="#20201E"
            pack="material"
            style={{ alignItems: 'center', alignSelf: 'center' }}
          />
        </View>
        <View
          style={{
            width: '75%',
            backgroundColor: '#F6F6F6',
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{ marginHorizontal: 20 }}>Mobile</Text>
          <Text style={{ marginHorizontal: 20, letterSpacing: 2 }}>
            225 {Data.data.phone_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '20%',
            backgroundColor: '#CFCFCF',
            borderRadius: 5,
            justifyContent: 'center',
            height: 60,
          }}>
          <Icon
            name="email"
            size={25}
            color="#20201E"
            pack="material"
            style={{ alignItems: 'center', alignSelf: 'center' }}
          />
        </View>
        <View
          style={{
            width: '75%',
            backgroundColor: '#F6F6F6',
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{ marginHorizontal: 20 }}>Email</Text>
          <Text style={{ marginHorizontal: 20 }}>{Data.data.email}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '20%',
            backgroundColor: '#CFCFCF',
            borderRadius: 5,
            justifyContent: 'center',
            height: 60,
          }}>
          <Icon
            name="phone-outline"
            size={25}
            color="#20201E"
            pack="material"
            style={{ alignItems: 'center', alignSelf: 'center' }}
          />
        </View>
        <View
          style={{
            width: '75%',
            backgroundColor: '#F6F6F6',
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{ marginHorizontal: 20 }}>Adresse</Text>
          <Text style={{ marginHorizontal: 20 }}>
            {Data.data.user_adresse == null ? (
              <Text>Vous n'avez pas definit</Text>
            ) : (
              <Text>{Data.data.user_adresse} </Text>
            )}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
          marginBottom: 110,
        }}>
        <View
          style={{
            width: '20%',
            backgroundColor: '#CFCFCF',
            borderRadius: 5,
            justifyContent: 'center',
            height: 60,
          }}>
          <Icon
            name="wan"
            size={25}
            color="#20201E"
            pack="material"
            style={{ alignItems: 'center', alignSelf: 'center' }}
          />
        </View>
        <View
          style={{
            width: '75%',
            backgroundColor: '#F6F6F6',
            borderTopEndRadius: 5,
            borderBottomEndRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={{ marginHorizontal: 20 }}>Site web</Text>
          <Text style={{ marginHorizontal: 20 }}>
            {Data.data.card_informations.entreprise_website == null ? (
              <Text>Vous n'avez pas definit</Text>
            ) : (
              <Text>{Data.data.card_informations.entreprise_website} </Text>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
  const Card = (
    <View style={{marginTop:20}}>
      <View
        
        style={styles.cardCentral}>
        <View style={styles.headers}>
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={styles.cardPhoto}>
            {Data.data.user_picture == null ? (
            <Image
              source={require('../../assets/id.jpg')}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
          ) : (
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={{
                uri: Data.data.user_picture,
              }}
            />
          )}
            </View>
            <View style={{ marginRight: -20 }}>
              <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>
              {Data.data.name} 
              </Text>
              <Text style={{ textAlign: 'center', opacity: 0.5 }}>
              {Data.data.card_informations.user_job_position} 
              </Text>
            </View>
            <View style={[styles.cardPhoto]}>
              {/* <FontAwesome5 name="user-alt" size={24} color="grey" /> */}
              <Image
                style={[styles.ImageQr,{height:"100%",width:"100%"}]}
                source={{uri: Data.data.card_informations.card_qrcode}}
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
              <Text style={{ fontSize: 12, marginLeft: 5,marginTop:3 }}>
              {Data.data.user_adresse} 
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Foundation name="web" size={18} color="black" />
              <Text style={{ fontSize: 12, marginLeft: 5,marginTop:3 }}>
                www.{Data.data.card_informations.entreprise_website} 
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, color: 'white',marginTop:3 }}>
            {Data.data.card_informations.entreprise_name}
            </Text>
            <AntDesign name="chrome" size={24} color="white" />
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
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
        {/* icon show start */}
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          {show == true ? <TouchableHighlight
            underlayColor="transparent"
            onPress={() => setshow(!show)}>
            <View
              style={{
                backgroundColor: '#FAE7D3',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <Icon name="eye" size={30} color="#DA7200" pack="material" />
            </View>
          </TouchableHighlight> : <TouchableHighlight
            underlayColor="transparent"
            onPress={() => setshow(!show)}>
            <View
              style={{
                backgroundColor: '#FAE7D3',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <Icon name="eye-off" size={30} color="#DA7200" pack="material" />
            </View>
          </TouchableHighlight>
          }
          
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('EditProfile', {
                Data: Data,
                Token: Token,
                id: id
              });
            }}>
            <View
              style={{
                backgroundColor: '#FAE7D3',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              }}>
              <Icon name="pencil" size={30} color="#DA7200" pack="material" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => console.log('valide')}>
            <View
              style={{
                backgroundColor: '#FAE7D3',
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="share-variant"
                size={30}
                color="#DA7200"
                pack="material"
              />
            </View>
          </TouchableHighlight>
        </View>
        {/* icon show end */}

      </View>
      {show == true ? Body : Card}
    </SafeAreaView>
  );
}
