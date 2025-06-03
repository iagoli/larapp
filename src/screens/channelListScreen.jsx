import React from 'react';
import { ChannelList } from 'stream-chat-expo';

export default function ChannelListScreen({ navigation }) {
    return (
        <ChannelList
          onSelect={(channel) => {
            navigation.navigate('Chat', { channel });
          }}
        />
      );
      
}
