import { StyleSheet } from 'react-native';
import { colors } from './colors';

const ButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ButtonStyles;
