import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button, Checkbox } from 'react-native-paper';
import ConfirmDialog from '../components/confirmDialog';
import styles from '../styles/utenteMedicacaoScreen_styles';
import { db } from '../../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UtenteMedicacaoScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [medications, setMedications] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const utenteId = 'LTfg1FuEmt0qrTspXFrD'; 

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
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
          };
        });

        setMedications(data);
      } catch (error) {
        console.error('Erro ao buscar medicações:', error);
      }
    };

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
          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
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
        onConfirm={() => {
          console.log('Confirm delete...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />
    </View>
  );
};

export default UtenteMedicacaoScreen;
