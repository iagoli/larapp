import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import usersListScreen from './src/screens/usersListScreen';
import createUserForm from './src/components/createUserForm';

export default function App() {
  return (
    <View style={styles.container}>
        <createUserForm></createUserForm>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
