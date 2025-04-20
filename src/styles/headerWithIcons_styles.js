import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLabel: {
    backgroundColor: '#5e3b7f',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 4,
  },
});
