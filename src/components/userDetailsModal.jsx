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
          width: '85%'
        }}>
          {user && (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Informações do Utilizador
              </Text>
              <Text>Nome: {user.nome || 'N/A'}</Text>
              <Text>Idade: {user.idade || 'N/A'}</Text>
              <Text>Email: {user.email || 'N/A'}</Text>
              <Text>Telemóvel: {user.telemovel || 'N/A'}</Text>
              <Text>Morada: {user.morada || 'N/A'}</Text>
              <Text>Tipo de Utilizador: {user.tipoUsuario || 'N/A'}</Text>
              <Text>Utente Associado: {user.utenteId || 'N/A'}</Text>
            </>
          )}

          <Pressable
            style={{
              marginTop: 20,
              backgroundColor: '#5e3b7f',
              padding: 10,
              borderRadius: 5
            }}
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
