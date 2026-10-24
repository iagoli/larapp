import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/userItem_styles';

const UserItem = ({ item, checked, onToggle, avatarLabel, onPress }) => {
  const displayName = item?.nome || 'Utilizador'; // uses `nome` from Firestore
  const avatarInitial = avatarLabel || displayName.charAt(0).toUpperCase();

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.itemRow}>
        <Avatar.Text
          label={avatarInitial}
          size={36}
          style={styles.avatar}
          color="#5e3b7f"
        />
        <Text style={styles.itemText}>{displayName}</Text>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={onToggle}
          color="#5e3b7f"
          style={styles.checkbox}
        />
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;
