import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginStyles from '../styles/login_styles';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase.config';

const LoginScreen = () => {

  // Estados para armazenar os valores dos inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Função que será chamada quando o botão Login for pressionado
  const handleLogin = () => {
    console.log('Botão de Login pressionado!');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  // Função para o botão "Esqueci a senha"
  const handleForgotPassword = () => {
    console.log('Usuário esqueceu a senha');
  };


  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Hello{'\n'}again!</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        placeholderTextColor="#8e8e8e"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        placeholderTextColor="#8e8e8e"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={LoginStyles.loginButton}
        onPress={handleLogin}
      >
        <Text style={LoginStyles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={LoginStyles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;