import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/listItemRow_styles';

const getLabel = (status) => {
  switch (status.toLowerCase()) {
    case 'disponível': return 'D';
    case 'ocupado': return 'O';
    case 'manutenção': return 'M';
    default: return '?';
  }
};

const getAvatarStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'disponível': return { backgroundColor: '#b6e5c9' }; 
    case 'ocupado': return { backgroundColor: '#f2b6b6' }; 
    case 'manutenção': return { backgroundColor: '#ffe6a7' };
    default: return { backgroundColor: '#ccc' };
  }
};

const ListItemRow = ({ item, checked, onToggle }) => (
  <View style={styles.itemRow}>
    <Avatar.Text
      label={getLabel(item.availability)}
      size={36}
      style={[styles.avatar, getAvatarStyle(item.availability)]}
      color="#5e3b7f"
    />
    <Text style={styles.itemText}>{item.number}</Text>
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onToggle(item.id)}
      color="#5e3b7f"
    />
  </View>
);

export default ListItemRow;
