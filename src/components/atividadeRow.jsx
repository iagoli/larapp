import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles/utenteAtividadeScreen_styles';

const AtividadeRow = ({ item, selected, onToggle }) => (
  <View style={styles.row}>
    <Checkbox
      status={selected ? 'checked' : 'unchecked'}
      onPress={onToggle}
    />
    <Text style={[styles.cell, styles.columnAtividade]}>
      {item.atividade || 'Sem atividade'}
    </Text>
    <Text style={[styles.cell, styles.columnData]}>
      {item.date || 'Sem data'}
    </Text>
    <Text style={[styles.cell, styles.columnObs]}>
      {item.observacoes || 'Sem observações'}
    </Text>
  </View>
);

export default AtividadeRow;
