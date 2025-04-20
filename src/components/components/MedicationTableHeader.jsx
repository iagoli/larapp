import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/utenteMedicacaoScreen_styles';

export default function MedicationTableHeader() {
  return (
    <View style={styles.tableHeader}>
      <Text style={[styles.headerText, styles.columnMedicamento]}>Medicamento</Text>
      <Text style={[styles.headerText, styles.columnData]}>Data</Text>
      <Text style={[styles.headerText, styles.columnQuantidade]}>Quantidade</Text>
    </View>
  );
}
