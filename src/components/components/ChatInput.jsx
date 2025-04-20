import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import chatStyles from '../styles/chatScreen_styles';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = () => {
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
    setInputHeight(40);
  };

  return (
    <View style={chatStyles.inputContainer}>
      <TextInput
        style={[chatStyles.input, { height: inputHeight }]}
        multiline
        value={input}
        onChangeText={setInput}
        placeholder="Digite sua mensagem..."
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
      />
      <TouchableOpacity style={chatStyles.sendButton} onPress={handleSend}>
        <Text style={chatStyles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

