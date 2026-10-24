const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { StreamChat } = require('stream-chat');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error('Erro: STREAM_API_KEY e/ou STREAM_API_SECRET não definidos no .env');
  process.exit(1);
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Erro: GOOGLE_APPLICATION_CREDENTIALS não definido no .env');
  process.exit(1);
}

const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

initializeApp({ credential: applicationDefault() });
const auth = getAuth();
const db = getFirestore();

const TIPOS_USUARIO = ['admin', 'enfermeiro', 'utente'];

app.use(cors());
app.use(express.json());

// Valida o Firebase ID token enviado em "Authorization: Bearer <token>"
const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const idToken = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!idToken) {
    return res.status(401).json({ error: 'Token de autenticação em falta' });
  }

  try {
    req.uid = (await auth.verifyIdToken(idToken)).uid;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};

const requireAdmin = async (req, res, next) => {
  const snapshot = await db.collection('users').where('uid', '==', req.uid).limit(1).get();

  if (snapshot.empty || snapshot.docs[0].data().tipoUsuario !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem executar esta ação' });
  }

  return next();
};

app.post('/token', requireAuth, (req, res) => {
  try {
    const token = serverClient.createToken(req.uid);
    return res.json({ token });
  } catch (err) {
    console.error('Erro ao gerar token:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar token' });
  }
});

app.post('/users', requireAuth, requireAdmin, async (req, res) => {
  const { nome, idade, email, telemovel, morada, tipoUsuario, utenteId, photoUrl } = req.body;

  if (!nome || !email || !telemovel || !morada || !tipoUsuario) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
  }

  if (!TIPOS_USUARIO.includes(tipoUsuario)) {
    return res.status(400).json({ error: 'Tipo de utilizador inválido' });
  }

  try {
    // Senha aleatória: o utilizador define a sua através do email de redefinição
    const newUser = await auth.createUser({
      email,
      password: crypto.randomBytes(24).toString('base64url'),
      displayName: nome,
    });

    await db.collection('users').add({
      nome,
      idade: idade || '',
      email,
      telemovel,
      morada,
      tipoUsuario,
      utenteId: utenteId || null,
      photoUrl: photoUrl || null,
      createdAt: FieldValue.serverTimestamp(),
      uid: newUser.uid,
    });

    return res.status(201).json({ uid: newUser.uid });
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Já existe um utilizador com este email' });
    }
    if (err.code === 'auth/invalid-email') {
      return res.status(400).json({ error: 'Email inválido' });
    }
    console.error('Erro ao criar utilizador:', err);
    return res.status(500).json({ error: 'Erro interno ao criar utilizador' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
