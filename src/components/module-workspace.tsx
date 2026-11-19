type ModuleDefinition = {
  description: string;
  capabilities: string[];
  decisions: string[];
  flow: string[];
};

const modules: Record<string, ModuleDefinition> = {
  Estatísticas: {
    description: "Consulta de indicadores agregados com período, âmbito territorial, estado de validação e proveniência visíveis.",
    capabilities: ["Indicadores por período e categoria", "Comparação com períodos anteriores", "Proveniência e data de actualização"],
    decisions: ["Definir fórmulas e denominadores oficiais", "Validar regras para supressão de pequenos números"],
    flow: ["Escolher filtros", "Calcular agregados autorizados", "Consultar e exportar resultados"],
  },
  "Análises territoriais": {
    description: "Exploração comparável de agregados por unidade territorial, sem expor registos individuais.",
    capabilities: ["Comparação entre níveis territoriais", "Filtros por período e categoria", "Visualizações com notas de contexto"],
    decisions: ["Aprovar limites e hierarquia territorial", "Documentar denominadores e supressões"],
    flow: ["Seleccionar âmbito", "Aplicar filtros", "Analisar agregados"],
  },
  Alertas: {
    description: "Sinais estatísticos explicáveis para revisão humana, sem inferir causalidade nem orientar acções individuais.",
    capabilities: ["Limiares configuráveis", "Justificação e período de comparação", "Revisão e registo da decisão"],
    decisions: ["Aprovar critérios e limiares", "Definir responsáveis e escalonamento"],
    flow: ["Detectar um sinal", "Explicar a variação", "Rever e registar decisão"],
  },
  Ocorrências: {
    description: "Registo estatístico e consulta de ocorrências, com separação entre informação identificável e dados analíticos.",
    capabilities: ["Formulário conforme a modalidade aprovada", "Consulta filtrada por âmbito autorizado", "Histórico de alterações"],
    decisions: ["Escolher a modalidade de entrada", "Definir campos, retenção e acesso"],
    flow: ["Preparar registo", "Validar campos", "Submeter para revisão"],
  },
  Submissões: {
    description: "Ciclo periódico de preparação, envio, revisão e fecho, com cada transição atribuída e rastreável.",
    capabilities: ["Rascunho e submissão", "Devolução para correcção", "Histórico de estado e responsável"],
    decisions: ["Definir calendário e prazos", "Aprovar regras de reabertura e fecho"],
    flow: ["Rascunho", "Submetida", "Em validação", "Validada e consolidada"],
  },
  "Validação de dados": {
    description: "Regras de qualidade configuráveis e decisões humanas documentadas antes da consolidação.",
    capabilities: ["Inconsistências e duplicados", "Comentários de revisão", "Devolução com motivo"],
    decisions: ["Aprovar regras por classificação", "Definir responsabilidades de revisão"],
    flow: ["Verificar regras", "Rever excepções", "Validar ou devolver"],
  },
  Importação: {
    description: "Entrada de ficheiros com pré-visualização, validação integral e confirmação explícita antes de processar.",
    capabilities: ["Mapeamento de colunas", "Pré-visualização de erros", "Relatório do processamento"],
    decisions: ["Aprovar formatos e limites de ficheiro", "Definir tratamento de duplicados"],
    flow: ["Seleccionar ficheiro", "Pré-visualizar e corrigir", "Confirmar processamento"],
  },
  Relatórios: {
    description: "Relatórios reproduzíveis que documentam fontes, filtros, período, versão e limitações dos dados.",
    capabilities: ["Modelos por âmbito e período", "Revisão e aprovação", "Publicação com versão"],
    decisions: ["Aprovar modelos e destinatários", "Definir regras de publicação e exportação"],
    flow: ["Configurar relatório", "Rever fontes e limitações", "Aprovar e publicar"],
  },
  "Assistente analítico": {
    description: "Apoio à consulta de agregados autorizados, com fontes verificáveis e validação humana.",
    capabilities: ["Perguntas sobre agregados", "Respostas com fontes e filtros", "Limites explícitos de utilização"],
    decisions: ["Validar privacidade e fontes", "Definir perguntas permitidas e critérios de aceitação"],
    flow: ["Formular pergunta", "Consultar agregados permitidos", "Verificar fontes e resposta"],
  },
  "Estrutura institucional": {
    description: "Configuração da organização e da hierarquia territorial que define o âmbito de trabalho institucional.",
    capabilities: ["Níveis territoriais configuráveis", "Relações hierárquicas", "Unidades e datas de vigência"],
    decisions: ["Confirmar níveis e nomenclaturas oficiais", "Definir gestão e vigência das unidades"],
    flow: ["Configurar níveis", "Associar unidades", "Validar hierarquia"],
  },
  "Utilizadores e perfis": {
    description: "Gestão de contas institucionais e permissões por função e âmbito territorial, aplicadas no servidor.",
    capabilities: ["Perfis e permissões", "Atribuição de âmbito", "Revisão de acesso"],
    decisions: ["Aprovar matriz RBAC", "Definir ciclo de vida das contas e revisão de acesso"],
    flow: ["Criar conta institucional", "Atribuir perfil e âmbito", "Rever e auditar acesso"],
  },
  Taxonomias: {
    description: "Classificações, unidades, calendários e parâmetros de qualidade versionados com datas de vigência.",
    capabilities: ["Categorias e códigos", "Versões com vigência", "Histórico de alterações"],
    decisions: ["Validar classificações oficiais", "Definir responsáveis por cada taxonomia"],
    flow: ["Preparar alteração", "Rever impacto e vigência", "Aprovar nova versão"],
  },
  Auditoria: {
    description: "Trilho append-only de actor, acção, objecto, instante e contexto mínimo, sem segredos ou dados desnecessários.",
    capabilities: ["Eventos de acesso e alteração", "Pesquisa por período e objecto", "Registos protegidos contra edição"],
    decisions: ["Definir retenção e acesso ao trilho", "Aprovar eventos e contexto mínimo"],
    flow: ["Registar evento", "Restringir consulta", "Rever e preservar histórico"],
  },
};

export function ModuleWorkspace({ moduleName }: { moduleName: string }) {
  const module = modules[moduleName];

  if (!module) {
    return <section className="module-screen" aria-live="polite"><div className="module-empty"><span className="module-empty-icon" aria-hidden="true">⌂</span><h2>Módulo não disponível</h2><p>Seleccione uma área no menu de navegação.</p></div></section>;
  }

  return (
    <section className="module-screen" aria-labelledby="module-title">
      <div className="page-heading module-heading">
        <div>
          <div className="eyebrow"><span className="live-dot" /> MÓDULO DEMONSTRATIVO <span className="eyebrow-line" /> INTERFACE SEM AUTENTICAÇÃO</div>
          <h1 id="module-title">{moduleName}</h1>
          <p className="subtitle">{module.description}</p>
        </div>
        <div className="heading-actions"><button className="button button-secondary" type="button" disabled>Modo de demonstração</button></div>
      </div>

      <div className="demo-banner"><span className="demo-mark">i</span><p><strong>Sem autenticação e sem dados reais.</strong> Esta interface não consulta nem guarda informação institucional.</p><span className="demo-tag">ACESSO SIMULADO</span></div>

      <div className="module-grid">
        <article className="module-card module-overview">
          <div className="module-card-heading"><div><span className="module-card-label">ESTRUTURA DO MÓDULO</span><h2>Capacidades previstas</h2></div><span className="module-status">Esboço</span></div>
          <ul className="module-capabilities">{module.capabilities.map((capability) => <li key={capability}><span className="module-check" aria-hidden="true">✓</span>{capability}</li>)}</ul>
          <div className="module-empty module-empty-inline"><span className="module-empty-icon" aria-hidden="true">⌕</span><div><strong>Área de trabalho demonstrativa</strong><p>Os dados e acções deste módulo serão ligados após aprovação das regras institucionais e da camada de segurança.</p></div></div>
        </article>

        <article className="module-card">
          <div className="module-card-heading"><div><span className="module-card-label">FLUXO DE TRABALHO</span><h2>Etapas previstas</h2></div></div>
          <ol className="module-flow">{module.flow.map((step, index) => <li key={step}><span className="module-flow-index">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></li>)}</ol>
        </article>

        <article className="module-card module-decisions">
          <div className="module-card-heading"><div><span className="module-card-label">ANTES DA IMPLEMENTAÇÃO</span><h2>Decisões por validar</h2></div></div>
          <ul className="module-decisions-list">{module.decisions.map((decision) => <li key={decision}><span aria-hidden="true">•</span>{decision}</li>)}</ul>
          <p className="module-footnote">A especificação institucional e as políticas de acesso devem ser aprovadas antes de ligar este módulo a dados reais.</p>
        </article>
      </div>
    </section>
  );
}
