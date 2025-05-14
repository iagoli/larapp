import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6edfc',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  cellCheckbox: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  itemText: {
    fontSize: 15,
    color: '#3a2d4d',
  },
});
