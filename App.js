import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import LoginScreen from './src/screens/loginScreen';
import { NavigationContainer } from '@react-navigation/native';
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

      <View style={AppStyles.container}>

        {/* Para comentar vscode, CTRL K +  C */}
        {/* Para descomentar CTRL K + CTRL U */}

        {/* <LoginScreen></LoginScreen> */}
        {/* <LoadingScreen></LoadingScreen> */}
        {/* <HomeScreen></HomeScreen> */}
        {/* <ChatScreen></ChatScreen>  */}

        {/* <RoomsListScreen></RoomsListScreen> */}
        {/* <CreateQuarto></CreateQuarto> */}

        {/* <UtentesListScreen></UtentesListScreen> */}
        {/* <CreateUtente></CreateUtente> */}

        {/* <UsersListScreen></UsersListScreen> */}
        {/* <CreateUserScreen></CreateUserScreen> */}

        {/* <UtenteDetailsScreen></UtenteDetailsScreen> */}

        {/* <UtenteAtividadeScreen></UtenteAtividadeScreen> */}
        {/* <CreateAtividadesScreen></CreateAtividadesScreen> */}

        {/* <UtenteCuidadosScreen></UtenteCuidadosScreen> */}
        {/* <CreateCuidadosScreen></CreateCuidadosScreen> */}

        <UtenteMedicacaoScreen></UtenteMedicacaoScreen>
        {/* <CreateMedicacaoScreen></CreateMedicacaoScreen> */}

        {/* <UtenteObservacoesScreen></UtenteObservacoesScreen> */}
        {/* <CreateObservacoesScreen></CreateObservacoesScreen> */}

        {/* <UtenteRefeicoesScreen></UtenteRefeicoesScreen> */}
        {/* <CreateAlimentacoesScreen></CreateAlimentacoesScreen> */}

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
};