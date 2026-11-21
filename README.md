# battleRank 🏋️‍♂️🔥

> **Plataforma Fitness Social** inspirada no Strava e Hevy para criação de treinos, registro de cargas, evolução física e competição saudável entre atletas.

---

## 📌 Informações de Entrega da Disciplina (Projeto de Software)

- **Disciplina**: Projeto de Software
- **Professor**: Antônio
- **Entrega Atual**: **AC1 - 1ª Atividade Contínua**

### 👥 Integrantes do Grupo
| Nome do Aluno | RA | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Lucas Fernandes Luz** | `2301422` | Full Stack / Arquitetura |

### 🔗 Links da Entrega
- **Repositório no GitHub**: [https://github.com/LucasFLuz/battleRankc](https://github.com/LucasFLuz/battleRankc)
- **Board do Projeto (GitHub Projects)**: [https://github.com/users/LucasFLuz/projects/1/views/2](https://github.com/users/LucasFLuz/projects/1/views/2)
- **Vídeo Demonstrativo da Sprint (AC1)**: *[Inserir link do YouTube / Drive / Loom aqui]*

---

## 🏛️ Arquitetura do Sistema (3 Camadas)

O projeto foi construído rigorosamente no modelo de 3 camadas solicitado pelo professor:

```text
battleRank/
├── frontend/          # Camada 1: Interface do Usuário (React 18 + Vite + TailwindCSS + TanStack Query)
├── backend/           # Camada 2: API RESTful e Regras de Negócio (Node.js + Express + TypeScript)
├── database/          # Camada 3: Banco de Dados Relacional e ORM (PostgreSQL 18 + Prisma ORM)
├── docs/              # Documentação técnica, requisitos e diagramas de arquitetura
└── dev.bat            # Script de inicialização simultânea para desenvolvimento local
```

### Tecnologias Utilizadas

#### Frontend
- **React 18** com **TypeScript** (Single Page Application 100% dinâmica — **sem HTML estático**)
- **Vite** (Build tool de ultra performance)
- **TailwindCSS** (Design Dark Mode SaaS premium, responsivo e mobile-first)
- **TanStack Query (React Query)** (Cache, mutações e sincronização de dados em tempo real)
- **Axios** (Comunicação HTTP assíncrona)
- **React Hook Form + Zod** (Validação reativa de formulários com tipagem estrita)
- **Lucide React** (Ícones modernos)

#### Backend
- **Node.js** com **Express** e **TypeScript**
- Arquitetura limpa em camadas: `Route -> Controller -> Service -> Repository -> Prisma`
- **Zod** para validação defensiva de payloads HTTP
- Middleware de tratamento global de exceções e respostas de erro HTTP padronizadas
- **CORS** configurado para comunicação segura entre origens

#### Banco de Dados & ORM
- **PostgreSQL 18** na porta padrão `5432`
- **Prisma ORM** com schema centralizado em `database/prisma/schema.prisma`
- Tabela `workouts` com chaves primárias UUID e enums tipados (`Goal`, `Level`)

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- **Node.js** (v18+ ou v24 LTS instalado)
- **npm** (v9+)
- **PostgreSQL 18** instalado e em execução na porta `5432`

---

### 2. Configuração do Banco de Dados (PostgreSQL)

1. Abra o **pgAdmin** ou o terminal `psql` e crie a base de dados:
   ```sql
   CREATE DATABASE battlerank;
   ```
2. Configure o arquivo `backend/.env` (já predefinido a partir de `backend/.env.example`) com suas credenciais locais do PostgreSQL:
   ```env
   PORT=3333
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:080903@localhost:5432/battlerank?schema=public"
   CORS_ORIGIN="http://localhost:5173"
   ```

---

### 3. Inicialização Rápida (Script Automatizado)

Na raiz do projeto (`C:\Projects\battleRank`), você pode simplesmente executar o script:
```cmd
dev.bat
```
Ele abrirá automaticamente dois terminais dedicados:
- **Terminal Backend**: `http://localhost:3333`
- **Terminal Frontend**: `http://localhost:5173`

---

### 4. Inicialização Manual (Passo a Passo)

Caso prefira rodar manualmente em terminais separados:

**Passo A — Backend:**
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

**Passo B — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Abra no navegador: **`http://localhost:5173`**

---

## 📋 Endpoints Principais (AC1)

| Método | Endpoint | Descrição | Status de Sucesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Checagem de disponibilidade da API | `200 OK` |
| `GET` | `/workouts` | Retorna a lista de todos os treinos cadastrados | `200 OK` |
| `POST` | `/workouts` | Cria um novo treino com validação de dados via Zod | `201 Created` |

### Exemplo de Payload para `POST /workouts`:
```json
{
  "name": "Treino A - Peito e Tríceps",
  "goal": "HIPERTROFIA",
  "level": "INTERMEDIARIO",
  "notes": "Foco em supino inclinado com halteres e paralelas"
}
```

---

## 🗺️ Épicos e Roadmap do Projeto (Kanban / GitHub Projects)

O planejamento do projeto está sincronizado com as entregas da disciplina e documentado no **GitHub Projects**:

### 🏁 Épico 1: AC1 — Fundação, Arquitetura e Gestão de Treinos (Concluído)
**Objetivo:** Estruturar a base do projeto em 3 camadas, configurar o ambiente de desenvolvimento automatizado e entregar o fluxo completo de criação e listagem de fichas/espaços de treino.

- [x] **[AC1-01] Setup de Arquitetura em 3 Camadas e Repositório**
  - *Descrição:* Criação da estrutura monorepo (`frontend`, `backend`, `database`, `docs`), configuração do TypeScript estrito, ESLint, variáveis de ambiente (`.env`) e script `dev.bat` para inicialização simultânea.
  - *Critérios de Aceite:* Repositório versionado no GitHub e ambiente subindo localmente sem erros.
- [x] **[AC1-02] Modelagem Inicial do Banco de Dados (PostgreSQL + Prisma)**
  - *Descrição:* Configuração do PostgreSQL 18 e criação do schema inicial no Prisma com a tabela `workouts` (ID UUID, nome, objetivo `Goal`, nível `Level`, observações e timestamps).
  - *Critérios de Aceite:* Migrations aplicadas com sucesso e conexão validada via Prisma Client.
- [x] **[AC1-03] API RESTful Base e CRUD Inicial de Treinos**
  - *Descrição:* Implementação da arquitetura limpa (`Route -> Controller -> Service -> Repository`), endpoint `/health`, validação de payloads com Zod, middleware global de erros e endpoints `GET /workouts` e `POST /workouts`.
  - *Critérios de Aceite:* Endpoints testados e retornando status HTTP padronizados (`200`, `201`, `400`, `500`).
- [x] **[AC1-04] Interface Web (SPA) e Espaço de Criação de Treinos**
  - *Descrição:* Desenvolvimento da interface Dark Mode responsiva em React + TailwindCSS, integração com TanStack Query e Axios, formulário reativo com React Hook Form + Zod para cadastro e listagem dinâmica de treinos.
  - *Critérios de Aceite:* Treino cadastrado na tela é persistido no PostgreSQL e exibido imediatamente sem reload da página.

---

### 🏋️ Épico 2: AC2 — Exercícios, Execução em Tempo Real e Histórico de Progresso (To Do / Próxima Sprint)
**Objetivo:** Transformar cada espaço de treino em uma ficha técnica completa, permitindo adicionar exercícios com parâmetros detalhados, registrar a execução real do treino e consultar o histórico de evolução.

- [ ] **[AC2-01] Modelagem Relacional de Exercícios e Sessões (Prisma)**
  - *Descrição:* Criar tabela `exercises` vinculada a `workouts` (`1:N`) contendo: nome, modalidade/esporte (Musculação, Crossfit, Cardio, Calistenia), séries alvo, repetições alvo, carga planejada, tempo de descanso e observações técnicas. Criar tabelas `workout_sessions` e `exercise_logs` para registrar o que foi executado de fato.
  - *Critérios de Aceite:* Relacionamentos com chaves estrangeiras e deleção em cascata configurados no `schema.prisma`.
- [ ] **[AC2-02] API de Gerenciamento de Exercícios no Treino**
  - *Descrição:* Criar endpoints `POST /workouts/:id/exercises`, `PUT /exercises/:id` e `DELETE /exercises/:id` com validação Zod para gerenciar os itens dentro de um treino específico.
  - *Critérios de Aceite:* Validação impede séries/repetições negativas e garante que o treino pai exista.
- [ ] **[AC2-03] Tela de Detalhes do Treino e Montagem de Ficha**
  - *Descrição:* Criar página/modal de visualização interna do treino onde o usuário adiciona, edita, reordena e remove exercícios, definindo séries, repetições, categoria de esporte e notas de execução.
  - *Critérios de Aceite:* Usuário consegue montar um treino completo (ex.: Treino A com 5 exercícios) com feedback visual imediato.
- [ ] **[AC2-04] Modo "Iniciar Treino" (Execução em Tempo Real)**
  - *Descrição:* Criar interface interativa de execução onde o atleta marca cada série como concluída, ajusta a carga real levantada e repetições feitas naquele dia, com cronômetro de descanso integrado entre séries.
  - *Critérios de Aceite:* Ao finalizar o treino, o sistema salva um snapshot completo da sessão no banco de dados e calcula o Volume Total Levantado ($\text{Séries} \times \text{Repetições} \times \text{Carga}$).
- [ ] **[AC2-05] Histórico Cronológico e Detecção de Recorde Pessoal (PR)**
  - *Descrição:* Criar aba de Histórico exibindo todas as sessões concluídas (data, duração, volume total) e destacar automaticamente com badge de PR (*Personal Record*) sempre que o usuário bater sua carga máxima histórica em um exercício.
  - *Critérios de Aceite:* Comparação automática entre a carga atual e o histórico anterior do mesmo exercício.

---

### 🔐 Épico 3: AC3 — Autenticação, Contas Individuais e Segurança (Backlog)
**Objetivo:** Isolar os dados por atleta, implementando fluxo completo de identidade, segurança de senhas, recuperação de acesso e perfil personalizado.

- [ ] **[AC3-01] Modelagem de Usuários e Isolamento de Dados (Multi-tenant)**
  - *Descrição:* Criar tabela `users` (ID, nome, username único `@atleta`, e-mail, hash da senha, avatar, peso, altura, bio) e vincular `workouts` e `workout_sessions` ao `user_id`.
  - *Critérios de Aceite:* Nenhum treino ou histórico pode existir sem um usuário proprietário no banco.
- [ ] **[AC3-02] API de Autenticação (Cadastro, Login e JWT)**
  - *Descrição:* Implementar `POST /auth/register` (com hash de senha via `bcryptjs`) e `POST /auth/login` (gerando token JWT + Refresh Token). Criar middleware `ensureAuthenticated` para proteger todas as rotas privadas.
  - *Critérios de Aceite:* Senhas nunca são armazenadas em texto puro; requisições sem token válido retornam `401 Unauthorized`.
- [ ] **[AC3-03] Fluxo de Recuperação de Senha ("Esqueci Minha Senha")**
  - *Descrição:* Criar endpoints `POST /auth/forgot-password` (gera token temporário com expiração de 15 minutos e dispara e-mail via Nodemailer/Resend) e `POST /auth/reset-password` (valida token e atualiza a senha).
  - *Critérios de Aceite:* Token expirado ou já utilizado é rejeitado automaticamente pela API.
- [ ] **[AC3-04] Telas de Acesso, Rotas Protegidas e Perfil do Atleta**
  - *Descrição:* Construir páginas de Login, Cadastro, Recuperação de Senha e Edição de Perfil no React. Configurar interceptors no Axios para anexar o token JWT automaticamente e redirecionar sessões expiradas.
  - *Critérios de Aceite:* Cada usuário logado visualiza e gerencia estritamente os seus próprios treinos e históricos.

---

### 🏆 Épico 4: Prova Final — Feed Social, Rankings e Dashboard Analítico (Backlog)
**Objetivo:** Entregar a camada social competitiva inspirada no Strava e Hevy, com interação entre atletas, gamificação por rankings e análise visual de desempenho.

- [ ] **[PF-01] Sistema de Amizades / Seguidores**
  - *Descrição:* Criar tabela `follows` (`follower_id`, `following_id`), busca de atletas por nome ou `@username`, botão de Seguir/Deixar de Seguir e contador de seguidores/seguindo no perfil.
  - *Critérios de Aceite:* Usuário consegue encontrar colegas da turma/plataforma e acompanhar suas atividades.
- [ ] **[PF-02] Feed Social de Atividades e Interações**
  - *Descrição:* Criar timeline pública/de amigos exibindo treinos concluídos (exercícios realizados, duração, volume total e PRs batidos), com suporte a curtidas ("Fist Bump / Apoio") e comentários.
  - *Critérios de Aceite:* Feed ordenado cronologicamente com paginação infinita e atualização otimista nas curtidas.
- [ ] **[PF-03] Sistema de Gamificação e Rankings Globais/Semanais**
  - *Descrição:* Implementar motor de pontuação (XP por treino concluído, constância semanal e volume total) e criar tela de Leaderboard (Ranking) com filtros por: Ranking Geral, Ranking Semanal, Por Modalidade/Esporte e Entre Amigos.
  - *Critérios de Aceite:* Query otimizada no PostgreSQL calculando posição, pontuação e variação de rank de todos os atletas.
- [ ] **[PF-04] Dashboard de Progressão com Gráficos Interativos**
  - *Descrição:* Integrar biblioteca de gráficos (Recharts ou Chart.js) no painel do atleta para exibir: evolução de carga máxima por exercício ao longo do tempo, volume semanal levantado, mapa de calor de frequência (estilo GitHub/Strava) e distribuição de treinos por grupo muscular/esporte.
  - *Critérios de Aceite:* Gráficos responsivos atualizados dinamicamente conforme novas sessões são registradas.
