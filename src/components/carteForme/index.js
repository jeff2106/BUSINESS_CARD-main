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
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeout from 'react-native-swipeout';
import {useNavigation} from '@react-navigation/native';

export const CarteForme = (props,{
  name_proprietaire,
  adresse_proprietaire,
  entreprise_name,
  photo_proprietaire,
  id_scanneur,
  id_user_card,
  Token

}) => {
  const navigation = useNavigation();
  const RenderButtonDelete = () => {
    
    return (
      <TouchableOpacity
        onPress={() => {
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer 187|jzylBk4hcSL9fy2Ay5mn880nX4EklIUKUcIQmhUb");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            
            var urlencoded = new URLSearchParams();
            
            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: urlencoded,
              redirect: 'follow'
            };
            
            fetch("https://agnesmere-sarl.com/carte_visite/api/card/delete_scanned_card/"+props.id_scanneur+"/"+props.id_user_card+"", requestOptions)
              .then(response => response.json())
              .then(result => console.log(result))
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
            <View style={{ flexDirection: 'row', margin: 10 }}>
              <Icon
                name="web"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{ marginHorizontal: 10 }}>{props.entreprise_website}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#000',
                borderBottomEndRadius: 10,
              }}>
              <View style={{ flexDirection: 'row', margin: 10 }}>
                <Icon
                  name="email"
                  size={20}
                  color="#A2A2A2"
                  pack="material"
                />
                <Text style={{ marginHorizontal: 10, color: '#fff' }}>
                  {props.email_proprietaire}
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
