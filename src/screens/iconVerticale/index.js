import React, {useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function IconVerticale(props) {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{}}>
      <View style={{flexDirection: 'row',justifyContent:"space-between",marginLeft:10,marginRight:10}}>
        {/* Accueil */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#DA7200',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('MaCarte')}
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
        </View>
        {/* Historique */}
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CFCFCF',
              width: 50,
              height: 50,
              borderRadius: 50,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('ScanneRecent')}
            >
            <Icon
              style={{alignSelf: 'center'}}
              name="history"
              pack="material"
              size={30}
              color={'#707070'}
            />
          </TouchableOpacity>
          <Text style={{color: '#707070', fontSize: 11,textAlign:"center"}}>Historique</Text>
        </View>
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
    </SafeAreaView>
  );
}
