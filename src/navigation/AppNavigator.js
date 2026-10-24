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

import CreateAlimentacoesScreen from '../screens/createAlimentacoesScreen'
import CreateAtividadeScreen from '../screens/createAtividadesScreen'
import CreateMedicaoScreen from '../screens/createMedicacaoScreen'
import CreateObservacoesScreen from '../screens/createObservacoesScreen'
import CreateCuidadosScreen from '../screens/createCuidadosScreen'
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

          <Stack.Screen name="UtenteMedicacaoScreen" component={UtenteMedicacaoSreen} options={{ headerShown: true, title: 'Medicacao do Utente' }} />
          <Stack.Screen name="UtenteRefeicoesScreen" component={UtenteRefeicoesScreen} options={{ headerShown: true, title: 'Refeicoes do Utente' }} />
          <Stack.Screen name="UtenteAtividadeScreen" component={UtenteAtividadeScreen} options={{ headerShown: true, title: 'Atividades do Utente' }} />
          <Stack.Screen name="UtenteObservacoesScreen" component={UtenteObservacoesScreen} options={{ headerShown: true, title: 'Observacoes do Utente' }} />
          <Stack.Screen name="UtenteCuidadosScreen" component={UtenteCuidadosScreen} options={{ headerShown: true, title: 'Cuidados do Utente' }} />

          <Stack.Screen name="CreateAlimentacoesScreen" component={CreateAlimentacoesScreen} options={{ headerShown: true, title: 'Criar Refeicao' }} />
          <Stack.Screen name="CreateAtividadesScreen" component={CreateAtividadeScreen} options={{ headerShown: true, title: 'Criar Atividade' }} />
          <Stack.Screen name="CreateCuidadoScreen" component={CreateCuidadosScreen} options={{ headerShown: true, title: 'Criar Cuidado' }} />
          <Stack.Screen name="CreateMedicacaoScreen" component={CreateMedicaoScreen} options={{ headerShown: true, title: 'Criar Medicacao' }} />
          <Stack.Screen name="CreateObservacoesScreen" component={CreateObservacoesScreen} options={{ headerShown: true, title: 'Criar Observacao' }} />


          <Stack.Screen name="Conversa" component={ChatScreen} options={{ headerShown: true, title: 'Conversa' }} />
          <Stack.Screen name="NovaConversa" component={NovaConversaScreen} options={{ headerShown: true, title: 'Nova conversa' }} />

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
