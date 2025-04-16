import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStyles from './src/styles/app_styles';
import UsersListScreen from './src/screens/userListScreen';
import LoginScreen from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/homePage';
import MenuScreen from './src/screens/homePageNavegation';


export default function App() {
  return (
 
      <PaperProvider>
      <View style={AppStyles.container}>
        <HomeScreen/>
        <StatusBar style="auto" />
      </View>
      </PaperProvider>
  );
 
    
};

