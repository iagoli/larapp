import React from 'react';
import { View } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/listItemRow_styles';

const RoomItem = ({ room, checked, onToggle }) => (
  <View style={styles.itemRow}>
    <Avatar.Text
      label={getLabel(room.availability)}
      size={36}
      style={styles.avatar}
      color="#5e3b7f"
    />
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => onToggle(room.id)}
      color="#5e3b7f"
    />
  </View>
);

export default RoomItem;
