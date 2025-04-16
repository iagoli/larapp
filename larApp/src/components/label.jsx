import React from 'react';
import { Text } from 'react-native';

export default function Label({ children }) {
  return (
    <Text style={{ fontSize: 16, marginBottom: 5 }}>
      {children}
    </Text>
  );
}
