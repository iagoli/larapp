import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Avatar, Checkbox, IconButton } from 'react-native-paper';
import { Dialog, Portal, Button } from 'react-native-paper';

const rooms = [
    { id: '1', number: '101' },
    { id: '2', number: '102' },
    { id: '3', number: '103' },
    { id: '4', number: '104' },
    { id: '5', number: '105' },
    { id: '6', number: '106' },
    { id: '7', number: '107' },
    { id: '8', number: '108' },
];

const RoomsListScreen = () => {
    const [checkedItems, setCheckedItems] = useState(
        Object.fromEntries(rooms.map(room => [room.id, false]))
    );

    const toggleCheckbox = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const renderItem = ({ item }) => (
        <View style={styles.itemRow}>
            <Avatar.Text
                label={item.number}
                size={36}
                style={styles.avatar}
                color="#5e3b7f"
            />
            <Text style={styles.itemText}>Quarto {item.number}</Text>
            <Checkbox
                status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                onPress={() => toggleCheckbox(item.id)}
                color="#5e3b7f"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerLabel}>Quartos</Text>
                <View style={styles.iconGroup}>
                    <IconButton icon="pencil" size={20} iconColor="#5e3b7f" onPress={() => console.log('Edit pressed')} />
                    <IconButton icon="delete" size={20} iconColor="#5e3b7f" onPress={() => setShowDeleteDialog(true)} />
                    <IconButton icon="plus" size={20} iconColor="#5e3b7f" onPress={() => console.log('Add pressed')} />
                </View>
            </View>

            <FlatList
                data={rooms}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <Portal>
                <Dialog
                    visible={showDeleteDialog}
                    onDismiss={() => setShowDeleteDialog(false)}
                >
                    <Dialog.Title>Confirmar</Dialog.Title>
                    <Dialog.Content>
                        <Text>Tem a certeza que quer remover o quarto selecionado?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
                        <Button onPress={() => {
                            console.log('Deleting users...');
                            setShowDeleteDialog(false);
                        }}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default RoomsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9efff',
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerLabel: {
        backgroundColor: '#5e3b7f',
        color: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    iconGroup: {
        flexDirection: 'row',
        gap: 4,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9efff',
        marginBottom: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    avatar: {
        backgroundColor: '#e0cfff',
        marginRight: 12,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#3a2d4d',
    },
});
