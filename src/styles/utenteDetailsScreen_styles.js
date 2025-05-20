import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  userAvatar: {
    backgroundColor: '#e0cfff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0cfff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  tabActive: {
    backgroundColor: '#5e3b7f',
  },
  tabText: {
    color: '#5e3b7f',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9efff',
    marginBottom: 10,
    borderRadius: 16,
  },
  cardAvatar: {
    backgroundColor: '#e0cfff',
  },
  cardTitle: {
    flexWrap: 'wrap',
    fontSize: 13,
    fontWeight: '500',
    color: '#3a2d4d',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3a2d4d',
    marginBottom: 2,
  },

  userAge: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3a2d4d',
  },
});
