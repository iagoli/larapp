import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#5e3b7f',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#5e3b7f',
    textAlign: 'center',
  },
});

export default styles;