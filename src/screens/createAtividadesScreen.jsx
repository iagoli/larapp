import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import HeaderButtons from '../components/HeaderButtons';
import BottomTabBar from '../components/BottomTabBar';
import DateTimeInput from '../components/DateTimeInput'; 
import userScreenStyles from '../styles/userScreen_styles';
import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';

const CreateAtividadesScreen = () => {
  const utenteId = 'UTENTE_TESTE_123'; // temporary hardcoded value

  const [atividade, setAtividade] = useState('');
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
      await addDoc(collection(db, 'atividades'), {
        atividade,
        dataHora: dataHora.toISOString(),
        descricao,
        createdAt: serverTimestamp(),
        userId: user.uid,
        utenteId, // now saved with the document
      });
      console.log('Atividade adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
    }
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Label>Atividade</Label>
        <TextInputField
          value={atividade}
          onChangeText={setAtividade}
          placeholder="Digite a atividade"
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

export default CreateAtividadesScreen;
