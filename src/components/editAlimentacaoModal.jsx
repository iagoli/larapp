import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import styles from '../styles/editRoomModal_styles'; 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const EditAlimentacaoModal = ({ visible, alimentacao, onClose, onSaved }) => {
  const [prato, setPrato] = useState('');
  const [dataHora, setDataHora] = useState('');

  useEffect(() => {
    if (alimentacao) {
      setPrato(alimentacao.prato || '');
      setDataHora(alimentacao.dataHora || '');
    }
  }, [alimentacao]);

  const handleSave = async () => {
    if (!alimentacao?.id) return;

    try {
      await updateDoc(doc(db, 'alimentacoes', alimentacao.id), {
        prato,
        dataHora,
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

          <Text style={styles.label}>Prato</Text>
          <TextInput
            value={prato}
            onChangeText={setPrato}
            style={styles.input}
          />

          <Text style={styles.label}>Data/Hora</Text>
          <TextInput
            value={dataHora}
            onChangeText={setDataHora}
            style={styles.input}
          />

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
