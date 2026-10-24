// Definição dos registos diários de um utente. Os ecrãs de lista, criação e edição
// (RegistosScreen, CreateRegistoScreen, EditRegistoModal) são gerados a partir daqui.
//
// Cada campo: { campo, label, tipo: 'texto' | 'dataHora', obrigatorio, multiline,
//               teclado, placeholder, flex (largura da coluna na tabela) }

const dataHora = { campo: 'dataHora', label: 'Data/Hora', tipo: 'dataHora', flex: 1 };

export const REGISTOS = {
  medicacoes: {
    titulo: 'Medicação',
    singular: 'medicação',
    icon: 'pill',
    agendar: 'Agendar Medicação',
    lembrete: true,
    campos: [
      { campo: 'medicamento', label: 'Medicamento', obrigatorio: true, placeholder: 'Ex.: Paracetamol 500 mg', flex: 1.2 },
      dataHora,
      { campo: 'quantidade', label: 'Quantidade', obrigatorio: true, teclado: 'numeric', placeholder: 'Ex.: 1', flex: 0.8 },
    ],
  },
  atividades: {
    titulo: 'Atividades Diárias',
    singular: 'atividade',
    icon: 'calendar-check',
    agendar: 'Agendar Atividade',
    campos: [
      { campo: 'atividade', label: 'Atividade', obrigatorio: true, placeholder: 'Ex.: Caminhada no jardim', flex: 1.2 },
      dataHora,
      { campo: 'descricao', label: 'Descrição', multiline: true, placeholder: 'Detalhes (opcional)', flex: 1.5 },
    ],
  },
  alimentacoes: {
    titulo: 'Alimentação',
    singular: 'refeição',
    icon: 'food',
    agendar: 'Agendar Refeição',
    campos: [
      dataHora,
      { campo: 'prato', label: 'Prato', obrigatorio: true, placeholder: 'Ex.: Sopa de legumes', flex: 1.4 },
    ],
  },
  cuidados: {
    titulo: 'Cuidados Médicos',
    singular: 'cuidado',
    icon: 'hospital-box-outline',
    agendar: 'Agendar Cuidado Médico',
    campos: [
      { campo: 'acao', label: 'Ação Efetuada', obrigatorio: true, placeholder: 'Ex.: Medição da tensão arterial', flex: 1.2 },
      dataHora,
      { campo: 'descricao', label: 'Descrição', multiline: true, placeholder: 'Detalhes (opcional)', flex: 1.5 },
    ],
  },
  observacoes: {
    titulo: 'Observações',
    singular: 'observação',
    icon: 'comment-text-outline',
    agendar: 'Agendar Observação',
    campos: [
      dataHora,
      { campo: 'descricao', label: 'Descrição', obrigatorio: true, multiline: true, placeholder: 'Escreva a observação', flex: 2 },
    ],
  },
};

// Valores iniciais de um formulário a partir de um registo existente (ou vazio)
export const valoresIniciais = (campos, registo = {}) =>
  Object.fromEntries(
    campos.map(({ campo, tipo }) => [
      campo,
      tipo === 'dataHora'
        ? registo[campo] ? new Date(registo[campo]) : new Date()
        : String(registo[campo] ?? ''),
    ])
  );

// Valida e converte os valores do formulário para o formato guardado no Firestore
export const prepararDados = (campos, valores) => {
  const emFalta = campos.filter(
    ({ campo, obrigatorio, tipo }) => obrigatorio && tipo !== 'dataHora' && !valores[campo].trim()
  );
  if (emFalta.length > 0) {
    return { erro: `Preencha: ${emFalta.map((c) => c.label).join(', ')}.` };
  }

  const dados = Object.fromEntries(
    campos.map(({ campo, tipo }) => [
      campo,
      tipo === 'dataHora' ? valores[campo].toISOString() : valores[campo].trim(),
    ])
  );
  return { dados };
};
