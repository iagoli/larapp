import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import UsersListScreen from './src/screens/userListScreen';
import LoginScreen from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/homeScreen';
import MenuScreen from './src/screens/homePageNavegation';
import CreateUserScreen from './src/screens/createUserScreen';
import NewPatientScreen from './src/screens/createUtente';
import NewRoomScreen from './src/screens/createQuarto';
import LoadingScreen from './src/screens/loadingScreen';
import UtentesListScreen from './src/screens/utentesListScreen';
import RoomsListScreen from './src/screens/roomsListScreen';
import UtenteDetailsScreen from './src/screens/utenteDetailsScreen';
import UtenteMedicacaoScreen from './src/screens/utenteMedicacaoScreen';
import MedicationForm from './src/screens/medicationForm';
import UtenteAtividadeScreen from './src/screens/utenteAtividadeScreen';
import AtividadeForm from './src/screens/atividadeForm';
import ChatScreen from './src/screens/chatScreen';

export default function App() {
  return (

    <PaperProvider>
      <View style={AppStyles.container}>

      <ChatScreen></ChatScreen>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );


};

