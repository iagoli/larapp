import React from 'react';
import { View, Pressable } from 'react-native';
import { Avatar, Checkbox, Text } from 'react-native-paper';
import styles from '../styles/listItemRow_styles';

const getAvatarLabel = (availability) => {
  switch (availability?.toLowerCase()) {
    case 'disponivel':
      return 'D';
    case 'ocupado':
      return 'O';
    case 'manutencao':
      return 'M';
    default:
      return '?';
  }
};

const getAvatarColor = (availability) => {
  switch (availability?.toLowerCase()) {
    case 'disponivel':
      return '#A5D6A7';
    case 'ocupado':
      return '#EF9A9A';
    case 'manutencao':
      return '#FFF59D';
    default:
      return '#E0E0E0';
  }
};

const getAvatarTextColor = (availability) =>
  availability?.toLowerCase() === 'manutenção' ? '#000' : '#fff';

const RoomItem = ({ room, checked, onToggle, onPress }) => {
  const avatarColor = getAvatarColor(room.availability);
  const textColor = getAvatarTextColor(room.availability);
  const avatarLabel = getAvatarLabel(room.availability);

  const roomNumber = room?.number?.toString().trim() || 'Sem número';

  return (
    <Pressable onPress={() => onPress(room)}>
      <View style={styles.itemRow}>
        <Avatar.Text
          label={avatarLabel}
          size={36}
          style={[styles.avatar, { backgroundColor: avatarColor }]}
          color={textColor}
        />
        <Text style={styles.itemText}>Quarto {roomNumber}</Text>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => onToggle(room.id)}
          color="#5e3b7f"
        />
      </View>
    </Pressable>
  );
};

export default RoomItem;
