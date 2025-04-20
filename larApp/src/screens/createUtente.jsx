import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/Title';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import PhotoUploader from '../components/PhotoUploader';
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