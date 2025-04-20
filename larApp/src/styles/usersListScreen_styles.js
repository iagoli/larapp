import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9efff',
    marginBottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  avatar: {
    backgroundColor: '#e0cfff',
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
    color: '#3a2d4d',
  },
});
