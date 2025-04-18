import {StyleSheet} from 'react-native';
import { colors } from './colors';

const Inputstyles = StyleSheet.create({
    input: {
      backgroundColor: colors.background,
      fontWeight: '300',
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      marginLeft: 15,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
    },
  });

  export default Inputstyles;