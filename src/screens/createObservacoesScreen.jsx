import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';

const CreateObservacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const handleSave = () => {
    console.log({ 
      dataHora: dataHora.toISOString(), 
      descricao });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Observações</Title>

        <Label>Data/Hora</Label>
        <DateTimeInput
          value={dataHora}
          onChange={setDataHora}
        />

        <Label>Descrição</Label>
        <TextInputField
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição"
          multiline
        />

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateObservacoesScreen;
