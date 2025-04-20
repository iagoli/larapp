import { StyleSheet } from 'react-native';
import { colors } from './colors';
// import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    opacity: 0.6,
  },    
  messageBubble: {
    padding: 12,
    marginVertical: 4,
    marginRight: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: colors.primary,
    fontWeight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    minHeight: 40, 
    maxHeight: 120, 
  },
  
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  sendButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default chatStyles;
