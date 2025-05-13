import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';
import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';

const CreateCuidadosScreen = () => {
  const utenteId = 'UTENTE_TESTE_123'; // Temporary hardcoded value

  const [acao, setAcao] = useState('');
  const [dataHora, setDataHora] = useState(new Date()); 
  const [descricao, setDescricao] = useState('');
  const [activeTab, setActiveTab] = useState('Home'); 

  const handleSave = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.warn('User not logged in');
      return;
    }

    try {
      await addDoc(collection(db, 'cuidados'), {
        acao,
        dataHora: dataHora.toISOString(),
        descricao,
        createdAt: serverTimestamp(),
        userId: user.uid,
        utenteId,
      });
      console.log('Cuidado adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar cuidado:', error);
    }
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
