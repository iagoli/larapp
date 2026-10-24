import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SelectInput from '../components/selectInput'; 
import SaveButton from '../components/saveButton';
import PhotoUploader from '../components/photoUploader';
import HeaderButtons from '../components/headerButtons';
import userScreenStyles from '../styles/userScreen_styles';
import { db } from '../../firebase.config';
import { collection, doc, setDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as uuid from 'uuid';

const CreateUtente = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [quarto, setQuarto] = useState('');
  const [idade, setIdade] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [quartosOptions, setQuartosOptions] = useState([]);

  useEffect(() => {
    const fetchQuartosDisponiveis = async () => {
      try {
        const quartosRef = collection(db, 'rooms');
        const q = query(quartosRef, where('disponibilidade', '==', 'disponivel'));
        const snapshot = await getDocs(q);

        const quartos = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            label: `Quarto ${data.numero}`,
            value: doc.id
          };
        });

        setQuartosOptions([
          { label: 'Selecione um quarto', value: '' },
          ...quartos
        ]);
      } catch (error) {
        console.error('Erro ao buscar quartos disponíveis:', error);
        Alert.alert('Erro', 'Não foi possível carregar os quartos disponíveis.');
        setQuartosOptions([{ label: 'Erro ao carregar', value: '' }]);
      }
    };

    fetchQuartosDisponiveis();
  }, []);

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

  const handleBack = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} />

        <Title>Novo Utente</Title>

        <Label>Nome</Label>
        <TextInputField 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Digite o nome" 
        />

        <Label>Quarto</Label>
        <SelectInput
          selectedValue={quarto || ''}
          onValueChange={setQuarto}
          items={quartosOptions}
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

    </SafeAreaView>
  );
};

export default CreateUtente;
