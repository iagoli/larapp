import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/editRoomModal_styles';
import DateTimeInput from './dateTimeInput';
import Label from './label';

const EditAtividadeModal = ({ visible, onClose, onSave, atividadeData }) => {
  const [atividade, setAtividade] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (atividadeData) {
      setAtividade(atividadeData.atividade || '');
      setDataHora(atividadeData.dataHora ? new Date(atividadeData.dataHora) : new Date());
      setDescricao(atividadeData.descricao || '');
    }
  }, [atividadeData]);

  const handleSave = () => {
    if (!atividade.trim()) {
      return alert('Atividade é obrigatória');
    }

    onSave({
      ...atividadeData,
      atividade,
      dataHora: dataHora.toISOString(),
      descricao,
    });
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Atividade</Text>

          <Label>Atividade</Label>
          <TextInput
            style={styles.input}
            value={atividade}
            onChangeText={setAtividade}
            placeholder="Digite a atividade"
          />

          <Label>Data/Hora</Label>
          <DateTimeInput value={dataHora} onChange={setDataHora} />

          <Label>Descrição</Label>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Digite a descrição"
            multiline
          />

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

export default EditAtividadeModal;
