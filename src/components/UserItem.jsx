import React from 'react';
import { View } from 'react-native';
import { Text, Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/userItem_styles';

const UserItem = ({ item, checked, onToggle, avatarLabel }) => {
  const displayName = item?.name || 'Usuário';
  const avatarInitial = avatarLabel || displayName.charAt(0).toUpperCase();

  return (
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
  );
};

export default UserItem;
