import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import styles from '../styles/editRoomModal_styles';

const EditRoomModal = ({ visible, room, onClose, onSaved }) => {
  const [numero, setNumero] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [camas, setCamas] = useState('');

  useEffect(() => {
    if (room) {
      setNumero(room.numero || '');
      setDisponibilidade(room.disponibilidade || '');
      setCamas(room.camas || '');
    }
  }, [room]);

  const handleSave = async () => {
    if (!room?.id) return;

    try {
      await updateDoc(doc(db, 'rooms', room.id), {
        numero,
        disponibilidade,
        camas,
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
            value={numero}
            onChangeText={setNumero}
            placeholder="Ex: 101"
            style={styles.input}
          />

          <Text style={styles.label}>Número de Camas</Text>
          <TextInput
            value={camas}
            onChangeText={setCamas}
            placeholder="Ex: 3"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Disponibilidade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={disponibilidade}
              onValueChange={(itemValue) => setDisponibilidade(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma opção" value="" />
              <Picker.Item label="Disponível" value="disponivel" />
              <Picker.Item label="Ocupado" value="ocupado" />
              <Picker.Item label="Em Manutenção" value="manutencao" />
            </Picker>
          </View>

          <View style={styles.buttonRow}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>

            <Pressable onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditRoomModal;
