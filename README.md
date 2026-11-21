# battleRank 🏋️‍♂️🔥

> **Plataforma Fitness Social** inspirada no Strava e Hevy para criação de treinos, registro de cargas e rankings de evolução física.

---

## 📌 Informações de Entrega da Disciplina (Projeto de Software)

- **Disciplina**: Projeto de Software
- **Professor**: Antônio
- **Entrega Atual**: **AC1 - 1ª Atividade Contínua**

### 👥 Integrantes do Grupo
| Nome do Aluno | RA | Responsabilidade Principal |
| :--- | :--- | :--- |
| Lucas Luz | *Preencher RA* | Full Stack / Arquitetura |

### 🔗 Links da Entrega
- **Repositório no GitHub**: `https://github.com/SEU-USUARIO/battleRank`
- **Board do Projeto (Kanban / Trello / Jira / GitHub Projects)**: `https://github.com/users/SEU-USUARIO/projects/1`
- **Vídeo Demonstrativo da Sprint (AC1)**: `https://youtube.com/watch?v=SEU-VIDEO`

---

## 🏛️ Arquitetura do Sistema (3 Camadas)

O projeto foi construído rigorosamente no modelo de 3 camadas solicitado pelo professor:

```
battleRank/
├── frontend/          # Camada 1: Interface do Usuário (React + Vite + TailwindCSS + TanStack Query)
├── backend/           # Camada 2: API RESTful e Regras de Negócio (Node.js + Express + TypeScript)
├── database/          # Camada 3: Banco de Dados Relacional e ORM (PostgreSQL + Prisma)
└── docs/              # Documentação técnica, requisitos e diagramas de arquitetura
```

### Tecnologias Utilizadas

#### Frontend
- **React 18** com **TypeScript** (Single Page Application 100% dinâmica — **sem HTML estático**)
- **Vite** (Build tool de ultra performance)
- **TailwindCSS** (Design Dark Mode SaaS premium, responsivo e mobile-first)
- **TanStack Query (React Query)** (Cache e sincronização de dados em tempo real)
- **Axios** (Comunicação HTTP assíncrona)
- **React Hook Form + Zod** (Validação reativa de formulários com tipagem estrita)
- **Lucide React** (Ícones modernos)

#### Backend
- **Node.js** com **Express** e **TypeScript**
- Arquitetura limpa em camadas: `Route -> Controller -> Service -> Repository -> Prisma`
- **Zod** para validação defensiva de payloads HTTP
- Middleware de tratamento global de exceções e erros HTTP padronizados
- **CORS** configurado para comunicação segura entre origens

#### Banco de Dados & ORM
- **PostgreSQL 18** na porta padrão `5432`
- **Prisma ORM** com schema centralizado em `database/prisma/schema.prisma`
- Tabela `workouts` com chaves primárias UUID e enums tipados (`Goal`, `Level`)

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- **Node.js** (v18+ ou v24 LTS)
- **npm** (v9+)
- **PostgreSQL** instalado e em execução na porta `5432`

---

### 2. Configuração do Banco de Dados (PostgreSQL)

1. Abra o **pgAdmin** ou o terminal `psql` e crie a base de dados:
   ```sql
   CREATE DATABASE battlerank;
   ```
2. Configure `backend/.env` a partir de `backend/.env.example` e informe os dados locais de conexão do PostgreSQL. Esse arquivo contém credenciais locais e não deve ser compartilhado:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/battlerank?schema=public"
   ```

---

### 3. Instalação e Execução do Backend

1. Abra um terminal e acesse a pasta do backend:
   ```bash
   cd C:\Projects\battleRank\backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Gere o cliente do Prisma e execute a migração inicial do banco:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *A API estará disponível em: `http://localhost:3333`*

---

### 4. Instalação e Execução do Frontend

1. Abra um **segundo terminal** e acesse a pasta do frontend:
   ```bash
   cd C:\Projects\battleRank\frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor Vite:
   ```bash
   npm run dev
   ```
   *O frontend estará disponível em: `http://localhost:5173`*

---

## 📋 Endpoints Principais (AC1)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/health` | Checagem de disponibilidade da API |
| `GET` | `/workouts` | Retorna a lista de todos os treinos cadastrados |
| `POST` | `/workouts` | Cria um novo treino com validação de dados via Zod |

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

## 🗺️ Roadmap das Próximas Sprints

- [x] **AC1**: Cadastro e listagem dinâmica de treinos, backend em 3 camadas, PostgreSQL e React integrado.
- [ ] **AC2**: Cadastro da entidade de Exercícios vinculada a treinos com séries, repetições e cargas alvo.
- [ ] **AC3**: Registro de execuções de treinos em tempo real pelo atleta e histórico cronológico.
- [ ] **Prova Final**: Sistema social completo (amizades, feed público, rankings semanais/mensais e dashboard com gráficos).
