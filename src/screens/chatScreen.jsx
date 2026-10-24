import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useAuth } from '../contexts/AuthContext';
import { chatClient } from '../services/chatClient';

const ChatScreen = () => {
  const { user, chatReady } = useAuth();
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !chatReady) return;

    const newChannel = chatClient.channel('messaging', `general-${user.uid}`);
    newChannel
      .watch()
      .then(() => setChannel(newChannel))
      .catch((err) => {
        console.error('Erro ao abrir canal:', err);
        setError('Não foi possível abrir o chat.');
      });
  }, [user, chatReady]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!channel) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
