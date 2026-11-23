# PROJETO DE SOFTWARE • ENTREGA ACADÊMICA (UNIVERSIDADE IMPACTA)
## battleRank — Plataforma Fitness Social
### Documentação Técnica e Resumo das Funcionalidades Implementadas na Prova Final

---

## 📌 Visão Geral
O **battleRank** é uma plataforma fitness social inspirada no Strava e no Hevy voltada à criação de fichas de treino, registro de cargas, acompanhamento de evolução física e competição saudável entre atletas.

---

## 1. Identificação do Aluno e da Disciplina

| Campo | Detalhe |
| :--- | :--- |
| **Disciplina** | Projeto de Software |
| **Professor** | Antônio |
| **Atividade** | **Prova Final — Entrega Completa** |
| **Aluno** | **Lucas Fernandes Luz** |
| **RA** | **2301422** |
| **Responsabilidade** | Full Stack / Arquitetura |

---

## 2. Links Oficiais da Entrega (Prova Final)

| Artefato / Recurso | Endereço (URL) |
| :--- | :--- |
| **Repositório no GitHub** | [https://github.com/LucasFLuz/battleRank](https://github.com/LucasFLuz/battleRank) |
| **Board do Projeto (Kanban)** | [https://github.com/users/LucasFLuz/projects/1](https://github.com/users/LucasFLuz/projects/1) |
| **Vídeo Demonstrativo (Prova Final)** | [https://youtu.be/eUC4TpJ2kiI](https://youtu.be/eUC4TpJ2kiI) |

> **Escopo da Prova Final Entregue:** Sistema completo de amizades e seguidores (Follow), feed social público de atividades com interações em tempo real (curtidas Fist Bump 👊 e comentários), gamificação por pontuação (XP) com Leaderboard/rankings divididos em ligas (Bronze, Prata, Ouro e Diamante), e dashboard analítico de progressão com gráfico semanal de sobrecarga.

---

## 3. Planejamento Evolutivo (Roadmap das Sprints)

| Etapa | Status | Escopo Entregue |
| :--- | :---: | :--- |
| **AC1** | Concluído | Fundação da arquitetura em 3 camadas, modelagem inicial no PostgreSQL, API Express + Prisma e interface web dinâmica em React + TailwindCSS. |
| **AC2** | Concluído | Cadastro de Exercícios vinculado a treinos com séries, repetições e cargas alvo, modo de execução em tempo real (Live Workout), cronômetro de descanso e histórico de PRs. |
| **AC3** | Concluído | Autenticação completa de usuários via token JWT, rotas protegidas no backend e frontend, e isolamento rigoroso de treinos e históricos por atleta. |
| **Prova Final** | Concluído | Sistema social completo (seguir atletas, feed com Fist Bumps e comentários), rankings por liga/XP, pódio top 3 e dashboard com análise de volume semanal. |

---

## 4. Modelagem e Diagramas do Sistema

### 4.1. Diagrama de Casos de Uso (UML)

```mermaid
flowchart LR
    Visitante((Visitante))
    Atleta((Atleta Registrado))
    Atleta --> Visitante

    subgraph battleRank [Plataforma battleRank]
        UC_CAD([Cadastrar Conta])
        UC_LOG([Efetuar Login])
        UC_DASH([Visualizar Dashboard])
        UC_TREINO([Gerenciar Treinos])
        UC_EXER([Configurar Exercicios])
        UC_EXEC([Executar Treino em Tempo Real])
        UC_REST([Cronometrar Descanso])
        UC_PR([Notificar Recorde Pessoal])
        UC_HIST([Consultar Historico])
        UC_RANK([Visualizar Leaderboard e Ligas])
        UC_FEED([Interagir no Feed Social])
        UC_LIKE([Apoiar Treino Fist Bump])
        UC_COMM([Comentar em Treino])
        UC_SEGUIR([Seguir Atleta])
    end

    Visitante --- UC_CAD
    Visitante --- UC_LOG
    Atleta --- UC_DASH
    Atleta --- UC_TREINO
    Atleta --- UC_EXEC
    Atleta --- UC_HIST
    Atleta --- UC_RANK
    Atleta --- UC_FEED
    Atleta --- UC_SEGUIR

    UC_TREINO -.->|include| UC_EXER
    UC_EXEC -.->|include| UC_REST
    UC_EXEC -.->|extend| UC_PR
    UC_FEED -.->|extend| UC_LIKE
    UC_FEED -.->|extend| UC_COMM
```

- **Herança de Atores:** O *Atleta* herda todas as ações do *Visitante* e adiciona as operações logadas.
- **include:** Executar treino inclui obrigatoriamente a cronometragem de descanso entre séries.
- **extend:** Bater Recorde Pessoal (PR) e interações no feed (curtir/comentar) são extensões de fluxo.

---

### 4.2. Diagrama de Classes de Domínio (UML)

```mermaid
classDiagram
    class WorkoutGoal {
        <<enumeration>>
        HIPERTROFIA
        FORCA
        RESISTENCIA
        EMAGRECIMENTO
    }
    class Modality {
        <<enumeration>>
        FORCA
        HIPERTROFIA
        CARDIO
        CALISTENIA
        ALONGAMENTO
    }
    class Division {
        <<enumeration>>
        BRONZE
        PRATA
        OURO
        DIAMANTE
    }
    class User {
        -String id
        -String name
        -String email
        -String password
        -String avatarUrl
        -Int xp
        +calculateDivision() Division
        +addXP(Int points) void
        +getTotalVolume() Float
    }
    class Workout {
        -String id
        -String userId
        -String name
        -WorkoutGoal goal
        -String level
        +getEstimatedVolume() Float
        +getExercisesCount() Int
    }
    class Exercise {
        -String id
        -String workoutId
        -String name
        -Modality modality
        -Int sets
        -Int repetitions
        -Float weight
        -Int restTime
        -String notes
        -Int order
        +reorder(Int newOrder) void
    }
    class WorkoutSession {
        -String id
        -String workoutId
        -DateTime startedAt
        -DateTime endedAt
        -Int durationSeconds
        -Float totalVolume
        -String notes
        +finish(DateTime endedAt) void
        +computeVolume() Float
        +getPersonalRecordsCount() Int
    }
    class SessionLog {
        -String id
        -String sessionId
        -String exerciseId
        -Int setNumber
        -Float weight
        -Int repetitions
        -Boolean isCompleted
        -Boolean isPersonalRecord
        +markCompleted() void
    }
    class Follow {
        -String id
        -String followerId
        -String followingId
    }
    class SessionLike {
        -String id
        -String sessionId
        -String userId
    }
    class SessionComment {
        -String id
        -String sessionId
        -String userId
        -String content
    }
    Workout ..> WorkoutGoal
    Exercise ..> Modality
    User ..> Division
    User "1" --> "*" Workout : possui
    Workout "1" *-- "1..*" Exercise : compoe
    Workout "1" --> "*" WorkoutSession : gera
    WorkoutSession "1" *-- "1..*" SessionLog : registra
    Exercise "1" --> "*" SessionLog : referenciado
    User "1" --> "*" Follow : seguidores
    User "1" --> "*" SessionLike : curte
    WorkoutSession "1" --> "*" SessionLike : recebe
    User "1" --> "*" SessionComment : escreve
    WorkoutSession "1" --> "*" SessionComment : recebe
```

---

### 4.3. Modelo Entidade-Relacionamento (MER / DER)

```mermaid
erDiagram
    USERS ||--o{ WORKOUTS : possui
    USERS ||--o{ FOLLOWS : seguidor
    USERS ||--o{ FOLLOWS : seguido
    USERS ||--o{ SESSION_LIKES : curte
    USERS ||--o{ SESSION_COMMENTS : comenta

    WORKOUTS ||--o{ EXERCISES : composto_por
    WORKOUTS ||--o{ WORKOUT_SESSIONS : execucoes

    WORKOUT_SESSIONS ||--o{ SESSION_LOGS : contem
    EXERCISES ||--o{ SESSION_LOGS : referencia
    WORKOUT_SESSIONS ||--o{ SESSION_LIKES : recebe
    WORKOUT_SESSIONS ||--o{ SESSION_COMMENTS : recebe

    USERS {
        uuid id PK
        varchar name
        varchar email UK
        varchar password
        varchar avatarUrl
        integer xp
        timestamp createdAt
        timestamp updatedAt
    }

    WORKOUTS {
        uuid id PK
        uuid userId FK
        varchar name
        varchar goal
        varchar level
        timestamp createdAt
        timestamp updatedAt
    }

    EXERCISES {
        uuid id PK
        uuid workoutId FK
        varchar name
        varchar modality
        integer sets
        integer repetitions
        float weight
        integer restTime
        text notes
        integer order
        timestamp createdAt
        timestamp updatedAt
    }

    WORKOUT_SESSIONS {
        uuid id PK
        uuid workoutId FK
        timestamp startedAt
        timestamp endedAt
        integer durationSeconds
        float totalVolume
        text notes
        timestamp createdAt
        timestamp updatedAt
    }

    SESSION_LOGS {
        uuid id PK
        uuid sessionId FK
        uuid exerciseId FK
        integer setNumber
        float weight
        integer repetitions
        boolean isCompleted
        boolean isPersonalRecord
        timestamp createdAt
    }

    FOLLOWS {
        uuid id PK
        uuid followerId FK
        uuid followingId FK
        timestamp createdAt
    }

    SESSION_LIKES {
        uuid id PK
        uuid sessionId FK
        uuid userId FK
        timestamp createdAt
    }

    SESSION_COMMENTS {
        uuid id PK
        uuid sessionId FK
        uuid userId FK
        text content
        timestamp createdAt
    }
```

---
*battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)*
