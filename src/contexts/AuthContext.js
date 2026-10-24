import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from '../../firebase.config';
import { chatClient } from '../services/chatClient';
import { fetchChatToken } from '../services/chatTokenService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.log('✅ Firebase autenticado UID:', firebaseUser.uid);

          // Busca dados no Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullUser = { uid: firebaseUser.uid, ...userData };

            setUser(fullUser); // 👉 permite que o app navegue imediatamente

            // Conecta ao chat da Stream em segundo plano
            fetchChatToken()
              .then(async (token) => {
                if (!token) throw new Error('Token de chat não encontrado');

                await chatClient.connectUser(
                  {
                    id: firebaseUser.uid,
                    name: userData.nome ?? 'Utilizador',
                    image: userData.photoUrl ?? undefined,
                  },
                  token
                );

                setChatReady(true);
              })
              .catch((err) => {
                console.error('Erro ao conectar no chat:', err);
              });
          } else {
            console.warn('⚠️ Usuário não encontrado no Firestore.');
            setUser(null);
          }
        } catch (error) {
          console.error('Erro ao autenticar com chat:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      await chatClient.disconnectUser();
      setChatReady(false);
      setUser(null);
    } catch (err) {
      console.error('Erro no logout:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, chatReady, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
