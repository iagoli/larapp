import React, { useState } from 'react';
import { View } from 'react-native';
import ChatBackground from '../components/chatBackground';
import ChatContainer from '../components/chatContainer';
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
