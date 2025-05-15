import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import UserItem from '../components/userItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import UtenteDetailsModal from '../components/utenteDetailsModal'; 
import EditUtenteModal from '../components/editUtenteModal';      
import styles from '../styles/utentesListScreen_styles';

import { db } from '../../firebase.config';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const UtentesListScreen = () => {
  const [utentes, setUtentes] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUtente, setSelectedUtente] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Utentes');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'utentes'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUtentes(list);
      setCheckedItems(Object.fromEntries(list.map(user => [user.id, false])));
    });

    return () => unsubscribe();
  }, []);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowDetails = (utente) => {
    setSelectedUtente(utente);
    setShowDetailsModal(true);
  };

  const handleEdit = () => {
    const selectedId = Object.entries(checkedItems).find(([_, checked]) => checked)?.[0];
    if (selectedId) {
      const utenteToEdit = utentes.find(u => u.id === selectedId);
      if (utenteToEdit) {
        setSelectedUtente(utenteToEdit);
        setShowEditModal(true);
      }
    }
  };

  const handleDelete = async () => {
    const idsToDelete = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);

    for (const id of idsToDelete) {
      await deleteDoc(doc(db, 'utentes', id));
    }

    setShowDeleteDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Header
            title="Utentes"
            onEdit={handleEdit}
            onDelete={() => setShowDeleteDialog(true)}
            onAdd={() => console.log('Add pressed')}
          />
        </View>

        <View style={styles.listSection}>
          <FlatList
            data={utentes}
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
          message="Tem certeza que deseja apagar o(s) utente(s) selecionado(s)?"
        />

        <UtenteDetailsModal
          visible={showDetailsModal}
          utente={selectedUtente}
          onClose={() => setShowDetailsModal(false)}
        />

        <EditUtenteModal
          visible={showEditModal}
          utente={selectedUtente}
          onClose={() => setShowEditModal(false)}
        />
      </View>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default UtentesListScreen;