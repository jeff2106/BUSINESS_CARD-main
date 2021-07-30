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
});
