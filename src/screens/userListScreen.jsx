import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import HeaderWithIcons from '../components/HeaderWithIcons';
import ConfirmDialog from '../components/ConfirmDialog';
import ListItemRow from '../components/ListItemRow';
import UsersListScreen_styles from '../styles/usersListScreen_styles';

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

  return (
    <View style={UsersListScreen_styles.container}>
      <HeaderWithIcons
        title="Utilizadores"
        onEdit={() => console.log('Edit pressed')}
        onDelete={() => setShowDeleteDialog(true)}
        onAdd={() => console.log('Add pressed')}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItemRow
            item={item}
            checked={checkedItems[item.id]}
            onToggle={toggleCheckbox}
          />
        )}
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
