import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5e3b7f',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  avatar: {
    backgroundColor: '#e0cfff',
  },
  scheduleButton: {
    flex: 1,
    borderColor: '#5e3b7f',
    borderRadius: 20,
    justifyContent: 'center',
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
    backgroundColor: '#f4f0fa',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  columnMedicamento: {
    flex: 1.2,
  },
  columnData: {
    flex: 1,
  },
  columnQuantidade: {
    flex: 1,
  },
});
