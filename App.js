import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';

import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat } from 'stream-chat-expo';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

const API_KEY = '1392612'; 
const chatClient = StreamChat.getInstance(API_KEY);

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <OverlayProvider>
          <Chat client={chatClient}>
            <NavigationContainer>
              <AppNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </Chat>
        </OverlayProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

