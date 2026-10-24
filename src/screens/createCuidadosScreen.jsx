import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import Label from '../components/label';
import TextInputField from '../components/textInputField';
import SaveButton from '../components/saveButton';
import DateTimeInput from '../components/dateTimeInput';
import userScreenStyles from '../styles/userScreen_styles';
import { useRoute } from '@react-navigation/native';
import { useGuardarRegisto } from '../hooks/useGuardarRegisto';

const CreateCuidadosScreen = () => {
  const [acao, setAcao] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');

  const route = useRoute();
  const utenteId = route.params?.utenteId;
  const { guardar, saving } = useGuardarRegisto('cuidados');

  const handleSave = () => {
    if (!acao.trim()) {
      Alert.alert('Campo obrigatório', 'Indique a ação efetuada.');
      return;
    }

    guardar({
      acao: acao.trim(),
      dataHora: dataHora.toISOString(),
      descricao: descricao.trim(),
      utenteId,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <Label>Ação Efetuada</Label>
        <TextInputField
          value={acao}
          onChangeText={setAcao}
          placeholder="Ex.: Medição da tensão arterial"
        />

        <Label>Data/Hora</Label>
        <DateTimeInput value={dataHora} onChange={setDataHora} />

        <Label>Descrição</Label>
        <TextInputField
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Detalhes (opcional)"
          multiline
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCuidadosScreen;
