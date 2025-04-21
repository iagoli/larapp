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
    marginBottom: 16,
    color: '#5e3b7f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#e0cfff',
  },
  scheduleButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 20,
    borderColor: '#5e3b7f',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9efff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#5e3b7f',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f4f0fa',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  columnAcao: {
    flex: 1.2,
  },
  columnData: {
    flex: 1,
  },
  columnDescricao: {
    flex: 1.5,
  },
});
