import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import userScreenStyles from '../styles/userScreen_styles';


const CreateAlimentacoesScreen = () => {
  const [dataHora, setDataHora] = useState('');
  const [prato, setPrato] = useState('');

  const handleSave = () => {
    console.log({
      dataHora,
      prato,
    });
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
        <Title>Alimentações</Title>

      <Label>Data/Hora</Label>
      <TextInputField
        value={dataHora}
        onChangeText={setDataHora}
        placeholder="numeric"
      />

      <Label>Prato</Label>
      <TextInputField
        value={prato}
        onChangeText={setPrato}
        placeholder="Value"
     />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateAlimentacoesScreen;