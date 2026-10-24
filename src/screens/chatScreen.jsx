import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useAuth } from '../contexts/AuthContext';
import { chatClient } from '../services/chatClient';

// Nome do canal ou, numa conversa direta, o nome do outro membro
const tituloDoCanal = (channel, uid) => {
  if (channel.data?.name) return channel.data.name;
  const outro = Object.values(channel.state.members).find((m) => m.user_id !== uid);
  return outro?.user?.name || 'Conversa';
};

const ChatScreen = ({ route, navigation }) => {
  const { cid } = route.params;
  const { user, chatReady } = useAuth();
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatReady) return;

    const [type, id] = cid.split(':');
    const newChannel = chatClient.channel(type, id);
    newChannel
      .watch()
      .then(() => {
        setChannel(newChannel);
        navigation.setOptions({ title: tituloDoCanal(newChannel, user.uid) });
      })
      .catch((err) => {
        console.error('Erro ao abrir canal:', err);
        setError('Não foi possível abrir a conversa.');
      });
  }, [cid, chatReady, navigation, user.uid]);

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
