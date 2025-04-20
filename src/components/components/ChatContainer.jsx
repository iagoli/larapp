import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  View,
} from 'react-native';
import chatStyles from '../styles/chatScreen_styles';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const ChatContainer = ({ messages, onSend }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={chatStyles.container}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item }) => (
          <MessageBubble
            text={item.text}
            isMyMessage={item.sender === 'eu'}
          />
        )}
      />
      <ChatInput onSend={onSend} />
    </KeyboardAvoidingView>
  );
};

export default ChatContainer;
