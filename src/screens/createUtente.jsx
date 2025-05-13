import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import PhotoUploader from '../components/photoUploader';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

import { db } from '../../firebase.config';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as uuid from 'uuid';

const CreateUtente = () => {
  const [nome, setNome] = useState('');
  const [quarto, setQuarto] = useState('');
  const [idade, setIdade] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [activeTab, setActiveTab] = useState('Utentes');

  const handleSave = async () => {
    if (!nome || !quarto || !idade) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      let photoUrl = null;

      if (photoUri) {
        const storage = getStorage(app);
        const imageRef = ref(storage, `utentes/${uuid.v4()}.jpg`);
        const response = await fetch(photoUri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);
        photoUrl = await getDownloadURL(imageRef);
      }

      // Generate a new document with a custom ID
      const docRef = doc(collection(db, 'utentes'));

      await setDoc(docRef, {
        utenteId: docRef.id,
        nome,
        quarto,
        idade,
        photoUrl,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      Alert.alert('Sucesso', 'Utente criado com sucesso!');
      setNome('');
      setQuarto('');
      setIdade('');
      setPhotoUri(null);
    } catch (error) {
      console.error('Erro ao salvar utente:', error);
      Alert.alert('Erro', 'Erro ao salvar. Tente novamente.');
    }
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
          placeholder="Digite o nome" 
        />

        <Label>Quarto</Label>
        <TextInputField 
          value={quarto} 
          onChangeText={setQuarto} 
          placeholder="Número do quarto"
          keyboardType="numeric" 
        />

        <Label>Idade</Label>
        <TextInputField 
          value={idade} 
          onChangeText={setIdade} 
          placeholder="Idade"
          keyboardType="numeric" 
        />

        <PhotoUploader onImageSelected={setPhotoUri} />

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateUtente;
