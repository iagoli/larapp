import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/header';
import RoomItem from '../components/roomItem';
import ConfirmDialog from '../components/confirmDialog';
import BottomTabBar from '../components/bottomTabBar';
import styles from '../styles/roomsListScreen_styles';

const rooms = [
  { id: '1', name: '101', availability: 'Disponível' },
  { id: '2', name: '102', availability: 'Ocupado' },
  { id: '3', name: '103', availability: 'Ocupado' },
  { id: '4', name: '104', availability: 'Disponível' },
  { id: '5', name: '105', availability: 'Ocupado' },
  { id: '6', name: '106', availability: 'Manutenção' },
  { id: '7', name: '107', availability: 'Disponível' },
  { id: '8', name: '108', availability: 'Manutenção' },
];

const RoomsListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(rooms.map(room => [room.id, false]))
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('Quartos');

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
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
                room={item}
                checked={checkedItems[item.id]}
                onToggle={toggleCheckbox}
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
      </View>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default RoomsListScreen;