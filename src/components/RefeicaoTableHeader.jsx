import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/utenteRefeicoesScreen_styles';

const RefeicaoTableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnPrato]}>Prato</Text>
    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
  </View>
);

export default RefeicaoTableHeader;
