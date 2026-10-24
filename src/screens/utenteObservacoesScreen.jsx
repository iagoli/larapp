import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteObservacoesScreen_styles';
import ConfirmDialog from '../components/confirmDialog';
import ObservacaoTableHeader from '../components/observacaoTableHeader';
import ObservacaoRow from '../components/observacaoRow';
import EditObservacaoModal from '../components/editObservacaoModal';
import { useRoute, useNavigation } from '@react-navigation/native';

import { useUtenteRegistos } from '../hooks/useUtenteRegistos';
import { db } from '../../firebase.config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const UtenteObservacoesScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [observacaoSelecionada, setObservacaoSelecionada] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const route = useRoute();
  const navigation = useNavigation();
  const { utenteId } = route.params;
  
  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { registos } = useUtenteRegistos('observacoes', utenteId);
  const observacoes = registos.map((item) => ({
    id: item.id,
    descricao: item.descricao || 'Sem descricao',
    dataHora: item.dataHora || '',
    date: item.dataHora ? item.dataHora.split('T')[0] : 'Sem data',
  }));

  const handleEditPress = () => {
    const selectedId = Object.keys(selectedItems).find(id => selectedItems[id]);
    if (selectedId) {
      const obs = observacoes.find(o => o.id === selectedId);
      setObservacaoSelecionada(obs);
      setShowEditModal(true);
    }
  };

  const handleSaveEdicao = async (updatedObs) => {
    try {
      await updateDoc(doc(db, 'observacoes', updatedObs.id), {
        descricao: updatedObs.descricao,
        dataHora: updatedObs.dataHora.toISOString(),
      });
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = Object.keys(selectedItems).filter(id => selectedItems[id]);
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, 'observacoes', id));
      }
      setSelectedItems({});
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Observacoes</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />
          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('CreateObservacoesScreen', { utenteId })}
          >
            {!isCompact && 'Agendar Observação'}
          </Button>

          <IconButton icon="pencil" onPress={handleEditPress} />
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
        </View>

        <ObservacaoTableHeader />

        {observacoes.map((item) => (
          <ObservacaoRow
            key={item.id}
            item={item}
            selected={selectedItems[item.id]}
            onToggle={() => toggleCheckbox(item.id)}
          />
        ))}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          handleDelete();
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remocao"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />

      <EditObservacaoModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdicao}
        observacao={observacaoSelecionada}
      />
    </View>
  );
};

export default UtenteObservacoesScreen;
