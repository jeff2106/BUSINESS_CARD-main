import React, { useState, useEffect } from "react";
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
  TouchableHighlight,
  Linking,
} from "react-native";
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
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import email from 'react-native-email'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ResultQrcode({ navigation, route }) {
  const { DetailsUserScanner, id, Token, Data, idCartScaner } = route.params;
  const [activeFav, setActiveFav] = useState(false);
  const [activeVal, setActiveVal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function Favoris() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Bearer " + Token + "");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id_style_de_carte", 1);
    urlencoded.append("id_user", id);
    urlencoded.append("id_user_de_card", idCartScaner);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "https://agnesmere-sarl.com/carte_visite/api/card/put_card_in_favoris",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function Delete() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + Token + "");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("id_user_de_card", idCartScaner);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    console.log(id, idCartScaner);

    fetch(
      "https://agnesmere-sarl.com/carte_visite/api/card/leave_card_in_favoris/" +
        id +
        "",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  const openDialScreen = () => {
    let number = "";
    let numero = "0237934963949364";
    if (Platform.OS === "ios") {
      number = `telprompt:${numero}`;
    } else {
      number = `tel:${numero}`;
    }
    Linking.openURL(number);
  };
  const _Site = () => {
    Linking.openURL("https://"+entreprise_website);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headback}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="#F07D00"
        />
        <Text style={{ marginTop: 3, color: "#F07D00", fontWeight: "bold" }}>
          Retour
        </Text>
      </View>
      <View style={styles.headFav}>
        {activeFav ? (
          <FontAwesome
            onPress={() => {
              var myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
              myHeaders.append("Authorization", "Bearer " + Token + "");

              var formdata = new FormData();
              formdata.append("id_user_de_card", idCartScaner);

              var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
              };

              fetch(
                "https://agnesmere-sarl.com/carte_visite/api/card/leave_card_in_favoris/" +
                  id +
                  "/" +
                  idCartScaner +
                  "",
                requestOptions
              )
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
              setActiveFav(!activeFav);
            }}
            name="star"
            size={24}
            color="#F07D00"
          />
        ) : (
          <FontAwesome
            onPress={() => {
              var myHeaders = new Headers();
              myHeaders.append("Accept", "application/json");
              myHeaders.append("Authorization", "Bearer " + Token + "");

              var formdata = new FormData();
              formdata.append("id_style_de_carte", 1);
              formdata.append("id_user", id);
              formdata.append("id_user_de_card", idCartScaner);

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow",
              };

              fetch(
                "https://agnesmere-sarl.com/carte_visite/api/card/put_card_in_favoris",
                requestOptions
              )
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
              setActiveFav(!activeFav);
            }}
            name="star-o"
            size={24}
            color="#F07D00"
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.CarteForme}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            margin: 10,
            width: "78%",
          }}
        >
          <View>
            {DetailsUserScanner.data.user_picture == null ? (
              <Image
                source={require("../../assets/id.jpg")}
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#DA7200",
                  borderRadius: 5,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "#DA7200",
                  borderRadius: 5,
                }}
                source={{
                  uri: DetailsUserScanner.data.user_picture,
                }}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "78%",
            }}
          >
            <View
              style={{
                margin: 10,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 5,
                  color: "#DA7200",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {DetailsUserScanner.data.name}
              </Text>
            </View>

            <Text style={{}}>
              {DetailsUserScanner.data.card_informations.user_job_position}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "#DA7200",
              width: "70%",
              alignSelf: "flex-start",
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Icon
                name="map-marker"
                size={20}
                color="#A2A2A2"
                pack="material"
              />
              <Text style={{ marginHorizontal: 10 }}>
                {DetailsUserScanner.data.user_adresse}
              </Text>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Icon name="web" size={20} color="#A2A2A2" pack="material" />
              <Text style={{ marginHorizontal: 10 }}>
                www.
                {DetailsUserScanner.data.card_informations.entreprise_website}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#000",
                borderBottomEndRadius: 10,
              }}
            >
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Icon name="email" size={20} color="#A2A2A2" pack="material" />
                <Text style={{ marginHorizontal: 10, color: "#fff" }}>
                  {DetailsUserScanner.data.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderWidth: 3,
                borderColor: "#DA7200",
                borderRadius: 5,
              }}
              source={{
                uri: DetailsUserScanner.data.card_informations.card_qrcode,
              }}
            />
          </View>
          {/* <QR code */}
          {/* <Image
             style={[styles.ImageQr, { height: "100%", width: "100%" }]}
             source={{ uri: Data.data.card_informations.card_qrcode }}
           /> */}
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#DA7200" }}>
            {DetailsUserScanner.data.card_informations.entreprise_name}
          </Text>
        </View>
      </TouchableOpacity>

      {activeVal ? (
        <View style={styles.exportStyle}>
          <Text style={{ textAlign: "center" }}>
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
            navigation.navigate("AccueilScanne", {
              id: id,
              Data: Data,
              Token: Token,
            })
          }
          style={[styles.floatTouch, { height: 65, width: 65 }]}
        >
          <Fontisto name="hipchat" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setActiveVal(!activeVal)}
          style={[styles.floatTouch, { height: 65, width: 65 }]}
        >
          <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
      )}
      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
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
              <View
                style={{
                  alignItems: "center",
                  zIndex: 1,
                  top: -50,
                }}
              >
                {DetailsUserScanner.data.user_picture == null ? (
                  <Image
                    source={require("../../assets/id.jpg")}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      zIndex: 1,
                      marginHorizontal: 20,
                    }}
                  />
                ) : (
                  <Image
                    style={{ width: 130, height: 130, borderRadius: 10 }}
                    source={{
                      uri: DetailsUserScanner.data.user_picture,
                    }}
                  />
                )}
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                      textAlign: "center",
                    }}
                  >
                    {DetailsUserScanner.data.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#1B1717",
                      marginBottom: 5,
                      textAlign: "center",
                    }}
                  >
                    {
                      DetailsUserScanner.data.card_informations
                        .user_job_position
                    }
                  </Text>
                  <Text style={{ fontSize: 15, textAlign: "center" }}>
                    {DetailsUserScanner.data.card_informations.entreprise_name}
                  </Text>
                </View>
              </View>
              {/* icon show */}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  top: -20,
                }}
              >
                {/* first show */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    alignContent: "center",
                  }}
                >
                  {/* Accueil */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        const url = `tel://${DetailsUserScanner?.data.phone_number}`;
                        Linking.openURL(url);
                      }}
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="cellphone"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 11,
                        marginHorizontal: 5,
                        textAlign: "center",
                      }}
                    >
                      Appeler
                    </Text>
                    <View></View>
                  </View>
                  {/* Historique */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: "center",
                      }}
                      onPress={() => console.log("ok")}
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="whatsapp"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#707070",
                        fontSize: 11,
                        textAlign: "center",
                      }}
                    >
                      Whatsapp
                    </Text>
                  </View>
                  {/* Favoris */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50, 
                        borderRadius: 50,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        const to = [`${DetailsUserScanner?.data.email}`] // string or array of email addresses
                        email(to, {
                            // Optional additional arguments
                            //cc: [], // string or array of email addresses
                            //bcc: 'mee@mee.com', // string or array of email addresses
                            subject: '',
                            body: ''
                        }).catch(console.error)
                      }}
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="email"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#707070",
                        fontSize: 11,
                        marginHorizontal: 5,
                        textAlign: "center",
                      }}
                    >
                      Email
                    </Text>
                  </View>
                </View>
                {/* end first  */}

                {/* second show */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "98%",
                    alignContent: "center",
                  }}
                >
                  {/* Accueil */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                      onPress={() => console.log("ok")}
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="bio"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 11,
                        marginHorizontal: 5,
                        textAlign: "center",
                      }}
                    >
                      Ma biographie
                    </Text>
                  </View>
                  {/* Historique */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                      onPress={() => _Site()}
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="file-document"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#707070",
                        fontSize: 11,
                        textAlign: "center",
                      }}
                    >
                      Mes documents
                    </Text>
                  </View>
                  {/* Favoris */}
                  <View style={{ margin: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#DA7200",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("Portfolio", {
                          id: id,
                          Token: Token,
                        })
                      }
                    >
                      <Icon
                        style={{ alignSelf: "center" }}
                        name="folder-open"
                        pack="material"
                        size={30}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#707070",
                        fontSize: 11,
                        marginHorizontal: 5,
                        textAlign: "center",
                      }}
                    >
                      Mon portfolio
                    </Text>
                  </View>
                </View>
                {/* end first  */}
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    style={{ alignSelf: "center" }}
                    name="map-marker"
                    pack="material"
                    size={30}
                    color={"#000"}
                  />
                  <Text
                    style={{
                      color: "#707070",
                      fontSize: 11,
                      marginHorizontal: 5,
                      textAlign: "center",
                      top: 5,
                    }}
                  >
                    Cocody,II plateaux Vallons
                  </Text>
                </View>
              </View>
              {/* <View>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Ecrivez une note ici..."
                />
              </View>
              <TouchableOpacity style={styles.SousCard}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: "rgba(207, 207, 207, 0.8)",
                    width: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Foundation name="telephone" size={35} color="black" />
                </View>
                <View>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>Mobile</Text>
                  <Text style={{ marginLeft: 5, marginTop: 5 }}>
                    +225 {DetailsUserScanner.data.phone_number}
                  </Text>
                </View>
              </TouchableOpacity> */}
              <Text style={{ fontSize: 16, marginTop: 10 }}>Document</Text>

              {DetailsUserScanner.data.document == null ? (
                <Text style={{ textAlign: "center" }}>Aucun document</Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}
                  >
                    <FontAwesome name="file-pdf-o" size={24} color="#FF0014" />
                    <Text style={{ fontSize: 5 }}>
                      {"\n"}telecharger Document{"\n"}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}
                  >
                    <MaterialCommunityIcons
                      name="file-word"
                      size={24}
                      color="#0C41A8"
                    />
                    <Text style={{ fontSize: 5 }}>
                      {"\n"}telecharger Document{"\n"}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}
                  >
                    <FontAwesome name="file-pdf-o" size={24} color="#FF0014" />
                    <Text style={{ fontSize: 5 }}>
                      {"\n"}telecharger Document{"\n"}
                    </Text>
                    <MaterialIcons
                      name="file-download"
                      size={15}
                      color="#DA7200"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rond, { borderRadius: 10, height: 80 }]}
                  >
                    <MaterialCommunityIcons
                      name="file-word"
                      size={24}
                      color="#0C41A8"
                    />
                    <Text style={{ fontSize: 5 }}>
                      {"\n"}telecharger Document{"\n"}
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
              navigation.navigate("AccueilScanne", {
                id: id,
                Token: Token,
              })
            }
            style={[styles.floatTouch, { height: 65, width: 65 }]}
          >
            <Fontisto name="hipchat" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setActiveVal(!activeVal)}
            style={[styles.floatTouch, { height: 65, width: 65 }]}
          >
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
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight,
    marginTop: "5%",
  },
  headback: {
    position: "absolute",
    top: "5%",
    left: "5%",
    flexDirection: "row",
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
    backgroundColor: "#DA7200",
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "center",
    paddingRight: 15,
  },
  cardCentral: {
    height: windowHeight / 3.5,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "blue",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headers: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    paddingRight: 15,
    justifyContent: "flex-end",
    flex: 1,
  },
  cardPhoto: {
    height: windowHeight / 10,
    backgroundColor: "rgba(207, 207, 207, 0.2)",
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 10,
  },
  ImageQr: {
    resizeMode: "contain",
    height: "80%",
  },
  floatTouch: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    backgroundColor: "#DA7200",
    height: "10%",
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    shadowColor: "#000",
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
    backgroundColor: "white",
    height: windowHeight,
  },
  bodyModal: {
    flex: 1,
    justifyContent: "center",
  },
  cardPro1: {
    flexDirection: "row",
  },
  profilCard: {
    height: 100,
    width: "40%",
    marginLeft: 0,
    marginRight: 5,
    alignItems: "center",
    backgroundColor: "rgba(207, 207, 207, 0.2)",
    justifyContent: "center",
    borderRadius: 10,
  },
  rond: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 2,
  },
  TextInput: {
    shadowColor: "#000",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 2,
    backgroundColor: "rgba(207, 207, 207, 0.2)",
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  exportStyle: {
    height: 50,
    marginTop: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  CarteForme: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "91%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    zIndex: 1,
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
  },
});
