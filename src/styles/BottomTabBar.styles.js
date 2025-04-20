import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    elevation: 5, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#007AFF', // azul padrão do iOS
    fontWeight: '500',
  },
});