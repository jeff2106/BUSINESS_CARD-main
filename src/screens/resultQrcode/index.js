import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  Dimensions,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ResultQrcode({ navigation, route }) {
  const { DetailsUserScanner, id, Token, Data, idCartScaner } = route.params;
  const [activeFav, setActiveFav] = useState(false);
  const [activeVal, setActiveVal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  

  function Favoris() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', 'Bearer ' + Token + '');

    var urlencoded = new URLSearchParams();
    urlencoded.append('id_style_de_carte', 1);
    urlencoded.append('id_user', id);
    urlencoded.append("id_user_de_card", idCartScaner);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    fetch(
      'https://agnesmere-sarl.com/carte_visite/api/card/put_card_in_favoris',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  
  function Delete() {
      var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", 'Bearer ' + Token + '');
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id_user_de_card", idCartScaner);

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        console.log(id,idCartScaner);

        fetch("https://agnesmere-sarl.com/carte_visite/api/card/leave_card_in_favoris/"+id+"", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

  return (
    <View style={styles.container}>
      <View style={styles.headback}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#F07D00"
        />
        <Text style={{ marginTop: 3, color: '#F07D00', fontWeight: 'bold' }}>
          Retour
        </Text>
      </View>
      <View style={styles.headFav}>
        {activeFav ? (
          <FontAwesome
            onPress={() => {
                var myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append('Authorization', 'Bearer ' + Token + '');
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                
                var urlencoded = new URLSearchParams();
                urlencoded.append("id_user_de_card",idCartScaner);
                
                var requestOptions = {
                  method: 'DELETE',
                  headers: myHeaders,
                  body: urlencoded,
                  redirect: 'follow'
                };
                
                fetch("https://agnesmere-sarl.com/carte_visite/api/card/leave_card_in_favoris/"+id+"/"+idCartScaner+"", requestOptions)
                  .then(response => response.json())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));setActiveFav(!activeFav)

              }}
            name="star"
            size={24}
            color="#F07D00"
          />
        ) : (
          <FontAwesome
            onPress={() => {
              
              var myHeaders = new Headers();
              myHeaders.append('Accept', 'application/json');
              myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
              myHeaders.append('Authorization', 'Bearer ' + Token + '');
          
              var urlencoded = new URLSearchParams();
              urlencoded.append('id_style_de_carte', 1);
              urlencoded.append('id_user', id);
              urlencoded.append("id_user_de_card", idCartScaner);
          
              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow',
              };
          
              fetch(
                'https://agnesmere-sarl.com/carte_visite/api/card/put_card_in_favoris',
                requestOptions
              )
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
                setActiveFav(!activeFav)

              }}
            name="star-o"
            size={24}
            color="#F07D00"
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardCentral}>
        <View style={styles.headers}>
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={styles.cardPhoto}>
              {DetailsUserScanner.data.user_picture == null ? (
                <Image
                  source={require('../../assets/id.jpg')}
                  style={{
                    width: 90,
                    marginLeft: 8,
                    height: 90,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  style={{
                    width: 90,
                    marginLeft: 8,
                    height: 90,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: DetailsUserScanner.data.user_picture,
                  }}
                />
              )}
            </View>
            <View style={{ marginRight: -20,width:140 }}>
              <Text style={{ fontWeight: 'bold' }}>
                {DetailsUserScanner.data.name}
              </Text>
              <Text style={{ opacity: 0.5 }}>
                {DetailsUserScanner.data.card_informations.user_job_position}
              </Text>
            </View>
            <View style={[styles.cardPhoto]}>
              {/* <FontAwesome5 name="user-alt" size={24} color="grey" /> */}
              <Image
                style={[styles.ImageQr, { height: '102%', width: '102%' }]}
                source={{
                  uri: DetailsUserScanner.data.card_informations.card_qrcode,
                }}
              />
            </View>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Foundation
              name="telephone"
              size={18}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <Ionicons
              name="mail"
              size={18}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <AntDesign
              name="linkedin-square"
              size={18}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <AntDesign
              name="facebook-square"
              size={18}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              margin: 5,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="location-sharp" size={18} color="black" />
              <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3 }}>
                {DetailsUserScanner.data.user_adresse}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Foundation name="web" size={18} color="black" />
              <Text style={{ fontSize: 12, marginLeft: 5, marginTop: 3 }}>
                {DetailsUserScanner.data.card_informations.entreprise_website}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, color: 'white', marginTop: 5 }}>
              {DetailsUserScanner.data.card_informations.entreprise_name}
            </Text>
            <AntDesign name="chrome" size={24} color="white" />
          </View>
        </View>
      </TouchableOpacity>

      {activeVal ? (
        <View style={styles.exportStyle}>
          <Text style={{ textAlign: 'center' }}>
            <FontAwesome5 name="file-export" size={24} color="black" /> exporter
            la carte
          </Text>
        </View>
      ) : (
        <Text></Text>
      )}

      {activeVal ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AccueilScanne', {
              id: id,
              Data: Data,
              Token: Token,
            })
          }
          style={[styles.floatTouch, { height: 65, width: 65 }]}>
          <Fontisto name="hipchat" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setActiveVal(!activeVal)}
          style={[styles.floatTouch, { height: 65, width: 65 }]}>
          <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
      )}
      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.headback}>
            <Ionicons
              onPress={() => setModalVisible(!modalVisible)}
              name="arrow-back"
              size={24}
              color="#F07D00"
            />
            <Text
              style={{ marginTop: 3, color: '#F07D00', fontWeight: 'bold' }}>
              Retour
            </Text>
          </TouchableOpacity>
          <View style={styles.headFav}>
            {activeFav ? (
              <FontAwesome
                onPress={() => setActiveFav(!activeFav)}
                name="star"
                size={24}
                color="#F07D00"
              />
            ) : (
              <FontAwesome
                onPress={() => setActiveFav(!activeFav)}
                name="star-o"
                size={24}
                color="#F07D00"
              />
            )}
          </View>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.headback}>
              <Ionicons
                onPress={() => setModalVisible(!modalVisible)}
                name="arrow-back"
                size={24}
                color="#F07D00"
              />
              <Text
                style={{ marginTop: 3, color: '#F07D00', fontWeight: 'bold' }}>
                Retour
              </Text>
            </TouchableOpacity>
            <View style={styles.headFav}>
              {activeFav ? (
                <FontAwesome
                  onPress={() => setActiveFav(!activeFav)}
                  name="star"
                  size={24}
                  color="#F07D00"
                />
              ) : (
                <FontAwesome
                  onPress={() => setActiveFav(!activeFav)}
                  name="star-o"
                  size={24}
                  color="#F07D00"
                />
              )}
            </View>
            <View style={styles.bodyModal}>
              <View style={styles.cardPro1}>
                <View style={styles.profilCard}>
                  {DetailsUserScanner.data.user_picture == null ? (
                    <Image
                      source={require('../../assets/id.jpg')}
                      style={{ width: 130, height: 130, borderRadius: 10 }}
                    />
                  ) : (
                    <Image
                      style={{ width: 130, height: 130, borderRadius: 10 }}
                      source={{
                        uri: DetailsUserScanner.data.user_picture,
                      }}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      letterSpacing: 2,
                      width: '65%',
                    }}>
                    {DetailsUserScanner.data.name}
                  </Text>

                  <Text style={{ opacity: 0.5 }}>
                    {
                      DetailsUserScanner.data.card_informations
                        .user_job_position
                    }
                    {'\n'}
                  </Text>
                  <Text style={{ opacity: 0.5, width: '65%' }}>
                    {DetailsUserScanner.data.user_biographie}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={styles.rond}>
                  <AntDesign name="linkedin-square" size={24} color="#007BB5" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rond}>
                  <FontAwesome
                    name="facebook-square"
                    size={24}
                    color="#3B5998"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rond}>
                  <AntDesign name="instagram" size={24} color="#C32AA3" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.rond}>
                  <FontAwesome
                    name="twitter-square"
                    size={24}
                    color="#1DA1F2"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Ecrivez une note ici..."
                />
              </View>
              <TouchableOpacity style={styles.SousCard}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: 'rgba(207, 207, 207, 0.8)',
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Foundation name="telephone" size={35} color="black" />
                </View>
                <View>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>Mobile</Text>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>
                    +225 {DetailsUserScanner.data.phone_number}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.SousCard}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: 'rgba(207, 207, 207, 0.8)',
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="mail" size={30} color="black" />
                </View>
                <View>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>Email</Text>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>
                    {DetailsUserScanner.data.email}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.SousCard}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: 'rgba(207, 207, 207, 0.8)',
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="location-sharp" size={30} color="black" />
                </View>
                <View>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>Adresse</Text>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>
                    {DetailsUserScanner.data.user_adresse}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.SousCard}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: 'rgba(207, 207, 207, 0.8)',
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Foundation name="web" size={30} color="black" />
                </View>
                <View>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>Site web</Text>
                  <Text style={{ marginLeft: 5 }}>
                    {
                      DetailsUserScanner.data.card_informations
                        .entreprise_website
                    }
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginTop: 10 }}>Document</Text>

              {DetailsUserScanner.data.document == null ? (
                <Text style={{ textAlign: 'center' }}>Aucun document</Text>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}>
                    <FontAwesome name="file-pdf-o" size={24} color="#FF0014" />
                    <Text style={{ fontSize: 5 }}>
                      {'\n'}telecharger Document{'\n'}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}>
                    <MaterialCommunityIcons
                      name="file-word"
                      size={24}
                      color="#0C41A8"
                    />
                    <Text style={{ fontSize: 5 }}>
                      {'\n'}telecharger Document{'\n'}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}>
                    <FontAwesome name="file-pdf-o" size={24} color="#FF0014" />
                    <Text style={{ fontSize: 5 }}>
                      {'\n'}telecharger Document{'\n'}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}>
                    <MaterialCommunityIcons
                      name="file-word"
                      size={24}
                      color="#0C41A8"
                    />
                    <Text style={{ fontSize: 5 }}>
                      {'\n'}telecharger Document{'\n'}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        {activeVal ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AccueilScanne', {
                id: id,
                Token: Token,
              })
            }
            style={[styles.floatTouch, { height: 65, width: 65 }]}>
            <Fontisto name="hipchat" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setActiveVal(!activeVal)}
            style={[styles.floatTouch, { height: 65, width: 65 }]}>
            <Feather name="check" size={24} color="white" />
          </TouchableOpacity>
        )}
      </Modal>
      {/* END */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    marginTop: '5%',
  },
  headback: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    flexDirection: 'row',
  },
  headFav: {
    position: 'absolute',
    top: '3%',
    right: '3%',
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    height: '8%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  footer: {
    backgroundColor: '#DA7200',
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    paddingRight: 15,
  },
  cardCentral: {
    height: windowHeight / 3.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headers: {
    backgroundColor: 'white',
    width: '100%',
    height: '70%',
    paddingRight: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardPhoto: {
    height: windowHeight / 10,
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  ImageQr: {
    resizeMode: 'contain',
    height: '80%',
  },
  floatTouch: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    backgroundColor: '#DA7200',
    height: '10%',
    width: '18%',
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
  },
  modalView: {
    padding: 20,
    backgroundColor: 'white',
    height: windowHeight,
  },
  bodyModal: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '25%',
    marginBottom: '5%',
  },
  cardPro1: {
    flexDirection: 'row',
  },
  profilCard: {
    height: 100,
    width: '40%',
    marginLeft: 0,
    marginRight: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    justifyContent: 'center',
    borderRadius: 10,
  },
  rond: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
  TextInput: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 2,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
  },
  SousCard: {
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 2,
    backgroundColor: 'rgba(207, 207, 207, 0.2)',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  exportStyle: {
    height: 50,
    marginTop: 20,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
});
