import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Header from '../components/header';
import RoomItem from '../components/roomItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import RoomDetailsModal from '../components/roomDetailsModal';
import EditRoomModal from '../components/editRoomModal';
import styles from '../styles/roomsListScreen_styles';

import { db } from '../../firebase.config';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const RoomsListScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeTab, setActiveTab] = useState('Quartos');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const roomList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(roomList);
      setCheckedItems(Object.fromEntries(roomList.map(room => [room.id, false])));
    });

    return () => unsubscribe();
  }, []);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowDetails = (room) => {
    setSelectedRoom(room);
    setShowDetailsModal(true);
  };

  const handleEdit = () => {
    const selectedId = Object.entries(checkedItems).find(([_, checked]) => checked)?.[0];
    if (selectedId) {
      const roomToEdit = rooms.find(room => room.id === selectedId);
      if (roomToEdit) {
        setSelectedRoom(roomToEdit);
        setShowEditModal(true);
      }
    }
  };

  const handleDelete = async () => {
    const idsToDelete = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => id);

    for (const id of idsToDelete) {
      await deleteDoc(doc(db, 'rooms', id));
    }

    setShowDeleteDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Header
            title="Quartos"
            onEdit={handleEdit}
            onDelete={() => setShowDeleteDialog(true)}
            onAdd={() => navigation.navigate('CreateQuarto')}
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
                  number: item.numero || 'Sem número',
                  availability: item.disponibilidade || 'desconhecido'
                }}
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
          title="Confirmar remoção"
          message="Tem certeza que deseja apagar o(s) quarto(s) selecionado(s)?"
        />

        <RoomDetailsModal
          visible={showDetailsModal}
          room={selectedRoom}
          onClose={() => setShowDetailsModal(false)}
        />

        <EditRoomModal
          visible={showEditModal}
          room={selectedRoom}
          onClose={() => setShowEditModal(false)}
        />
      </View>

    </SafeAreaView>
  );
};

export default RoomsListScreen;
