import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import UsersListScreen from './src/screens/userListScreen';
import LoginScreen from './src/screens/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/homePage';

export default function App() {
  return (
    <NavigationContainer> 
      <PaperProvider>
      <View style={styles.container}>
        <HomeScreen/>
        <StatusBar style="auto" />
      </View>
      </PaperProvider>
    </NavigationContainer>
  );
 
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
