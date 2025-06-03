import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/emergencyModal_styles';

const EmergencyModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}> 
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Contatos de Emergência</Text> 
          <Text style={styles.label}>🚑 Emergência Médica: 192</Text> 
          <Text style={styles.label}>🚓 Polícia: 190</Text>
          <Text style={styles.label}>🔥 Bombeiros: 193</Text>
          <Text style={styles.label}>📞 Clínica local: (21) 1234-5678</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmergencyModal;
