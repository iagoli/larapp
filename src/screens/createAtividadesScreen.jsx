import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/HeaderButtons';
import userScreenStyles from '../styles/userScreen_styles';

const CreateAtividadesScreen = () => {
  const [atividade, setAtividade] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSave = () => {
    console.log({
      atividade,
      dataHora,
      descricao,
    });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />
      
      <Label>Atividade</Label>
      <TextInputField
        value={atividade}
        onChangeText={setAtividade}
        placeholder="Value"
      />

      <Label>Data/Hora</Label>
      <TextInputField
        value={dataHora}
        onChangeText={setDataHora}
        placeholder="Value"
        keyboardType="numeric" 
      />

      <Label>Descrição</Label>
      <TextInputField
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Value"
        multiline 
      />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateAtividadesScreen;