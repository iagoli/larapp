import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/loginScreen';
import LoadingScreen from '../screens/loadingScreen';
import AppDrawer from './AppDrawer';
import CreateQuarto from '../screens/createQuarto';
import RoomsListScreen from '../screens/roomsListScreen';
import UtentesListScreen from '../screens/utentesListScreen';
import CreateUtente from '../screens/createUtente';
import CreateUserScreen from '../screens/createUserScreen';
import UtenteDetailsScreen from '../screens/utenteDetailsScreen';
import RegistosScreen from '../screens/registosScreen';
import CreateRegistoScreen from '../screens/createRegistoScreen';
import { REGISTOS } from '../constants/registos';
import ChatScreen from '../screens/chatScreen';
import NovaConversaScreen from '../screens/novaConversaScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="AppDrawer" component={AppDrawer} />
          <Stack.Screen name="CreateQuarto" component={CreateQuarto} />
          <Stack.Screen name="RoomListScreen" component={RoomsListScreen} />
          <Stack.Screen name="UtenteListScreen" component={UtentesListScreen} />
          <Stack.Screen name="CreateUtente" component={CreateUtente} />
          <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />

          <Stack.Screen
            name="RegistosScreen"
            component={RegistosScreen}
            options={({ route }) => ({
              headerShown: true,
              title: REGISTOS[route.params.tipo].titulo,
            })}
          />
          <Stack.Screen
            name="CreateRegistoScreen"
            component={CreateRegistoScreen}
            options={({ route }) => ({
              headerShown: true,
              title: REGISTOS[route.params.tipo].agendar,
            })}
          />

          <Stack.Screen
            name="Conversa"
            component={ChatScreen}
            options={{ headerShown: true, title: 'Conversa' }}
          />
          <Stack.Screen
            name="NovaConversa"
            component={NovaConversaScreen}
            options={{ headerShown: true, title: 'Nova conversa' }}
          />

          <Stack.Screen
            name="UtenteDetailsScreen"
            component={UtenteDetailsScreen}
            options={{ headerShown: true, title: 'Detalhes do utente' }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
