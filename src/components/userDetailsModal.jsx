import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';

const UserDetailsModal = ({ visible, user, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          width: '80%'
        }}>
          {user && (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Informações</Text>
              <Text> Nome: {user.nome}</Text>
              <Text> Quarto: {user.quarto}</Text>
              <Text> Idade: {user.idade}</Text>
            </>
          )}

          <Pressable
            style={{ marginTop: 20, backgroundColor: '#5e3b7f', padding: 10, borderRadius: 5 }}
            onPress={onClose}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UserDetailsModal;