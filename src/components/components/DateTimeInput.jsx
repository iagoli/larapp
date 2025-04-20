import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/dateTimeInput_styles';

const DateTimeInput = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleWebChange = (e) => {
    onChange(new Date(e.target.value));
  };

  return Platform.OS === 'web' ? (
    <input
      type="datetime-local"
      value={value.toISOString().slice(0, 16)}
      onChange={handleWebChange}
      style={styles.webInput}
    />
  ) : (
    <>
      <TextInput
        mode="outlined"
        value={value.toLocaleString()}
        onFocus={() => setShowPicker(true)}
        editable={false}
        style={styles.input}
        right={<TextInput.Icon icon="calendar" onPress={() => setShowPicker(true)} />}
      />
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="datetime"
          display="default"
          onChange={(event, selected) => {
            const currentDate = selected || value;
            setShowPicker(false);
            onChange(currentDate);
          }}
        />
      )}
    </>
  );
};

export default DateTimeInput;