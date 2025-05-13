import React from 'react';
import { View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import styles from '../styles/utenteDetailsScreen_styles';

const UtenteHeader = ({ selectedTab, roomNumber }) => {
  return (
    <View style={styles.header}>
      <Avatar.Icon icon="account" size={48} style={styles.userAvatar} />
      <View style={styles.tabContainer}>
        <View style={[styles.tab, selectedTab === 'quarto' && styles.tabActive]}>
          <IconButton icon="bed" size={16} iconColor={selectedTab === 'quarto' ? '#fff' : '#5e3b7f'} />
          <Text style={[styles.tabText, selectedTab === 'quarto' && styles.tabTextActive]}>
            Quarto {roomNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UtenteHeader;
