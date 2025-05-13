import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../styles/medicationRow_styles';

const MedicationTableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnMedicamento]}>Medicamento</Text>
    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
    <Text style={[styles.headerText, styles.columnQuantidade]}>Quantidade</Text>
  </View>
);

export default MedicationTableHeader;
