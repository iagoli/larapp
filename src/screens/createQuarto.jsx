import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SelectInput from '../components/selectInput'; 
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

const CreateQuarto = () => {
  const [camas, setCamas] = useState('');
  const [numero, setNumero] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [activeTab, setActiveTab] = useState('Quarto');

  const disponibilidadeOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: 'Disponível', value: 'disponivel' },
    { label: 'Ocupado', value: 'ocupado' },
    { label: 'Em Manutenção', value: 'manutencao' },
  ];

  const quartoOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
  ];

  const handleSave = () => {
    console.log({
      camas,
      numero,
      disponibilidade
    });
    // Lógica para salvar os dados do quarto futuramente
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Novo Quarto</Title>

        <Label>Camas</Label>
        <TextInputField 
          value={camas} 
          onChangeText={setCamas} 
          placeholder="Digite a quantidade de camas"
          keyboardType="numeric" 
        />

        <Label>Número</Label>
        <SelectInput
          selectedValue={numero}
          onValueChange={setNumero}
          items={quartoOptions} 
        />

        <Label>Disponibilidade</Label>
        <SelectInput
          selectedValue={disponibilidade}
          onValueChange={setDisponibilidade}
          items={disponibilidadeOptions}
        />

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateQuarto;
