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
import { db } from '../../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';

const CreateAlimentacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [prato, setPrato] = useState('');
  const [activeTab, setActiveTab] = useState('Home');

  const utenteId = 'LTfg1FuEmt0qrTspXFrD'; // Temporary hardcoded ID

  const handleSave = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.warn('User not logged in');
      return;
    }

    try {
      await addDoc(collection(db, 'alimentacoes'), {
        dataHora: dataHora.toISOString(),
        prato,
        createdAt: serverTimestamp(),
        createdBy: user.uid,     
        utenteId,
      });
      console.log('Alimentação adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar alimentação:', error);
    }
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Alimentações</Title>

        <Label>Data/Hora</Label>
        <DateTimeInput value={dataHora} onChange={setDataHora} />

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
