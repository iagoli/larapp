import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Text, Divider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const CustomDrawer = (props) => {
    const { user, logout } = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Avatar.Text
                    label={user?.nome?.charAt(0)?.toUpperCase() || 'U'}
                    size={48}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{user?.nome || 'Utilizador'}</Text>
            </View>

            <Divider style={{ marginVertical: 10 }} />

            <DrawerItemList {...props} />

            <DrawerItem
                label="Sair"
                onPress={logout}
                labelStyle={{ color: 'red' }}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    avatar: {
        backgroundColor: '#5e3b7f',
    },
    name: {
        color: '#3a2d4d',      
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomDrawer;