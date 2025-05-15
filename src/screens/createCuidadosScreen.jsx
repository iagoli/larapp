import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Alert } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteCuidadosScreen_styles';
import CuidadosRow from '../components/cuidadosRow';
import CuidadosTableHeader from '../components/cuidadosTableHeader';
import ConfirmDialog from '../components/confirmDialog';
import EditCuidadoModal from '../components/editCuidadoModal';

import { db } from '../../firebase.config';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

const UtenteCuidadosScreen = () => {
  const [cuidados, setCuidados] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [cuidadoSelecionado, setCuidadoSelecionado] = useState(null);

  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const utenteId = 'LTfg1FuEmt0qrTspXFrD'; // fixo temporariamente

  const fetchCuidados = async () => {
    try {
      const q = query(collection(db, 'cuidados'), where('utenteId', '==', utenteId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => {
        const item = doc.data();
        return {
          id: doc.id,
          acao: item.acao || 'Sem ação',
          dataHora: item.dataHora || '',
          date: item.dataHora
            ? new Date(item.dataHora).toISOString().split('T')[0]
            : 'Sem data',
          descricao: item.descricao || 'Sem descrição',
        };
      });
      setCuidados(data);
    } catch (error) {
      console.error('Erro ao buscar cuidados:', error);
    }
  };

  useEffect(() => {
    fetchCuidados();
  }, []);

  const toggleCheckbox = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async () => {
    try {
      const idsParaRemover = Object.keys(selectedItems).filter(id => selectedItems[id]);
      await Promise.all(
        idsParaRemover.map(id => deleteDoc(doc(db, 'cuidados', id)))
      );
      setSelectedItems({});
      setShowDeleteDialog(false);
      fetchCuidados();
    } catch (error) {
      console.error('Erro ao remover cuidados:', error);
    }
  };

  const handleEdit = () => {
    const idSelecionado = Object.keys(selectedItems).find(id => selectedItems[id]);
    if (idSelecionado) {
      const cuidado = cuidados.find(c => c.id === idSelecionado);
      setCuidadoSelecionado(cuidado);
      setEditModalVisible(true);
    } else {
      Alert.alert('Selecione um cuidado para editar.');
    }
  };

  const handleSaveEdit = async (cuidadoAtualizado) => {
    try {
      await updateDoc(doc(db, 'cuidados', cuidadoAtualizado.id), {
        acao: cuidadoAtualizado.acao,
        dataHora: cuidadoAtualizado.dataHora.toISOString(),
        descricao: cuidadoAtualizado.descricao,
      });
      fetchCuidados();
    } catch (error) {
      console.error('Erro ao atualizar cuidado:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Cuidados</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />
          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar Cuidado')}
          >
            {!isCompact && 'Agendar Cuidado Médico'}
          </Button>

          <IconButton icon="pencil" onPress={handleEdit} />
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Adicionar cuidado')} />
        </View>

        <CuidadosTableHeader />

        {cuidados.length === 0 ? (
          <Text style={{ padding: 16, color: 'gray' }}>Nenhum cuidado encontrado</Text>
        ) : (
          cuidados.map((item) => (
            <CuidadosRow
              key={item.id}
              item={item}
              selected={selectedItems[item.id]}
              onToggle={() => toggleCheckbox(item.id)}
            />
          ))
        )}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar Remoção"
        message="Tem certeza de que deseja remover os itens selecionados?"
      />

      <EditCuidadoModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        cuidado={cuidadoSelecionado}
        onSave={handleSaveEdit}
      />
    </View>
  );
};

export default UtenteCuidadosScreen;
