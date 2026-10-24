import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import ButtonStyles from '../styles/button_styles';

export default function SaveButton({ onPress, loading = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[ButtonStyles.button, loading && ButtonStyles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={ButtonStyles.text}>Guardar</Text>
      )}
    </TouchableOpacity>
  );
}
