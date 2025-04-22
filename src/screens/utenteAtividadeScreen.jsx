import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteAtividadeScreen_styles';
import AtividadeRow from '../components/atividadeRow';
import AtividadeTableHeader from '../components/atividadeTableHeader';
import ConfirmDialog from '../components/confirmDialog';

const dummyAtividades = [
  { id: '1', atividade: 'Leitura', date: '2025-04-18', observacoes: 'Leu durante 30 min' },
  { id: '2', atividade: 'Caminhada', date: '2025-04-19', observacoes: '20 min ao sol' },
];

const UtenteAtividadeScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isCompact = screenWidth < 360;

  const toggleCheckbox = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
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

          <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
          <IconButton icon="plus" onPress={() => console.log('Add')} />
        </View>

        <AtividadeTableHeader />

        {dummyAtividades.map((item) => (
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
