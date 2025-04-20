import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import HeaderWithIcons from '../components/HeaderWithIcons';
import ListItemRow from '../components/ListItemRow';
import ConfirmDialog from '../components/ConfirmDialog';
import screenStyles from '../styles/roomsListScreen_styles';

const rooms = [
  { id: '1', number: '101', availability: 'Disponível' },
  { id: '2', number: '102', availability: 'Ocupado' },
  { id: '3', number: '103', availability: 'Manutenção' },
];


const RoomsListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(rooms.map(room => [room.id, false]))
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={screenStyles.container}>
      <HeaderWithIcons
        title="Quartos"
        onEdit={() => console.log('Edit pressed')}
        onDelete={() => setShowDeleteDialog(true)}
        onAdd={() => console.log('Add pressed')}
      />

      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
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

export default RoomsListScreen;
