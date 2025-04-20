import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Title from '../components/Title';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import PhotoUploader from '../components/PhotoUploader';
import HeaderButtons from '../components/HeaderButtons';
import BottomTabBar from '../components/BottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

const CreateUtente = () => {
  const [nome, setNome] = useState('');
  const [quarto, setQuarto] = useState('');
  const [idade, setIdade] = useState('');
  const [activeTab, setActiveTab] = useState('Utentes');

  const handleSave = () => {
    console.log({
      nome,
      quarto,
      idade
    });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Novo Utente</Title>

        <Label>Nome</Label>
        <TextInputField 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Value" 
        />

        <Label>Quarto</Label>
        <TextInputField 
          value={quarto} 
          onChangeText={setQuarto} 
          placeholder="Value"
          keyboardType="numeric" 
        />

        <Label>Idade</Label>
        <TextInputField 
          value={idade} 
          onChangeText={setIdade} 
          placeholder="Value"
          keyboardType="numeric" 
        />

        <PhotoUploader />

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateUtente;
