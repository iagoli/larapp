import { StyleSheet } from 'react-native';

const UserItem_styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // para alinhar melhor o texto e o checkbox
    backgroundColor: '#f9efff',
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  avatar: {
    backgroundColor: '#d9b3ff',
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#3a2d4d',
  },
  checkbox: {
    marginLeft: 8,
  },
});

export default UserItem_styles;