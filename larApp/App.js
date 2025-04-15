import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import UsersListScreen from './src/screens/userListScreen';
import LoginScreen from './src/screens/login';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <LoginScreen/>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
