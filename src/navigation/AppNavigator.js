import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/homeScreen';
import RoomsListScreen from '../screens/roomsListScreen';
import UtentesListScreen from '../screens/utentesListScreen';
import UsersListScreen from '../screens/userListScreen';
import { useAuth } from '../contexts/AuthContext';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { user, logout } = useAuth();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={HomeScreen} />

      {/* Only for Administrador and Enfermeiro */}
      {(user?.tipoUsuario === 'Administrador' || user?.tipoUsuario === 'Enfermeiro') && (
        <>
          <Drawer.Screen name="Quartos" component={RoomsListScreen} />
          <Drawer.Screen name="Utentes" component={UtentesListScreen} />
          <Drawer.Screen name="Utilizadores" component={UsersListScreen} />
        </>
      )}

      <Drawer.Screen
        name="Logout"
        component={() => {
          logout();
          return null;
        }}
        options={{ drawerLabel: 'Sair' }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
