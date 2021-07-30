import * as React from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {data} from '../../components/data';
import BottomBar from '../BottomBar';
import IconVerticale from '../iconVerticale';
import {useNavigation} from '@react-navigation/native';
import {CarteFormeNoSwip} from '../../components/carteFormeNoSwip';

function FeedScreen() {
  const renderItem = ({ item }) => {
    return (
        <CarteFormeNoSwip
        image={item.image}
        nom={item.nom}
        prenom={item.prenom}
        qr={item.qr}
        poste={item.poste}
        localisationEntreprise={item.localisationEntreprise}
        siteWeb={item.siteWeb}
        nomEntreprise={item.nomEntreprise}
        mail={item.mail}
        />
    )
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{marginBottom: 100}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Cartes de visite entreprises</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 12,
          backgroundColor: '#E4E4E4',
          borderRadius: 10,
          color: '#000',
        },
        style: {backgroundColor: '#fff'},
        indicatorStyle: {backgroundColor: '#DA7200'},
      }}>
      <Tab.Screen name="Cartes de visite personnelles" component={FeedScreen} />
      <Tab.Screen
        name="Cartes de visite entreprises"
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
}
export default function TypeCarte() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/iconBar.png')}
          style={styles.headerLogo}
        />
        <View style={{}}>
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
      <MyTabs />
      <BottomBar />
    </SafeAreaView>
  );
}
