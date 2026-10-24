import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SelectInput from '../components/selectInput';
import SaveButton from '../components/saveButton';
import PhotoUploader from '../components/photoUploader';
import HeaderButtons from '../components/headerButtons';
import BottomTabBar from '../components/bottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app, db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as uuid from 'uuid';
import { apiPost } from '../services/api';

const CreateUserScreen = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [utenteId, setUtenteId] = useState('');
  const [utentes, setUtentes] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);
  const [activeTab, setActiveTab] = useState('Utilizadores');

  const tipoUsuarioOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Enfermeiro', value: 'enfermeiro' },
    { label: 'Utente', value: 'utente' },
  ];

  useEffect(() => {
    const fetchUtentes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'utentes'));
        const options = snapshot.docs.map(doc => ({
          label: doc.data().nome,
          value: doc.id,
        }));
        setUtentes([{ label: 'Selecione um utente (opcional)', value: '' }, ...options]);
      } catch (error) {
        console.error('Erro ao carregar utentes:', error);
      }
    };

    fetchUtentes();
  }, []);

  const handleSave = async () => {
    if (!nome || !email || !telemovel || !morada || !tipoUsuario) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Upload photo
      let photoUrl = null;
      if (photoUri) {
        const storage = getStorage(app);
        const imageRef = ref(storage, `users/${uuid.v4()}.jpg`);
        const response = await fetch(photoUri);
        const blob = await response.blob();

        await uploadBytes(imageRef, blob);
        photoUrl = await getDownloadURL(imageRef);
      }

      // O backend cria a conta com o Admin SDK, sem trocar a sessão do admin
      await apiPost('/users', {
        nome,
        idade,
        email,
        telemovel,
        morada,
        tipoUsuario,
        utenteId: utenteId || null,
        photoUrl,
      });

      // O novo utilizador define a própria senha através deste email
      await sendPasswordResetEmail(getAuth(app), email);

      Alert.alert('Sucesso', `Utilizador criado. Foi enviado um email para ${email} para definir a senha.`);

      // Reset form
      setNome('');
      setIdade('')
      setEmail('');
      setTelemovel('');
      setMorada('');
      setTipoUsuario('');
      setUtenteId('');
      setPhotoUri(null);

    } catch (error) {
      console.error('Erro ao criar utilizador:', error);
      Alert.alert('Erro', error.message || 'Erro ao criar utilizador.');
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} />

        <Title>Novo Utilizador</Title>

        <Label>Nome</Label>
        <TextInputField value={nome} onChangeText={setNome} placeholder="Nome" />
       
        <Label>Idade</Label>
        <TextInputField
          value={idade}
          onChangeText={setIdade}
          placeholder="Idade"
          keyboardType="numeric"
        />
       
        <Label>Email</Label>
        <TextInputField value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />

        <Label>Telemóvel</Label>
        <TextInputField value={telemovel} onChangeText={setTelemovel} placeholder="Telemóvel" keyboardType="phone-pad" />

        <Label>Morada</Label>
        <TextInputField value={morada} onChangeText={setMorada} placeholder="Morada" />

        <SelectInput
          label="Tipo de Usuário"
          selectedValue={tipoUsuario}
          onValueChange={setTipoUsuario}
          items={tipoUsuarioOptions}
        />

        <SelectInput
          label="Utente Associado"
          selectedValue={utenteId}
          onValueChange={setUtenteId}
          items={utentes}
        />

        <PhotoUploader onImageSelected={setPhotoUri} />

        <SaveButton onPress={handleSave} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default CreateUserScreen;
