import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EntrepriseCarte4() {
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#00BD7F',
            width: '90%',
            borderRadius: 10,
            height: 60,
            alignSelf: 'center',
            top: 10,
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              top: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: 'center',
                marginHorizontal: 10,
                color: '#fff',
              }}>
              Agnes-mere communication
            </Text>
            <Icon
              name="credit-card-multiple-outline"
              size={40}
              color="#fff"
              pack="material"
              style={{}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
