import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles/utenteObservacoesScreen_styles';

const ObservacaoRow = ({ item, selected, onToggle }) => (
  <View style={styles.row}>
    <Checkbox
      status={selected ? 'checked' : 'unchecked'}
      onPress={onToggle}
      color="#5e3b7f"
    />
    <Text style={[styles.cell, styles.columnDescricao]}>{item.descricao}</Text>
    <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
  </View>
);

export default ObservacaoRow;
