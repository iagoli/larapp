import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/title';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import DateTimePickerField from '../components/dateTimePickerField'; 
import userScreenStyles from '../styles/userScreen_styles';

const CreateAlimentacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [prato, setPrato] = useState('');

  const handleSave = () => {
    console.log({
      dataHora: dataHora.toISOString(), // .toLocaleString() 
      prato,
    });
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Title>Alimentações</Title>

      <DateTimePickerField
        label="Data/Hora"
        value={dataHora}
        onChange={setDataHora}
      />

      <TextInputField
        value={prato}
        onChangeText={setPrato}
        placeholder="Prato"
      />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateAlimentacoesScreen;