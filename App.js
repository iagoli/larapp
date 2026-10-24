import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import { OverlayProvider, Chat, Streami18n } from 'stream-chat-expo';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { chatClient } from './src/services/chatClient';

// O Stream não tem tradução pt-PT; pt-BR é a mais próxima
const streami18n = new Streami18n({ language: 'pt-br' });

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthProvider>
          <OverlayProvider i18nInstance={streami18n}>
            <Chat client={chatClient} i18nInstance={streami18n}>
              <NavigationContainer>
                <AppNavigator />
                <StatusBar style="auto" />
              </NavigationContainer>
            </Chat>
          </OverlayProvider>
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

