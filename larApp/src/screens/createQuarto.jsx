import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Title from '../components/Title';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SelectInput from '../components/SelectInput'; 
import SaveButton from '../components/SaveButton';
import userScreenStyles from '../styles/userScreen_styles';

const CreateQuarto = () => {
  const [camas, setCamas] = useState('');
  const [numero, setNumero] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  

  const disponibilidadeOptions = [
    { label: 'Selecione uma opção', value: '' },
    { label: 'Disponível', value: 'disponivel' },
    { label: 'Ocupado', value: 'ocupado' },
    { label: 'Em Manutenção', value: 'manutencao' },
  ];

  const quartoOptions = [
    {label: 'Selecione uma opção', valeu: ''},
    {label: '1', valeu: 1},
    {label: '2', valeu: 2},
    {label: '3', valeu: 3},
    {label: '4', valeu: 4},
    {label: '5', valeu: 5},
    {label: '6', valeu: 6},
    {label: '7', valeu: 7},
    {label: '8', valeu: 8},
    {label: '9', valeu: 9},
    {label: '10', valeu: 10},
  ]

  const handleSave = () => {
    console.log({
      camas,
      numero,
      disponibilidade
    });
    // Lógica para salvar os dados do quarto futuramente
  };

  return (
    <ScrollView contentContainerStyle={userScreenStyles.container}>
      <Title>Novo Quarto</Title>

      <Label>Camas</Label>
      <TextInputField 
        value={camas} 
        onChangeText={setCamas} 
        placeholder="Value"
        keyboardType="numeric" 
      />

      <Label>Número</Label>
      <SelectInput
        selectedValue={numero}
        onValueChange={setNumero}
        items={quartoOptions} 
        
      />

      <Label>Disponibilidade</Label>
      <SelectInput
        selectedValue={disponibilidade}
        onValueChange={setDisponibilidade}
        items={disponibilidadeOptions}
      />

      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

export default CreateQuarto;