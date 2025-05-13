import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import styles from '../styles/editRoomModal_styles'; 

const EditRoomModal = ({ visible, room, onClose, onSaved }) => {
  const [number, setNumber] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    if (room) {
      setNumber(room.number || '');
      setAvailability(room.availability || '');
    }
  }, [room]);

  const handleSave = async () => {
    if (!room?.id) return;

    try {
      await updateDoc(doc(db, 'rooms', room.id), {
        number,
        availability,
      });

      onClose();
      if (onSaved) onSaved(); 
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Quarto</Text>

          <Text style={styles.label}>Número do Quarto</Text>
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder="Ex: 101"
            style={styles.input}
          />

          <Text style={styles.label}>Disponibilidade</Text>
          <TextInput
            value={availability}
            onChangeText={setAvailability}
            placeholder="Ex: disponível / ocupado"
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

export default EditRoomModal;
