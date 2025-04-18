import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import UserItem from '../components/UserItem';
import ConfirmDialog from '../components/ConfirmDialog';

const users = [
  { id: '1', name: 'João' },
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

const UtentesListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(users.map(user => [user.id, true]))
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      {/* Área de cabeçalho separada */}
      <View style={styles.headerSection}>
        <Header
          title="Utentes" 
          onEdit={() => console.log('Edit pressed')}
          onDelete={() => setShowDeleteDialog(true)}
          onAdd={() => console.log('Add pressed')}
        />
      </View>

      {/* Área de listagem */}
      <View style={styles.listSection}>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <UserItem
              item={item}
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
          console.log('Deleting users...');
          setShowDeleteDialog(false);
        }}
      />
    </View>
  );
};

export default UtentesListScreen;

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
