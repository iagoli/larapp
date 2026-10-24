import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import HomeStyles from '../styles/homePage_styles';
import EmergencyModal from '../components/emergencyModal';
import CronogramaHoje from '../components/cronogramaHoje';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const navigation = useNavigation(); 
 
  const { user } = useAuth();
  const utenteId = user?.utenteId;
  const isStaff = user?.tipoUsuario === 'admin' || user?.tipoUsuario === 'enfermeiro';

  // Equipa sem utente associado escolhe primeiro o utente na lista
  const openRegisto = (screen) => {
    if (utenteId) {
      navigation.navigate(screen, { utenteId });
    } else if (isStaff) {
      navigation.navigate('Utentes');
    } else {
      Alert.alert('Sem utente associado', 'Peça a um administrador para associar a sua conta a um utente.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.welcome}>Welcome!</Text>
          <Text style={HomeStyles.sub}>How are you?</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
          {utenteId && <CronogramaHoje utenteId={utenteId} />}

          {/* Atalhos para os registos do utente */}
          <View style={[HomeStyles.card, utenteId && { marginTop: 20 }]}>
            <Text style={HomeStyles.cardTitle}>Registos</Text>

            <TouchableOpacity
              style={HomeStyles.item}
              onPress={() => openRegisto('UtenteAtividadeScreen')}
            >
              <FontAwesome5 name="walking" size={28} color="#000" marginLeft={5} />
              <Text style={HomeStyles.itemText}>Atividade</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={HomeStyles.item}
              onPress={() => openRegisto('UtenteCuidadosScreen')}
            >
              <MaterialIcons name="event-note" size={24} color="#000" />
              <Text style={HomeStyles.itemText}>Cuidados</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={HomeStyles.item}
              onPress={() => openRegisto('UtenteRefeicoesScreen')}
            >
              <Ionicons name="time-outline" size={28} color="#000" />
              <Text style={HomeStyles.itemText}>Refeição</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={HomeStyles.item}
              onPress={() => openRegisto('UtenteMedicacaoScreen')}
            >
              <MaterialCommunityIcons name="pill" size={26} color="#000" />
              <Text style={HomeStyles.itemText}>Medicação</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={HomeStyles.item}
              onPress={() => openRegisto('UtenteObservacoesScreen')}
            >
              <MaterialCommunityIcons name="comment-text-outline" size={26} color="#000" />
              <Text style={HomeStyles.itemText}>Observação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={HomeStyles.fabContainer}>
          <TouchableOpacity
            style={HomeStyles.fab}
            onPress={() => navigation.navigate('Chat')} 
          >
            <FontAwesome5 name="headset" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeStyles.sos}
            onPress={() => setModalVisible(true)} 
          >
            <Text style={HomeStyles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de emergência */}
      <EmergencyModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default HomeScreen;
