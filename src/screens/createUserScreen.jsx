import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Title from '../components/Title';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SelectInput from '../components/SelectInput'; 
import SaveButton from '../components/SaveButton';
import PhotoUploader from '../components/PhotoUploader'; 
import HeaderButtons from '../components/HeaderButtons';
import BottomTabBar from '../components/BottomTabBar';
import userScreenStyles from '../styles/userScreen_styles';

const CreateUserScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(''); 
  const [utenteAssociado, setUtenteAssociado] = useState('');
  const [activeTab, setActiveTab] = useState('Utilizadores');

  const tipoUsuarioOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Enfermeiro', value: 'enfermeiro' },
    { label: 'Utente', value: 'utente' },
  ];

  const handleSave = () => {
    console.log({
      nome,
      email,
      telemovel,
      morada,
      tipoUsuario,
      utenteAssociado
    });
  };

  const handleBack = () => console.log('Voltar');
  const handleMenu = () => console.log('Mais opções');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <HeaderButtons onBackPress={handleBack} onMenuPress={handleMenu} />

        <Title>Novo Utilizador</Title>

        <Label>Nome</Label>
        <TextInputField value={nome} onChangeText={setNome} placeholder="Value" />

        <Label>Email</Label>
        <TextInputField value={email} onChangeText={setEmail} placeholder="Value" keyboardType="email-address" />

        <Label>Telemóvel</Label>
        <TextInputField value={telemovel} onChangeText={setTelemovel} placeholder="Value" keyboardType="phone-pad" />

        <Label>Morada</Label>
        <TextInputField value={morada} onChangeText={setMorada} placeholder="Value" />

        <SelectInput
          label="Tipo de Usuário"
          selectedValue={tipoUsuario}
          onValueChange={setTipoUsuario}
          items={tipoUsuarioOptions}
        />

        <Label>Utente Associado</Label>
        <TextInputField value={utenteAssociado} onChangeText={setUtenteAssociado} placeholder="Value" />

        <PhotoUploader /> 

        <SaveButton onPress={handleSave} />
      </ScrollView>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
};

export default CreateUserScreen;
