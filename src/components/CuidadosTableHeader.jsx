import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/utenteCuidadosScreen_styles';

const CuidadosTableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnAcao]}>Ação</Text>
    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
    <Text style={[styles.headerText, styles.columnDescricao]}>Descrição</Text>
  </View>
);

export default CuidadosTableHeader;
