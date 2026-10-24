// Variáveis EXPO_PUBLIC_* são embutidas no bundle pelo Expo a partir do ficheiro .env
// (ver .env.example). Têm de ser lidas por extenso para o Expo as substituir.
const variaveis = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_STREAM_API_KEY: process.env.EXPO_PUBLIC_STREAM_API_KEY,
  EXPO_PUBLIC_FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const emFalta = Object.keys(variaveis).filter((nome) => !variaveis[nome]);
if (emFalta.length > 0) {
  throw new Error(
    `Configuração em falta no .env: ${emFalta.join(', ')}. Copie .env.example para .env.`
  );
}

export const API_URL = variaveis.EXPO_PUBLIC_API_URL;
export const STREAM_API_KEY = variaveis.EXPO_PUBLIC_STREAM_API_KEY;
export const FIREBASE_CONFIG = {
  apiKey: variaveis.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: variaveis.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: variaveis.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: variaveis.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: variaveis.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: variaveis.EXPO_PUBLIC_FIREBASE_APP_ID,
};
