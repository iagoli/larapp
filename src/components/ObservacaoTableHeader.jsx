import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/utenteObservacoesScreen_styles';

const ObservacaoTableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnDescricao]}>Descrição</Text>
    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
  </View>
);

export default ObservacaoTableHeader;
