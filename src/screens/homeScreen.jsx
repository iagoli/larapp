import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeStyles from '../styles/homePage_styles';
import BottomTabBar from '../components/BottomTabBar';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <TextInput placeholder="Buscar..." style={HomeStyles.search} />
          <Text style={HomeStyles.welcome}>Welcome!</Text>
          <Text style={HomeStyles.sub}>How are you?</Text>
        </View>

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
        </View>

        <View style={HomeStyles.fabContainer}>
          <TouchableOpacity style={HomeStyles.fab}>
            <FontAwesome5 name="headset" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={HomeStyles.sos}>
            <Text style={HomeStyles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default HomeScreen;
