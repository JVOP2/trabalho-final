# Chat Amazon Q - Implementação de Aulas com Validação de Conflitos
**Data:** 2025-06-12 00:30
**Fase:** RF02 - Cadastro de Aulas com Validação

## Objetivo
Implementar sistema de alocação de aulas com validação de conflitos de laboratório e professor (CA01 e CA02).

## Prompts Utilizados

### 1. Criação do Modelo de Aula
```
Criar modelo Mongoose para Aula com os campos:
- semestre (String, obrigatório)
- curso (ObjectId ref Curso, obrigatório)
- disciplina (ObjectId ref Disciplina, obrigatório)
- professor (ObjectId ref Professor, obrigatório)
- laboratorio (ObjectId ref Laboratorio, obrigatório)
- diaSemana (String enum, obrigatório)
- blocos (Array de Strings, obrigatório)
- dataInicio (Date, obrigatório)
- dataFim (Date, obrigatório)
- ativo (Boolean, default true)

Adicionar índices para otimizar consultas de conflito.
```

### 2. Controller com Validação de Conflitos
```
Criar controller aulaController.js com:
- Função verificarConflitos que valida:
  * CA01: Laboratório não pode estar ocupado no mesmo dia/bloco
  * CA02: Professor não pode estar alocado no mesmo dia/bloco
- Método criar com validação antes de salvar
- Método listar com filtros (laboratorioId, professorId, cursoId, disciplinaId, diaSemana, semestre)
- Método buscarPorId
- Método atualizar com validação de conflitos
- Método remover
- Método gradeSemanal para retornar grade organizada por dia

Retornar erro 409 (Conflict) com mensagem descritiva quando houver conflito.
```

### 3. Rotas REST
```
Criar rotas em routes/aulas.js:
- POST /api/v1/aulas - Criar aula
- GET /api/v1/aulas - Listar com filtros
- GET /api/v1/aulas/grade-semanal - Grade semanal
- GET /api/v1/aulas/:id - Buscar por ID
- PUT /api/v1/aulas/:id - Atualizar
- DELETE /api/v1/aulas/:id - Remover

Incluir documentação Swagger para todos os endpoints.
```

### 4. Componente Grade Semanal (Frontend)
```
Criar componente GradeSemanal.jsx com:
- Tabela com dias da semana nas colunas
- Blocos (M1-M4, T1-T4, N1-N4) nas linhas
- Filtros por laboratório e professor
- Exibir disciplina, professor e laboratório em cada célula
- Carregar dados via API /aulas/grade-semanal
```

### 5. Formulário de Aula (Frontend)
```
Criar FormularioAula.jsx com:
- Campos: semestre, curso, disciplina, professor, laboratório, dia da semana, blocos, datas
- Seleção múltipla de blocos com chips
- Validação e exibição de erros de conflito (409)
- Mensagens claras indicando qual recurso conflitou
- Integração com API para criar/editar
```

## Arquivos Criados

### Backend
- `projeto/backend/src/models/Aula.js` - Modelo de dados
- `projeto/backend/src/controllers/aulaController.js` - Lógica de negócio e validações
- `projeto/backend/src/routes/aulas.js` - Rotas REST

### Frontend
- `projeto/frontend/src/components/Aulas/GradeSemanal.jsx` - Visualização de grade
- `projeto/frontend/src/components/Aulas/FormularioAula.jsx` - Formulário CRUD

## Validações Implementadas

### CA01 - Conflito de Laboratório
- Verifica se laboratório já está ocupado no mesmo dia/bloco
- Retorna erro 409 com mensagem: "Laboratório já ocupado no {dia} nos blocos {blocos}"

### CA02 - Conflito de Professor
- Verifica se professor já está alocado no mesmo dia/bloco
- Retorna erro 409 com mensagem: "Professor já alocado no {dia} nos blocos {blocos}"

## Endpoints Disponíveis

```
POST   /api/v1/aulas
GET    /api/v1/aulas?laboratorioId=&professorId=&diaSemana=
GET    /api/v1/aulas/grade-semanal?laboratorioId=&professorId=
GET    /api/v1/aulas/:id
PUT    /api/v1/aulas/:id
DELETE /api/v1/aulas/:id
```

## Testes Sugeridos

### Cenário 1: Conflito de Laboratório
```bash
# Criar primeira aula
POST /api/v1/aulas
{
  "semestre": "2025/1",
  "laboratorio": "lab123",
  "professor": "prof456",
  "diaSemana": "Segunda",
  "blocos": ["M1", "M2"]
}

# Tentar criar segunda aula no mesmo lab/dia/bloco (deve falhar)
POST /api/v1/aulas
{
  "semestre": "2025/1",
  "laboratorio": "lab123",
  "professor": "prof789",
  "diaSemana": "Segunda",
  "blocos": ["M1"]
}
```

### Cenário 2: Conflito de Professor
```bash
# Tentar alocar mesmo professor em dois lugares (deve falhar)
POST /api/v1/aulas
{
  "semestre": "2025/1",
  "laboratorio": "lab999",
  "professor": "prof456",
  "diaSemana": "Segunda",
  "blocos": ["M1"]
}
```

## Status
✅ Modelo Aula criado
✅ Controller com validações CA01 e CA02
✅ Rotas REST implementadas
✅ Componente Grade Semanal
✅ Formulário de Aula
✅ Integração com API

## Próximos Passos
- [ ] Integrar componentes no Menu principal
- [ ] Criar tela de listagem de aulas
- [ ] Implementar mobile (listagem e criação)
- [ ] Testes unitários
- [ ] Atualizar README.md
