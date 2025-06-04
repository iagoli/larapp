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
import UsersListScreen from '../screens/userListScreen';
import CreateUserScreen from '../screens/createUserScreen'
import UtenteDetailsScreen from '../screens/utenteDetailsScreen';
import UtenteMedicacaoSreen from '../screens/utenteMedicacaoScreen'
import UtenteObservacoesScreen from '../screens/utenteObservacoesScreen'
import UtenteRefeicoesScreen from '../screens/utenteRefeicoesScreen'
import UtenteCuidadosScreen from '../screens/utenteCuidadosScreen'
import UtenteAtividadeScreen from '../screens/utenteAtividadeScreen';


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
          <Stack.Screen name="UtenteMedicacaoSreen" component={UtenteMedicacaoSreen} options={{ headerShown: true, title: 'Medicacao do Utente' }} />
          <Stack.Screen name="UtenteRefeicoesScreen" component={UtenteRefeicoesScreen} options={{ headerShown: true, title: 'Refeicoes do Utente' }} />
          <Stack.Screen name="UtenteAtividadeScreen" component={UtenteAtividadeScreen} options={{ headerShown: true, title: 'Atividades do Utente' }} />
          <Stack.Screen name="UtenteObservacoesScreen" component={UtenteObservacoesScreen} options={{ headerShown: true, title: 'Observacoes do Utente' }} />
          <Stack.Screen name="UtenteCuidadosScreen" component={UtenteCuidadosScreen} options={{ headerShown: true, title: 'Cuidados do Utente' }} />

          <Stack.Screen
            name="UtenteDetailsScreen"
            component={UtenteDetailsScreen}
            options={{ headerShown: true, title: 'Detalhes do Utente' }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
