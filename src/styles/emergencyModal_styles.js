import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
  },
  contact: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e3b7f',
  },
  hint: {
    color: '#777',
    fontSize: 12,
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  saveButton: {
    backgroundColor: '#5e3b7f',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
