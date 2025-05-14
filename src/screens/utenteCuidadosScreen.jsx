import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteCuidadosScreen_styles';
import CuidadosRow from '../components/cuidadosRow';
import CuidadosTableHeader from '../components/cuidadosTableHeader';
import ConfirmDialog from '../components/confirmDialog';

import { db } from '../../firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const UtenteCuidadosScreen = () => {
  const [cuidados, setCuidados] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const utenteId = 'LTfg1FuEmt0qrTspXFrD';

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchCuidados = async () => {
      try {
        const q = query(collection(db, 'cuidados'), where('utenteId', '==', utenteId));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => {
          const item = doc.data();
          return {
            id: doc.id,
            acao: item.acao || 'Sem ação',
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

    fetchCuidados();
  }, []);

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
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
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
        onConfirm={() => {
          console.log('Cuidados removidos...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />
    </View>
  );
};

export default UtenteCuidadosScreen;
