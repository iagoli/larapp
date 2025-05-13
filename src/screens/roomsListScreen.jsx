import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import RoomItem from '../components/roomItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/roomsListScreen_styles';
import RoomDetailsModal from '../components/roomDetailsModal';

import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const RoomsListScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); 
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [activeTab, setActiveTab] = useState('Quartos');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'rooms'));
        const firebaseRooms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setRooms(firebaseRooms);

        const initialChecked = Object.fromEntries(
          firebaseRooms.map(room => [room.id, false])
        );
        setCheckedItems(initialChecked);
      } catch (error) {
        console.error('Erro ao buscar quartos:', error);
      }
    };

    fetchRooms();
  }, []);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowDetails = (room) => {
    setSelectedRoom(room); 
    setShowDetailsModal(true); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
              <RoomItem
                room={{
                  id: item.id,
                  number: item.number || 'Sem número',
                  availability: item.availability || 'desconhecido'
                }}
                checked={checkedItems[item.id]}
                onToggle={toggleCheckbox}
                onPress={handleShowDetails} 
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <ConfirmDialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            console.log('Deleting...');
            setShowDeleteDialog(false);
          }}
          title="Confirmar remoção"
          message="Tem a certeza que quer remover o item selecionado?"
        />

        {/* Modal de detalhes do quarto */}
        <RoomDetailsModal
          visible={showDetailsModal}
          room={selectedRoom}
          onClose={() => setShowDetailsModal(false)}
        />
      </View>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default RoomsListScreen;
