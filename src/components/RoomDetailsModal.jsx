import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import styles from '../styles/roomDetailsModal_styles';

const RoomDetailsModal = ({ visible, room, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {room && (
            <>
              <Text style={styles.title}>Detalhes do Quarto</Text>
              <Text style={styles.text}> Número: {room.number}</Text>
              <Text style={styles.text}> Disponibilidade: {room.availability}</Text>
            </>
          )}

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default RoomDetailsModal;
