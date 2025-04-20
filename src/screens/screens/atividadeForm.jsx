import React, { useState } from 'react';
import { View } from 'react-native';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import Label from '../components/Label';
import DateTimeInput from '../components/DateTimeInput'; 
import styles from '../styles/atividadeForm_styles';

const AtividadeForm = () => {
  const [atividade, setAtividade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [date, setDate] = useState(new Date());

  const handleWebDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  const handleSubmit = () => {
    console.log('Saving:', {
      atividade,
      descricao,
      date,
    });
  };

  return (
    <View style={styles.container}>
      <Label>Atividade</Label>
      <TextInputField
        placeholder="Nome da Atividade"
        value={atividade}
        onChangeText={setAtividade}
      />

      <DateTimeInput label="Data/Hora" value={date} onChange={setDate} />

      <Label>Descrição</Label>
      <TextInputField
        placeholder="Notas ou observações"
        value={descricao}
        onChangeText={setDescricao}
      />

      <SaveButton onPress={handleSubmit} />
    </View>
  );
};

export default AtividadeForm;
