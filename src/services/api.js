import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';

// No telemóvel "localhost" é o próprio aparelho: defina EXPO_PUBLIC_API_URL com o IP da máquina
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const apiPost = async (path, body) => {
  const currentUser = getAuth(app).currentUser;
  if (!currentUser) {
    throw new Error('Utilizador não autenticado');
  }

  const idToken = await currentUser.getIdToken();

  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Erro ${response.status} ao contactar o servidor`);
  }

  return data;
};
