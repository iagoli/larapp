import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import UtenteHeader from '../components/utenteHeader';
import UtenteCard from '../components/utenteCard';
import styles from '../styles/utenteDetailsScreen_styles';
import { useAuth } from '../contexts/AuthContext';
import { useRoute , useNavigation } from '@react-navigation/native';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { REGISTOS } from '../constants/registos';

const UtenteDetailsScreen = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();

  const utenteId = route.params?.utenteId || user?.utenteId;

  const selectedTab = 'quarto';
  const [roomNumber, setRoomNumber] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  useEffect(() => {

    const fetchUtente = async () => {
      if (!utenteId) return;

      try {
        const docRef = doc(db, 'utentes', utenteId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRoomNumber(data.quarto || 'Sem quarto');
          setNome(data.nome || '');
          setIdade(data.idade || '');
        } else {
          setRoomNumber('Não encontrado');
          setNome('Desconhecido');
          setIdade('');
        }
      } catch (error) {
        console.error('Erro ao buscar utente:', error);
        setRoomNumber('Erro');
        setNome('Erro');
        setIdade('');
      }
    };

    fetchUtente();
  }, [utenteId]);

  return (
    <ScrollView style={styles.container}>
      <UtenteHeader
        selectedTab={selectedTab}
        roomNumber={roomNumber}
        nome={nome}
        idade={idade}
      />

      {Object.entries(REGISTOS).map(([tipo, { titulo, icon }]) => (
        <UtenteCard
          key={tipo}
          title={titulo}
          icon={icon}
          onAdd={() => navigation.navigate('CreateRegistoScreen', { tipo, utenteId })}
          onPress={() => navigation.navigate('RegistosScreen', { tipo, utenteId })}
        />
      ))}
    </ScrollView>
  );
};

export default UtenteDetailsScreen;
