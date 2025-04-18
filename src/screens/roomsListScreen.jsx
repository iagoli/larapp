import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import UserItem from '../components/UserItem';
import ConfirmDialog from '../components/ConfirmDialog';

const rooms = [
  { id: '1', name: '101' },
  { id: '2', name: '102' },
  { id: '3', name: '103' },
  { id: '4', name: '104' },
  { id: '5', name: '105' },
  { id: '6', name: '106' },
  { id: '7', name: '107' },
  { id: '8', name: '108' },
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
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Header
          title="Quartos"
          onEdit={() => console.log('Edit pressed')}
          onDelete={() => setShowDeleteDialog(true)}
          onAdd={() => console.log('Add pressed')}
        />
      </View>

      <View style={styles.listSection}>
        <FlatList
          data={rooms}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <UserItem
                item={{ id: item.id, name: `Quarto ${item.name}` }}
                avatarLabel={item.name}
                checked={checkedItems[item.id]}
                onToggle={() => toggleCheckbox(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <ConfirmDialog
        visible={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          console.log('Deleting rooms...');
          setShowDeleteDialog(false);
        }}
      />
    </View>
  );
};

export default RoomsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
    paddingHorizontal: 16,
  },
  headerSection: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  listSection: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 0,
  },
});
