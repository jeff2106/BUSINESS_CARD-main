import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';


export default function BottomBar(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContentCentered}>
        <TouchableOpacity style={styles.footerFavContainer}>
          <Icon name="share-variant" size={30} color="#A2A2A2" pack="material" />
          <Text style={{fontSize: 10}}>Partager</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContentCentered}>
        <TouchableOpacity
          style={styles.footerVoiceContainer}
          onPress={() => navigation.navigate('ScannerCode', {
            id: props.id,
            Token: props.Token,
            Data: props.SecondData
          })}>
          <Icon name="scan-helper" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.footerContentCentered}>
        <TouchableOpacity
          style={styles.footerCartContainer}
          onPress={() => navigation.navigate('ScanneRecent')}>
          <Icon name="credit-card-multiple-outline" size={30} color="#A2A2A2" />
          <Text style={{fontSize: 10}}>Toutes les cartes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
