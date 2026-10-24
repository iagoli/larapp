import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#5e3b7f',
    flexShrink: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: '#e0cfff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    borderColor: '#5e3b7f',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9efff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
    gap: 6,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#5e3b7f',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6edfc',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
    gap: 6,
  },
  cellCheckbox: {
    width: 36,
    alignItems: 'center',
  },
  cell: {
    fontSize: 14,
    color: '#3a2d4d',
  },
  vazio: {
    padding: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
