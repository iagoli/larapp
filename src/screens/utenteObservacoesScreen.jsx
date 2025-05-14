import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteObservacoesScreen_styles';
import ConfirmDialog from '../components/confirmDialog';
import ObservacaoTableHeader from '../components/observacaoTableHeader';
import ObservacaoRow from '../components/observacaoRow';

import { db } from '../../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UtenteObservacoesScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [observacoes, setObservacoes] = useState([]);
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
          descricao: doc.data().descricao || 'Sem descrição',
          date: doc.data().dataHora ? doc.data().dataHora.split('T')[0] : 'Sem data',
        }));
        setObservacoes(fetched);
      } catch (error) {
        console.error('Erro ao buscar observações:', error);
      }
    };

    fetchObservacoes();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Utente Observações</Text>

        <View style={styles.header}>
          <Avatar.Icon icon="account" size={48} style={styles.avatar} />
          <Button
            icon="calendar-plus"
            mode="outlined"
            style={styles.scheduleButton}
            onPress={() => console.log('Agendar Observação')}
          >
            {!isCompact && 'Agendar Observação'}
          </Button>
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
          console.log('Observações removidas...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />
    </View>
  );
};

export default UtenteObservacoesScreen;
