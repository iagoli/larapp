# LarApp

Aplicação móvel para a gestão de um lar de idosos. A equipa regista o dia a dia de cada utente
(medicação, refeições, atividades, cuidados médicos e observações), gere quartos e contas, e
comunica por chat com colegas e utentes. O utente vê o seu plano do dia e pode pedir
ajuda num toque.

Projeto desenvolvido na unidade curricular **Desenvolvimento Multiplataforma** da **Escola
Superior de Tecnologia e Gestão (ESTiG) do Instituto Politécnico de Bragança (IPB)**, no ano
letivo 2024/25.

<!--
Capturas de ecrã: guarde as imagens em docs/screenshots/ e descomente a tabela abaixo.

| Início | Registos do utente | Conversas |
| :----: | :----------------: | :-------: |
| <img src="docs/screenshots/home.png" width="220"> | <img src="docs/screenshots/registos.png" width="220"> | <img src="docs/screenshots/chat.png" width="220"> |
-->

## Funcionalidades

- **Autenticação** com Firebase Auth e recuperação da palavra-passe por email.
- **Três perfis**, cada um com o seu menu e as suas permissões:
  - **Administrador:** tudo o que o enfermeiro faz, mais criar, editar e remover contas.
  - **Enfermeiro:** gere quartos e utentes e escreve os registos diários.
  - **Utente:** consulta os seus próprios registos e o plano de hoje.
- **Registos diários** por utente: medicação, alimentação, atividades, cuidados médicos e
  observações, atualizados em tempo real.
- **Lembretes de medicação** através de notificações locais.
- **Cartão "Hoje"** na página inicial do utente, com a medicação, as refeições e as atividades
  do dia por ordem.
- **Chat** com Stream Chat: um canal da equipa e conversas diretas. Os utentes só podem falar
  com a equipa.
- **Botão SOS** que liga para o 112 ou para o SNS 24 (808 24 24 24).
- **Fotografias** de utilizadores e utentes guardadas no Firebase Storage.

## Tecnologias

| Camada    | Tecnologias                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| App       | Expo SDK 53, React Native 0.79, React 19, React Navigation 7, React Native Paper |
| Dados     | Firebase Auth, Cloud Firestore, Firebase Storage                                 |
| Chat      | Stream Chat (`stream-chat-expo`)                                                 |
| Backend   | Node.js, Express 5, Firebase Admin SDK                                           |
| Qualidade | ESLint, Prettier, GitHub Actions                                                 |
| Build     | EAS Build (APK Android)                                                          |

## Arquitetura

```
App (Expo) ──Firebase SDK──────────────▶ Firebase (Auth, Firestore, Storage)
     │                                        ▲
     ├──HTTPS + ID token──▶ backend/ ──Admin SDK┘
     │                      (Express) ──API secret──▶ Stream Chat
     └──WebSocket (mensagens)───────────────────────▶ Stream Chat
```

- A app lê e escreve os dados diretamente no Firestore. As
  [regras de segurança](firestore.rules) aplicam as permissões de cada perfil, com base no
  documento `users/{uid}`.
- O [backend](backend/index.js) guarda os segredos que não podem ir no telemóvel. Valida o
  ID token do Firebase em cada pedido e:
  - gera os tokens do Stream Chat (`POST /token`);
  - lista os contactos e cria as conversas diretas (`GET /chat/contacts`, `POST /chat/direct`);
  - cria contas novas com o Admin SDK (`POST /users`, só para administradores).
- Os cinco tipos de registo estão descritos num único ficheiro,
  [`src/constants/registos.js`](src/constants/registos.js). A partir dele são gerados os ecrãs de
  lista, criação e edição.

```
├── App.js                 # Providers: Paper, Auth, Stream Chat, Navigation
├── src/
│   ├── config.js          # Variáveis de ambiente (EXPO_PUBLIC_*)
│   ├── constants/         # Definição dos registos
│   ├── contexts/          # AuthContext: sessão, perfil e ligação ao chat
│   ├── hooks/             # Leitura e gravação de registos no Firestore
│   ├── navigation/        # Stack + drawer com menus por perfil
│   ├── screens/  components/  styles/  services/
├── backend/
│   ├── index.js           # API Express
│   └── scripts/           # seed.js (dados demo), migrarUsersParaUid.js
├── firestore.rules  storage.rules  firebase.json
└── eas.json               # Perfis de build
```

## Como executar

### Requisitos

- Node.js 20 ou mais recente.
- Um projeto Firebase com Authentication (email/palavra-passe), Firestore e Storage ativos.
- Uma app no [Stream](https://getstream.io/chat/) (o plano gratuito chega).
- A app [Expo Go](https://expo.dev/go) no telemóvel, ou um emulador Android ou iOS.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Preencha o `backend/.env` com a chave e o segredo do Stream. Descarregue também a chave da conta
de serviço do Firebase (Consola > Definições do projeto > Contas de serviço) para
`backend/serviceAccountKey.json`. Este ficheiro está no `.gitignore` e não deve ser publicado.

```bash
npm run seed   # contas e dados de demonstração (opcional)
npm run dev    # http://localhost:3000
```

### 2. Regras do Firebase

```bash
npx firebase-tools login
npx firebase-tools use <id-do-seu-projeto>
npx firebase-tools deploy --only firestore,storage
```

### 3. App

```bash
npm install
cp .env.example .env
npx expo start
```

No `.env`, preencha a configuração web do Firebase e a chave pública do Stream. Em
`EXPO_PUBLIC_API_URL`, use o IP da sua máquina na rede local (por exemplo
`http://192.168.1.10:3000`). O endereço `localhost` não funciona a partir do telemóvel.

### Contas de demonstração

O `npm run seed` cria as contas abaixo, além de 4 quartos, 3 utentes e registos para o dia de hoje:

| Perfil        | Email                    | Palavra-passe |
| ------------- | ------------------------ | ------------- |
| Administrador | `admin@larapp.demo`      | `larapp-demo` |
| Enfermeiro    | `enfermeiro@larapp.demo` | `larapp-demo` |
| Utente        | `utente@larapp.demo`     | `larapp-demo` |

Pode mudar a palavra-passe com `SEED_PASSWORD` no `backend/.env`. Para recriar os dados do zero,
use `npm run seed -- --limpar`.

### Gerar o APK

```bash
npx eas-cli login
npx eas-cli init                                    # liga o projeto à sua conta Expo
npx eas-cli env:push --environment preview --path .env
npx eas-cli build --platform android --profile preview
```

O APK precisa de um backend acessível pela internet. Antes do build, aponte
`EXPO_PUBLIC_API_URL` para o endereço público do servidor.

## Scripts

| Comando                 | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `npm start`             | Inicia o Expo                             |
| `npm run lint`          | ESLint                                    |
| `npm run format`        | Formata o código com Prettier             |
| `backend: npm run dev`  | Backend com recarregamento automático     |
| `backend: npm run seed` | Cria as contas e os dados de demonstração |

## Equipa

Projeto desenvolvido em grupo por:

- **Iago Lima** ([@iagoli](https://github.com/iagoli))
- **Bruna Cacemiro**
- **Ricardo Vieira**

O histórico de commits original, feito no GitLab da ESTiG, foi preservado.

Depois da avaliação, o projeto foi revisto para publicação. Foram corrigidos erros e problemas de
segurança, o chat foi ligado a dados reais, foram acrescentadas regras de segurança, os ecrãs de
registos foram unificados e o projeto ganhou lint, CI e este README. O trabalho está organizado
nas [issues](https://github.com/iagoli/larapp/issues?q=is%3Aissue) e nos
[pull requests](https://github.com/iagoli/larapp/pulls?q=is%3Apr) deste repositório.
