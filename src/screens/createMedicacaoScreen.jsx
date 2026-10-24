import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';
import { useRoute } from '@react-navigation/native';
import { useGuardarRegisto } from '../hooks/useGuardarRegisto';

const CreateMedicacaoScreen = () => {
  const [medicamento, setMedicamento] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [quantidade, setQuantidade] = useState('');

  const route = useRoute();
  const utenteId = route.params?.utenteId;
  const { guardar, saving } = useGuardarRegisto('medicacoes');

  const handleSave = () => {
    if (!medicamento.trim() || !quantidade.trim()) {
      Alert.alert('Campos obrigatórios', 'Indique o medicamento e a quantidade.');
      return;
    }

    guardar({
      medicamento: medicamento.trim(),
      dataHora: dataHora.toISOString(),
      quantidade: quantidade.trim(),
      utenteId,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <Label>Medicamento</Label>
        <TextInputField
          value={medicamento}
          onChangeText={setMedicamento}
          placeholder="Ex.: Paracetamol 500 mg"
        />

        <Label>Data/Hora</Label>
        <DateTimeInput value={dataHora} onChange={setDataHora} />

        <Label>Quantidade</Label>
        <TextInputField
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Ex.: 1"
          keyboardType="numeric"
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMedicacaoScreen;
