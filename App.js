import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import UsersListScreen from './src/screens/UsersListScreen';
import LoginScreen from './src/screens/login';
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

export default function App() {
  return (

    <PaperProvider>
      <View style={AppStyles.container}>

      <UtentesListScreen/>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
};