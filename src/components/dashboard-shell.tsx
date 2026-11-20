"use client";

import { useState } from "react";
import { ModuleWorkspace } from "@/components/module-workspace";
import { MonthlySubmissionsWorkspace } from "@/components/monthly-submissions";

const navigation = [
  { section: "VISÃO GERAL", items: ["Painel inicial", "Estatísticas", "Análises territoriais", "Alertas"] },
  { section: "OPERAÇÕES", items: ["Submissões mensais", "Validação de dados", "Importação"] },
  { section: "INTELIGÊNCIA", items: ["Relatórios", "Assistente analítico"] },
  { section: "ADMINISTRAÇÃO", items: ["Estrutura institucional", "Utilizadores e perfis", "Taxonomias", "Auditoria"] },
];

const symbols: Record<string, string> = {
  "Painel inicial": "P",
  Estatísticas: "E",
  "Análises territoriais": "T",
  Alertas: "A",
  "Submissões mensais": "S",
  "Validação de dados": "V",
  Importação: "I",
  Relatórios: "R",
  "Assistente analítico": "A",
  "Estrutura institucional": "E",
  "Utilizadores e perfis": "U",
  Taxonomias: "T",
  Auditoria: "A",
};

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (item: string) => void }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#inicio" aria-label="SIAC, início" onClick={() => onNavigate("Painel inicial")}>
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assebleia-dqS2oPWtXrZZnbmsFZkxVh6QuGy7gF.jpg" alt="Emblema da República de Moçambique" />
        <span className="brand-copy"><strong>SIAC</strong><small>Sistema de análise criminal</small></span>
      </a>
      <div className="territory">
        <span className="territory-icon" aria-hidden="true">T</span>
        <span><small>ÂMBITO</small><strong>Por configurar</strong></span>
      </div>
      <nav aria-label="Navegação principal">
        {navigation.map((group) => (
          <div className="nav-group" key={group.section}>
            <p className="nav-label">{group.section}</p>
            {group.items.map((item) => (
              <button
                key={item}
                className={`nav-item ${active === item ? "selected" : ""}`}
                onClick={() => onNavigate(item)}
                aria-current={active === item ? "page" : undefined}
              >
                <span className="nav-symbol" aria-hidden="true">{symbols[item]}</span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer"><span className="secure-dot" /> Pré-visualização<small>SIAC · interface não operacional</small></div>
    </aside>
  );
}

function EmptyPanel({ title, detail, icon }: { title: string; detail: string; icon: string }) {
  return (
    <article className="empty-panel">
      <span className="empty-panel-icon" aria-hidden="true">{icon}</span>
      <div><h2>{title}</h2><p>{detail}</p></div>
      <span className="empty-panel-status">Pendente</span>
    </article>
  );
}

function DashboardHome({ onNavigate }: { onNavigate: (item: string) => void }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow"><span className="status-dot status-dot-muted" /> PRÉ-VISUALIZAÇÃO <span className="eyebrow-line" /> AGREGADOS MENSAIS</div>
          <h1>Painel inicial</h1>
          <p className="subtitle">Área de preparação para a consolidação estatística mensal.</p>
        </div>
        <div className="heading-actions">
          <button className="button button-primary" onClick={() => onNavigate("Submissões mensais")}><span>+</span> Nova submissão</button>
        </div>
      </div>

      <section className="demo-banner" aria-label="Estado da pré-visualização">
        <span className="demo-mark">i</span>
        <p><strong>Interface visual, sem autenticação ou gravação.</strong> Nenhum dado oficial foi importado; não use esta pré-visualização para inserir informação real.</p>
        <span className="demo-tag">NÃO OPERACIONAL</span>
      </section>

      <section className="empty-dashboard" aria-labelledby="empty-dashboard-title">
        <div className="empty-dashboard-mark" aria-hidden="true">SI</div>
        <p className="empty-kicker">BASE ESTATÍSTICA</p>
        <h2 id="empty-dashboard-title">Sem fonte oficial associada</h2>
        <p className="empty-dashboard-copy">Os indicadores, comparações e cobertura territorial serão apresentados quando existir uma fonte institucional validada e uma estrutura de dados aprovada.</p>
        <button className="button button-secondary" onClick={() => onNavigate("Submissões mensais")}>Ver fluxo mensal <span aria-hidden="true">→</span></button>
      </section>

      <section className="empty-panel-grid" aria-label="Estado dos componentes">
        <EmptyPanel title="Dados oficiais" detail="Aguardando ficheiro e mapeamento institucional." icon="D" />
        <EmptyPanel title="Acesso institucional" detail="Autenticação e perfis ainda não estão ativos." icon="A" />
        <EmptyPanel title="Unidades e taxonomia" detail="Hierarquia territorial e categorias por validar." icon="T" />
      </section>

      <section className="panel activity-panel empty-activity">
        <div className="activity-heading"><div><h2>Submissões recentes</h2><p>Não há uma fonte de submissões ligada nesta pré-visualização.</p></div></div>
        <div className="empty-table-state"><span aria-hidden="true">◷</span><strong>Sem dados para apresentar</strong><p>Não foram carregadas submissões oficiais.</p></div>
      </section>
      <footer className="page-footer"><span>SIAC · Sistema Inteligente de Análise Criminal</span><span>Pré-visualização visual · sem autenticação ou persistência</span></footer>
    </>
  );
}

export default function DashboardShell() {
  const [active, setActive] = useState("Painel inicial");

  return (
    <main className="app-shell">
      <Sidebar active={active} onNavigate={setActive} />
      <section className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>SIAC</span><span className="crumb-separator">/</span><strong>{active}</strong></div>
          <div className="top-actions">
            <span className="environment-pill"><i /> SEM SESSÃO · SEM DADOS</span>
            <span className="top-divider" />
            <div className="profile-button"><span className="avatar">SI</span><span className="profile-copy"><strong>Acesso desativado</strong><small>Autenticação pendente</small></span></div>
          </div>
        </header>
        <div className="page-content">
          {active === "Painel inicial" ? (
            <DashboardHome onNavigate={setActive} />
          ) : active === "Submissões mensais" || active === "Importação" ? (
            <MonthlySubmissionsWorkspace initialView={active === "Importação" ? "import" : "entry"} onNavigate={setActive} />
          ) : (
            <ModuleWorkspace moduleName={active} />
          )}
        </div>
      </section>
    </main>
  );
}
