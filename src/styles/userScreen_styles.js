import { StyleSheet } from 'react-native';
import { colors } from './colors';

const userScreenStyles = StyleSheet.create({
  container: {
    flexGrow: 1, // importante para ScrollView com contentContainerStyle
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center', // centraliza horizontalmente
    paddingHorizontal: 25,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // evita que fique muito largo em telas grandes
  },
});

export default userScreenStyles;