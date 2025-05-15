import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteAtividadeScreen_styles';
import AtividadeRow from '../components/atividadeRow';
import AtividadeTableHeader from '../components/atividadeTableHeader';
import ConfirmDialog from '../components/confirmDialog';
import EditAtividadeModal from '../components/editAtividadeModal';

import { db } from '../../firebase.config';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const UtenteAtividadeScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;
  const [atividades, setAtividades] = useState([]);

  const utenteId = 'LTfg1FuEmt0qrTspXFrD'; // ← replace with dynamic later

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchAtividades = async () => {
    try {
      const q = query(
        collection(db, 'atividades'),
        where('utenteId', '==', utenteId)
      );

      const querySnapshot = await getDocs(q);
      const fetched = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAtividades(fetched);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  useEffect(() => {
    fetchAtividades();
  }, []);

  const handleDelete = async () => {
    const selectedIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);

    try {
      await Promise.all(
        selectedIds.map((id) => deleteDoc(doc(db, 'atividades', id)))
      );
      setShowDeleteDialog(false);
      setSelectedItems({});
      fetchAtividades();
    } catch (error) {
      console.error('Erro ao excluir atividades:', error);
    }
  };

  const handleEditSave = async (updatedData) => {
    try {
      const docRef = doc(db, 'atividades', updatedData.id);
      await updateDoc(docRef, {
        atividade: updatedData.atividade,
        dataHora: updatedData.dataHora,
        descricao: updatedData.descricao,
      });

      setEditModalVisible(false);
      setCurrentEditItem(null);
      fetchAtividades();
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  };

  const handleEditPress = () => {
    const firstSelectedId = Object.keys(selectedItems).find((id) => selectedItems[id]);
    const item = atividades.find((a) => a.id === firstSelectedId);

    if (item) {
      setCurrentEditItem(item);
      setEditModalVisible(true);
    } else {
      alert('Selecione uma atividade para editar.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Atividade</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />

          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar Cuidado')}
          >
            {!isCompact && 'Agendar Atividade'}
          </Button>

          <IconButton icon="pencil" onPress={handleEditPress} />
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
        </View>

        <AtividadeTableHeader />

        {atividades.map((item) => (
          <AtividadeRow
            key={item.id}
            item={item}
            selected={selectedItems[item.id]}
            onToggle={() => toggleCheckbox(item.id)}
          />
        ))}
      </ScrollView>

      {/* Confirmar Exclusão */}
      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar Remoção"
        message="Tem certeza que deseja remover os itens selecionados?"
      />

      {/* Modal de Edição */}
      <EditAtividadeModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEditSave}
        atividadeData={currentEditItem}
      />
    </View>
  );
};

export default UtenteAtividadeScreen;
