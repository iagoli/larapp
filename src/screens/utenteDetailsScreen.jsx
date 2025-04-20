import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, IconButton, Card } from 'react-native-paper';

const data = [
    { id: 1, title: 'Medicação', subhead: 'Subhead', icon: 'pill' },
    { id: 2, title: 'Atividades Diárias', subhead: 'Subhead', icon: 'calendar-check' },
    { id: 3, title: 'Alimentação', subhead: 'Subhead', icon: 'food' },
    { id: 4, title: 'Cuidados Médicos', subhead: 'Subhead', icon: 'hospital-box-outline' },
    { id: 5, title: 'Observações', icon: 'comment-text-outline' }, 
];

const UtenteDetailsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('quarto');
    const roomNumber = '105';

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Icon icon="account" size={48} style={styles.userAvatar} />
                <View style={styles.tabContainer}>
                    <View style={[styles.tab, selectedTab === 'quarto' && styles.tabActive]}>
                        <IconButton icon="bed" size={16} iconColor={selectedTab === 'quarto' ? '#fff' : '#5e3b7f'} />
                        <Text style={[styles.tabText, selectedTab === 'quarto' && styles.tabTextActive]}>
                            Quarto {roomNumber}
                        </Text>
                    </View>
                </View>
            </View>

            {data.map((item) => (
                <Card
                    key={item.id}
                    style={styles.card}
                    onPress={() => console.log('Pressed card:', item.title)} 
                >
                    <Card.Title
                        title={item.title}
                        titleStyle={styles.cardTitle}
                        titleNumberOfLines={2}
                        ellipsizeMode="clip"
                        left={(props) => (
                            <Avatar.Icon
                                {...props}
                                icon={item.icon}
                                style={styles.cardAvatar}
                                color="#5e3b7f"
                            />
                        )}
                        right={() => (
                            <View style={styles.cardActions}>
                                <IconButton icon="plus" size={20} onPress={() => console.log('Add', item.title)} />
                                <IconButton icon="pencil" size={20} onPress={() => console.log('Edit', item.title)} />
                            </View>
                        )}
                    />
                </Card>
            ))}
        </ScrollView>
    );
};

export default UtenteDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    userAvatar: {
        backgroundColor: '#e0cfff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    tabContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0cfff',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginLeft: 8,
    },
    tabActive: {
        backgroundColor: '#5e3b7f',
    },
    tabText: {
        color: '#5e3b7f',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f9efff',
        marginBottom: 10,
        borderRadius: 16,
    },
    cardAvatar: {
        backgroundColor: '#e0cfff',
    },
    cardTitle: {
        flexWrap: 'wrap',
        fontSize: 13,
        fontWeight: '500',
        color: '#3a2d4d',
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
