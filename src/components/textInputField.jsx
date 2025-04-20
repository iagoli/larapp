import React from 'react';
import { TextInput } from 'react-native';
import Inputstyles from '../styles/textInput_styles';

export default function TextInputField(props) {
  return (
    <TextInput
      {...props}
      style={[Inputstyles.input, props.style]}
      placeholderTextColor="#aaa"
    />
  );
}