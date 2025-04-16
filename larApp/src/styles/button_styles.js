import {StyleSheet} from 'react-native';
import { colors } from './colors';

const ButtonStyles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default ButtonStyles;

  