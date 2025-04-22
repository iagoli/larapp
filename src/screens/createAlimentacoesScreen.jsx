import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Title from '../components/title';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import DateTimeInput from '../components/dateTimeInput'; 
import Label from '../components/label';
import userScreenStyles from '../styles/userScreen_styles';

const CreateAlimentacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [prato, setPrato] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const handleSave = () => {
    console.log({
      dataHora: dataHora.toISOString(),
      prato,
    });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Alimentações</Title>

        <Label>Data/Hora</Label>
        <DateTimeInput
          value={dataHora}
          onChange={setDataHora}
        />

        <TextInputField
          value={prato}
          onChangeText={setPrato}
          placeholder="Prato"
          style={{ marginTop: 16 }}
        />

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateAlimentacoesScreen;
