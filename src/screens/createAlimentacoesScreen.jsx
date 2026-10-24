import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';
import { useRoute } from '@react-navigation/native';
import { useGuardarRegisto } from '../hooks/useGuardarRegisto';

const CreateAlimentacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [prato, setPrato] = useState('');

  const route = useRoute();
  const utenteId = route.params?.utenteId;
  const { guardar, saving } = useGuardarRegisto('alimentacoes');

  const handleSave = () => {
    if (!prato.trim()) {
      Alert.alert('Campo obrigatório', 'Indique o prato.');
      return;
    }

    guardar({
      dataHora: dataHora.toISOString(),
      prato: prato.trim(),
      utenteId,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <Label>Data/Hora</Label>
        <DateTimeInput value={dataHora} onChange={setDataHora} />

        <Label>Prato</Label>
        <TextInputField
          value={prato}
          onChangeText={setPrato}
          placeholder="Ex.: Sopa de legumes"
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAlimentacoesScreen;
