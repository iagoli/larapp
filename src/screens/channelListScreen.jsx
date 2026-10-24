import React, { useMemo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { ChannelList } from 'stream-chat-expo';
import { useAuth } from '../contexts/AuthContext';

const sort = { last_message_at: -1 };

const ChannelListScreen = ({ navigation }) => {
  const { user, chatReady } = useAuth();
  const filters = useMemo(
    () => ({ type: 'messaging', members: { $in: [user.uid] } }),
    [user.uid]
  );

  if (!chatReady) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChannelList
        filters={filters}
        sort={sort}
        onSelect={(channel) => navigation.navigate('Conversa', { cid: channel.cid })}
      />
      <FAB
        icon="message-plus"
        label="Nova conversa"
        style={styles.fab}
        color="#fff"
        onPress={() => navigation.navigate('NovaConversa')}
      />
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#5e3b7f',
  },
});

export default ChannelListScreen;
