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
import ChannelListScreen from '../screens/channelListScreen';
import ChatScreen from '../screens/chatScreen';


const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      {/* Todos têm acesso à Home e ao Chat */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Quartos" component={RoomsListScreen} />
      <Drawer.Screen name="Utentes" component={UtentesListScreen} />
      <Drawer.Screen name="Utilizadores" component={UsersListScreen} />
      <Drawer.Screen name="Canais de Chat" component={ChannelListScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
