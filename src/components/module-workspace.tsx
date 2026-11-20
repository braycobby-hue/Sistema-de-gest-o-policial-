type ModuleDefinition = {
  description: string;
  capabilities: string[];
  prerequisites: string[];
};

const modules: Record<string, ModuleDefinition> = {
  Estatísticas: {
    description: "Consulta de indicadores agregados por período, categoria e âmbito territorial.",
    capabilities: ["Indicadores por período", "Comparações temporais", "Proveniência e data de atualização"],
    prerequisites: ["Fonte oficial e mapeamento", "Fórmulas e denominadores aprovados", "Dados persistidos e validados"],
  },
  "Análises territoriais": {
    description: "Exploração comparável de agregados por unidade territorial, sem expor registos individuais.",
    capabilities: ["Comparação entre unidades", "Filtros por período e categoria", "Notas de contexto e proveniência"],
    prerequisites: ["Hierarquia territorial oficial", "Regras de supressão de pequenos números", "Âmbitos de acesso institucionais"],
  },
  Alertas: {
    description: "Sinais estatísticos explicáveis para revisão humana, sem inferir causalidade nem orientar ações individuais.",
    capabilities: ["Limiares configuráveis", "Justificação e período de comparação", "Revisão humana rastreável"],
    prerequisites: ["Séries oficiais validadas", "Critérios e limiares aprovados", "Responsáveis pela revisão"],
  },
  "Validação de dados": {
    description: "Regras de qualidade e decisões humanas documentadas antes da consolidação.",
    capabilities: ["Inconsistências e duplicados", "Comentários de revisão", "Devolução com motivo"],
    prerequisites: ["Taxonomia oficial", "Regras de validação aprovadas", "Perfis e responsabilidades"],
  },
  Relatórios: {
    description: "Relatórios reproduzíveis com fontes, filtros, período, versão e limitações documentados.",
    capabilities: ["Modelos por âmbito e período", "Revisão e aprovação", "Publicação com versão"],
    prerequisites: ["Dados oficiais consolidados", "Modelos e destinatários aprovados", "Regras de exportação"],
  },
  "Assistente analítico": {
    description: "Apoio futuro à consulta de agregados autorizados, com fontes verificáveis e validação humana.",
    capabilities: ["Perguntas sobre agregados", "Respostas com fontes e filtros", "Limites explícitos de utilização"],
    prerequisites: ["Dados agregados e autorizados", "Avaliação de privacidade", "Critérios de aceitação institucional"],
  },
  "Estrutura institucional": {
    description: "Configuração da organização e da hierarquia territorial que define os âmbitos de trabalho.",
    capabilities: ["Níveis territoriais configuráveis", "Relações hierárquicas", "Datas de vigência"],
    prerequisites: ["Nomenclaturas oficiais", "Hierarquia aprovada", "Regras de vigência"],
  },
  "Utilizadores e perfis": {
    description: "Gestão de contas institucionais e permissões por função e âmbito territorial, aplicadas no servidor.",
    capabilities: ["Perfis e permissões", "Atribuição de âmbito", "Revisão de acesso"],
    prerequisites: ["Autenticação verificada", "Matriz de permissões aprovada", "Âmbitos territoriais configurados"],
  },
  Taxonomias: {
    description: "Classificações, unidades e parâmetros de qualidade versionados com datas de vigência.",
    capabilities: ["Categorias e códigos oficiais", "Versões com vigência", "Histórico de alterações"],
    prerequisites: ["Ficheiro ou catálogo oficial", "Responsáveis por aprovação", "Regras de versionamento"],
  },
  Auditoria: {
    description: "Trilho append-only de ator, ação, objeto, instante e contexto mínimo.",
    capabilities: ["Eventos de acesso e alteração", "Pesquisa por período e objeto", "Registos protegidos contra edição"],
    prerequisites: ["Autenticação e autorização", "Política de retenção", "Eventos e acessos definidos"],
  },
};

export function ModuleWorkspace({ moduleName }: { moduleName: string }) {
  const module = modules[moduleName];

  if (!module) {
    return <section className="module-screen" aria-live="polite"><div className="module-empty"><span className="module-empty-icon" aria-hidden="true">i</span><h2>Módulo não disponível</h2><p>Selecione uma área no menu de navegação.</p></div></section>;
  }

  return (
    <section className="module-screen" aria-labelledby="module-title">
      <div className="page-heading module-heading">
        <div>
          <div className="eyebrow"><span className="status-dot status-dot-muted" /> PRÉ-VISUALIZAÇÃO <span className="eyebrow-line" /> MÓDULO NÃO ATIVO</div>
          <h1 id="module-title">{moduleName}</h1>
          <p className="subtitle">{module.description}</p>
        </div>
      </div>
      <div className="demo-banner"><span className="demo-mark">i</span><p><strong>Sem autenticação ou persistência.</strong> Nenhuma informação institucional é consultada ou guardada por este módulo.</p><span className="demo-tag">INATIVO</span></div>
      <div className="module-grid">
        <article className="module-card module-overview">
          <div className="module-card-heading"><div><span className="module-card-label">ESTADO ATUAL</span><h2>Sem dados ligados</h2></div><span className="module-status">Pendente</span></div>
          <div className="module-empty module-empty-inline"><span className="module-empty-icon" aria-hidden="true">i</span><div><strong>Esta área não apresenta dados</strong><p>As capacidades abaixo descrevem o escopo previsto; ainda não são operações disponíveis.</p></div></div>
          <ul className="module-capabilities">{module.capabilities.map((capability) => <li key={capability}><span className="module-check" aria-hidden="true">·</span>{capability}</li>)}</ul>
        </article>
        <article className="module-card">
          <div className="module-card-heading"><div><span className="module-card-label">PRÓXIMOS REQUISITOS</span><h2>Dependências por validar</h2></div></div>
          <ul className="module-decisions-list">{module.prerequisites.map((prerequisite) => <li key={prerequisite}><span aria-hidden="true">•</span>{prerequisite}</li>)}</ul>
          <p className="module-footnote">Este módulo só será ligado após aprovação institucional e implementação da segurança e persistência.</p>
        </article>
      </div>
    </section>
  );
}
