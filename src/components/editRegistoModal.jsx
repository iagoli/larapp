import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CamposRegisto from './camposRegisto';
import styles from '../styles/editRoomModal_styles';
import { valoresIniciais, prepararDados } from '../constants/registos';

const EditRegistoModal = ({ visible, definicao, registo, onClose, onSave }) => {
  const [valores, setValores] = useState(() => valoresIniciais(definicao.campos));

  useEffect(() => {
    if (visible && registo) setValores(valoresIniciais(definicao.campos, registo));
  }, [visible, registo]);

  const handleSave = () => {
    const { erro, dados } = prepararDados(definicao.campos, valores);
    if (erro) {
      Alert.alert('Campos obrigatórios', erro);
      return;
    }
    onSave(dados);
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Editar {definicao.singular}</Text>

            <CamposRegisto
              campos={definicao.campos}
              valores={valores}
              onChange={(campo, v) => setValores((prev) => ({ ...prev, [campo]: v }))}
            />

            <View style={[styles.buttonRow, { marginTop: 16 }]}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditRegistoModal;
