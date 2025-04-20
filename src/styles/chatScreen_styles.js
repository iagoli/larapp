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
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: colors.primary,
    fontWeight: 12,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    minHeight: 40, 
    maxHeight: 120, 
    borderWidth: 1,
    borderColor: colors.primary,
    color: 'black',
  },
  
  sendButton: {
    justifyContent: 'center', 
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  bubbleContainer: {
    maxWidth: '80%',
    backgroundColor: '#4B0082',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    minHeight: 40,
    flexShrink: 1,
  },
    messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  
  messageRowReverse: {
    justifyContent: 'flex-end',
  },
    
  myBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  timestampText: {
    color: 'white',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  }, 

});

export default chatStyles;
