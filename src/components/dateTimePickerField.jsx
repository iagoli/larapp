import React, { useState } from 'react';
import { Text, TouchableOpacity, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Label from './label';
import Inputstyles from '../styles/';

const formatDate = (date) => {
  if (!date) return '';
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const DateTimePickerField = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);

  const handlePress = () => setShow(true);

  const handleChange = (event, selectedDate) => {
    if (selectedDate) onChange(selectedDate);
    setShow(Platform.OS === 'ios');
  };

  return (
    <View>
      {label && <Label>{label}</Label>}

      <TouchableOpacity
        style={Inputstyles.input}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={{ color: '#333' }}>
          {value ? formatDate(value) : 'Selecione a data e hora'}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default DateTimePickerField;