import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Avatar, Checkbox, Dialog, Portal, Button } from 'react-native-paper';
import HeaderWithIcons from '../components/HeaderWithIcons';
import styles from '../styles/usersListScreen_styles';
import ConfirmDialog from '../components/ConfirmDialog';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Avatar.Text
        label={item.name.charAt(0).toUpperCase()}
        size={36}
        style={styles.avatar}
        color="#5e3b7f"
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Checkbox
        status={checkedItems[item.id] ? 'checked' : 'unchecked'}
        onPress={() => toggleCheckbox(item.id)}
        color="#5e3b7f"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderWithIcons
        title="Utilizadores"
        onEdit={() => console.log('Edit pressed')}
        onDelete={() => setShowDeleteDialog(true)}
        onAdd={() => console.log('Add pressed')}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          console.log('Deleting users...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar"
        message="Tem a certeza que quer remover o utente selecionado?"
      />
    </View>
  );
};

export default UsersListScreen;
