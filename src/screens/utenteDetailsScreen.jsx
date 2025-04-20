import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import UtenteHeader from '../components/UtenteHeader';
import UtenteCard from '../components/UtenteCard';
import styles from '../styles/utenteDetailsScreen_styles';

const data = [
  { id: 1, title: 'Medicação', icon: 'pill' },
  { id: 2, title: 'Atividades Diárias', icon: 'calendar-check' },
  { id: 3, title: 'Alimentação', icon: 'food' },
  { id: 4, title: 'Cuidados Médicos', icon: 'hospital-box-outline' },
  { id: 5, title: 'Observações', icon: 'comment-text-outline' },
];

const UtenteDetailsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('quarto');
  const roomNumber = '105';

  return (
    <ScrollView style={styles.container}>
      <UtenteHeader selectedTab={selectedTab} roomNumber={roomNumber} />

      {data.map((item) => (
        <UtenteCard
          key={item.id}
          title={item.title}
          icon={item.icon}
          onAdd={() => console.log('Add', item.title)}
          onEdit={() => console.log('Edit', item.title)}
          onPress={() => console.log('Card pressed')}
        />
      ))}
    </ScrollView>
  );
};

export default UtenteDetailsScreen;
