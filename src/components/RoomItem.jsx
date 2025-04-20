import React from 'react';
import { View } from 'react-native';
import { Avatar, Checkbox, Text } from 'react-native-paper';
import styles from '../styles/listItemRow_styles';

const getAvatarLabel = (availability) => {
  switch (availability.toLowerCase()) {
    case 'disponível':
      return 'D';
    case 'ocupado':
      return 'O';
    case 'manutenção':
      return 'M';
    default:
      return '?';
  }
};

const getAvatarColor = (availability) => {
  switch (availability.toLowerCase()) {
    case 'disponível':
      return '#A5D6A7'; 
    case 'ocupado':
      return '#EF9A9A'; 
    case 'manutenção':
      return '#FFF59D'; 
    default:
      return '#E0E0E0'; 
  }
};

const getAvatarTextColor = (availability) =>
  availability.toLowerCase() === 'manutenção' ? '#000' : '#fff';

const RoomItem = ({ room, checked, onToggle }) => {
  const avatarColor = getAvatarColor(room.availability);
  const textColor = getAvatarTextColor(room.availability);

  return (
    <View style={styles.itemRow}>
      <Avatar.Text
        label={getAvatarLabel(room.availability)}
        size={36}
        style={[styles.avatar, { backgroundColor: avatarColor }]}
        color={textColor}
      />
      <Text style={styles.itemText}>{room.name}</Text>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onToggle(room.id)}
        color="#5e3b7f"
      />
    </View>
  );
};

export default RoomItem;
