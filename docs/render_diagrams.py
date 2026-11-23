import urllib.request
import base64
import os

d1 = """flowchart LR
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
"""

d2 = """classDiagram
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
"""

d3 = """erDiagram
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
"""

def fetch_svg(diagram_code, name):
    b64 = base64.b64encode(diagram_code.encode("utf-8")).decode("ascii")
    url = f"https://mermaid.ink/svg/{b64}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        svg = resp.read().decode("utf-8")
        print(f"{name} SUCCESS: {len(svg)} bytes")
        return svg

svg1 = fetch_svg(d1, "Diagram 1 (Casos de Uso)")
svg2 = fetch_svg(d2, "Diagram 2 (Classes)")
svg3 = fetch_svg(d3, "Diagram 3 (MER/DER)")

with open(r"C:\Projects\battleRank\docs\svg1.svg", "w", encoding="utf-8") as f:
    f.write(svg1)
with open(r"C:\Projects\battleRank\docs\svg2.svg", "w", encoding="utf-8") as f:
    f.write(svg2)
with open(r"C:\Projects\battleRank\docs\svg3.svg", "w", encoding="utf-8") as f:
    f.write(svg3)

print("ALL 3 SVGS SAVED SUCCESSFULLY!")
