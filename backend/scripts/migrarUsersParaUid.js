// Move os documentos de /users para /users/{uid}, formato exigido pelas firestore.rules.
// Uso: node scripts/migrarUsersParaUid.js           (simulação)
//      node scripts/migrarUsersParaUid.js --aplicar (grava as alterações)
require('dotenv').config();
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({ credential: applicationDefault() });
const db = getFirestore();
const aplicar = process.argv.includes('--aplicar');

const main = async () => {
  const snapshot = await db.collection('users').get();
  let migrados = 0;

  for (const docSnap of snapshot.docs) {
    const dados = docSnap.data();

    if (!dados.uid) {
      console.warn(`⚠️  ${docSnap.id} sem campo uid — ignorado`);
      continue;
    }
    if (docSnap.id === dados.uid) continue;

    const destino = db.collection('users').doc(dados.uid);
    if ((await destino.get()).exists) {
      console.warn(`⚠️  users/${dados.uid} já existe — ${docSnap.id} ignorado`);
      continue;
    }

    console.log(
      `${aplicar ? 'A migrar' : '[simulação]'} users/${docSnap.id} → users/${dados.uid} (${dados.nome})`
    );
    if (aplicar) {
      const batch = db.batch();
      batch.set(destino, dados);
      batch.delete(docSnap.ref);
      await batch.commit();
    }
    migrados += 1;
  }

  console.log(`\n${migrados} documento(s) ${aplicar ? 'migrados' : 'por migrar'}.`);
  if (!aplicar && migrados > 0) console.log('Execute com --aplicar para gravar.');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
