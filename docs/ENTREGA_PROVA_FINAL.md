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

O Diagrama de Casos de Uso especifica os atores do sistema (**Visitante** e **Atleta Registrado**) e seus relacionamentos com as funcionalidades:

```mermaid
flowchart LR
    classDef actorStyle fill:#0f172a,stroke:#0284c7,stroke-width:2px,color:#fff;
    classDef ucStyle fill:#f8fafc,stroke:#0f172a,stroke-width:1.5px,color:#0f172a;
    classDef extStyle fill:#f0f9ff,stroke:#0284c7,stroke-width:1.5px,color:#0369a1;

    Visitante((Visitante)):::actorStyle
    Atleta((Atleta Registrado)):::actorStyle

    Atleta --|> Visitante

    subgraph battleRank["Plataforma battleRank"]
        UC_CAD(["Cadastrar Conta"]):::ucStyle
        UC_LOG(["Efetuar Login (JWT)"]):::ucStyle

        UC_DASH(["Visualizar Dashboard & Volume"]):::ucStyle
        UC_TREINO(["Gerenciar Fichas de Treino"]):::ucStyle
        UC_EXER(["Configurar Exercícios da Ficha"]):::ucStyle
        UC_EXEC(["Executar Treino em Tempo Real"]):::ucStyle
        UC_REST(["Cronometrar Descanso"]):::ucStyle
        UC_PR(["Notificar Recorde Pessoal (PR)"]):::extStyle
        UC_HIST(["Consultar Histórico de Treinos"]):::ucStyle
        UC_RANK(["Visualizar Leaderboard & Ligas"]):::ucStyle
        UC_FEED(["Interagir no Feed Social"]):::ucStyle
        UC_LIKE(["Apoiar Treino (Fist Bump 👊)"]):::extStyle
        UC_COMM(["Comentar em Treino"]):::extStyle
        UC_SEGUIR(["Seguir / Deixar de Seguir"]):::ucStyle
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

    UC_TREINO -.->|«include»| UC_EXER
    UC_EXEC -.->|«include»| UC_REST
    UC_EXEC -.->|«extend»| UC_PR
    UC_FEED -.->|«extend»| UC_LIKE
    UC_FEED -.->|«extend»| UC_COMM
```

- **Herança de Atores:** O *Atleta* herda todas as ações do *Visitante* e adiciona as operações logadas.
- **«include»:** Executar treino inclui obrigatoriamente a cronometragem de descanso entre séries.
- **«extend»:** Bater Recorde Pessoal (PR) e interações no feed (curtir/comentar) são extensões de fluxo.

---

### 4.2. Diagrama de Classes de Domínio (UML)

Mapeamento da camada de domínio do backend, tipagem com enumerações e relações de composição (`*--`):

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
        -DateTime createdAt
        -DateTime updatedAt
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
        -DateTime createdAt
        -DateTime updatedAt
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
        -DateTime createdAt
    }

    class SessionLike {
        -String id
        -String sessionId
        -String userId
        -DateTime createdAt
    }

    class SessionComment {
        -String id
        -String sessionId
        -String userId
        -String content
        -DateTime createdAt
    }

    Workout ..> WorkoutGoal : utiliza
    Exercise ..> Modality : possui
    User ..> Division : possui

    User "1" --> "*" Workout : possui
    Workout "1" *-- "1..*" Exercise : compõe
    Workout "1" --> "*" WorkoutSession : gera
    WorkoutSession "1" *-- "1..*" SessionLog : registra
    Exercise "1" --> "*" SessionLog : referenciado

    User "1" --> "*" Follow : follower / following
    User "1" --> "*" SessionLike : curte
    WorkoutSession "1" --> "*" SessionLike : recebe
    User "1" --> "*" SessionComment : escreve
    WorkoutSession "1" --> "*" SessionComment : recebe
```

---

### 4.3. Modelo Entidade-Relacionamento (MER / DER)

Esquema físico relacional do **PostgreSQL 18** com chaves primárias UUID, índices únicos e deleção em cascata (`CASCADE`):

```mermaid
erDiagram
    USERS ||--o{ WORKOUTS : "1:N (possui)"
    USERS ||--o{ FOLLOWS : "1:N (seguidor)"
    USERS ||--o{ FOLLOWS : "1:N (seguido)"
    USERS ||--o{ SESSION_LIKES : "1:N (curte)"
    USERS ||--o{ SESSION_COMMENTS : "1:N (comenta)"

    WORKOUTS ||--o{ EXERCISES : "1:N (composto por [CASCADE])"
    WORKOUTS ||--o{ WORKOUT_SESSIONS : "1:N (execuções [CASCADE])"

    WORKOUT_SESSIONS ||--o{ SESSION_LOGS : "1:N (contém [CASCADE])"
    EXERCISES ||--o{ SESSION_LOGS : "1:N (referencia)"
    WORKOUT_SESSIONS ||--o{ SESSION_LIKES : "1:N (recebe [CASCADE])"
    WORKOUT_SESSIONS ||--o{ SESSION_COMMENTS : "1:N (recebe [CASCADE])"

    USERS {
        uuid id PK
        varchar name "NOT NULL"
        varchar email "UK NOT NULL"
        varchar password "NOT NULL"
        varchar avatarUrl "NULL"
        integer xp "DEFAULT 0 NOT NULL"
        timestamp createdAt "DEFAULT NOW()"
        timestamp updatedAt "DEFAULT NOW()"
    }

    WORKOUTS {
        uuid id PK
        uuid userId FK "NOT NULL"
        varchar name "NOT NULL"
        varchar goal "NOT NULL (Enum)"
        varchar level "NOT NULL (Enum)"
        timestamp createdAt "DEFAULT NOW()"
        timestamp updatedAt "DEFAULT NOW()"
    }

    EXERCISES {
        uuid id PK
        uuid workoutId FK "NOT NULL"
        varchar name "NOT NULL"
        varchar modality "NOT NULL (Enum)"
        integer sets "NOT NULL"
        integer repetitions "NOT NULL"
        float weight "DEFAULT 0"
        integer restTime "DEFAULT 60"
        text notes "NULL"
        integer order "NOT NULL"
        timestamp createdAt "DEFAULT NOW()"
        timestamp updatedAt "DEFAULT NOW()"
    }

    WORKOUT_SESSIONS {
        uuid id PK
        uuid workoutId FK "NOT NULL"
        timestamp startedAt "NOT NULL"
        timestamp endedAt "NULL"
        integer durationSeconds "DEFAULT 0"
        float totalVolume "DEFAULT 0"
        text notes "NULL"
        timestamp createdAt "DEFAULT NOW()"
        timestamp updatedAt "DEFAULT NOW()"
    }

    SESSION_LOGS {
        uuid id PK
        uuid sessionId FK "NOT NULL"
        uuid exerciseId FK "NOT NULL"
        integer setNumber "NOT NULL"
        float weight "NOT NULL"
        integer repetitions "NOT NULL"
        boolean isCompleted "DEFAULT FALSE"
        boolean isPersonalRecord "DEFAULT FALSE"
        timestamp createdAt "DEFAULT NOW()"
    }

    FOLLOWS {
        uuid id PK
        uuid followerId FK "NOT NULL"
        uuid followingId FK "NOT NULL"
        timestamp createdAt "DEFAULT NOW()"
    }

    SESSION_LIKES {
        uuid id PK
        uuid sessionId FK "NOT NULL"
        uuid userId FK "NOT NULL"
        timestamp createdAt "DEFAULT NOW()"
    }

    SESSION_COMMENTS {
        uuid id PK
        uuid sessionId FK "NOT NULL"
        uuid userId FK "NOT NULL"
        text content "NOT NULL"
        timestamp createdAt "DEFAULT NOW()"
    }
```

---
*battleRank • Projeto de Software (Prova Final) — Lucas Fernandes Luz (RA: 2301422)*
