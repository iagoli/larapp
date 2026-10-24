import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app, db } from '../../firebase.config';

// Guarda um novo registo do utente e volta ao ecrã anterior, onde a lista atualiza em tempo real
export const useGuardarRegisto = (colecao) => {
  const navigation = useNavigation();
  const [saving, setSaving] = useState(false);

  const guardar = async (dados) => {
    const user = getAuth(app).currentUser;
    if (!user) {
      Alert.alert('Sessão expirada', 'Inicie sessão novamente.');
      return false;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, colecao), {
        ...dados,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      navigation.goBack();
      return true;
    } catch (error) {
      console.error(`Erro ao guardar em ${colecao}:`, error);
      Alert.alert('Erro', 'Não foi possível guardar. Tente novamente.');
      setSaving(false);
      return false;
    }
  };

  return { guardar, saving };
};
