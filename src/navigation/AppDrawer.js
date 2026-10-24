import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';

import HomeScreen from '../screens/homeScreen';
import ChannelListScreen from '../screens/channelListScreen';
import RoomsListScreen from '../screens/roomsListScreen';
import UtentesListScreen from '../screens/utentesListScreen';
import UsersListScreen from '../screens/userListScreen';
import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { user } = useAuth();
  const role = user?.tipoUsuario;

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={ChannelListScreen} options={{ title: 'Conversas' }} />

      {(role === 'admin' || role === 'enfermeiro') && (
        <>
          <Drawer.Screen name="Quartos" component={RoomsListScreen} />
          <Drawer.Screen name="Utentes" component={UtentesListScreen} />
        </>
      )}

      {role === 'admin' && (
        <Drawer.Screen name="Utilizadores" component={UsersListScreen} />
      )}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
