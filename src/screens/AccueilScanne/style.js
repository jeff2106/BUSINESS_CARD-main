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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  // Footer
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  headerLogo: {
    width: 120,
    height: 60,
    resizeMode: 'contain'
  },
  footerContentCentered: 
  {
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'red',
      width: 60,
      height: 60,
      borderRadius: 50
  },

  footerFavContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  CarteForme: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '91%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
  CarteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    width: '90%'

  },
  socialIcon: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 5
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  footerContentCentered: 
  {
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: 'red',
      width: 60,
      height: 60,
      borderRadius: 50
  },

  footerFavContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  CarteForme: {
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '91%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
    zIndex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
  CarteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    width: '90%'

  },
  socialIcon: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 5
  },
  container1: {
    width: windowWidth,
    height: windowHeight,
    justifyContent:'center'
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
    height: windowHeight / 3,
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
  }

});
