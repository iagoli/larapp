import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import DateTimeInput from '../components/dateTimeInput'
import userScreenStyles from '../styles/userScreen_styles';

const CreateMedicacaoScreen = () => {
  const [medicamento, setMedicamento] = useState('');
  const [dataHora, setDataHora] = useState(new Date()); 
  const [quantidade, setQuantidade] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const handleSave = () => {
    console.log({
      medicamento,
      dataHora: dataHora.toISOString(),
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

        <Label>Data/Hora</Label>
        <DateTimeInput
          value={dataHora}
          onChange={setDataHora}
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
