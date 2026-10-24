import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import HomeStyles from '../styles/homePage_styles';
import { useUtenteRegistos } from '../hooks/useUtenteRegistos';

const eHoje = (iso) => Boolean(iso) && dayjs(iso).isSame(dayjs(), 'day');

const CronogramaHoje = ({ utenteId }) => {
  const { registos: medicacoes } = useUtenteRegistos('medicacoes', utenteId);
  const { registos: atividades } = useUtenteRegistos('atividades', utenteId);
  const { registos: refeicoes } = useUtenteRegistos('alimentacoes', utenteId);

  const eventos = [
    ...medicacoes.map((m) => ({
      id: `m-${m.id}`,
      dataHora: m.dataHora,
      icon: 'pill',
      texto: `${m.medicamento} (${m.quantidade})`,
    })),
    ...atividades.map((a) => ({
      id: `a-${a.id}`,
      dataHora: a.dataHora,
      icon: 'walk',
      texto: a.atividade,
    })),
    ...refeicoes.map((r) => ({
      id: `r-${r.id}`,
      dataHora: r.dataHora,
      icon: 'silverware-fork-knife',
      texto: r.prato,
    })),
  ]
    .filter((e) => eHoje(e.dataHora))
    .sort((a, b) => a.dataHora.localeCompare(b.dataHora));

  const agora = dayjs();

  return (
    <View style={[HomeStyles.card, styles.card]}>
      <Text style={HomeStyles.cardTitle}>Hoje, {agora.format('DD/MM')}</Text>

      {eventos.length === 0 ? (
        <Text style={styles.vazio}>Nada agendado para hoje.</Text>
      ) : (
        eventos.map((e) => {
          const passado = dayjs(e.dataHora).isBefore(agora);
          return (
            <View key={e.id} style={[HomeStyles.item, passado && styles.passado]}>
              <Text style={styles.hora}>{dayjs(e.dataHora).format('HH:mm')}</Text>
              <MaterialCommunityIcons name={e.icon} size={22} color="#4a0072" />
              <Text style={styles.texto} numberOfLines={2}>
                {e.texto}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    gap: 8,
  },
  hora: {
    fontWeight: 'bold',
    width: 48,
    color: '#4a0072',
  },
  texto: {
    flex: 1,
    fontSize: 15,
  },
  passado: {
    opacity: 0.45,
  },
  vazio: {
    color: '#555',
  },
});

export default CronogramaHoje;
