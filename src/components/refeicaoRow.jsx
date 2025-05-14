import React from 'react';
import { View } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import styles from '../styles/utenteRefeicoesScreen_styles';

const RefeicaoRow = ({ item, selected, onToggle }) => {
  console.log('Rendering row:', item); // 🔍 Check if it's rendering

  return (
    <View style={styles.row}>
      <Checkbox
        status={selected ? 'checked' : 'unchecked'}
        onPress={onToggle}
      />
      <Text style={[styles.cell, styles.columnPrato]}>{item.prato}</Text>
      <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
    </View>
  );
};

export default RefeicaoRow;
