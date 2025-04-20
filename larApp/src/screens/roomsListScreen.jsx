import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import HeaderWithIcons from '../components/HeaderWithIcons';
import RoomItem from '../components/RoomItem';
import screenStyles from '../styles/roomsListScreen_styles';
import ConfirmDialog from '../components/ConfirmDialog';

const rooms = [
  { id: '1', number: '101' },
  { id: '2', number: '102' },
  { id: '3', number: '103' },
  { id: '4', number: '104' },
  { id: '5', number: '105' },
  { id: '6', number: '106' },
  { id: '7', number: '107' },
  { id: '8', number: '108' },
];

const RoomsListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(Object.fromEntries(rooms.map(room => [room.id, false])));
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
          <RoomItem
            room={item}
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
