import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeNavegationstyles from '../styles/homePageNavegation_styles';
import { colors } from '../styles/colors';

const Drawer = createDrawerNavigator();

// Tela principal
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={HomeNavegationstyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={HomeNavegationstyles.content}>
        <Text style={{ color: '#555' }}>Conteúdo principal da tela</Text>
      </View>
    </View>
  );
}

// Drawer personalizado
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fef4ff', flex: 1 }}>
      <View style={HomeNavegationstyles.drawerInner}>
        <TouchableOpacity style={HomeNavegationstyles.plusButton}>
          <Text style={HomeNavegationstyles.plusText}>+</Text>
        </TouchableOpacity>

        {['Usuários', 'Quartos', 'Utentes', 'Relatórios'].map((item, i) => (
          <DrawerItem
            key={i}
            label={() => (
              <View style={HomeNavegationstyles.menuItem}>
                <Ionicons name="star-outline" size={18} color="#333" />
                <Text style={HomeNavegationstyles.menuText}>{item}</Text>
              </View>
            )}
            onPress={() => {}}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            width: 120,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: '#fff',
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

