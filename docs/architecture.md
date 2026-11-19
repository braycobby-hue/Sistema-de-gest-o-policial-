# SIAC — arquitectura e plano de implementação

## Contexto e limites

O Sistema Inteligente de Análise Criminal é uma plataforma de recolha, validação, consolidação e análise estatística para apoiar decisões humanas. A especificação v1.0 define Next.js, React, TypeScript, Node.js, Neon PostgreSQL, Vercel e GitHub. A interface actual é um protótipo de demonstração: os indicadores e registos são fictícios, não existe autenticação nem persistência de domínio implementadas, e nenhum valor deve ser interpretado como estatística oficial.

Antes de processar dados reais, validar com a entidade responsável as classificações criminais, os níveis e limites territoriais, as regras de validação, a retenção, os perfis de acesso e a política de segurança. IA não decide, não classifica automaticamente e não deve receber dados pessoais identificáveis.

## Módulos de produto previstos

1. **Painel e indicadores** — visão configurada por âmbito territorial, período e estado de validação; sempre com proveniência e data de actualização.
2. **Estrutura institucional** — organização, níveis territoriais configuráveis (nacional, regional opcional, provincial, distrital, unidade) e relações hierárquicas.
3. **Utilizadores e permissões** — contas institucionais, perfis e autorização por função e âmbito; a autorização e filtragem territorial são aplicadas no servidor.
4. **Ocorrências** — registo e consulta de dados estatísticos conforme uma das duas modalidades de entrada definidas no documento; separar dados identificáveis de dados analíticos e restringir acesso.
5. **Submissões periódicas** — criação, envio, revisão, devolução para correcção e fecho com histórico de estado e responsável.
6. **Validação e qualidade** — regras configuráveis, detecção de duplicados/inconsistências, comentários e decisão humana rastreável.
7. **Importação** — carga validada, pré-visualização de erros, confirmação explícita e relatório de processamento; sem escrita parcial silenciosa.
8. **Estatísticas e análises territoriais** — agregações temporais e geográficas, comparações, denominadores documentados e regras de supressão para pequenos números.
9. **Alertas estatísticos** — detecção explicável de alterações/anomalias, limiares configuráveis e revisão humana; não confundir correlação ou sinal com causalidade.
10. **Relatórios inteligentes** — geração ilustrativa/analítica com fontes, período, filtros, versão, limitações e ciclo de revisão/aprovação/publicação.
11. **Assistente analítico** — apenas sobre agregados autorizados; respostas com consultas e fontes verificáveis, limites explícitos e validação humana; sem recomendações operacionais individuais.
12. **Taxonomias e configurações** — classificações oficiais versionadas, unidades, calendários e parâmetros de qualidade, com datas de vigência e trilho de alterações.
13. **Auditoria** — registo append-only de actor, acção, objecto, instante e contexto mínimo; não registar segredos ou conteúdo pessoal desnecessário.

## Fluxo de submissão proposto

Rascunho → Submetida → Em validação → (Devolvida para correcção → Submetida) → Validada → Consolidada. Registar as transições, actor, instante e motivo. Definir regras para reabertura, fecho e versionamento antes da implementação. Submissões devolvidas não entram em indicadores consolidados; estatísticas publicadas devem apontar para uma versão reproduzível do conjunto de dados.

## Arquitectura e limites de confiança

- **Next.js App Router / TypeScript:** apresentação, handlers e serviços de domínio; validação de entrada no servidor.
- **Camada de domínio:** autorização, regras de fluxo e cálculos estatísticos testáveis; nenhuma regra de negócio confiada ao browser.
- **Neon PostgreSQL:** armazenamento relacional, chaves estrangeiras, transacções e índices; todas as consultas de dados territoriais filtradas por âmbito autorizado.
- **Integrações externas:** Vercel para alojamento e gestão do ambiente; GitHub para revisão e histórico. IA, se validada para uso, recebe apenas agregados mínimos e não substitui o motor estatístico determinístico.
- **Segurança:** menor privilégio, sessão segura, validação de cada requisição, limitação de taxa, política de retenção e eliminação, auditoria e separação entre desenvolvimento, preview e produção.

## Organização sugerida do código

```text
src/
  app/                 rotas, layouts e handlers
  components/          componentes de interface reutilizáveis
  features/            módulos por domínio
    submissions/       fluxo de submissão e revisão
    incidents/         registos e importação
    analytics/         indicadores, agregações e relatórios
    administration/    estrutura, perfis e taxonomias
  lib/
    auth/              sessão e políticas de autorização
    db/                ligação e repositórios
    validation/        schemas de entrada
    audit/             eventos e proveniência
  server/              serviços de domínio exclusivamente no servidor
docs/                  decisões, API, segurança e operação
```

## Sequência de implementação

1. Validar decisões institucionais e modelo de ameaça; definir autenticação, matriz RBAC/âmbito territorial e ambiente Neon.
2. Implementar utilizadores, organização territorial, sessões e testes negativos de isolamento.
3. Implementar taxonomias versionadas, modelo de submissão, estados e trilho de auditoria.
4. Implementar registo/importação, validação de qualidade e correcção com transacções e testes.
5. Implementar agregações determinísticas, comparações e controlos de privacidade; provar consistência por testes.
6. Implementar relatórios reproduzíveis, revisão/aprovação e exportações autorizadas.
7. Avaliar alertas e assistente analítico apenas após validação de privacidade, origem dos dados e critérios de aceitação.
8. Endurecer segurança, acessibilidade, desempenho, cópias de segurança, retenção e operação antes da produção.

## Estado desta entrega

- Painel inicial de demonstração, navegação por módulos, pesquisa local no conjunto fictício, gráfico ilustrativo e avisos explícitos de dados não oficiais.
- Os módulos têm páginas demonstrativas com capacidades, fluxos e decisões institucionais pendentes. Não consultam nem guardam dados reais.
- A autenticação foi adiada; não há sessão, API de autenticação ou rota de início de sessão nesta versão. A interface é pública e apenas demonstrativa.
- Formulários operacionais, APIs, banco de dados de domínio, regras estatísticas e relatórios reais permanecem por implementar. Antes de persistir ou consultar dados, provisionar/confirmar Neon e aprovar esquema, autorização e políticas institucionais.
