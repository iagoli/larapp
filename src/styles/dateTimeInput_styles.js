import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    color: '#3a2d4d',
    borderRadius: 10,
    marginTop: 6,
  },
  webInputWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 6,
  },
  webInput: {
    width: '100%',
    height: 45,
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #ccc',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#3a2d4d',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
  },

  webIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    fontSize: 20,
    color: '#3a2d4d',
  },
});
