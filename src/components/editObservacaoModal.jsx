import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/editRoomModal_styles';
import Label from './label';
import TextInputField from './textInputField';
import DateTimeInput from './dateTimeInput';
import SaveButton from './saveButton';

const EditObservacaoModal = ({ visible, onClose, onSave, observacao }) => {
  const [descricao, setDescricao] = useState('');
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    if (observacao) {
      setDescricao(observacao.descricao);
      setDataHora(new Date(observacao.dataHora || Date.now()));
    }
  }, [observacao]);

  const handleSave = () => {
    onSave({ ...observacao, descricao, dataHora });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.title, { color: 'black' }]}>Editar Observação</Text>

          <Label>Data/Hora</Label>
          <DateTimeInput value={dataHora} onChange={setDataHora} />

          <Label>Descrição</Label>
          <TextInputField value={descricao} onChangeText={setDescricao} multiline />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditObservacaoModal;
