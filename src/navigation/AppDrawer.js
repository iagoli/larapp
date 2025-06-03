import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/homeScreen';
import MenuScreen from '../screens/homePageNavegation';
import UtenteDetailsScreen from '../screens/utenteDetailsScreen';
import ChatScreen from '../screens/chatScreen';
import RoomsListScreen from '../screens/roomsListScreen';
import UtentesListScreen from '../screens/utentesListScreen';
import UsersListScreen from '../screens/userListScreen';
import CustomDrawer from '../components/customDrawer';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Quartos" component={RoomsListScreen} />
      <Drawer.Screen name="Utentes" component={UtentesListScreen} />
      <Drawer.Screen name="Utilizadores" component={UsersListScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;