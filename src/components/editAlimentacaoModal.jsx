import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import styles from '../styles/editRoomModal_styles'; 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import DateTimeInput from '../components/dateTimeInput';
import TextInputField from '../components/textInputField';
import Label from '../components/label';

const EditAlimentacaoModal = ({ visible, alimentacao, onClose, onSaved }) => {
  const [prato, setPrato] = useState('');
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    if (alimentacao) {
      setPrato(alimentacao.prato || '');
      setDataHora(alimentacao.dataHora ? new Date(alimentacao.dataHora) : new Date());
    }
  }, [alimentacao]);

  const handleSave = async () => {
    if (!alimentacao?.id) return;

    try {
      await updateDoc(doc(db, 'alimentacoes', alimentacao.id), {
        prato,
        dataHora: dataHora.toISOString(),
      });

      onClose();
      if (onSaved) onSaved();
    } catch (error) {
      console.error('Erro ao salvar alimentação:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Alimentação</Text>

          <Label>Prato</Label>
          <TextInputField
            value={prato}
            onChangeText={setPrato}
            placeholder="Prato"
          />

          <Label style={{ marginTop: 16 }}>Data/Hora</Label>
          <DateTimeInput value={dataHora} onChange={setDataHora} />

          <View style={styles.buttonRow}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditAlimentacaoModal;
