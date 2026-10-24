import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import styles from '../styles/emergencyModal_styles';

const CONTACTOS = [
  { label: '🚑 Emergência (INEM, PSP, Bombeiros)', numero: '112' },
  { label: '🩺 SNS 24', numero: '808242424', display: '808 24 24 24' },
];

const ligar = (numero) => {
  Linking.openURL(`tel:${numero}`).catch(() =>
    Alert.alert('Não foi possível ligar', `Ligue manualmente para ${numero}.`)
  );
};

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
          <Text style={styles.title}>Contactos de Emergência</Text>

          {CONTACTOS.map(({ label, numero, display }) => (
            <TouchableOpacity key={numero} style={styles.contact} onPress={() => ligar(numero)}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.number}>{display || numero}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.hint}>Toque num contacto para ligar.</Text>

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
