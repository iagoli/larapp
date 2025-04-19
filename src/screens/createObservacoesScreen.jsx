import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import userScreenStyles from '../styles/userScreen_styles';


const CreateObservacoesScreen = () => {
  const [dataHora, setDataHora] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSave = () => {
    console.log({
      dataHora,
      descricao,
    });
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
        <Title>Observações</Title>

      <Label>Data/Hora</Label>
      <TextInputField
        value={dataHora}
        onChangeText={setDataHora}
        placeholder="numeric"
      />

      <Label>Descrição</Label>
      <TextInputField
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Value"
     />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateObservacoesScreen;