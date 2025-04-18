import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, IconButton, Menu } from 'react-native-paper';

const AddUserScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [morada, setMorada] = useState('');
  const [utenteAssociado, setUtenteAssociado] = useState('');
  const [userType, setUserType] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const userTypeOptions = ['Administrador', 'Funcionário', 'Utente'];

  const handleSave = () => {
    console.log({
      nome,
      email,
      telemovel,
      morada,
      userType,
      utenteAssociado
    });
    // TODO: Fazer a magia da API acontecer 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Utilizador</Text>

      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Telemovel"
        value={telemovel}
        onChangeText={setTelemovel}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        label="Morada"
        value={morada}
        onChangeText={setMorada}
        mode="outlined"
        style={styles.input}
      />

      {/* User type dropdown */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <TextInput
              label="Tipo de Usuario"
              value={userType}
              mode="outlined"
              style={styles.input}
              editable={false}
              right={<TextInput.Icon icon="menu-down" />}
            />
          </TouchableOpacity>
        }>
        {userTypeOptions.map((option, index) => (
          <Menu.Item
            key={index}
            onPress={() => {
              setUserType(option);
              setMenuVisible(false);
            }}
            title={option}
          />
        ))}
      </Menu>

      <TextInput
        label="Utente Associado"
        value={utenteAssociado}
        onChangeText={setUtenteAssociado}
        mode="outlined"
        style={styles.input}
      />

      {/* Upload button placeholder */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => console.log('Upload pressed')}>
        <IconButton icon="upload" size={20} />
        <Text>Upload foto</Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Guardar
      </Button>
    </View>
  );
};

export default AddUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#5e3b7f',
  },
});
