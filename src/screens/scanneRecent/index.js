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
import {SearchBar} from 'react-native-elements';
import BottomBar from '../BottomBar';
import style from '../Login/style';
import {data} from '../../components/data';
import { useNavigation } from '@react-navigation/native';
import IconVerticale from '../iconVerticale';
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated';
import { CarteForme } from '../../components/carteForme';


export default function ScanneRecent() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const navigation = useNavigation();
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const transitionRef = useRef();
  const transition = <Transition.Change interpolation="easeInOut" />;
  const onPress = () => {
    transitionRef.current.animateNextTransition();
  };
  const renderItem = ({ item }) => {
    return (
        <CarteForme 
        image={item.image}
        nom={item.nom}
        prenom={item.prenom}
        qr={item.qr}
        poste={item.poste}
        phoneIcon={item.phoneIcon}
        emailIcon={item.emailIcon}
        linkedinIcon={item.linkedinIcon}
        facebookIcon={item.facebookIcon}
        localisationEntreprise={item.localisationEntreprise}
        siteWeb={item.siteWeb}
        nomEntreprise={item.nomEntreprise}
        cardIcon={item.cardIcon}
        onPress={onPress}
        />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/iconBar.png')}
          style={styles.headerLogo}
        />
        <View style={{justifyContent: 'center'}}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => navigation.navigate('Profile')}>
            <Icon
              name="account-circle"
              size={30}
              color="#602873"
              pack="material"
            />
          </TouchableHighlight>
        </View>
      </View>
      <ScrollView>
        <View
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
        <View>
          <IconVerticale />
        </View>

        <View>
          <Text style={{ fontSize: 16, margin: 10}}>
          Scanners récents
          </Text>
          <Transitioning.View
            ref={transitionRef}
            transition={transition}
            style={{flex: 1}}>
          <FlatList
            style={{marginBottom: 100}}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          </Transitioning.View>
        </View>
      </ScrollView>

      <BottomBar style={{}} />
    </SafeAreaView>
  );
}

