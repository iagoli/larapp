const express = require('express');
const cors = require('cors');
const { StreamChat } = require('stream-chat');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error('Erro: STREAM_API_KEY e/ou STREAM_API_SECRET não definidos no .env');
  process.exit(1);
}

const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

app.use(cors());
app.use(express.json());

app.post('/token', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId é obrigatório' });
  }

  try {
    const token = serverClient.createToken(userId);
    return res.json({ token });
  } catch (err) {
    console.error('Erro ao gerar token:', err);
    return res.status(500).json({ error: 'Erro interno ao gerar token' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Token server rodando em http://localhost:${PORT}`);
});
