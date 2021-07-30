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
} from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { Agenda } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Agendas({ navigation }) {
  const [items, setItems] = useState({});

  useEffect(() => {
    // run once
    const getData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();
      const mappedData = data.map((post, index) => {
        const date = addDays(new Date(), index);
        return {
          ...post,
          date: format(date, 'yyyy-MM-dd'),
        };
      });
      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...coolItem } = currentItem;
        acc[date] = [coolItem];
        return acc;
      }, {});
      setItems(reduced);
    };
    getData();
  }, []);
  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}dd</Text>
        <Text>{item.cookies ? `🍪` : `😋`}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Image
          style={styles.imagesIcon}
          source={require('../../assets/iconBar.png')}
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
        <Agenda items={items} style={{ zIndex: 1 }} renderItem={renderItem} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('WriteAgenda')}
        style={[styles.floatTouch, { height: 65, width: 65 }]}>
        <AntDesign name="plus" size={24} color="white" />
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
  safeScroll: {
    paddingTop: '10%',
    width: windowWidth,
    height: windowHeight,
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
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
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    justifyContent: 'center',
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
