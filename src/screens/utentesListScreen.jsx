import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import UserItem from '../components/userItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/utentesListScreen_styles';

import { db } from '../../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const UtentesListScreen = () => {
  const [utentes, setUtentes] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Header
            title="Utentes"
            onEdit={() => console.log('Edit pressed')}
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
            console.log('Deleting utentes...');
            setShowDeleteDialog(false);
          }}
        />
      </View>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default UtentesListScreen;
