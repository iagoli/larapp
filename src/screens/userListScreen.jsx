import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import UserItem from '../components/userItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/usersListScreen_styles';
import UserDetailsModal from '../components/userDetailsModal';
import EditUserModal from '../components/editRoomModal';

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
      const userList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          uid: data.uid || doc.id 
        };
      });

      setUsers(userList);
      setCheckedItems(Object.fromEntries(userList.map(user => [user.uid, false])));
    });

    return () => unsubscribe();
  }, []);

  const toggleCheckbox = (uid) => {
    setCheckedItems(prev => ({
      ...prev,
      [uid]: !prev[uid],
    }));
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleEdit = () => {
    const selectedUid = Object.entries(checkedItems).find(([_, checked]) => checked)?.[0];
    if (selectedUid) {
      const userToEdit = users.find(user => user.uid === selectedUid);
      if (userToEdit) {
        setSelectedUser(userToEdit);
        setShowEditModal(true);
      }
    }
  };

  const handleDelete = async () => {
    const uidsToDelete = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([uid]) => uid);

    for (const uid of uidsToDelete) {
      await deleteDoc(doc(db, 'users', uid));
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
            keyExtractor={item => item.uid} 
            renderItem={({ item }) => (
              <UserItem
                item={item}
                checked={checkedItems[item.uid]}
                onToggle={() => toggleCheckbox(item.uid)}
                onPress={() => handleShowDetails(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <ConfirmDialog
          visible={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
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

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default UsersListScreen;
