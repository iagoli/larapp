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
const EQUIPA = ['admin', 'enfermeiro'];
const CANAL_EQUIPA = 'equipa';

// Perfil do utilizador no Firestore; aceita documentos com id = uid ou com campo uid
const getPerfil = async (uid) => {
  const direto = await db.collection('users').doc(uid).get();
  if (direto.exists) return direto.data();

  const snapshot = await db.collection('users').where('uid', '==', uid).limit(1).get();
  return snapshot.empty ? null : snapshot.docs[0].data();
};

const toStreamUser = (uid, perfil) => ({
  id: uid,
  name: perfil.nome || 'Utilizador',
  image: perfil.photoUrl || undefined,
  tipoUsuario: perfil.tipoUsuario,
});

// Utentes só falam com a equipa; a equipa fala com todos
const podeConversar = (perfilA, perfilB) =>
  EQUIPA.includes(perfilA.tipoUsuario) || EQUIPA.includes(perfilB.tipoUsuario);

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
  const perfil = await getPerfil(req.uid);

  if (!perfil || perfil.tipoUsuario !== 'admin') {
    return res.status(403).json({ error: 'Apenas administradores podem executar esta ação' });
  }

  return next();
};

app.post('/token', requireAuth, async (req, res) => {
  try {
    const perfil = await getPerfil(req.uid);
    if (!perfil) {
      return res.status(404).json({ error: 'Perfil de utilizador não encontrado' });
    }

    await serverClient.upsertUser(toStreamUser(req.uid, perfil));

    if (EQUIPA.includes(perfil.tipoUsuario)) {
      const canal = serverClient.channel('messaging', CANAL_EQUIPA, {
        name: 'Equipa',
        created_by_id: req.uid,
      });
      await canal.create();
      await canal.addMembers([req.uid]);
    }

    const token = serverClient.createToken(req.uid);
    return res.json({ token });
  } catch (err) {
    console.error('Erro ao gerar token:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar token' });
  }
});

app.get('/chat/contacts', requireAuth, async (req, res) => {
  try {
    const perfil = await getPerfil(req.uid);
    if (!perfil) {
      return res.status(404).json({ error: 'Perfil de utilizador não encontrado' });
    }

    const snapshot = await db.collection('users').get();
    const contactos = snapshot.docs
      .map((d) => d.data())
      .filter((c) => c.uid && c.uid !== req.uid && podeConversar(perfil, c))
      .map((c) => ({ uid: c.uid, nome: c.nome, tipoUsuario: c.tipoUsuario, photoUrl: c.photoUrl || null }))
      .sort((a, b) => (a.nome || '').localeCompare(b.nome || ''));

    return res.json({ contactos });
  } catch (err) {
    console.error('Erro ao listar contactos:', err);
    return res.status(500).json({ error: 'Erro interno ao listar contactos' });
  }
});

app.post('/chat/direct', requireAuth, async (req, res) => {
  const { uid } = req.body;

  if (!uid || uid === req.uid) {
    return res.status(400).json({ error: 'Contacto inválido' });
  }

  try {
    const [perfil, outro] = await Promise.all([getPerfil(req.uid), getPerfil(uid)]);

    if (!perfil || !outro) {
      return res.status(404).json({ error: 'Utilizador não encontrado' });
    }
    if (!podeConversar(perfil, outro)) {
      return res.status(403).json({ error: 'Não é possível iniciar esta conversa' });
    }

    await serverClient.upsertUsers([toStreamUser(req.uid, perfil), toStreamUser(uid, outro)]);

    // Canal "distinct": os mesmos dois membros reutilizam sempre a mesma conversa
    const canal = serverClient.channel('messaging', {
      members: [req.uid, uid],
      created_by_id: req.uid,
    });
    await canal.create();

    return res.json({ cid: canal.cid });
  } catch (err) {
    console.error('Erro ao criar conversa:', err);
    return res.status(500).json({ error: 'Erro interno ao criar conversa' });
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
