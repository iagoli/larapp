import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import selectInputstyles from '../styles/selectInput_styles';
import Label from './label';

const SelectInput = ({ label, selectedValue, onValueChange, items }) => {
  return (
    <View style={selectInputstyles.container}>
      <Label>{label}</Label>
      <View style={selectInputstyles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={selectInputstyles.picker}
          dropdownIconColor="#522074"
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};
export default SelectInput;
