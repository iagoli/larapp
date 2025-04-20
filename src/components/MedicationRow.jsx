import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles/utenteMedicacaoScreen_styles';

export default function MedicationRow({ item, checked, onToggle }) {
  return (
    <View style={styles.row}>
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onToggle(item.id)}
        color="#5e3b7f"
      />
      <Text style={[styles.cell, styles.columnMedicamento]}>{item.name}</Text>
      <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
      <Text style={[styles.cell, styles.columnQuantidade]}>{item.quantity}</Text>
    </View>
  );
}
