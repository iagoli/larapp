import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteObservacoesScreen_styles';
import ConfirmDialog from '../components/confirmDialog';
import ObservacaoTableHeader from '../components/observacaoTableHeader';
import ObservacaoRow from '../components/observacaoRow';
import EditObservacaoModal from '../components/editObservacaoModal';

import { db } from '../../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

const UtenteObservacoesScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [observacoes, setObservacoes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [observacaoSelecionada, setObservacaoSelecionada] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;
  const utenteId = 'LTfg1FuEmt0qrTspXFrD';

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchObservacoes = async () => {
      try {
        const q = query(collection(db, 'observacoes'), where('utenteId', '==', utenteId));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao || 'Sem descricao',
          dataHora: doc.data().dataHora || '',
          date: doc.data().dataHora ? doc.data().dataHora.split('T')[0] : 'Sem data',
        }));
        setObservacoes(fetched);
      } catch (error) {
        console.error('Erro ao buscar observacoes:', error);
      }
    };
    fetchObservacoes();
  }, []);

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
      setObservacoes(prev =>
        prev.map(o => (o.id === updatedObs.id ? { ...o, ...updatedObs } : o))
      );
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
      setObservacoes(prev => prev.filter(o => !idsToDelete.includes(o.id)));
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
            onPress={() => console.log('Agendar Observacao')}
          >
            {!isCompact && 'Agendar Observacao'}
          </Button>

          <IconButton icon="pencil" onPress={handleEditPress} />
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
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
