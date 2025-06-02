import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button, Checkbox } from 'react-native-paper';
import ConfirmDialog from '../components/confirmDialog';
import EditMedicacaoModal from '../components/editMedicacaoModal';
import styles from '../styles/utenteMedicacaoScreen_styles';
import { db } from '../../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const UtenteMedicacaoScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const [medicamento, setMedicamento] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [quantidade, setQuantidade] = useState('');

  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchMedicacoes = async () => {
    try {
      const q = query(collection(db, 'medicacoes'), where('utenteId', '==', utenteId));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => {
        const item = doc.data();
        const date = item.dataHora
          ? new Date(item.dataHora).toLocaleDateString('pt-PT')
          : 'Sem data';

        return {
          id: doc.id,
          name: item.medicamento || 'Sem nome',
          date,
          quantity: item.quantidade || 'Sem quantidade',
          rawDate: item.dataHora,
        };
      });

      setMedications(data);
    } catch (error) {
      console.error('Erro ao buscar medicações:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = Object.keys(selectedItems).filter((id) => selectedItems[id]);
      await Promise.all(
        idsToDelete.map((id) => deleteDoc(doc(db, 'medicacoes', id)))
      );
      setSelectedItems({});
      setShowDeleteDialog(false);
      fetchMedicacoes();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setMedicamento(item.name);
    setDataHora(new Date(item.rawDate));
    setQuantidade(item.quantity);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!currentItem) return;
    try {
      await updateDoc(doc(db, 'medicacoes', currentItem.id), {
        medicamento,
        dataHora: dataHora.toISOString(),
        quantidade,
      });
      setShowEditModal(false);
      setCurrentItem(null);
      fetchMedicacoes();
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  };

  useEffect(() => {
    fetchMedicacoes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Medicação</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />
          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar')}
          >
            {!isCompact && 'Agendar Medicação'}
          </Button>
          <IconButton icon="pencil" onPress={() => {
            const selectedId = Object.keys(selectedItems).find(id => selectedItems[id]);
            const item = medications.find((m) => m.id === selectedId);
            if (item) handleEdit(item);
          }} disabled={!Object.values(selectedItems).includes(true)} />
          <IconButton
            icon="delete"
            onPress={() => setShowDeleteDialog(true)}
            disabled={!Object.values(selectedItems).includes(true)}
          />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.columnMedicamento]}>Medicamento</Text>
          <Text style={[styles.headerText, styles.columnData]}>Data</Text>
          <Text style={[styles.headerText, styles.columnQuantidade]}>Quantidade</Text>
        </View>

        {medications.map((item) => (
          <View key={item.id} style={styles.row}>
            <Checkbox
              status={selectedItems[item.id] ? 'checked' : 'unchecked'}
              onPress={() => toggleCheckbox(item.id)}
            />
            <Text style={[styles.cell, styles.columnMedicamento]}>{item.name}</Text>
            <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
            <Text style={[styles.cell, styles.columnQuantidade]}>{item.quantity}</Text>
          </View>
        ))}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />

      <EditMedicacaoModal
        visible={showEditModal}
        onDismiss={() => setShowEditModal(false)}
        medicamento={medicamento}
        setMedicamento={setMedicamento}
        dataHora={dataHora}
        setDataHora={setDataHora}
        quantidade={quantidade}
        setQuantidade={setQuantidade}
        onSave={handleSaveEdit}
      />
    </View>
  );
};

export default UtenteMedicacaoScreen;
