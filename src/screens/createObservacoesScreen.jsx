import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';
import { useRoute } from '@react-navigation/native';
import { useGuardarRegisto } from '../hooks/useGuardarRegisto';

const CreateObservacoesScreen = () => {
  const [dataHora, setDataHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');

  const route = useRoute();
  const utenteId = route.params?.utenteId;
  const { guardar, saving } = useGuardarRegisto('observacoes');

  const handleSave = () => {
    if (!descricao.trim()) {
      Alert.alert('Campo obrigatório', 'Escreva a observação.');
      return;
    }

    guardar({
      dataHora: dataHora.toISOString(),
      descricao: descricao.trim(),
      utenteId,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <Label>Data/Hora</Label>
        <DateTimeInput value={dataHora} onChange={setDataHora} />

        <Label>Descrição</Label>
        <TextInputField
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Escreva a observação"
          multiline
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateObservacoesScreen;
