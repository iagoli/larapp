import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, IconButton, Button, Checkbox } from 'react-native-paper';
import { Dialog, Portal } from 'react-native-paper';
import { Dimensions } from 'react-native';

const dummyMedications = [
    { id: '1', name: 'Paracetamol', date: '2025-04-18', quantity: '1x/dia' },
    { id: '2', name: 'Ibuprofeno', date: '2025-04-19', quantity: '2x/dia' },
];

const UtenteMedicacaoScreen = () => {
    const [selectedItems, setSelectedItems] = useState({});

    const toggleCheckbox = (id) => {
        setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const isCompact = screenWidth < 360; 

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Utente Medicação</Text>

                <View style={styles.header}>
                    <Avatar.Icon icon="account" size={48} style={styles.avatar} />

                    <Button
                        icon="calendar-plus"
                        mode="outlined"
                        style={styles.scheduleButton}
                        onPress={() => console.log('Agendar')}
                    >
                        {!isCompact ? "Agendar" : null}
                    </Button>

                    <IconButton icon="delete" onPress={() => setShowDeleteDialog(true)} />
                    <IconButton icon="plus" onPress={() => console.log('Add')} />
                </View>

                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.columnMedicamento]}>Medicamento</Text>
                    <Text style={[styles.headerText, styles.columnData]}>Data</Text>
                    <Text style={[styles.headerText, styles.columnQuantidade]}>Quantidade</Text>
                </View>

                {dummyMedications.map((item) => (
                    <View key={item.id} style={styles.row}>
                        <Checkbox
                            status={selectedItems[item.id] ? 'checked' : 'unchecked'}
                            onPress={() => toggleCheckbox(item.id)}
                        />
                        <Text style={[styles.cell, styles.columnMedicamento]}>{item.name}</Text>
                        <Text style={[styles.cell, styles.columnData]}>{item.date}</Text>
                        <Text style={[styles.cell, styles.columnQuantidade]}>{item.quantity}</Text>
                    </View>
                ))}

            </ScrollView>

            <Portal>
                <Dialog
                    visible={showDeleteDialog}
                    onDismiss={() => setShowDeleteDialog(false)}
                >
                    <Dialog.Title>Confirmar Remoção</Dialog.Title>
                    <Dialog.Content>
                        <Text>Tem a certeza que deseja remover os itens selecionados?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDeleteDialog(false)}>Cancelar</Button>
                        <Button
                            onPress={() => {
                                console.log('Confirm delete...');
                                setShowDeleteDialog(false);
                            }}
                        >
                            Confirmar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default UtenteMedicacaoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        color: '#5e3b7f',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    columnMedicamento: {
        flex: 1.2,
    },
    columnData: {
        flex: 1,
    },
    columnQuantidade: {
        flex: 1,
    },
    avatar: {
        backgroundColor: '#e0cfff',
    },
    scheduleButton: {
        flex: 1,
        marginHorizontal: 8,
        borderRadius: 20,
        borderColor: '#5e3b7f',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f9efff',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerText: {
        fontWeight: 'bold',
        color: '#5e3b7f',
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cell: {
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 4,
    },
});
