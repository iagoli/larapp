import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase.config';

// Subscreve em tempo real os registos de um utente numa coleção (medicacoes, atividades, ...)
export const useUtenteRegistos = (colecao, utenteId) => {
  const [registos, setRegistos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!utenteId) {
      setRegistos([]);
      setLoading(false);
      return undefined;
    }

    const q = query(collection(db, colecao), where('utenteId', '==', utenteId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setRegistos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (error) => {
        console.error(`Erro ao carregar ${colecao}:`, error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [colecao, utenteId]);

  return { registos, loading };
};
