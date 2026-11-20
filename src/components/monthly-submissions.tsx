type MonthlySubmissionsWorkspaceProps = {
  initialView: "entry" | "import";
  onNavigate: (item: string) => void;
};

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function PreviewNotice() {
  return (
    <section className="demo-banner" aria-label="Limitações da pré-visualização">
      <span className="demo-mark">i</span>
      <p><strong>Rascunho visual, sem gravação.</strong> Não introduza nem selecione ficheiros com dados reais nesta pré-visualização.</p>
      <span className="demo-tag">SEM PERSISTÊNCIA</span>
    </section>
  );
}

function EntryView({ onNavigate }: { onNavigate: (item: string) => void }) {
  return (
    <div className="monthly-layout">
      <section className="module-card monthly-main-card" aria-labelledby="monthly-entry-title">
        <div className="module-card-heading">
          <div><span className="module-card-label">SUBMISSÃO AGREGADA</span><h2 id="monthly-entry-title">Identificação do período</h2></div>
          <span className="module-status">Rascunho visual</span>
        </div>
        <p className="monthly-intro">O modelo mensal foi escolhido para a primeira fase. A unidade e o calendário oficial ainda não estão configurados.</p>
        <div className="monthly-fields">
          <label className="monthly-field">Mês de referência
            <select defaultValue="" disabled aria-describedby="entry-blocker">
              <option value="" disabled>Selecionar mês</option>
              {months.map((month) => <option key={month}>{month}</option>)}
            </select>
          </label>
          <label className="monthly-field">Ano de referência
            <input type="number" placeholder="A configurar" disabled aria-describedby="entry-blocker" />
          </label>
          <label className="monthly-field monthly-field-wide">Código oficial da unidade
            <input type="text" placeholder="Disponível após configuração da hierarquia" disabled aria-describedby="entry-blocker" />
          </label>
        </div>
        <div className="monthly-taxonomy" id="entry-blocker">
          <div className="monthly-taxonomy-heading"><div><span className="module-card-label">CONTAGENS MENSAIS</span><h3>Categorias oficiais</h3></div><span className="taxonomy-pending">Taxonomia pendente</span></div>
          <div className="taxonomy-empty"><span aria-hidden="true">T</span><div><strong>As categorias ainda não estão configuradas</strong><p>Os códigos e rótulos devem corresponder à taxonomia institucional aprovada. Não foram criadas categorias fictícias.</p></div></div>
        </div>
        <div className="monthly-actions"><button className="button button-secondary" type="button" disabled>Guardar rascunho</button><button className="button button-primary" type="button" disabled>Submeter para validação</button></div>
        <p className="disabled-reason">A entrada fica indisponível até existir autenticação, taxonomia oficial e armazenamento persistente.</p>
      </section>

      <aside className="monthly-side-column">
        <section className="module-card">
          <div className="module-card-heading"><div><span className="module-card-label">CICLO PREVISTO</span><h2>Etapas da submissão</h2></div></div>
          <ol className="module-flow monthly-flow">
            <li><span className="module-flow-index">01</span><span>Preparar agregado mensal</span></li>
            <li><span className="module-flow-index">02</span><span>Submeter pela unidade</span></li>
            <li><span className="module-flow-index">03</span><span>Rever e validar</span></li>
            <li><span className="module-flow-index">04</span><span>Consolidar na análise</span></li>
          </ol>
        </section>
        <section className="module-card source-card">
          <span className="module-card-label">ORIGEM DOS DADOS</span>
          <h2>Ficheiro oficial por fornecer</h2>
          <p>Os campos, categorias e regras de validação serão alinhados com o documento institucional quando for disponibilizado.</p>
          <button className="button button-secondary" type="button" onClick={() => onNavigate("Importação")}>Ver importação <span aria-hidden="true">→</span></button>
        </section>
      </aside>
    </div>
  );
}

function ImportView({ onNavigate }: { onNavigate: (item: string) => void }) {
  return (
    <div className="monthly-layout import-layout">
      <section className="module-card import-card" aria-labelledby="import-title">
        <div className="module-card-heading">
          <div><span className="module-card-label">IMPORTAÇÃO INSTITUCIONAL</span><h2 id="import-title">Preparar ficheiro agregado</h2></div>
          <span className="module-status">Indisponível</span>
        </div>
        <p className="monthly-intro">A importação só será ativada após aprovação do formato, mapeamento e regras de validação. Nenhum ficheiro é enviado ou processado nesta versão.</p>
        <div className="import-dropzone" aria-disabled="true">
          <span className="import-icon" aria-hidden="true">+</span>
          <strong>Importação desativada nesta pré-visualização</strong>
          <p>O ficheiro oficial ainda não foi fornecido. Não selecione dados reais nesta interface.</p>
          <span className="file-types">CSV ou XLSX · formatos a confirmar</span>
        </div>
        <div className="import-checklist" aria-label="Requisitos da importação">
          <div><span className="check-pending" aria-hidden="true">1</span><span><strong>Mapeamento de colunas</strong><small>Alinhar com o modelo oficial</small></span><em>Pendente</em></div>
          <div><span className="check-pending" aria-hidden="true">2</span><span><strong>Validação integral</strong><small>Definir regras e tratamento de duplicados</small></span><em>Pendente</em></div>
          <div><span className="check-pending" aria-hidden="true">3</span><span><strong>Confirmação e gravação</strong><small>Disponível após ativação do armazenamento</small></span><em>Pendente</em></div>
        </div>
        <button className="button button-secondary" type="button" onClick={() => onNavigate("Submissões mensais")}>Voltar à submissão mensal</button>
      </section>
      <aside className="module-card import-safety-card">
        <span className="module-card-label">PROTEÇÃO DE DADOS</span>
        <h2>Não carregue dados reais ainda</h2>
        <p>Este preview não tem autenticação, autorização territorial ou persistência. Aguarde a ativação segura antes de fornecer qualquer ficheiro institucional.</p>
        <div className="safety-status"><span className="status-dot status-dot-muted" /> Sem ligação de armazenamento</div>
      </aside>
    </div>
  );
}

export function MonthlySubmissionsWorkspace({ initialView, onNavigate }: MonthlySubmissionsWorkspaceProps) {
  const isImport = initialView === "import";
  const title = isImport ? "Importação mensal" : "Submissões mensais";

  return (
    <section className="module-screen monthly-screen" aria-labelledby="monthly-title">
      <div className="page-heading module-heading">
        <div>
          <div className="eyebrow"><span className="status-dot status-dot-muted" /> PRIMEIRA FASE <span className="eyebrow-line" /> AGREGAÇÃO MENSAL</div>
          <h1 id="monthly-title">{title}</h1>
          <p className="subtitle">Fluxo visual preparado; autenticação, validação e gravação ainda não estão ativas.</p>
        </div>
        <div className="heading-actions"><button className="button button-secondary" type="button" onClick={() => onNavigate(isImport ? "Submissões mensais" : "Importação")}>{isImport ? "Preencher manualmente" : "Importar ficheiro"}<span aria-hidden="true">→</span></button></div>
      </div>
      <PreviewNotice />
      {isImport ? <ImportView onNavigate={onNavigate} /> : <EntryView onNavigate={onNavigate} />}
      <footer className="page-footer"><span>SIAC · Agregados mensais</span><span>Interface visual · dados não enviados nem guardados</span></footer>
    </section>
  );
}
