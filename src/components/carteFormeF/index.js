import React, { useEffect, useRef, useState } from 'react';
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
  Linking
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import {useNavigation} from '@react-navigation/native';
import email from 'react-native-email'

export const CarteFormeFav = (props,{
  name_proprietaire,
  adresse_proprietaire,
  entreprise_name,
  photo_proprietaire,
  id_scanneur,
  id_user_card,
  Token

}) => {
  const navigation = useNavigation();
  const _Site = () => {
    Linking.openURL("https://"+props.entreprise_website);
  };
  const RenderButtonDelete = () => {
    
    return (
      <TouchableOpacity
        onPress={() => {
          var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");

            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              redirect: 'follow'
            };

            fetch("https://agnesmere-sarl.com/carte_visite/api/card/leave_card_in_favoris/"+props.id_scanneur+"/"+props.id_user_card+"", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                navigation.navigate('AccueilScanne', {
                  id: props.id_scanneur,
                  Token: props.Token
                })
              })
              .catch(error => console.log('error', error));
        }}
        style={{
          flex: 1,
          backgroundColor: '#E4E4E4',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          
        }}>
        <Icon
          name="delete"
          size={50}
          color="red"
          pack="material"
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    );
  };
  const swipeoutBtns = [
    {
      component: RenderButtonDelete(),
    },
  ];
  return (
    <Swipeout
      autoClose
      right={swipeoutBtns}
      style={{ backgroundColor: '#fff', borderRadius: 20, }}>
      <SafeAreaView style={styles.CarteForme}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            margin: 10,
            width: '78%',
          }}>
          <View>
          {props.photo_proprietaire == null ? (
                <Image
                  source={require('../../assets/id.jpg')}
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 3,
                    borderColor: '#DA7200',
                    borderRadius: 5,
                  }}
                />
              ) : (
                <Image 
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 3,
                    borderColor: '#DA7200',
                    borderRadius: 5,
                  }}
                  source={{
                  uri: props.photo_proprietaire,
                }}
              />
              )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '78%',
            }}>
            <View
              style={{
                margin: 10,
                flexDirection: 'row',
              }}>
              
              <Text
                style={{
                  marginHorizontal: 5,
                  color: '#DA7200',
                  fontWeight: 'bold',
                  fontSize: 18
                }}>
                {props.name_proprietaire} 
              </Text>
            </View>
            <Text>{props.user_job_position} </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: '#DA7200',
              width: '70%',
              alignSelf: 'flex-start',
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
            }}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
              <Icon
                name="map-marker"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{ marginHorizontal: 10 }}>
                {props.adresse_proprietaire}
              </Text>
            </View>
            <TouchableOpacity 
            onPress={() => _Site()}style={{ flexDirection: 'row', margin: 10 }}>
              <Icon
                name="web"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{ marginHorizontal: 10 }}>{props.entreprise_website}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#000',
                borderBottomEndRadius: 10,
              }}>
              <TouchableOpacity style={{ flexDirection: 'row', margin: 10 }}
              
              onPress={() => {
                const to = [`${props.email_proprietaire}`] // string or array of email addresses
                email(to, {
                    // Optional additional arguments
                    //cc: [], // string or array of email addresses
                    //bcc: 'mee@mee.com', // string or array of email addresses
                    subject: '',
                    body: ''
                }).catch(console.error)
              }}
              >
                <Icon
                  name="email"
                  size={20}
                  color="#A2A2A2"
                  pack="material"
                />
                <Text style={{ marginHorizontal: 10, color: '#fff' }}>
                  {props.email_proprietaire}
                </Text>
              </TouchableOpacity>
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
                uri: props.card_qrcode,
              }}
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#DA7200' }}>
            {props.entreprise_name}
          </Text>
        </View>
      </SafeAreaView>
    </Swipeout>
  );
};
