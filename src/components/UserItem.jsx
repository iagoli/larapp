import React from 'react';
import { View } from 'react-native';
import { Text, Avatar, Checkbox } from 'react-native-paper';
import styles from '../styles/UserItem_styles';

const UserItem = ({ item, checked, onToggle }) => (
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
      onPress={onToggle}
      color="#5e3b7f"
      style={styles.checkbox}
    />
  </View>
);

export default UserItem;
