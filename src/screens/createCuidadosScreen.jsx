import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import HeaderButtons from '../components/HeaderButtons';
import BottomTabBar from '../components/BottomTabBar';
import DateTimeInput from '../components/DateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';

const CreateCuidadosScreen = () => {
  const [acao, setAcao] = useState('');
  const [dataHora, setDataHora] = useState(new Date()); 
  const [descricao, setDescricao] = useState('');
  const [activeTab, setActiveTab] = useState('Home'); 

  const handleSave = () => {
    console.log({ 
      acao, 
      dataHora: dataHora.toISOString(), 
      descricao });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Label>Ação efetuada</Label>
        <TextInputField
          value={acao}
          onChangeText={setAcao}
          placeholder="Digite a ação"
          keyboardType="default"
        />

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

export default CreateCuidadosScreen;