import React, { useState } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import UserItem from '../components/userItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/usersListScreen_styles';

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
  const [activeTab, setActiveTab] = useState('Utilizadores');

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Header
            title="Utilizadores"
            onEdit={() => console.log('Edit')}
            onDelete={() => setShowDeleteDialog(true)}
            onAdd={() => console.log('Add')}
          />
        </View>

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

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default UsersListScreen;
