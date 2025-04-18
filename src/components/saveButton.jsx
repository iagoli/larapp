import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ButtonStyles from '../styles/button_styles';

export default function SaveButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyles.button}>
      <Text style={ButtonStyles.text}>Guardar</Text>
    </TouchableOpacity>
  );
}