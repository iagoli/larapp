import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text, Avatar, IconButton, Button } from 'react-native-paper';
import styles from '../styles/utenteCuidadosScreen_styles';
import CuidadosRow from '../components/CuidadosRow';
import CuidadosTableHeader from '../components/CuidadosTableHeader';
import ConfirmDialog from '../components/confirmDialog';

const dummyCuidados = [
  { id: '1', acao: 'Curativo', date: '2025-04-18', descricao: 'Curativo no braço direito' },
  { id: '2', acao: 'Consulta', date: '2025-04-19', descricao: 'Consulta de rotina' },
];

const UtenteCuidadosScreen = () => {
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

        {dummyCuidados.map((item) => (
          <CuidadosRow
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
