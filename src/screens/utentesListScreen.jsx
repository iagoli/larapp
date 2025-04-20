import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import UserItem from '../components/UserItem';
import ConfirmDialog from '../components/ConfirmDialog';
import BottomTabBar from '../components/BottomTabBar';

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
  const [activeTab, setActiveTab] = useState('Utentes');

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.headerSection}>
          <Header
            title="Utentes"
            onEdit={() => console.log('Edit pressed')}
            onDelete={() => setShowDeleteDialog(true)}
            onAdd={() => console.log('Add pressed')}
          />
        </View>

        {/* Lista */}
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

        {/* Diálogo de confirmação */}
        <ConfirmDialog
          visible={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            console.log('Deleting users...');
            setShowDeleteDialog(false);
          }}
        />
      </View>

      {/* Navegação Inferior */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default UtentesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  headerSection: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  listSection: {
    flex: 1,
    paddingBottom: 100, 
  },
  listContent: {
    paddingBottom: 16,
  },
});
