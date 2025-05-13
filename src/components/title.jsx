import React from 'react';
import { Text } from 'react-native';

export default function Title({ children }) {
  return (
    <Text style={{ fontSize: 28, fontWeight: '300', marginBottom: 20 }}>
      {children}
    </Text>
  );
}
