import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteRefeicoesScreen_styles';
import RefeicaoRow from '../components/refeicaoRow';
import RefeicaoTableHeader from '../components/refeicaoTableHeader';
import ConfirmDialog from '../components/confirmDialog';
import EditAlimentacaoModal from '../components/editAlimentacaoModal'; 
import { useRoute } from '@react-navigation/native';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useUtenteRegistos } from '../hooks/useUtenteRegistos';

const UtenteRefeicoesScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const route = useRoute();
  const { utenteId } = route.params;

  const { registos } = useUtenteRegistos('alimentacoes', utenteId);
  const refeicoes = registos.map((item) => ({
    id: item.id,
    prato: item.prato || 'Sem prato',
    dataHora: item.dataHora || '',
    date: item.dataHora ? new Date(item.dataHora).toISOString().split('T')[0] : 'Sem data',
  }));

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = Object.entries(selectedItems)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => id);

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, 'alimentacoes', id));
      }

      setSelectedItems({});
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Erro ao deletar refeições:', err);
    }
  };

  const openEditModal = () => {
    const selectedId = Object.entries(selectedItems).find(([_, selected]) => selected)?.[0];

    if (selectedId) {
      const itemToEdit = refeicoes.find((r) => r.id === selectedId);
      setEditingItem(itemToEdit);
      setEditModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Refeições</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />
          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar')}
          >
            {!isCompact && 'Agendar Refeição'}
          </Button>

          <IconButton icon="pencil" onPress={openEditModal} />
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
        </View>

        <RefeicaoTableHeader />

        {refeicoes.length === 0 ? (
          <Text style={{ padding: 16, color: 'gray' }}>Nenhuma refeição encontrada</Text>
        ) : (
          refeicoes.map((item) => (
            <RefeicaoRow
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
        message="Tem a certeza que deseja remover os itens selecionados?"
      />

      <EditAlimentacaoModal
        visible={editModalVisible}
        alimentacao={editingItem}
        onClose={() => setEditModalVisible(false)}
      />
    </View>
  );
};

export default UtenteRefeicoesScreen;
