import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import UtenteHeader from '../components/utenteHeader';
import UtenteCard from '../components/utenteCard';
import styles from '../styles/utenteDetailsScreen_styles';
import { useAuth } from '../contexts/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const data = [
  { id: 1, title: 'Medicação', icon: 'pill', screen: 'UtenteMedicacaoSreen' },
  { id: 2, title: 'Atividades Diárias', icon: 'calendar-check', screen: 'UtenteAtividadeScreen' },
  { id: 3, title: 'Alimentação', icon: 'food', screen: 'UtenteRefeicoesScreen' },
  { id: 4, title: 'Cuidados Médicos', icon: 'hospital-box-outline', screen: 'UtenteCuidadosScreen' },
  { id: 5, title: 'Observações', icon: 'comment-text-outline', screen: 'UtenteObservacoesScreen' },
];

const UtenteDetailsScreen = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();

  const utenteId = route.params?.utenteId || user?.utenteId;

  const [selectedTab, setSelectedTab] = useState('quarto');
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

  const handleEdit = (title) => {
    console.log('Editando:', title);
  };

  return (
    <ScrollView style={styles.container}>
      <UtenteHeader
        selectedTab={selectedTab}
        roomNumber={roomNumber}
        nome={nome}
        idade={idade}
      />

      {data.map((item) => (
        <UtenteCard
          key={item.id}
          title={item.title}
          icon={item.icon}
          onAdd={() => console.log('Add', item.title)}
          onEdit={() => handleEdit(item.title)}
          onPress={() => navigation.navigate(item.screen, { utenteId })}
        />
      ))}
    </ScrollView>
  );
};

export default UtenteDetailsScreen;
