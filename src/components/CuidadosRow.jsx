import React from 'react';
import { View } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import styles from '../styles/utenteCuidadosScreen_styles';

const CuidadosRow = ({ item, selected, onToggle }) => (
  <View style={styles.row}>
    <Checkbox
      status={selected ? 'checked' : 'unchecked'}
      onPress={onToggle}
    />
    <Text style={[styles.cell, styles.columnAcao]}>{item.acao}</Text>
    <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
    <Text style={[styles.cell, styles.columnDescricao]}>{item.descricao}</Text>
  </View>
);

export default CuidadosRow;