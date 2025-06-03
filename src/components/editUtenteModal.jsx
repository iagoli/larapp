import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase.config';

const EditUtenteModal = ({ visible, utente, onClose, navigation }) => {
  const [nome, setNome] = useState('');
  const [quarto, setQuarto] = useState('');
  const [idade, setIdade] = useState('');

  useEffect(() => {
    if (utente) {
      setNome(utente.nome || '');
      setQuarto(utente.quarto || '');
      setIdade(String(utente.idade || ''));
    }
  }, [utente]);

  const handleSave = async () => {
    if (!utente?.id) return;

    const utenteRef = doc(db, 'utentes', utente.id);
    await updateDoc(utenteRef, {
      nome,
      quarto,
      idade: Number(idade),
    });

    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Editar Utilizador</Text>

          <Text> Nome:</Text>
          <TextInput value={nome} onChangeText={setNome} style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }} />

          <Text> Quarto:</Text>
          <TextInput value={quarto} onChangeText={setQuarto} style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }} />

          <Text> Idade:</Text>
          <TextInput
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            style={{ borderBottomWidth: 1, marginBottom: 20, padding: 5 }}
          />

          <Pressable onPress={handleSave} style={{ backgroundColor: '#5e3b7f', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text>
          </Pressable>

          <Pressable onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: '#5e3b7f', textAlign: 'center' }}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default EditUtenteModal;
