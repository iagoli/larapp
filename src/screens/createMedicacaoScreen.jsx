import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import userScreenStyles from '../styles/userScreen_styles';

const CreateMedicacaoScreen = () => {
  const [medicamento, setMedicamento] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSave = () => {
    console.log({
      medicamento,
      dataHora,
      quantidade,
    });
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Label>Medicamento</Label>
      <TextInputField
        value={medicamento}
        onChangeText={setMedicamento}
        placeholder="Value"
      />

      <Label>Data/Hora Administrada</Label>
      <TextInputField
        value={dataHora}
        onChangeText={setDataHora}
        placeholder="numeric"
      />

      <Label>Quantidade</Label>
      <TextInputField
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Value"
        keyboardType="numeric"
      />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateMedicacaoScreen;