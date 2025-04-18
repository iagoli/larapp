import {StyleSheet} from 'react-native';
import { colors } from './colors';

const HomeNavegationstyles = StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 10,
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    drawerInner: {
      alignItems: 'center',
      marginTop: 20,
    },
    plusButton: {
      backgroundColor: '#fddde9',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    plusText: {
      fontSize: 20,
      color: '#333',
    },
    menuItem: {
      alignItems: 'center',
    },
    menuText: {
      fontSize: 12,
      marginTop: 4,
      color: '#333',
      textAlign: 'center',
    },
  });

  export default HomeNavegationstyles;