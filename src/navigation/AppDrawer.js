import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';

import HomeScreen from '../screens/homeScreen';
import ChatScreen from '../screens/chatScreen';
import RoomsListScreen from '../screens/roomsListScreen';
import UtentesListScreen from '../screens/utentesListScreen';
import UsersListScreen from '../screens/userListScreen';
import UtenteDetailsScreen from '../screens/utenteDetailsScreen'; 
import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {/* Todos têm acesso à Home e ao Chat */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />

      {/* ADMINISTRADOR: RF01, RF02, RF03, RF04, RF05 */}
      {role === 'admin' && (
        <>
          <Drawer.Screen name="Utentes" component={UtentesListScreen} />
          <Drawer.Screen name="Utilizadores" component={UsersListScreen} />
          <Drawer.Screen name="Quartos" component={RoomsListScreen} />
        </>
      )}

      {/* FUNCIONÁRIO: RF06 a RF09 */}
      {role === 'funcionario' && (
        <>
          <Drawer.Screen name="Utentes" component={UtentesListScreen} />
          <Drawer.Screen name="Quartos" component={RoomsListScreen} />
        </>
      )}

      {/* UTENTE: RF10 a RF12 */}
      {role === 'utente' && (
        <>
          <Drawer.Screen name="Perfil" component={UtenteDetailsScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
