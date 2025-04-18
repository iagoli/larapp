import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button, Checkbox, Dialog, Portal } from 'react-native-paper';

const dummyAtividades = [
  { id: '1', atividade: 'Leitura', date: '2025-04-18', observacoes: 'Leu durante 30 min' },
  { id: '2', atividade: 'Caminhada', date: '2025-04-19', observacoes: '20 min ao sol' },
];

const UtenteAtividadeScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Atividade</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />

          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar Atividade')}
          >
            {!isCompact && <Text style={styles.buttonText}>Agendar Atividade</Text>}
          </Button>

          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.columnAtividade]}>Atividade</Text>
          <Text style={[styles.headerText, styles.columnData]}>Data</Text>
          <Text style={[styles.headerText, styles.columnObs]}>Observações</Text>
        </View>

        {dummyAtividades.map((item) => (
          <View key={item.id} style={styles.row}>
            <Checkbox
              status={selectedItems[item.id] ? 'checked' : 'unchecked'}
              onPress={() => toggleCheckbox(item.id)}
            />
            <Text style={[styles.cell, styles.columnAtividade]}>{item.atividade}</Text>
            <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
            <Text style={[styles.cell, styles.columnObs]}>{item.observacoes}</Text>
          </View>
        ))}
      </ScrollView>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Confirmar Remoção</Dialog.Title>
          <Dialog.Content>
            <Text>Tem a certeza que deseja remover os itens selecionados?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancelar</Button>
            <Button
              onPress={() => {
                console.log('Atividades removidas...');
                setShowDeleteDialog(false);
              }}
            >
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default UtenteAtividadeScreen;

const styles = StyleSheet.create({
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
  buttonText: {
    color: '#5e3b7f',
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
  columnAtividade: {
    flex: 1.2,
  },
  columnData: {
    flex: 1,
  },
  columnObs: {
    flex: 1.5,
  },
});
