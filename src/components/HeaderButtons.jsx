import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/headerButtons_styles';

const HeaderButtons = ({ onBackPress, onMenuPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.button}>
        <Feather name="arrow-left" size={24} color="#2b2b2b" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onMenuPress} style={styles.button}>
        <Feather name="more-vertical" size={24} color="#2b2b2b" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderButtons;