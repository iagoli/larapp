import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Checkbox, Avatar, Text } from 'react-native-paper';
import HeaderWithIcons from '../components/HeaderWithIcons';
import ConfirmDialog from '../components/ConfirmDialog';
import styles from '../styles/utentesListScreen_styles';

const utentes = [
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

const UtenteListItem = ({ item, checked, onToggle }) => (
  <View style={styles.itemRow}>
    <Avatar.Text
      label={item.name.charAt(0).toUpperCase()}
      size={36}
      style={styles.avatar}
      color="#5e3b7f"
    />
    <Text style={styles.itemText}>{item.name}</Text>
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onToggle(item.id)}
      color="#5e3b7f"
    />
  </View>
);

const UtentesListScreen = () => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(utentes.map(utente => [utente.id, false]))
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleCheckbox = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <HeaderWithIcons
        title="Utentes"
        onEdit={() => console.log('Edit pressed')}
        onDelete={() => setShowDeleteDialog(true)}
        onAdd={() => console.log('Add pressed')}
      />

      <FlatList
        data={utentes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UtenteListItem
            item={item}
            checked={checkedItems[item.id]}
            onToggle={toggleCheckbox}
          />
        )}
      />

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          console.log('Deleting utentes...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar"
        message="Tem a certeza que quer remover o utente selecionado?"
      />
    </View>
  );
};

export default UtentesListScreen;
