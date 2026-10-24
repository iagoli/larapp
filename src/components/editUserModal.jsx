import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import styles from '../styles/editRoomModal_styles'; 

const EditUserModal = ({ visible, user, onClose, onSaved }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState('');
  const [idade, setIdade] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    if (user) {
      setNome(user.nome || '');
      setEmail(user.email || '');
      setTelemovel(user.telemovel || '');
      setMorada(user.morada || '');
      setIdade(String(user.idade || ''));
      setTipoUsuario(user.tipoUsuario || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      await updateDoc(doc(db, 'users', user.id), {
        nome,
        email,
        telemovel,
        morada,
        idade: Number(idade),
        tipoUsuario,
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
          <Text style={styles.title}>Editar Utilizador</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Telemóvel</Text>
          <TextInput
            value={telemovel}
            onChangeText={setTelemovel}
            placeholder="Telemóvel"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Morada</Text>
          <TextInput
            value={morada}
            onChangeText={setMorada}
            placeholder="Rua, cidade..."
            style={styles.input}
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            placeholder="Idade"
            style={styles.input}
          />

          <Text style={styles.label}>Tipo de Utilizador</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoUsuario}
              onValueChange={(itemValue) => setTipoUsuario(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma opção" value="" />
              <Picker.Item label="Administrador" value="admin" />
              <Picker.Item label="Enfermeiro" value="enfermeiro" />
              <Picker.Item label="Utente" value="utente" />
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

export default EditUserModal;
