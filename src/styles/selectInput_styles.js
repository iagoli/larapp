import { StyleSheet } from 'react-native';

const selectInputstyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    marginLeft: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#B3B3B3',
  },
});

export default selectInputstyles;
