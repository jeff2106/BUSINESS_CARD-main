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
  StatusBar,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar} from 'react-native-elements';
import BottomBar from '../BottomBar';
import style from '../Login/style';
import {data} from '../../components/dataMacarte';
import {useNavigation} from '@react-navigation/native';
import IconVerticale from '../iconVerticale';
import {CarteForme} from '../../components/carteForme';

export default function MaCarte() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  const navigation = useNavigation();
  const renderItem = ({item}) => {
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
        mail={item.mail}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar animated={true} backgroundColor="#DA7200" />
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
            adjustResize
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
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
            Ma carte
          </Text>
          <FlatList
            style={{marginBottom: 100}}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          {/* social icon */}
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            {/* linkedin */}
            <View style={{margin: 10}}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{alignSelf: 'center'}}
                  name="linkedin"
                  pack="material"
                  size={30}
                  color={'#007BB5'}
                />
              </TouchableOpacity>
            </View>
            {/* facebook */}
            <View style={{margin: 10}}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{alignSelf: 'center'}}
                  name="facebook"
                  pack="material"
                  size={30}
                  color={'#3B5998'}
                />
              </TouchableOpacity>
            </View>
            {/* instagram */}
            <View style={{margin: 10}}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{alignSelf: 'center'}}
                  name="instagram"
                  pack="material"
                  size={30}
                  color={'#C32AA3'}
                />
              </TouchableOpacity>
            </View>
            {/* twitter */}
            <View style={{margin: 10}}>
              <TouchableOpacity style={styles.socialIcon}>
                <Icon
                  style={{alignSelf: 'center'}}
                  name="twitter"
                  pack="material"
                  size={30}
                  color={'#1DA1F2'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* contact */}
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '20%',
              backgroundColor: '#CFCFCF',
              borderRadius: 5,
              justifyContent: 'center',
              height: 60,
            }}>
            <Icon
              name="phone-outline"
              size={25}
              color="#20201E"
              pack="material"
              style={{alignItems: 'center', alignSelf: 'center'}}
            />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#F6F6F6',
              borderTopEndRadius: 5,
              borderBottomEndRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={{marginHorizontal: 20}}>Mobile</Text>
            <Text style={{marginHorizontal: 20}}>+225 010 203 040 5</Text>
          </View>
        </View>
        {/* Email */}
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '20%',
              backgroundColor: '#CFCFCF',
              borderRadius: 5,
              justifyContent: 'center',
              height: 60,
            }}>
            <Icon
              name="email"
              size={25}
              color="#20201E"
              pack="material"
              style={{alignItems: 'center', alignSelf: 'center'}}
            />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#F6F6F6',
              borderTopEndRadius: 5,
              borderBottomEndRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={{marginHorizontal: 20}}>Email</Text>
            <Text style={{marginHorizontal: 20}}>entreprise@gmailcom</Text>
          </View>
        </View>
        {/* Adresse */}
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '20%',
              backgroundColor: '#CFCFCF',
              borderRadius: 5,
              justifyContent: 'center',
              height: 60,
            }}>
            <Icon
              name="phone-outline"
              size={25}
              color="#20201E"
              pack="material"
              style={{alignItems: 'center', alignSelf: 'center'}}
            />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#F6F6F6',
              borderTopEndRadius: 5,
              borderBottomEndRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={{marginHorizontal: 20}}>Adresse</Text>
            <Text style={{marginHorizontal: 20}}>+225 010 203 040 5</Text>
          </View>
        </View>
        {/* Site web */}
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            marginBottom: 110,
          }}>
          <View
            style={{
              width: '20%',
              backgroundColor: '#CFCFCF',
              borderRadius: 5,
              justifyContent: 'center',
              height: 60,
            }}>
            <Icon
              name="wan"
              size={25}
              color="#20201E"
              pack="material"
              style={{alignItems: 'center', alignSelf: 'center'}}
            />
          </View>
          <View
            style={{
              width: '75%',
              backgroundColor: '#F6F6F6',
              borderTopEndRadius: 5,
              borderBottomEndRadius: 5,
              justifyContent: 'center',
            }}>
            <Text style={{marginHorizontal: 20}}>Site web</Text>
            <Text style={{marginHorizontal: 20}}>www.siteweb.com</Text>
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}
