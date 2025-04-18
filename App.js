import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import UsersListScreen from './src/screens/UsersListScreen';
import LoginScreen from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/homePage';
import MenuScreen from './src/screens/homePageNavegation';
import CreateUserScreen from './src/screens/createUserScreen';
import NewPatientScreen from './src/screens/createUtente';
import NewRoomScreen from './src/screens/createQuarto';
import LoadingScreen from './src/screens/loadingScreen';
import UtentesListScreen from './src/screens/utentesListScreen';
import RoomsListScreen from './src/screens/roomsListScreen';
import UtenteMedicacaoScreen from './src/screens/utenteMedicacaoScreen';
import UtenteDetailsScreen from './src/screens/utenteDetailsScreen'
import MedicationForm from './src/screens/medicationForm'

export default function App() {
  return (

    <PaperProvider>
      <View style={AppStyles.container}>

      <MedicationForm/>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );

};