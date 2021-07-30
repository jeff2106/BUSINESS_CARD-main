import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomBar from '../BottomBar';
import IconVerticale from '../iconVerticale';

export default function AccueilScanne({route,navigation}) {
  
  const { id,Token} = route.params;
    const [SecondData, setSecondData] = React.useState();

  React.useEffect(() => {
    // Update the document title using the browser API
  
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+Token+"");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://agnesmere-sarl.com/carte_visite/api/user/"+id+"", requestOptions)
    .then(response => response.json())
    .then(result => setSecondData(result))
    .catch(error => console.log('error', error));
  
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
        <StatusBar animated={true} backgroundColor="#DA7200" />
            <Image
              source={require('../../assets/iconBar.png')}
              style={styles.headerLogo}
            />

          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Profile', {
                  id: id,
                  Token: Token,
                  Data: SecondData
                })
              }}>
                
              <Icon
                name="account-circle"
                size={30}
                color="#602873"
                pack="material"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <IconVerticale id={id} Token={Token} Data={SecondData} />
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center'}}>
            Vous n'avez pas de carte de visite 
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Icon
            style={{alignSelf: 'center'}}
            name="plus"
            pack="material"
            size={50}
            color={'#CACACA'}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', color: '#CACACA'}}>
            Touchez ici pour créer une carte de visite
          </Text>
        </View>
      </View>
      <BottomBar id={id} Token={Token} Data={SecondData} />
    </SafeAreaView>
  );
}
