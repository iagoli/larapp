import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Avatar, Checkbox, IconButton } from 'react-native-paper';
import { Dialog, Portal, Button } from 'react-native-paper';


const users = [
  { id: '1', name: 'Maniche' },
  { id: '2', name: 'Derlei' },
  { id: '3', name: 'Jardel' },
  { id: '4', name: 'Deco' },
  { id: '5', name: 'Figo' },
  { id: '6', name: 'Boby Robson' },
  { id: '7', name: 'Brahimi' },
  { id: '8', name: 'Bobby Charlton' },
  { id: '9', name: 'Fernando Couto' },
  { id: '10', name: 'Jorge Costa' },
];

const UsersListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(users.map(user => [user.id, false]))
  );

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Avatar.Text
        label={item.name.charAt(0).toUpperCase()}
        size={36}
        style={styles.avatar}
        color="#5e3b7f"
      />
      <Text style={styles.itemText}> {item.name} </Text>
      <Checkbox
        status={checkedItems[item.id] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(item.id)}
        color="#5e3b7f"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Utilizadores</Text>
        <View style={styles.iconGroup}>
          <IconButton
            icon="pencil"
            size={20}
            iconColor="#5e3b7f"
            onPress={() => console.log('Edit pressed')}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor="#5e3b7f"
            onPress={() => setShowDeleteDialog(true)}
          />
          <IconButton
            icon="plus"
            size={20}
            iconColor="#5e3b7f"
            onPress={() => console.log('Add pressed')}
          />
        </View>

      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}
        >
          <Dialog.Title>Confirmar</Dialog.Title>
          <Dialog.Content>
            <Text>Tem a certeza que quer remover o utente selecionado?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={() => {
              console.log('Deleting users...');
              setShowDeleteDialog(false);
            }}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default UsersListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9efff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLabel: {
    backgroundColor: '#5e3b7f',
    color: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    fontWeight: 'bold',
    fontSize: 19,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 2,
    marginRight: 5,
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
