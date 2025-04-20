import React from 'react';
import { View } from 'react-native';
import { Text, Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/roomItem_styles';

const RoomItem = ({ room, checked, onToggle }) => (
  <View style={styles.itemRow}>
    <Avatar.Text label={room.number} size={36} style={styles.avatar} color="#5e3b7f" />
    <Text style={styles.itemText}>Quarto {room.number}</Text>
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onToggle(room.id)}
      color="#5e3b7f"
    />
  </View>
);

export default RoomItem;
