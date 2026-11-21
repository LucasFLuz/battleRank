# Documentação da API RESTful - battleRank

Base URL padrão em desenvolvimento: `http://localhost:3333`

---

## Endpoints da AC1

### 1. Health Check
Verifica se o servidor da API está ativo e respondendo.

- **Método**: `GET`
- **Rota**: `/health`
- **Resposta de Sucesso (200 OK)**:
```json
{
  "status": "OK",
  "timestamp": "2026-09-20T16:00:00.000Z"
}
```

---

### 2. Cadastrar Treino
Cria um novo plano de treinamento e o persiste na tabela `workouts` do PostgreSQL.

- **Método**: `POST`
- **Rota**: `/workouts`
- **Headers**: `Content-Type: application/json`
- **Corpo da Requisição (JSON)**:
```json
{
  "name": "Treino A",
  "goal": "HIPERTROFIA",
  "level": "INTERMEDIARIO",
  "notes": "Peito e tríceps"
}
```

#### Regras de Validação (Zod):
| Campo | Tipo | Obrigatório | Regras |
| :--- | :--- | :--- | :--- |
| `name` | string | Sim | Mínimo 3 caracteres, Máximo 100 caracteres. |
| `goal` | string | Sim | Deve ser um dos valores: `HIPERTROFIA`, `EMAGRECIMENTO`, `RESISTENCIA`, `FORCA`. |
| `level` | string | Sim | Deve ser um dos valores: `INICIANTE`, `INTERMEDIARIO`, `AVANCADO`. |
| `notes` | string | Não | Máximo 1000 caracteres. |

- **Resposta de Sucesso (201 Created)**:
```json
{
  "id": "c7a8b412-88f1-4db5-9e45-8167f402c4da",
  "name": "Treino A",
  "goal": "HIPERTROFIA",
  "level": "INTERMEDIARIO",
  "notes": "Peito e tríceps",
  "createdAt": "2026-09-20T16:05:00.000Z",
  "updatedAt": "2026-09-20T16:05:00.000Z"
}
```

- **Resposta de Erro de Validação (400 Bad Request)**:
```json
{
  "status": "fail",
  "message": "Erro de validação dos dados enviados.",
  "errors": [
    {
      "field": "name",
      "message": "Nome deve possuir pelo menos 3 caracteres."
    }
  ]
}
```

---

### 3. Listar Treinos
Retorna todos os treinos cadastrados ordenados do mais recente para o mais antigo.

- **Método**: `GET`
- **Rota**: `/workouts`
- **Resposta de Sucesso (200 OK)**:
```json
[
  {
    "id": "c7a8b412-88f1-4db5-9e45-8167f402c4da",
    "name": "Treino A",
    "goal": "HIPERTROFIA",
    "level": "INTERMEDIARIO",
    "notes": "Peito e tríceps",
    "createdAt": "2026-09-20T16:05:00.000Z",
    "updatedAt": "2026-09-20T16:05:00.000Z"
  }
]
```
