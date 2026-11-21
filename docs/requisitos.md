# Especificação de Requisitos - battleRank

O **battleRank** é uma plataforma fitness social voltada para registro de treinos, acompanhamento de cargas e competição amigável entre praticantes de musculação e esportes de força.

---

## 1. Escopo das Entregas (Roadmap de Sprints)

### AC1 (Sprint 1 - Atual)
- [x] **Cadastro de Treinos**: Usuário pode cadastrar novos planos de treino informando Nome, Objetivo, Nível e Observações.
- [x] **Listagem de Treinos**: Exibição dos treinos criados em cards dinâmicos contendo badges identificadoras e data de criação.
- [x] **Arquitetura em 3 Camadas**: Front-end (React + TS + Tailwind + TanStack Query), Back-end (Node.js + Express + TS) e Banco de Dados (PostgreSQL + Prisma ORM).
- [x] **Validação com Zod**: Schemas tipados garantindo dados consistentes tanto na API quanto no formulário.
- [x] **Atualização Reativa**: TanStack Query invalida caches automaticamente após o `POST`, atualizando o feed de treinos sem refresh da página.

### AC2 (Sprint 2)
- [ ] **Entidade Exercise**: Cadastro de exercícios com grupos musculares e categorias.
- [ ] **Relacionamento WorkoutExercises**: Associação de múltiplos exercícios a um treino, definindo número de séries, repetições alvo e carga sugerida.
- [ ] **Gestão de Exercícios no Frontend**: Visualização e inclusão de exercícios dentro do modal ou tela de detalhes do treino.

### AC3 (Sprint 3)
- [ ] **Registro de Execuções (Executions)**: Registro de sessões de treino realizadas no dia a dia, gravando carga efetiva levantada, repetições realizadas e horário de conclusão.
- [ ] **Histórico do Usuário**: Consulta de treinos anteriores e cargas progressivas.

### Prova Final (Sprint 4)
- [ ] **Sistema de Amizades e Seguir Atletas**: Conexão social entre usuários.
- [ ] **Feed de Atividades**: Mural social exibindo treinos concluídos por amigos (inspirado no Strava/Hevy).
- [ ] **Rankings Competitivos**: Tabelas semanais e mensais de pontuação por frequência e volume de carga levantada.
- [ ] **Dashboard com Gráficos**: Curvas de progressão de carga por exercício e frequência semanal.

---

## 2. Requisitos Não Funcionais
- **Performance & Reatividade**: O frontend não deve utilizar recarregamentos de página (HTML estático é proibido).
- **Tipagem Segura**: TypeScript estrito em 100% do código (proibido o uso de `any`).
- **Arquitetura Limpa**: Separação clara de responsabilidades no backend (`Routes -> Controllers -> Services -> Repositories -> Prisma`).
- **Interface Dark Mode SaaS**: Visual moderno, contrastes adequados, responsivo e adaptado para dispositivos móveis.
- **Portabilidade**: Fácil execução local com variáveis de ambiente documentadas e scripts padronizados.
