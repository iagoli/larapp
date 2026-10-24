import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SelectInput from '../components/selectInput';
import SaveButton from '../components/saveButton';
import HeaderButtons from '../components/headerButtons';
import userScreenStyles from '../styles/userScreen_styles';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase.config';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';

const CreateQuarto = ({ navigation }) => {
  const [camas, setCamas] = useState('');
  const [numero, setNumero] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  
  const disponibilidadeOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: 'Disponível', value: 'disponivel' },
    { label: 'Ocupado', value: 'ocupado' },
    { label: 'Em Manutenção', value: 'manutencao' },
  ];

  const handleSave = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Erro', 'Usuário não está autenticado.');
      return;
    }

    if (!camas || !numero || !disponibilidade) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      const quartosRef = collection(db, 'rooms');
      const q = query(quartosRef, where('numero', '==', numero));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        Alert.alert('Erro', `O quarto número ${numero} já existe.`);
        return;
      }

      await addDoc(quartosRef, {
        camas,
        numero,
        disponibilidade,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      Alert.alert('Sucesso', 'Quarto adicionado com sucesso!');
      setCamas('');
      setNumero('');
      setDisponibilidade('');
    } catch (error) {
      console.error('Erro ao salvar quarto:', error);
      Alert.alert('Erro', 'Erro ao salvar. Tente novamente.');
    }
  };

  const handleBack = () =>  navigation.goBack();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} />

        <Title>Novo Quarto</Title>

        <Label>Camas</Label>
        <TextInputField
          value={camas}
          onChangeText={setCamas}
          placeholder="Digite a quantidade de camas"
          keyboardType="numeric"
        />

        <Label>Número</Label>
        <TextInputField
          value={numero}
          onChangeText={setNumero}
          placeholder="Digite o número do quarto"
          keyboardType="numeric"
        />

        <Label>Disponibilidade</Label>
        <SelectInput
          selectedValue={disponibilidade}
          onValueChange={setDisponibilidade}
          items={disponibilidadeOptions}
        />

        <SaveButton onPress={handleSave} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default CreateQuarto;
