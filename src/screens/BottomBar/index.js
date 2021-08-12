import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { useNavigation } from '@react-navigation/native';


export default function BottomBar(props) {
  const navigation = useNavigation();
  //Share//
const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Je suis heureux de t informer que tu peux voir ma carte de visite via ce lien https://google.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
//End
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContentCentered}>
        <TouchableOpacity style={styles.footerFavContainer} onPress={onShare}>
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
