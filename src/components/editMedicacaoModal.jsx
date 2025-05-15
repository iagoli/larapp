import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import TextInputField from './textInputField';
import DateTimeInput from './dateTimeInput';
import styles from '../styles/editRoomModal_styles';

const EditMedicacaoModal = ({
  visible,
  onDismiss,
  medicamento,
  setMedicamento,
  dataHora,
  setDataHora,
  quantidade,
  setQuantidade,
  onSave,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Medicação</Text>

          <TextInputField
            label="Medicamento"
            value={medicamento}
            onChangeText={setMedicamento}
          />

          <DateTimeInput
            label="Data e Hora"
            value={dataHora}
            onChange={setDataHora}
          />

          <TextInputField
            label="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditMedicacaoModal;
