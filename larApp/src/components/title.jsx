import React from 'react';
import { Text } from 'react-native';

export default function Title({ children }) {
  return (
    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
      {children}
    </Text>
  );
}
