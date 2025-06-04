import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import HomeStyles from '../styles/homePage_styles';
import EmergencyModal from '../components/emergencyModal'; 

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false); 
  const navigation = useNavigation(); 

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.welcome}>Welcome!</Text>
          <Text style={HomeStyles.sub}>How are you?</Text>
        </View>

        {/* Section: Cronograma dia */}
        <View style={HomeStyles.card}>
          <Text style={HomeStyles.cardTitle}>Cronograma dia</Text>

          <TouchableOpacity
            style={HomeStyles.item}
            onPress={() => console.log('Botão Atividade pressionado')}
          >
            <FontAwesome5 name="walking" size={28} color="#000" marginLeft={5} />
            <Text style={HomeStyles.itemText}>Atividade</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeStyles.item}
            onPress={() => console.log('Botão Consulta pressionado')}
          >
            <MaterialIcons name="event-note" size={24} color="#000" />
            <Text style={HomeStyles.itemText}>Consulta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeStyles.item}
            onPress={() => console.log('Botão Refeição pressionado')}
          >
            <Ionicons name="time-outline" size={28} color="#000" />
            <Text style={HomeStyles.itemText}>Refeição</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeStyles.item}
            onPress={() => console.log('Botão Medicação pressionado')}
          >
            <MaterialCommunityIcons name="pill" size={26} color="#000" />
            <Text style={HomeStyles.itemText}>Medicação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={HomeStyles.item}
            onPress={() => console.log('Botão Observação pressionado')}
          >
            <MaterialCommunityIcons name="comment-text-outline" size={26} color="#000" />
            <Text style={HomeStyles.itemText}>Observação</Text>
          </TouchableOpacity>
        </View>

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
