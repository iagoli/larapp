import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/utenteAtividadeScreen_styles';

const AtividadeTableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnAtividade]}>Atividade</Text>
    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
    <Text style={[styles.headerText, styles.columnObs]}>Observações</Text>
  </View>
);

export default AtividadeTableHeader;
