"use client";

import { useState } from "react";
import { ModuleWorkspace } from "@/components/module-workspace";

const navigation = [
  { section: "VISÃO GERAL", items: ["Painel inicial", "Estatísticas", "Análises territoriais", "Alertas"] },
  { section: "OPERAÇÕES", items: ["Ocorrências", "Submissões", "Validação de dados", "Importação"] },
  { section: "INTELIGÊNCIA", items: ["Relatórios", "Assistente analítico"] },
  { section: "ADMINISTRAÇÃO", items: ["Estrutura institucional", "Utilizadores e perfis", "Taxonomias", "Auditoria"] },
];

const symbols: Record<string, string> = {
  "Painel inicial": "▦", Estatísticas: "▥", "Análises territoriais": "⌖", Alertas: "◇",
  Ocorrências: "◉", Submissões: "⇧", "Validação de dados": "✓", Importação: "⇩",
  Relatórios: "▤", "Assistente analítico": "✳", "Estrutura institucional": "⌂",
  "Utilizadores e perfis": "♙", Taxonomias: "≡", Auditoria: "◷",
};

const incidents = [
  { code: "DEMO-2026-0841", type: "Furto", area: "KaMpfumo · Maputo Cidade", date: "19 Nov, 09:42", status: "Validada", tone: "green" },
  { code: "DEMO-2026-0840", type: "Violência doméstica", area: "Matola · Maputo Província", date: "19 Nov, 08:16", status: "Em revisão", tone: "amber" },
  { code: "DEMO-2026-0839", type: "Acidente de viação", area: "Beira · Sofala", date: "18 Nov, 21:03", status: "Submetida", tone: "blue" },
  { code: "DEMO-2026-0838", type: "Roubo", area: "Nampula · Nampula", date: "18 Nov, 17:28", status: "Em revisão", tone: "amber" },
];

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (item: string) => void }) {
  return <aside className="sidebar">
    <a className="brand" href="#inicio" aria-label="SIAC, início" onClick={() => onNavigate("Painel inicial")}>
      <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/assebleia-dqS2oPWtXrZZnbmsFZkxVh6QuGy7gF.jpg" alt="Emblema da República de Moçambique" />
      <span className="brand-copy"><strong>SIAC</strong><small>Sistema de análise criminal</small></span>
    </a>
    <div className="territory"><span className="territory-icon">⌖</span><span><small>ÂMBITO ILUSTRATIVO</small><strong>Nacional</strong></span><span className="chevron">⌄</span></div>
    <nav aria-label="Navegação principal">
      {navigation.map((group) => <div className="nav-group" key={group.section}>
        <p className="nav-label">{group.section}</p>
        {group.items.map((item) => <button key={item} className={`nav-item ${active === item ? "selected" : ""}`} onClick={() => onNavigate(item)} aria-current={active === item ? "page" : undefined}>
          <span className="nav-symbol" aria-hidden="true">{symbols[item]}</span><span>{item}</span>
          {item === "Validação de dados" && <span className="nav-count">8</span>}
        </button>)}
      </div>)}
    </nav>
    <div className="sidebar-footer"><span className="secure-dot" /> Ambiente de demonstração <small>v1.0.0 · SIAC</small></div>
  </aside>;
}

function TrendChart() {
  const bars = [38, 55, 48, 70, 57, 66, 48, 76, 61, 81, 68, 91];
  return <div className="chart-wrap" aria-label="Gráfico ilustrativo de ocorrências ao longo de doze meses">
    <div className="chart-y"><span>1.200</span><span>900</span><span>600</span><span>300</span><span>0</span></div>
    <div className="chart-main"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bars">{bars.map((height, index) => <div className="bar-pair" key={index}><span className="bar current" style={{ height: `${height}%` }} /><span className="bar previous" style={{ height: `${Math.max(22, height * .69)}%` }} /></div>)}</div><div className="chart-x">{["Dez", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov"].map((month) => <span key={month}>{month}</span>)}</div></div>
  </div>;
}

function MetricCard({ label, value, detail, icon, delta, negative }: { label: string; value: string; detail: string; icon: string; delta: string; negative?: boolean }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong className="metric-value">{value}</strong><div className="metric-bottom"><span className={`delta ${negative ? "down" : "up"}`}>{delta}</span><span>{detail}</span></div></article>;
}

export default function DashboardShell() {
  const [active, setActive] = useState("Painel inicial");
  const [period, setPeriod] = useState("Últimos 12 meses");
  const [query, setQuery] = useState("");
  const visibleIncidents = incidents.filter((row) => `${row.code} ${row.type} ${row.area}`.toLowerCase().includes(query.toLowerCase()));

  return <main className="app-shell">
    <Sidebar active={active} onNavigate={setActive} />
    <section className="workspace">
      <header className="topbar"><div className="breadcrumb"><span>SIAC</span><span className="crumb-separator">/</span><strong>{active}</strong></div><div className="top-actions"><span className="environment-pill"><i /> DADOS DE DEMONSTRAÇÃO</span><button className="icon-button" aria-label="Notificações">♧<i className="notification-dot" /></button><span className="top-divider" /><div className="profile-button"><span className="avatar">DEMO</span><span className="profile-copy"><strong>Conta de demonstração</strong><small>Sem autenticação · dados fictícios</small></span></div></div></header>
      <div className="page-content">
        {active === "Painel inicial" ? <>
        <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> VISÃO NACIONAL <span className="eyebrow-line" /> 19 NOVEMBRO 2026</div><h1>{active}</h1><p className="subtitle">Panorama consolidado de informação criminal — Moçambique</p></div><div className="heading-actions"><button className="button button-secondary" onClick={() => setPeriod(period === "Últimos 12 meses" ? "Últimos 30 dias" : "Últimos 12 meses")}><span>▦</span>{period}<span className="chevron">⌄</span></button><button className="button button-primary" onClick={() => setActive("Relatórios")}><span>＋</span> Criar relatório</button></div></div>
        <div className="demo-banner"><span className="demo-mark">i</span><p><strong>Ambiente de demonstração.</strong> Todos os registos e indicadores nesta página são fictícios. Nenhum dado policial real está a ser processado.</p><span className="demo-tag">SEM VALOR OFICIAL</span></div>
        <section className="metrics-grid" aria-label="Indicadores ilustrativos">
          <MetricCard label="Ocorrências registadas" value="12.486" detail="vs. período anterior" icon="◉" delta="↑ 8,2%" />
          <MetricCard label="Submissões validadas" value="94,6%" detail="do total submetido" icon="✓" delta="↑ 2,4 p.p." />
          <MetricCard label="Em validação" value="38" detail="em 12 unidades" icon="◷" delta="12 urgentes" negative />
          <MetricCard label="Unidades activas" value="142" detail="de 156 unidades" icon="⌂" delta="91% cobertura" />
        </section>
        <section className="insights-grid">
          <article className="panel trend-panel"><div className="panel-heading"><div><h2>Evolução de ocorrências</h2><p>Comparação mensal · valores ilustrativos</p></div><button className="more-button" aria-label="Mais opções">•••</button></div><div className="chart-legend"><span><i className="legend-current" /> Período actual</span><span><i className="legend-previous" /> Período anterior</span></div><TrendChart /><div className="chart-note"><span className="note-icon">↗</span><span>Variação demonstrativa de <strong>+8,2%</strong> face ao período comparado</span><span className="note-period">Dez 2025 — Nov 2026</span></div></article>
          <article className="panel distribution-panel"><div className="panel-heading"><div><h2>Distribuição por categoria</h2><p>Ocorrências ilustrativas · período actual</p></div><button className="more-button" aria-label="Mais opções">•••</button></div><div className="donut-area"><div className="donut"><div className="donut-center"><strong>12.486</strong><span>TOTAL</span></div></div></div><div className="category-list"><div><span><i className="cat-dot cat-one" /> Crimes contra propriedade</span><strong>38,4%</strong></div><div><span><i className="cat-dot cat-two" /> Crimes contra pessoas</span><strong>27,1%</strong></div><div><span><i className="cat-dot cat-three" /> Ordem e tranquilidade</span><strong>19,8%</strong></div><div><span><i className="cat-dot cat-four" /> Outros</span><strong>14,7%</strong></div></div></article>
        </section>
        <section className="panel activity-panel"><div className="panel-heading activity-heading"><div><h2>Submissões recentes</h2><p>Actividade demonstrativa das unidades policiais</p></div><button className="button button-link" onClick={() => setActive("Submissões")}>Ver todas <span>→</span></button></div><div className="table-toolbar"><label className="search-box"><span>⌕</span><input aria-label="Pesquisar registos" placeholder="Pesquisar por referência, tipo ou localidade" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button className="filter-button" onClick={() => setQuery("")}>☷ <span>Filtros</span></button></div><div className="table-scroll"><table><thead><tr><th>REFERÊNCIA</th><th>TIPO DE OCORRÊNCIA</th><th>LOCALIZAÇÃO</th><th>DATA DE SUBMISSÃO</th><th>ESTADO</th><th aria-label="Acções" /></tr></thead><tbody>{visibleIncidents.map((row) => <tr key={row.code}><td className="ref-cell">{row.code}</td><td>{row.type}</td><td>{row.area}</td><td>{row.date}</td><td><span className={`status status-${row.tone}`}><i />{row.status}</span></td><td><button className="row-more" aria-label={`Opções para ${row.code}`}>•••</button></td></tr>)}{visibleIncidents.length === 0 && <tr><td colSpan={6} className="empty-row">Nenhum registo corresponde à pesquisa.</td></tr>}</tbody></table></div><div className="table-footer"><span>A mostrar <strong>{visibleIncidents.length}</strong> de <strong>4</strong> registos demonstrativos</span><button onClick={() => setActive("Submissões")}>Abrir módulo de submissões <span>→</span></button></div></section>
        <footer className="page-footer"><span>SIAC · Sistema Inteligente de Análise Criminal</span><span>Protótipo funcional · Dados fictícios · 2026</span></footer>
        </> : <ModuleWorkspace moduleName={active} />}
      </div>
    </section>
  </main>;
}
