import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import CamposRegisto from '../components/camposRegisto';
import SaveButton from '../components/saveButton';
import userScreenStyles from '../styles/userScreen_styles';
import { REGISTOS, valoresIniciais, prepararDados } from '../constants/registos';
import { useGuardarRegisto } from '../hooks/useGuardarRegisto';
import { agendarLembreteMedicacao } from '../services/lembretes';

// Formulário de novo registo. Parâmetros da rota: tipo (chave de REGISTOS) e utenteId.
const CreateRegistoScreen = ({ route }) => {
  const { tipo, utenteId } = route.params;
  const definicao = REGISTOS[tipo];

  const [valores, setValores] = useState(() => valoresIniciais(definicao.campos));
  const { guardar, saving } = useGuardarRegisto(tipo);

  const handleSave = async () => {
    const { erro, dados } = prepararDados(definicao.campos, valores);
    if (erro) {
      Alert.alert('Campos obrigatórios', erro);
      return;
    }

    const guardado = await guardar({ ...dados, utenteId });

    if (guardado && definicao.lembrete) {
      agendarLembreteMedicacao({ ...dados, dataHora: valores.dataHora });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={[userScreenStyles.container, { paddingBottom: 100 }]}>
        <CamposRegisto
          campos={definicao.campos}
          valores={valores}
          onChange={(campo, v) => setValores((prev) => ({ ...prev, [campo]: v }))}
        />

        <SaveButton onPress={handleSave} loading={saving} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRegistoScreen;
