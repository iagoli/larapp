import React from 'react';
import { Text } from 'react-native';

export default function Label({ children }) {
  return (
    <Text style={{ fontSize: 20, marginBottom: 5, marginLeft: 15, fontWeight: '300' }}>
      {children}
    </Text>
  );
}
