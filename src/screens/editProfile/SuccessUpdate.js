import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  LogBox, 
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SuccesUpdate({ route, navigation }) {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const { Data, Token , id} = route.params;
    console.log(Data, Token , id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.goBack()}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="arrow-left" size={30} color="#DA7200" pack="material" />
            <View style={{ justifyContent: 'center' }}>
              <Text onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Profile', {
                  id: id,
                  Token: Token,
                  Data: Data
                })
              }} style={{ color: '#DA7200' }}>Retour</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView>
        <Text>OK</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
