import React, {useEffect, useRef, useState} from 'react';
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
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated';


export const CarteFormeNoSwip = ({
  image,
  nom,
  prenom,
  qr,
  poste,
  phoneIcon,
  emailIcon,
  linkedinIcon,
  facebookIcon,
  localisationEntreprise,
  siteWeb,
  nomEntreprise,
  cardIcon,
  mail,
}) => {
  const transitionRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const onItemPress = () => {
    setExpanded(!expanded);
  };
  return (
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
            source={(image)}
            style={styles.idPhotoCarte}
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
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{prenom}</Text>
            <Text
              style={{
                marginHorizontal: 5,
                color: '#DA7200',
                fontWeight: 'bold',
                fontSize: 18
              }}>
              {nom}
            </Text>
          </View>
          <Text>{poste}</Text>
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
          <View style={{flexDirection: 'row', margin: 10}}>
            <Icon name="map-marker" size={20} color="#A2A2A2" pack="material" />
            <Text style={{marginHorizontal: 10}}>{localisationEntreprise}</Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Icon name="web" size={20} color="#A2A2A2" pack="material" />
            <Text style={{marginHorizontal: 10}}>{siteWeb}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#000',
              borderBottomEndRadius: 10,
            }}>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Icon
                name="mail"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{marginHorizontal: 10, color: '#fff'}}>{mail}</Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Image
            source={qr}
            style={{
              width: 70,
              height: 70,
              borderWidth: 3,
              borderColor: '#DA7200',
              borderRadius: 5
            }}
          />
        </View>
      </View>
      <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#DA7200'}}>{nomEntreprise}</Text>
      </View>
    </SafeAreaView>
  );
};
