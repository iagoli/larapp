import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import HeaderButtons from '../components/HeaderButtons';
import BottomTabBar from '../components/BottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

const CreateMedicacaoScreen = () => {
  const [medicamento, setMedicamento] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const handleSave = () => {
    console.log({
      medicamento,
      dataHora,
      quantidade,
    });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

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
          placeholder="Value"
          keyboardType="numeric"
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

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateMedicacaoScreen;
