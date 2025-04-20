import React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import styles from '../styles/headerWithIcons_styles';

const HeaderWithIcons = ({ title, onEdit, onDelete, onAdd }) => (
  <View style={styles.header}>
    <Text style={styles.headerLabel}>{title}</Text>
    <View style={styles.iconGroup}>
      <IconButton icon="pencil" size={20} iconColor="#5e3b7f" onPress={onEdit} />
      <IconButton icon="delete" size={20} iconColor="#5e3b7f" onPress={onDelete} />
      <IconButton icon="plus" size={20} iconColor="#5e3b7f" onPress={onAdd} />
    </View>
  </View>
);

export default HeaderWithIcons;
