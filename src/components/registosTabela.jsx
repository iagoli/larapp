import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import dayjs from 'dayjs';
import styles from '../styles/registosScreen_styles';

const formatar = ({ campo, tipo }, registo) => {
  const valor = registo[campo];
  if (tipo === 'dataHora') return valor ? dayjs(valor).format('DD/MM HH:mm') : '—';
  return valor || '—';
};

const RegistosTabela = ({ campos, registos, selecionados, onToggle, selecionavel }) => (
  <>
    <View style={styles.tableHeader}>
      {selecionavel && <View style={styles.cellCheckbox} />}
      {campos.map(({ campo, label, flex }) => (
        <Text key={campo} style={[styles.headerText, { flex }]}>
          {label}
        </Text>
      ))}
    </View>

    {registos.map((registo) => (
      <View key={registo.id} style={styles.row}>
        {selecionavel && (
          <View style={styles.cellCheckbox}>
            <Checkbox
              status={selecionados[registo.id] ? 'checked' : 'unchecked'}
              onPress={() => onToggle(registo.id)}
            />
          </View>
        )}
        {campos.map((c) => (
          <Text key={c.campo} style={[styles.cell, { flex: c.flex }]}>
            {formatar(c, registo)}
          </Text>
        ))}
      </View>
    ))}
  </>
);

export default RegistosTabela;
