import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const MedicationForm = () => {
    const [medication, setMedication] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const handleSubmit = () => {
        console.log('Saving:', { medication, quantity, date });
    };

    const [date, setDate] = useState(new Date());

    const handleWebDateChange = (e) => {
        setDate(new Date(e.target.value));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Medicamento</Text>
            <TextInput
                mode="outlined"
                placeholder="Escreva o nome"
                value={medication}
                onChangeText={setMedication}
                textColor="#3a2d4d"
                style={styles.input}
            />

            <Text style={styles.label}>Data/Hora Administrada</Text>

            {Platform.OS === 'web' ? (
                <input
                    type="datetime-local"
                    value={new Date(date).toISOString().slice(0, 16)}
                    onChange={handleWebDateChange}
                    style={styles.webInput}
                />
            ) : (
                <TextInput
                    mode="outlined"
                    value={date.toLocaleString()}
                    style={styles.input}
                    onFocus={() => setShowPicker(true)}
                    right={<TextInput.Icon icon="calendar" onPress={() => setShowPicker(true)} />}
                    editable={false}
                />
            )}

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShowPicker(false);
                        setDate(currentDate);
                    }}
                />
            )}

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
                mode="outlined"
                placeholder="Quantidade"
                value={quantity}
                onChangeText={setQuantity}
                style={styles.input}
                keyboardType="default"
                textColor="#3a2d4d"
            />

            <Button
                mode="contained"
                style={styles.button}
                labelStyle={{ color: '#fff' }} // 👈 This makes the text white
                onPress={handleSubmit}
            >
                Guardar
            </Button>
        </View>
    );
};

export default MedicationForm;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flex: 1,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        marginTop: 16,
        color: '#333',
    },
    input: {
        backgroundColor: '#f1eef6',
    },
    button: {
        marginTop: 32,
        backgroundColor: '#5e3b7f',
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#f1eef6',
        color: '#3a2d4d',
    },
    webInput: {
        width: '100%',           
        maxWidth: '100%',        
        padding: 12,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
        marginTop: 6,
        backgroundColor: '#f1eef6',
        color: '#3a2d4d',
        boxSizing: 'border-box', 
      },
});
