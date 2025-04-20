import React from 'react';
import { Image } from 'react-native';
import chatStyles from '../styles/chatScreen_styles';

const ChatBackground = () => (
  <Image
    source={require('../../assets/loading.png')}
    style={chatStyles.bgImage}
  />
);

export default ChatBackground;
