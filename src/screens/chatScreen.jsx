import React, { useState } from 'react';
import { View } from 'react-native';
import ChatBackground from '../components/ChatBackground';
import ChatContainer from '../components/ChatContainer';
//import dayjs from 'dayjs';


const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'eu',
      time: dayjs().format('HH:mm'),
    };
    setMessages([newMessage, ...messages]);
  };
  
  return (
    <View style={{ flex: 1 }}>
      <ChatBackground />
      <ChatContainer messages={messages} onSend={handleSend} />
    </View>
  );
};

export default ChatScreen;
