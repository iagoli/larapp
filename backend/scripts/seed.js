// Cria dados fictícios e contas de demonstração para testar a app.
//
//   npm run seed               -> cria/atualiza contas, quartos, utentes e registos
//   npm run seed -- --limpar   -> antes, apaga os dados demo criados por uma execução anterior
//
// Todos os documentos criados levam "demo: true", para poderem ser removidos depois.
// A palavra-passe das contas demo vem de SEED_PASSWORD (por omissão "larapp-demo").

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
require('dotenv').config();

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Erro: GOOGLE_APPLICATION_CREDENTIALS não definido no .env');
  process.exit(1);
}

initializeApp({ credential: applicationDefault() });
const auth = getAuth();
const db = getFirestore();

const PASSWORD = process.env.SEED_PASSWORD || 'larapp-demo';
const LIMPAR = process.argv.includes('--limpar');

const COLECOES_DEMO = [
  'medicacoes',
  'atividades',
  'alimentacoes',
  'cuidados',
  'observacoes',
  'utentes',
  'rooms',
];

const QUARTOS = [
  { id: 'demo-quarto-101', numero: '101', camas: '1', disponibilidade: 'ocupado' },
  { id: 'demo-quarto-102', numero: '102', camas: '2', disponibilidade: 'ocupado' },
  { id: 'demo-quarto-103', numero: '103', camas: '2', disponibilidade: 'disponivel' },
  { id: 'demo-quarto-104', numero: '104', camas: '1', disponibilidade: 'manutencao' },
];

const UTENTES = [
  {
    id: 'demo-utente-maria',
    nome: 'Maria da Conceição Silva',
    idade: '84',
    quarto: 'demo-quarto-101',
  },
  { id: 'demo-utente-joaquim', nome: 'Joaquim Ferreira', idade: '79', quarto: 'demo-quarto-102' },
  { id: 'demo-utente-alice', nome: 'Alice Moreira', idade: '88', quarto: 'demo-quarto-102' },
];

const CONTAS = [
  {
    email: 'admin@larapp.demo',
    nome: 'Ana Rodrigues',
    tipoUsuario: 'admin',
    telemovel: '912345678',
    morada: 'Rua do Lar, 1, Bragança',
    idade: '45',
  },
  {
    email: 'enfermeiro@larapp.demo',
    nome: 'Rui Teixeira',
    tipoUsuario: 'enfermeiro',
    telemovel: '923456789',
    morada: 'Avenida Sá Carneiro, 20, Bragança',
    idade: '34',
  },
  {
    email: 'utente@larapp.demo',
    nome: 'Maria da Conceição Silva',
    tipoUsuario: 'utente',
    telemovel: '934567890',
    morada: 'Quarto 101',
    idade: '84',
    utenteId: 'demo-utente-maria',
  },
];

// Data ISO de hoje (+ dias) à hora indicada, no fuso horário da máquina
const em = (dias, horas, minutos = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  d.setHours(horas, minutos, 0, 0);
  return d.toISOString();
};

// Registos variam ligeiramente entre utentes para a demo não parecer copiada
const registosPara = (utenteId, indice) =>
  Object.fromEntries(
    Object.entries(registosBase()).map(([colecao, lista]) => [
      colecao,
      lista.slice(0, Math.max(1, lista.length - indice)).map((r) => ({ ...r, utenteId })),
    ])
  );

const registosBase = () => ({
  medicacoes: [
    { medicamento: 'Paracetamol 500 mg', quantidade: '1', dataHora: em(0, 9) },
    { medicamento: 'Omeprazol 20 mg', quantidade: '1', dataHora: em(0, 8, 30) },
    { medicamento: 'Atorvastatina 10 mg', quantidade: '1', dataHora: em(0, 21) },
    { medicamento: 'Paracetamol 500 mg', quantidade: '1', dataHora: em(-1, 9) },
  ],
  atividades: [
    {
      atividade: 'Caminhada no jardim',
      descricao: 'Acompanhada, 20 minutos',
      dataHora: em(0, 10, 30),
    },
    { atividade: 'Fisioterapia', descricao: 'Exercícios de mobilidade', dataHora: em(0, 15) },
    { atividade: 'Bingo na sala comum', descricao: '', dataHora: em(1, 16) },
  ],
  alimentacoes: [
    { prato: 'Papas de aveia com fruta', dataHora: em(0, 8) },
    { prato: 'Sopa de legumes e peixe cozido', dataHora: em(0, 12, 30) },
    { prato: 'Caldo verde', dataHora: em(0, 19, 30) },
  ],
  cuidados: [
    { acao: 'Medição da tensão arterial', descricao: '13/8, normal', dataHora: em(-1, 11) },
    { acao: 'Medição da glicemia', descricao: '110 mg/dL em jejum', dataHora: em(0, 7, 45) },
  ],
  observacoes: [
    { descricao: 'Dormiu bem e acordou bem-disposto(a).', dataHora: em(0, 8, 15) },
    { descricao: 'Recebeu a visita da família à tarde.', dataHora: em(-1, 17) },
  ],
});

const limpar = async () => {
  for (const colecao of COLECOES_DEMO) {
    const snapshot = await db.collection(colecao).where('demo', '==', true).get();
    await Promise.all(snapshot.docs.map((d) => d.ref.delete()));
    console.log(`- ${colecao}: ${snapshot.size} documento(s) removido(s)`);
  }
};

// Cria a conta no Auth (ou repõe a palavra-passe se já existir) e o perfil em users/{uid}
const criarConta = async ({ email, nome, ...perfil }) => {
  let uid;
  try {
    uid = (await auth.getUserByEmail(email)).uid;
    await auth.updateUser(uid, { password: PASSWORD, displayName: nome });
  } catch (err) {
    if (err.code !== 'auth/user-not-found') throw err;
    uid = (await auth.createUser({ email, password: PASSWORD, displayName: nome })).uid;
  }

  await db
    .collection('users')
    .doc(uid)
    .set({
      nome,
      email,
      utenteId: null,
      photoUrl: null,
      ...perfil,
      uid,
      demo: true,
      createdAt: FieldValue.serverTimestamp(),
    });

  return uid;
};

const main = async () => {
  if (LIMPAR) {
    console.log('A remover dados demo anteriores...');
    await limpar();
  }

  console.log('A criar contas...');
  const uids = {};
  for (const conta of CONTAS) {
    uids[conta.tipoUsuario] = await criarConta(conta);
    console.log(`- ${conta.tipoUsuario}: ${conta.email}`);
  }
  const autor = uids.enfermeiro;

  const batch = db.batch();
  const base = { demo: true, userId: autor, createdAt: FieldValue.serverTimestamp() };

  for (const { id, ...quarto } of QUARTOS) {
    batch.set(db.collection('rooms').doc(id), { ...quarto, ...base });
  }

  UTENTES.forEach(({ id, ...utente }, indice) => {
    batch.set(db.collection('utentes').doc(id), {
      ...utente,
      utenteId: id,
      photoUrl: null,
      ...base,
    });

    for (const [colecao, lista] of Object.entries(registosPara(id, indice))) {
      lista.forEach((registo, n) => {
        batch.set(db.collection(colecao).doc(`${id}-${colecao}-${n}`), { ...registo, ...base });
      });
    }
  });

  await batch.commit();
  console.log(`Criados ${QUARTOS.length} quartos e ${UTENTES.length} utentes com registos.`);
  console.log(`\nPalavra-passe de todas as contas demo: ${PASSWORD}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Erro no seed:', err);
    process.exit(1);
  });
