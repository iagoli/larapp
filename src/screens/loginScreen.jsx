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
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      console.error('Erro no login:', error.code, error.message);
  
      alert('Não foi possível iniciar sessão. Verifique o email e a palavra-passe.');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Introduza o seu email para redefinir a palavra-passe.');
      return;
    }
  
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      alert('Enviámos um email para redefinir a palavra-passe. Verifique a sua caixa de correio.');
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error.code, error.message);
      if (error.code === 'auth/user-not-found') {
        alert('Não existe nenhum utilizador com este email.');
      } else {
        alert('Não foi possível enviar o email de redefinição. Tente novamente.');
      }
    }
  };


  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Olá{'\n'}de novo!</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        placeholderTextColor="#8e8e8e"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Palavra-passe"
        placeholderTextColor="#8e8e8e"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={LoginStyles.loginButton}
        onPress={handleLogin}
      >
        <Text style={LoginStyles.loginText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={LoginStyles.forgotText}>Esqueceu-se da palavra-passe?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;