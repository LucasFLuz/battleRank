import os

with open(r"C:\Projects\battleRank\docs\svg1.svg", "r", encoding="utf-8") as f:
    svg1 = f.read()

with open(r"C:\Projects\battleRank\docs\svg2.svg", "r", encoding="utf-8") as f:
    svg2 = f.read()

with open(r"C:\Projects\battleRank\docs\svg3.svg", "r", encoding="utf-8") as f:
    svg3 = f.read()

# Make SVGs responsive and fit nicely in page container
for s in [('svg1', svg1), ('svg2', svg2), ('svg3', svg3)]:
    # clean up any max-width issues
    pass

html_content = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Entrega Prova Final - battleRank - Lucas Fernandes Luz</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

    :root {{
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --bg-table: #f8fafc;
      --table-header: #0f172a;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      background-color: #f1f5f9;
      line-height: 1.5;
      font-size: 13px;
      padding: 30px 15px;
    }}

    .page {{
      max-width: 900px;
      margin: 0 auto 30px auto;
      background: #ffffff;
      padding: 45px 55px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    }}

    .doc-header-eyebrow {{
      color: var(--primary);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 4px;
    }}

    .doc-title {{
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-bottom: 4px;
    }}

    .doc-subtitle {{
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 16px;
    }}

    .divider {{
      height: 2px;
      background: #0f172a;
      margin-bottom: 24px;
    }}

    .section-title {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 24px;
      margin-bottom: 12px;
    }}

    .section-title::before {{
      content: "";
      display: inline-block;
      width: 4px;
      height: 18px;
      background-color: var(--primary);
      border-radius: 2px;
    }}

    .overview-text {{
      font-size: 13px;
      color: #334155;
      margin-bottom: 16px;
      line-height: 1.6;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      font-size: 12.5px;
      border: 1px solid var(--border);
    }}

    th {{
      background-color: var(--table-header);
      color: #ffffff;
      font-weight: 600;
      text-align: left;
      padding: 9px 14px;
      font-size: 12px;
      letter-spacing: 0.3px;
    }}

    td {{
      padding: 8px 14px;
      border-bottom: 1px solid var(--border);
      color: #1e293b;
    }}

    tr:nth-child(even) td {{
      background-color: #f8fafc;
    }}

    .table-ident td:first-child {{
      font-weight: 600;
      width: 25%;
      color: #334155;
      background-color: #f8fafc;
    }}

    a {{
      color: var(--primary);
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
    }}

    a:hover {{
      text-decoration: underline;
    }}

    .callout-box {{
      border-left: 4px solid var(--primary);
      background-color: #f0f9ff;
      padding: 12px 18px;
      border-radius: 0 6px 6px 0;
      margin-bottom: 20px;
      font-size: 12.5px;
      color: #0369a1;
      line-height: 1.5;
    }}

    .diagram-container {{
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 18px;
      margin: 16px 0 20px 0;
      overflow: hidden;
      text-align: center;
    }}

    .diagram-container svg {{
      max-width: 100%;
      height: auto;
      display: block;
      margin: 0 auto;
    }}

    .diagram-title {{
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 6px;
      text-align: left;
    }}

    .diagram-desc {{
      font-size: 11.5px;
      color: var(--text-muted);
      margin-bottom: 12px;
      text-align: left;
      line-height: 1.5;
    }}

    .badge-done {{
      display: inline-block;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background-color: #dcfce7;
      color: #15803d;
    }}

    .page-footer {{
      margin-top: 25px;
      padding-top: 12px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 11px;
    }}

    @media print {{
      body {{
        background: white;
        padding: 0;
      }}
      .page {{
        box-shadow: none;
        max-width: 100%;
        padding: 30px 40px;
        margin: 0;
        page-break-after: always;
      }}
      .page-break {{
        page-break-before: always;
      }}
      .diagram-container svg {{
        max-height: 600px;
      }}
    }}
  </style>
</head>
<body>

  <!-- PÁGINA 1: Identificação, Links, Escopo e Roadmap -->
  <div class="page">
    <div class="doc-header-eyebrow">PROJETO DE SOFTWARE • ENTREGA ACADÊMICA (UNIVERSIDADE IMPACTA)</div>
    <h1 class="doc-title">battleRank — Plataforma Fitness Social</h1>
    <div class="doc-subtitle">Documentação Técnica e Resumo das Funcionalidades Implementadas na Prova Final</div>
    <div class="divider"></div>

    <div class="section-title">Visão Geral</div>
    <p class="overview-text">
      O <strong>battleRank</strong> é uma plataforma fitness social inspirada no Strava e no Hevy voltada à criação de fichas de treino, registro de cargas e acompanhamento de evolução física e competição entre atletas.
    </p>

    <div class="section-title">1. Identificação do Aluno e da Disciplina</div>
    <table class="table-ident">
      <tbody>
        <tr>
          <td>Disciplina</td>
          <td>Projeto de Software</td>
        </tr>
        <tr>
          <td>Professor</td>
          <td>Antônio</td>
        </tr>
        <tr>
          <td>Atividade</td>
          <td><strong>Prova Final — Entrega Completa</strong></td>
        </tr>
        <tr>
          <td>Aluno</td>
          <td><strong>Lucas Fernandes Luz</strong></td>
        </tr>
        <tr>
          <td>RA</td>
          <td><strong>2301422</strong></td>
        </tr>
        <tr>
          <td>Responsabilidade</td>
          <td>Full Stack / Arquitetura</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">2. Links Oficiais da Entrega (Prova Final)</div>
    <table>
      <thead>
        <tr>
          <th style="width: 35%;">Artefato / Recurso</th>
          <th>Endereço (URL)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Repositório no GitHub</strong></td>
          <td><a href="https://github.com/LucasFLuz/battleRank" target="_blank">https://github.com/LucasFLuz/battleRank</a></td>
        </tr>
        <tr>
          <td><strong>Board do Projeto (Kanban)</strong></td>
          <td><a href="https://github.com/users/LucasFLuz/projects/1" target="_blank">https://github.com/users/LucasFLuz/projects/1</a></td>
        </tr>
        <tr>
          <td><strong>Vídeo Demonstrativo (Prova Final)</strong></td>
          <td><a href="https://youtu.be/eUC4TpJ2kiI" target="_blank">https://youtu.be/eUC4TpJ2kiI</a></td>
        </tr>
      </tbody>
    </table>

    <div class="callout-box">
      <strong>Escopo da Prova Final Entregue:</strong> Sistema completo de amizades e seguidores (Follow), feed social público de atividades com interações em tempo real (curtidas Fist Bump 👊 e comentários), gamificação por pontuação (XP) com Leaderboard/rankings divididos em ligas (Bronze, Prata, Ouro e Diamante), e dashboard analítico de progressão com gráfico semanal de sobrecarga.
    </div>

    <div class="section-title">3. Planejamento Evolutivo (Roadmap das Sprints)</div>
    <table>
      <thead>
        <tr>
          <th style="width: 15%;">Etapa</th>
          <th style="width: 18%;">Status</th>
          <th>Escopo Entregue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>AC1</strong></td>
          <td><span class="badge-done">Concluído</span></td>
          <td>Fundação da arquitetura em 3 camadas, modelagem inicial no PostgreSQL, API Express + Prisma e interface web dinâmica em React + TailwindCSS.</td>
        </tr>
        <tr>
          <td><strong>AC2</strong></td>
          <td><span class="badge-done">Concluído</span></td>
          <td>Cadastro de Exercícios vinculado a treinos com séries, repetições e cargas alvo, modo de execução em tempo real (Live Workout), cronômetro de descanso e histórico de PRs.</td>
        </tr>
        <tr>
          <td><strong>AC3</strong></td>
          <td><span class="badge-done">Concluído</span></td>
          <td>Autenticação completa de usuários via token JWT, rotas protegidas no backend e frontend, e isolamento rigoroso de treinos e históricos por atleta.</td>
        </tr>
        <tr>
          <td><strong>Prova Final</strong></td>
          <td><span class="badge-done">Concluído</span></td>
          <td>Sistema social completo (seguir atletas, feed com Fist Bumps e comentários), rankings por liga/XP, pódio top 3 e dashboard com análise de volume semanal.</td>
        </tr>
      </tbody>
    </table>

    <div class="page-footer">
      <span>battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)</span>
      <span>Página 1 de 4</span>
    </div>
  </div>

  <!-- PÁGINA 2: Diagrama de Casos de Uso -->
  <div class="page page-break">
    <div class="doc-header-eyebrow">DOCUMENTAÇÃO TÉCNICA • MODELAGEM DE SOFTWARE</div>
    <div class="section-title">4.1. Diagrama de Casos de Uso (UML)</div>
    <p class="overview-text">
      O Diagrama de Casos de Uso especifica as interações entre os atores do sistema (o <strong>Visitante</strong> e o <strong>Atleta Registrado</strong>, que herda as capacidades do Visitante) e as funcionalidades disponibilizadas pela plataforma <strong>battleRank</strong>.
    </p>

    <div class="diagram-container">
      <div class="diagram-title">Diagrama de Casos de Uso — Atores, Relações e Extensões</div>
      <div class="diagram-desc">Demonstra a hierarquia de atores, as inclusões obrigatórias (&laquo;include&raquo;) para cronometragem e exercícios, e as extensões condicionais (&laquo;extend&raquo;) para cálculo de recorde pessoal (PR) e interações sociais.</div>

      {svg1}
    </div>

    <div class="callout-box">
      <strong>Destaques do Caso de Uso:</strong>
      <ul style="margin-left: 20px; margin-top: 5px;">
        <li><strong>Herança de Atores:</strong> O <em>Atleta</em> herda os privilégios do <em>Visitante</em> e ganha acesso ao token de autorização JWT.</li>
        <li><strong>Relação &laquo;include&raquo;:</strong> A execução de um treino exige obrigatoriamente o controle de cronômetro de descanso entre séries.</li>
        <li><strong>Relação &laquo;extend&raquo;:</strong> Bater um Recorde Pessoal (PR) é uma extensão disparada somente se a carga superou o histórico.</li>
      </ul>
    </div>

    <div class="page-footer">
      <span>battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)</span>
      <span>Página 2 de 4</span>
    </div>
  </div>

  <!-- PÁGINA 3: Diagrama de Classes -->
  <div class="page page-break">
    <div class="doc-header-eyebrow">DOCUMENTAÇÃO TÉCNICA • MODELAGEM DE SOFTWARE</div>
    <div class="section-title">4.2. Diagrama de Classes de Domínio (UML)</div>
    <p class="overview-text">
      O Diagrama de Classes reflete a arquitetura orientada a objetos do backend e do banco de dados, incluindo as entidades de domínio, enumerações tipadas, métodos de cálculo e relações de composição.
    </p>

    <div class="diagram-container">
      <div class="diagram-title">Diagrama de Classes — Entidades, Métodos e Enumerações</div>
      <div class="diagram-desc">Apresenta o acoplamento forte por composição (*--) entre Treino e Exercícios, e entre Sessão e Logs de Série, além dos tipos enumerados do sistema.</div>

      {svg2}
    </div>

    <div class="page-footer">
      <span>battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)</span>
      <span>Página 3 de 4</span>
    </div>
  </div>

  <!-- PÁGINA 4: MER / DER -->
  <div class="page page-break">
    <div class="doc-header-eyebrow">DOCUMENTAÇÃO TÉCNICA • BANCO DE DADOS RELACIONAL</div>
    <div class="section-title">4.3. Modelo Entidade-Relacionamento (MER / DER)</div>
    <p class="overview-text">
      O MER especifica o esquema relacional físico implementado no <strong>PostgreSQL 18</strong> com chaves primárias UUID, restrições de unicidade (UNIQUE), chaves estrangeiras e integridade referencial com exclusão em cascata (CASCADE).
    </p>

    <div class="diagram-container">
      <div class="diagram-title">MER / DER — Modelo Entidade-Relacionamento Relacional</div>
      <div class="diagram-desc">Mapeamento rigoroso de todas as 8 tabelas do banco de dados relacional com tipagem estrita, cardinalidades e constraints.</div>

      {svg3}
    </div>

    <div class="callout-box">
      <strong>Regras de Integridade Relacional do Banco de Dados:</strong>
      <ul style="margin-left: 20px; margin-top: 5px;">
        <li><strong>Índices Únicos (UK):</strong> Impede e-mails duplicados em <code>USERS</code>, likes duplicados na mesma sessão (<code>[sessionId, userId]</code>) e duplicações de seguidores (<code>[followerId, followingId]</code>).</li>
        <li><strong>Deleção em Cascata (ON DELETE CASCADE):</strong> Ao remover um treino, seus exercícios e sessões associadas são excluídos atomicamente, garantindo consistência relacional sem registros órfãos.</li>
      </ul>
    </div>

    <div class="page-footer">
      <span>battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)</span>
      <span>Página 4 de 4</span>
    </div>
  </div>

</body>
</html>
"""

with open(r"C:\Projects\battleRank\docs\ENTREGA_PROVA_FINAL.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("ENTREGA_PROVA_FINAL.html successfully generated with embedded SVGs!")
