import { addDays, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
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
  Entypo
} from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WriteAgenda({ navigation }) {
  const [activeVal, setActiveVal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Image
          style={styles.imagesIcon}
          source={require('../assets/iconBar.png')}
        />
        <View style={styles.rowacces}>
          <FontAwesome name="user-circle" size={24} color="black" />
          <Ionicons
            style={{ marginLeft: 10 }}
            name="md-settings-sharp"
            size={24}
            color="black"
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={[
            styles.row,
            styles.justifyCenter,
            styles.shadow,
            { height: 45, marginTop: 20, alignSelf: 'center' },
          ]}>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput2}
            placeholder="Recherche"
          />

          <Feather name="search" size={18} color="#F07D00" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity style={styles.rond}>
            <Ionicons name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rond}>
            <MaterialIcons name="history" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rond}>
            <FontAwesome name="star" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rond}>
            <MaterialIcons name="access-alarm" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rond}>
            <Ionicons name="logo-bitbucket" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10 }}>
          Agenda de rappel
        </Text>
        <Text
          style={{
            fontSize: 10,
            opacity: 0.4,
            margin: 5,
            textAlign: 'center',
          }}>
          Ajouter un évènement
        </Text>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
            },
          ]}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10 }}>
            Intitulé
          </Text>
          <TextInput
            style={[styles.shadow, { width: '80%' }]}
            placeholder="Ecrivez le nom de l'évènement ici..."
          />
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
            },
          ]}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10 }}>
            <Ionicons name="location-sharp" size={24} color="black" /> Lieu
          </Text>
          <TextInput
            style={[styles.shadow, { width: '80%' }]}
            placeholder="Ecrivez le lieu ici..."
          />
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 10,
            },
          ]}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10 }}>
            <MaterialCommunityIcons name="hours-24" size={24} color="black" />{' '}
            Heure
          </Text>
          <View
            style={[
              styles.shadow,
              {
                width: '75%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}>
              <Text style={{ textAlign: 'center', marginLeft: '10%' }}>
                Debut
              </Text>
              <Text style={{ textAlign: 'center', marginRight: '15%' }}>
                Fin
              </Text>
            </View>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}>
              <TextInput
                style={[styles.shadow, { width: '40%', textAlign: 'center' }]}
                placeholder="08:22"
              />
              <TextInput
                style={[styles.shadow, { width: '40%', textAlign: 'center' }]}
                placeholder="08:12"
              />
            </View>
          </View>

        </View>
        <View style={{flexDirection:"row",width:windowHeight,marginBottom:100}}>
              <View style={[{ width: '25%', textAlign: 'center' ,margin:5}]}>
              <Text style={{textAlign:"center"}}>
                <Ionicons name="notifications-outline" size={30} color="black" /> Rappel
              </Text>
              <TouchableOpacity style={[styles.shadow, { width: '100%', textAlign: 'center' ,justifyContent:"center",alignItems:"center",flexDirection:"row"}]}>
                    <Text style={{textAlign:"center",marginTop:-2}}>
                       Un jour avant
                    </Text>
                    <Entypo name="chevron-thin-right" size={20} color="black" />
              </TouchableOpacity>
              </View>
              <View style={[{ width: '25%', textAlign: 'center',margin:5 }]}>
              <Text style={{textAlign:"center"}}>
                <Ionicons name="reload-circle" size={30} color="black" /> Fréquence
              </Text>
              <TouchableOpacity style={[styles.shadow, { width: '100%', textAlign: 'center' ,justifyContent:"center",alignItems:"center",flexDirection:"row"}]}>
              <Text style={{textAlign:"center",marginTop:-2}}>
                       Chaque mois
                    </Text>
                    <Entypo name="chevron-thin-right" size={20} color="black" />
              </TouchableOpacity>
              </View>
          </View>
          
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfilCreationCart')}
        style={[styles.floatTouch, { height: 65, width: 65 }]}>
            <Feather name="check" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: 20,
    width: windowWidth,
    height: windowHeight,
  },
  floatTouch: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    backgroundColor: '#DA7200',
    height: '7%',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 5,
    zIndex: 5,
  },
  imagesIcon: {
    resizeMode: 'contain',
    height: 130,
    width: 130,
    marginTop: -23,
    position: 'absolute',
    left: 10,
  },
  headerBar: {
    zIndex: 1,
    height: 60,
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  rond: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    alignItems: 'center',
    margin: 5,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 2,
  },
  rowacces: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    marginTop: 23,
  },
  shadow: {
    height: 50,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 10,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
