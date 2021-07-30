import {StyleSheet} from 'react-native';

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
    width: 60,
    height: 60,
  },
  idPhotoCarte: {
    width: 60,
    height: 60,
    borderRadius: 40
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
  }
});
