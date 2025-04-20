import React from 'react';
import { View, Text } from 'react-native';
import chatStyles from '../styles/chatScreen_styles';

const MessageBubble = ({ text, time, isMyMessage }) => (
  <View
    style={[
      chatStyles.messageRow,
      isMyMessage && chatStyles.messageRowReverse
    ]}
  >
    <View
      style={[
        chatStyles.bubbleContainer,
        isMyMessage && chatStyles.myBubble
      ]}
    >
      <Text style={chatStyles.messageText}>{text}</Text>
      <Text style={chatStyles.timestampText}>{time}</Text>
    </View>
  </View>
);

export default MessageBubble;
