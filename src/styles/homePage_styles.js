import { StyleSheet } from 'react-native';
import { colors } from './colors';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 25,
    paddingTop: 60,
  },
  search: {
    backgroundColor: colors.search,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    width: '100%',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 38,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  sub: {
    fontSize: 24,
    color: '#f3e5ff',
    marginTop: 0,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#57287752',
    borderRadius: 20,
    padding: 20,
    marginTop: 100,
    width: '70%',
    alignSelf: 'center',
    gap: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4a0072',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: {
    fontSize: 16,
    padding: 8,
  },
  fabContainer: {
    position: 'absolute',
    left: 20,
    bottom: 80,
    alignItems: 'center',
    gap: 12,
  },
  fab: {
    backgroundColor: '#522074',
    borderRadius: 30,
    padding: 16,
  },
  sos: {
    backgroundColor: '#522074',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sosText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default HomeStyles;
