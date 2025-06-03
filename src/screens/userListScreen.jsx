import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import UserItem from '../components/userItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/usersListScreen_styles';
import UserDetailsModal from '../components/userDetailsModal';
import EditUserModal from '../components/editUserModal';

import { db } from '../../firebase.config';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const UsersListScreen = () => {
  const [users, setUsers] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Utilizadores');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,           // ID real do Firestore
        ...doc.data()
      }));

      setUsers(userList);
      setCheckedItems(Object.fromEntries(userList.map(user => [user.id, false])));
    });

    return () => unsubscribe();
  }, []);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleEdit = () => {
    const selectedId = Object.entries(checkedItems).find(([_, checked]) => checked)?.[0];
    if (selectedId) {
      const userToEdit = users.find(user => user.id === selectedId);
      if (userToEdit) {
        setSelectedUser(userToEdit);
        setShowEditModal(true);
      }
    }
  };

  const handleDelete = async () => {
    const idsToDelete = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);

    for (const id of idsToDelete) {
      await deleteDoc(doc(db, 'users', id));
    }

    setShowDeleteDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Header
            title="Utilizadores"
            onEdit={handleEdit}
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
                onPress={() => handleShowDetails(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <ConfirmDialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
          message="Tem certeza que deseja apagar o utilizador selecionado?"
        />

        <UserDetailsModal
          visible={showDetailsModal}
          user={selectedUser}
          onClose={() => setShowDetailsModal(false)}
        />

        <EditUserModal
          visible={showEditModal}
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
        />
      </View>

    </SafeAreaView>
  );
};

export default UsersListScreen;
