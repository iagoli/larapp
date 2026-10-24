import { getAuth } from 'firebase/auth';
import { app } from '../../firebase.config';
import { API_URL } from '../config';


const request = async (method, path, body) => {
  const currentUser = getAuth(app).currentUser;
  if (!currentUser) {
    throw new Error('Utilizador não autenticado');
  }

  const idToken = await currentUser.getIdToken();

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Erro ${response.status} ao contactar o servidor`);
  }

  return data;
};

export const apiGet = (path) => request('GET', path);

export const apiPost = (path, body) => request('POST', path, body);
