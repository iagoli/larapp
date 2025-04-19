import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import userScreenStyles from '../styles/userScreen_styles';

const CreateCuidadosScreen = () => {
  const [acao, setAcao] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSave = () => {
    console.log({
      acao,
      dataHora,
      descricao,
    });
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Label>Ação efetuada</Label>
      <TextInputField
        value={acao}
        onChangeText={setAcao}
        placeholder="Value"
        keyboardType="Value"
      />

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

export default CreateCuidadosScreen;