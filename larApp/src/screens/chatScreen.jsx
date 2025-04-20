import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import chatStyles from '../styles/chatScreen_styles';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);


  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = { id: Date.now().toString(), text: input, sender: 'eu' };
    setMessages([newMessage, ...messages]);
    setInput('');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* BG fora do KeyboardAvoidingView */}
      <Image
        source={require('../../assets/loading.png')}
        style={chatStyles.bgImage}
      />

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
            <View style={[chatStyles.messageBubble, item.sender === 'eu' && chatStyles.myMessage]}>
              <Text style={chatStyles.messageText}>{item.text}</Text>
            </View>
          )}
        />
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
