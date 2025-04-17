import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/title';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SelectInput from '../components/selectInput'; 
import SaveButton from '../components/saveButton';
import PhotoUploader from '../components/photoUploader'; 
import userScreenStyles from '../styles/userScreen_styles';

const CreateUserScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(''); 
  const [utenteAssociado, setUtenteAssociado] = useState('');

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

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Title>Novo Utilizador</Title>

      <Label>Nome</Label>
      <TextInputField value={nome} onChangeText={setNome} placeholder="Value" />

      <Label>Email</Label>
      <TextInputField value={email} onChangeText={setEmail} placeholder="Value" keyboardType="email-address" />

      <Label>Telemovel</Label>
      <TextInputField value={telemovel} onChangeText={setTelemovel} placeholder="Value" keyboardType="phone-pad" />

      <Label>Morada</Label>
      <TextInputField value={morada} onChangeText={setMorada} placeholder="Value" />

      <SelectInput
        label="Tipo de Usuario"
        selectedValue={tipoUsuario}
        onValueChange={setTipoUsuario}
        items={tipoUsuarioOptions}
      />

      <Label>Utente Associado</Label>
      <TextInputField value={utenteAssociado} onChangeText={setUtenteAssociado} placeholder="Value" />

      <PhotoUploader /> 

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateUserScreen;