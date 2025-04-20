import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import HeaderWithIcons from '../components/HeaderWithIcons';
import ConfirmDialog from '../components/ConfirmDialog';
import MedicationTableHeader from '../components/MedicationTableHeader';
import MedicationRow from '../components/MedicationRow';
import styles from '../styles/utenteMedicacaoScreen_styles';

const dummyMedications = [
  { id: '1', name: 'Paracetamol', date: '2025-04-18', quantity: '1x/dia' },
  { id: '2', name: 'Ibuprofeno', date: '2025-04-19', quantity: '2x/dia' },
];

const UtenteMedicacaoScreen = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isCompact = Dimensions.get('window').width < 360;

  const toggleCheckbox = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithIcons
          title="Utente Medicação"
          onEdit={() => {}}
          onDelete={() => setShowDeleteDialog(true)}
          onAdd={() => console.log('Add')}
          compact={isCompact}
          buttonLabel="Agendar"
        />

        <MedicationTableHeader />

        {dummyMedications.map((item) => (
          <MedicationRow
            key={item.id}
            item={item}
            checked={selectedItems[item.id]}
            onToggle={toggleCheckbox}
          />
        ))}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        onDismiss={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          console.log('Deleting...');
          setShowDeleteDialog(false);
        }}
        title="Confirmar Remoção"
        message="Tem a certeza que deseja remover os itens selecionados?"
      />
    </View>
  );
};

export default UtenteMedicacaoScreen;
