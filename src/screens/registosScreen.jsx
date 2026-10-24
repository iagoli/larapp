import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import ConfirmDialog from '../components/confirmDialog';
import EditRegistoModal from '../components/editRegistoModal';
import RegistosTabela from '../components/registosTabela';
import styles from '../styles/registosScreen_styles';
import { REGISTOS } from '../constants/registos';
import { useUtenteRegistos } from '../hooks/useUtenteRegistos';
import { useAuth } from '../contexts/AuthContext';

// Lista dos registos de um tipo (medicações, atividades, ...) de um utente.
// Parâmetros da rota: tipo (chave de REGISTOS) e utenteId.
const RegistosScreen = ({ route, navigation }) => {
  const { tipo, utenteId } = route.params;
  const definicao = REGISTOS[tipo];

  const { user } = useAuth();
  const isStaff = user?.tipoUsuario === 'admin' || user?.tipoUsuario === 'enfermeiro';

  const { registos, loading } = useUtenteRegistos(tipo, utenteId);
  const [nomeUtente, setNomeUtente] = useState('');
  const [selecionados, setSelecionados] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [emEdicao, setEmEdicao] = useState(null);

  const isCompact = Dimensions.get('window').width < 360;
  const ordenados = [...registos].sort((a, b) => (b.dataHora || '').localeCompare(a.dataHora || ''));
  const idsSelecionados = Object.keys(selecionados).filter(
    (id) => selecionados[id] && registos.some((r) => r.id === id)
  );

  useEffect(() => {
    getDoc(doc(db, 'utentes', utenteId))
      .then((snap) => setNomeUtente(snap.exists() ? snap.data().nome : ''))
      .catch((err) => console.error('Erro ao carregar utente:', err));
  }, [utenteId]);

  const toggle = (id) => setSelecionados((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleDelete = async () => {
    setShowDeleteDialog(false);
    try {
      await Promise.all(idsSelecionados.map((id) => deleteDoc(doc(db, tipo, id))));
      setSelecionados({});
    } catch (error) {
      console.error(`Erro ao remover ${tipo}:`, error);
      Alert.alert('Erro', 'Não foi possível remover os registos selecionados.');
    }
  };

  const handleSaveEdit = async (dados) => {
    try {
      await updateDoc(doc(db, tipo, emEdicao.id), dados);
      setEmEdicao(null);
      setSelecionados({});
    } catch (error) {
      console.error(`Erro ao atualizar ${tipo}:`, error);
      Alert.alert('Erro', 'Não foi possível guardar as alterações.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar.Icon icon={definicao.icon} size={48} style={styles.avatar} color="#5e3b7f" />
          <Text style={styles.title}>{nomeUtente || definicao.titulo}</Text>
        </View>

        {isStaff && (
          <View style={styles.actions}>
            <Button
              icon="calendar-plus"
              mode="outlined"
              style={styles.scheduleButton}
              onPress={() => navigation.navigate('CreateRegistoScreen', { tipo, utenteId })}
            >
              {!isCompact && definicao.agendar}
            </Button>
            <IconButton
              icon="pencil"
              disabled={idsSelecionados.length !== 1}
              onPress={() => setEmEdicao(registos.find((r) => r.id === idsSelecionados[0]))}
            />
            <IconButton
              icon="delete"
              disabled={idsSelecionados.length === 0}
              onPress={() => setShowDeleteDialog(true)}
            />
          </View>
        )}

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} />
        ) : ordenados.length === 0 ? (
          <Text style={styles.vazio}>Sem registos de {definicao.titulo.toLowerCase()}.</Text>
        ) : (
          <RegistosTabela
            campos={definicao.campos}
            registos={ordenados}
            selecionados={selecionados}
            onToggle={toggle}
            selecionavel={isStaff}
          />
        )}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar remoção"
        message={`Tem a certeza de que deseja remover ${idsSelecionados.length} registo(s)?`}
      />

      <EditRegistoModal
        visible={emEdicao !== null}
        definicao={definicao}
        registo={emEdicao}
        onClose={() => setEmEdicao(null)}
        onSave={handleSaveEdit}
      />
    </View>
  );
};

export default RegistosScreen;
