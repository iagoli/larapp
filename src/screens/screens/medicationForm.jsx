import React, { useState } from 'react';
import { View } from 'react-native';
import Label from '../components/Label';
import TextInputField from '../components/TextInputField';
import SaveButton from '../components/SaveButton';
import DateTimeInput from '../components/DateTimeInput';
import styles from '../styles/medicationForm_styles';

const MedicationForm = () => {
  const [medication, setMedication] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    console.log('Saving:', { medication, quantity, date });
  };

  return (
    <View style={styles.container}>
      <Label>Medicamento</Label>
      <TextInputField
        placeholder="Escreva o nome"
        value={medication}
        onChangeText={setMedication}
      />

      <Label>Data/Hora Administrada</Label>
      <DateTimeInput value={date} onChange={setDate} />

      <Label>Quantidade</Label>
      <TextInputField
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <SaveButton onPress={handleSubmit} />
    </View>
  );
};

export default MedicationForm;
