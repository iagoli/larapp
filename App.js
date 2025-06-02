import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';
import MenuScreen from './src/screens/homePageNavegation';
import CreateUserScreen from './src/screens/createUserScreen';
import CreateUtente from './src/screens/createUtente';
import CreateQuarto from './src/screens/createQuarto';
import LoadingScreen from './src/screens/loadingScreen';
import UtentesListScreen from './src/screens/utentesListScreen';
import RoomsListScreen from './src/screens/roomsListScreen';
import CreateMedicacaoScreen from './src/screens/createMedicacaoScreen';
import CreateAtividadesScreen from './src/screens/createAtividadesScreen';
import CreateCuidadosScreen from './src/screens/createCuidadosScreen';
import CreateObservacoesScreen from './src/screens/createObservacoesScreen';
import CreateAlimentacoesScreen from './src/screens/createAlimentacoesScreen';
import UtenteDetailsScreen from './src/screens/utenteDetailsScreen';
import UtenteMedicacaoScreen from './src/screens/utenteMedicacaoScreen';
import UtenteAtividadeScreen from './src/screens/utenteAtividadeScreen';
import ChatScreen from './src/screens/chatScreen';
import UsersListScreen from './src/screens/userListScreen';
import UtenteObservacoesScreen from './src/screens/utenteObservacoesScreen';
import UtenteRefeicoesScreen from './src/screens/utenteRefeicoesScreen';
import UtenteCuidadosScreen from './src/screens/utenteCuidadosScreen';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useEffect } from 'react';
import { app } from './firebase.config';


const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const fff = async () => {
      try {// Gets FirebaseApp and returns Auth object
        const auth = getAuth(app); // Access to authentication service
        onAuthStateChanged(auth, async (user) => {
          // Signin as anonymous
          if (user === null) await signInAnonymously(auth);
          // Access to data that does not require personal authenticationgetPublicData();
          console.log(user);
          
        });
      } catch (error) {
        console.log(error);
      }
    }
    fff();
  }, []);

  return (

    <PaperProvider>
      <NavigationContainer>

              {/* Para comentar vscode, CTRL K +  C */}
              {/* Para descomentar CTRL K + CTRL U */}

        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* <Stack.Screen name="Menu" component={MenuScreen} /> */}
          {/* <Stack.Screen name="CreateUser" component={CreateUserScreen} /> */}
          {/* <Stack.Screen name="CreateUtente" component={CreateUtente} /> */}
          {/* <Stack.Screen name="CreateQuarto" component={CreateQuarto} /> */}
          {/* <Stack.Screen name="UtentesList" component={UtentesListScreen} /> */}
          {/* <Stack.Screen name="RoomsList" component={RoomsListScreen} /> */}
          {/* <Stack.Screen name="CreateMedicacao" component={CreateMedicacaoScreen} /> */}
          {/* <Stack.Screen name="CreateAtividade" component={CreateAtividadesScreen} /> */}
          {/* <Stack.Screen name="CreateCuidados" component={CreateCuidadosScreen} /> */}
          {/* <Stack.Screen name="CreateObservacoes" component={CreateObservacoesScreen} /> */}
          {/* <Stack.Screen name="CreateAlimentacoes" component={CreateAlimentacoesScreen} /> */}
          {/* <Stack.Screen name="UtenteDetails" component={UtenteDetailsScreen} /> */}
          {/* <Stack.Screen name="UtenteMedicacao" component={UtenteMedicacaoScreen} /> */}
          {/* <Stack.Screen name="UtenteAtividade" component={UtenteAtividadeScreen} /> */}
          {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
          {/* <Stack.Screen name="UsersList" component={UsersListScreen} /> */}
          {/* <Stack.Screen name="UtenteObservacoes" component={UtenteObservacoesScreen} /> */}
          {/* <Stack.Screen name="UtenteRefeicoes" component={UtenteRefeicoesScreen} /> */}
          {/* <Stack.Screen name="UtenteCuidados" component={UtenteCuidadosScreen} /> */}
        </Stack.Navigator>

        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}