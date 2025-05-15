import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteAtividadeScreen_styles';
import AtividadeRow from '../components/atividadeRow';
import AtividadeTableHeader from '../components/atividadeTableHeader';
import ConfirmDialog from '../components/confirmDialog';

import { db } from '../../firebase.config';
import {
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';

const UtenteAtividadeScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;
  const [atividades, setAtividades] = useState([]);

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const utenteId = 'LTfg1FuEmt0qrTspXFrD'; // ← replace with dynamic later

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

    fetchAtividades();
  }, []);

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

          <IconButton icon="pencil" onPress={() => console.log('Editar')} />
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

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          console.log('Atividades removidas...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />
    </View>
  );
};

export default UtenteAtividadeScreen;
