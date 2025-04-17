import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import PhotoUploader from '../components/photoUploader';
import userScreenStyles from '../styles/userScreen_styles';

const NewPatientScreen = () => {
  const [nome, setNome] = useState('');
  const [quarto, setQuarto] = useState('');
  const [idade, setIdade] = useState('');

  const handleSave = () => {
    console.log({
      nome,
      quarto,
      idade
    });
    // Aqui você adicionaria a lógica para salvar os dados
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Title>Novo Utente</Title>

      <Label>Nome</Label>
      <TextInputField 
        value={nome} 
        onChangeText={setNome} 
        placeholder="Value" 
      />

      <Label>Quarto</Label>
      <TextInputField 
        value={quarto} 
        onChangeText={setQuarto} 
        placeholder="Value"
        keyboardType="numeric" 
      />

      <Label>Idade</Label>
      <TextInputField 
        value={idade} 
        onChangeText={setIdade} 
        placeholder="Value"
        keyboardType="numeric" 
      />

      <PhotoUploader />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default NewPatientScreen;