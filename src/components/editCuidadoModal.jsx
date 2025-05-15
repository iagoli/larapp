import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimeInput from './dateTimeInput';
import styles from '../styles/editRoomModal_styles';

const EditCuidadoModal = ({ visible, onClose, onSave, cuidado }) => {
  const [acao, setAcao] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (cuidado) {
      setAcao(cuidado.acao || '');
      setDataHora(cuidado.dataHora ? new Date(cuidado.dataHora) : new Date());
      setDescricao(cuidado.descricao || '');
    }
  }, [cuidado]);

  const handleSave = () => {
    onSave({
      ...cuidado,
      acao,
      dataHora,
      descricao,
    });
    onClose(); // fecha o modal após salvar
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Editar Cuidado</Text>

          <Text style={styles.label}>Ação efetuada</Text>
          <TextInput
            style={styles.input}
            value={acao}
            onChangeText={setAcao}
            placeholder="Digite a ação"
          />

          <Text style={styles.label}>Data/Hora</Text>
          <DateTimeInput value={dataHora} onChange={setDataHora} />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
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

export default EditCuidadoModal;
