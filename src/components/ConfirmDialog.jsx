import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';

const ConfirmDialog = ({ visible, onCancel, onConfirm }) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onCancel}>
      <Dialog.Title>Confirmar remoção</Dialog.Title>
      <Dialog.Content>
        <Text>Tem certeza de que deseja remover os utentes selecionados?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancel}>Cancelar</Button>
        <Button onPress={onConfirm}>Confirmar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default ConfirmDialog;
