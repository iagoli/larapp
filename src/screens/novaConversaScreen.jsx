import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { List, Avatar, Text } from 'react-native-paper';
import { apiGet, apiPost } from '../services/api';

const TIPOS = {
  admin: 'Administrador',
  enfermeiro: 'Enfermeiro',
  utente: 'Utente',
};

const NovaConversaScreen = ({ navigation }) => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aAbrir, setAAbrir] = useState(null);

  useEffect(() => {
    apiGet('/chat/contacts')
      .then(({ contactos }) => setContactos(contactos))
      .catch((err) => Alert.alert('Erro', err.message))
      .finally(() => setLoading(false));
  }, []);

  const abrirConversa = async (contacto) => {
    setAAbrir(contacto.uid);
    try {
      const { cid } = await apiPost('/chat/direct', { uid: contacto.uid });
      navigation.replace('Conversa', { cid });
    } catch (err) {
      Alert.alert('Erro', err.message);
      setAAbrir(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={contactos}
      keyExtractor={(c) => c.uid}
      ListEmptyComponent={<Text style={styles.vazio}>Sem contactos disponíveis.</Text>}
      renderItem={({ item }) => (
        <List.Item
          title={item.nome}
          description={TIPOS[item.tipoUsuario] || item.tipoUsuario}
          disabled={aAbrir !== null}
          onPress={() => abrirConversa(item)}
          left={() =>
            item.photoUrl ? (
              <Avatar.Image size={40} source={{ uri: item.photoUrl }} />
            ) : (
              <Avatar.Text
                size={40}
                label={(item.nome || '?').charAt(0).toUpperCase()}
                style={styles.avatar}
              />
            )
          }
          right={() => (aAbrir === item.uid ? <ActivityIndicator /> : null)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#5e3b7f',
  },
  vazio: {
    padding: 16,
    color: 'gray',
  },
});

export default NovaConversaScreen;
