import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginStyles from '../styles/login_styles';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';

const LoginScreen = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log('Usuário logado:', user.uid);
  
    } catch (error) {
      console.error('Erro no login:', error.code, error.message);
  
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Por favor, insira seu email para redefinir a senha.');
      return;
    }
  
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      alert('Email de redefinição de senha enviado. Verifique sua caixa de entrada.');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error.code, error.message);
      if (error.code === 'auth/user-not-found') {
        alert('Nenhum usuário encontrado com este email.');
      } else {
        alert('Erro ao enviar email de redefinição de senha. Tente novamente.');
      }
    }
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