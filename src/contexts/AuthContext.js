import React, { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { app, db } from '../../firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          console.log('Logged in UID:', firebaseUser.uid);

          // Query the "users" collection for matching UID
          const q = query(collection(db, 'users'), where('uid', '==', firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            console.log('User found in Firestore:', userDoc.data());
            setUser({ uid: firebaseUser.uid, ...userDoc.data() });
          } else {
            console.warn('No user document found in Firestore.');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user from Firestore:', error);
          setUser(null);
        }
      } else {
        console.log('No user is logged in.');
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
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
