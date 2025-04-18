import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import styles from '../styles/Header_styles';

function Header({ onEdit, onDelete, onAdd }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLabel}>Utilizadores</Text>
      <View style={styles.iconGroup}>
        <IconButton icon="pencil" size={20} iconColor="#5e3b7f" onPress={onEdit} style={{ marginLeft: 6 }} />
        <IconButton icon="delete" size={20} iconColor="#5e3b7f" onPress={onDelete} style={{ marginLeft: 6 }} />
        <IconButton icon="plus" size={20} iconColor="#5e3b7f" onPress={onAdd} style={{ marginLeft: 6 }} />
      </View>
    </View>
  );
}

export default Header;
