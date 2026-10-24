import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UtenteDetailsModal = ({ visible, utente, onClose }) => {
  const navigation = useNavigation();

  const handleSeeDetails = () => {
    onClose();
    if (utente?.id) {
      navigation.navigate('UtenteDetailsScreen', { utenteId: utente.id });
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
        >
          {utente && (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Informações
              </Text>
              <Text> Nome: {utente.nome}</Text>
              <Text> Quarto: {utente.quarto}</Text>
              <Text> Idade: {utente.idade}</Text>
            </>
          )}

          <Pressable
            style={{ marginTop: 20, backgroundColor: '#5e3b7f', padding: 10, borderRadius: 5 }}
            onPress={onClose}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Fechar</Text>
          </Pressable>

          {utente?.id && (
            <Pressable
              style={{ marginTop: 10, backgroundColor: '#5e3b7f', padding: 10, borderRadius: 5 }}
              onPress={handleSeeDetails}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Ver</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UtenteDetailsModal;
