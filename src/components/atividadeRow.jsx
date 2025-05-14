import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../styles/atividadeRow_styles';

const AtividadeRow = ({ item, selected, onToggle }) => {
  const { atividade, dataHora, descricao } = item;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : 'Sem data';
    } catch {
      return 'Sem data';
    }
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.cellCheckbox}>
        <Checkbox status={selected ? 'checked' : 'unchecked'} onPress={onToggle} />
      </View>
      <View style={styles.cell}>
        <Text style={styles.itemText}>{atividade || 'Sem atividade'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.itemText}>{dataHora ? formatDate(dataHora) : 'Sem data'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.itemText}>{descricao || 'Sem observações'}</Text>
      </View>
    </View>
  );
};

export default AtividadeRow;
