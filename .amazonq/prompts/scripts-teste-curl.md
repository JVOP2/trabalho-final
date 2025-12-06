# Scripts de Teste - API PM2025-2
**Data:** 2025-06-12 00:49

## Configuração
```bash
BASE_URL="http://localhost:3000/api/v1"
```

## 1. Teste CRUD Instituições

### Criar Instituição
```bash
curl -X POST $BASE_URL/instituicoes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Universidade Federal",
    "cnpj": "12345678000190",
    "endereco": "Rua Principal, 100",
    "telefone": "(11) 1234-5678",
    "email": "contato@universidade.edu.br"
  }'
```

### Listar Instituições
```bash
curl -X GET $BASE_URL/instituicoes
```

### Atualizar Instituição
```bash
curl -X PUT $BASE_URL/instituicoes/{ID} \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Universidade Federal Atualizada"
  }'
```

### Deletar Instituição
```bash
curl -X DELETE $BASE_URL/instituicoes/{ID}
```

## 2. Teste CRUD Cursos

### Criar Curso
```bash
curl -X POST $BASE_URL/cursos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ciência da Computação",
    "codigo": "CC001",
    "instituicao": "{INSTITUICAO_ID}",
    "cargaHoraria": 3200
  }'
```

### Listar Cursos
```bash
curl -X GET $BASE_URL/cursos
```

## 3. Teste CRUD Professores

### Criar Professor
```bash
curl -X POST $BASE_URL/professores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Silva",
    "email": "joao.silva@universidade.edu.br",
    "telefone": "(11) 98765-4321",
    "especialidade": "Banco de Dados"
  }'
```

### Listar Professores
```bash
curl -X GET $BASE_URL/professores
```

## 4. Teste CRUD Disciplinas

### Criar Disciplina
```bash
curl -X POST $BASE_URL/disciplinas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Banco de Dados I",
    "codigo": "BD101",
    "curso": "{CURSO_ID}",
    "cargaHoraria": 80
  }'
```

### Listar Disciplinas
```bash
curl -X GET $BASE_URL/disciplinas
```

## 5. Teste CRUD Laboratórios

### Criar Laboratório
```bash
curl -X POST $BASE_URL/laboratorios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Lab Informática 1",
    "capacidade": 40,
    "equipamentos": ["Computadores", "Projetor", "Quadro"]
  }'
```

### Listar Laboratórios
```bash
curl -X GET $BASE_URL/laboratorios
```

## 6. Teste CRUD Blocos

### Criar Bloco
```bash
curl -X POST $BASE_URL/blocos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Bloco A",
    "numero": "A1",
    "laboratorios": []
  }'
```

### Listar Blocos
```bash
curl -X GET $BASE_URL/blocos
```

## 7. Teste CRUD Aulas (RF02)

### Criar Aula - Sucesso
```bash
curl -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "semestre": "2025/1",
    "curso": "{CURSO_ID}",
    "disciplina": "{DISCIPLINA_ID}",
    "professor": "{PROFESSOR_ID}",
    "laboratorio": "{LABORATORIO_ID}",
    "diaSemana": "Segunda",
    "blocos": ["M1", "M2"],
    "dataInicio": "2025-02-01",
    "dataFim": "2025-06-30"
  }'
```

### Teste CA01 - Conflito de Laboratório (deve retornar 409)
```bash
# Criar primeira aula
curl -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "semestre": "2025/1",
    "curso": "{CURSO_ID}",
    "disciplina": "{DISCIPLINA_ID}",
    "professor": "{PROFESSOR_ID}",
    "laboratorio": "{LABORATORIO_ID}",
    "diaSemana": "Segunda",
    "blocos": ["M1"],
    "dataInicio": "2025-02-01",
    "dataFim": "2025-06-30"
  }'

# Tentar criar segunda aula no mesmo lab/dia/bloco
curl -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "semestre": "2025/1",
    "curso": "{CURSO_ID_2}",
    "disciplina": "{DISCIPLINA_ID_2}",
    "professor": "{PROFESSOR_ID_2}",
    "laboratorio": "{LABORATORIO_ID}",
    "diaSemana": "Segunda",
    "blocos": ["M1"],
    "dataInicio": "2025-02-01",
    "dataFim": "2025-06-30"
  }'
```

### Teste CA02 - Conflito de Professor (deve retornar 409)
```bash
# Tentar alocar mesmo professor em dois lugares
curl -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d '{
    "semestre": "2025/1",
    "curso": "{CURSO_ID_3}",
    "disciplina": "{DISCIPLINA_ID_3}",
    "professor": "{PROFESSOR_ID}",
    "laboratorio": "{LABORATORIO_ID_2}",
    "diaSemana": "Segunda",
    "blocos": ["M1"],
    "dataInicio": "2025-02-01",
    "dataFim": "2025-06-30"
  }'
```

### Listar Aulas
```bash
curl -X GET $BASE_URL/aulas
```

### Listar Aulas por Laboratório
```bash
curl -X GET "$BASE_URL/aulas?laboratorioId={LABORATORIO_ID}"
```

### Listar Aulas por Professor
```bash
curl -X GET "$BASE_URL/aulas?professorId={PROFESSOR_ID}"
```

### Listar Aulas por Dia
```bash
curl -X GET "$BASE_URL/aulas?diaSemana=Segunda"
```

## 8. Teste Grade Semanal (RF03)

### Grade Completa
```bash
curl -X GET $BASE_URL/aulas/grade-semanal
```

### Grade por Laboratório
```bash
curl -X GET "$BASE_URL/aulas/grade-semanal?laboratorioId={LABORATORIO_ID}"
```

### Grade por Professor
```bash
curl -X GET "$BASE_URL/aulas/grade-semanal?professorId={PROFESSOR_ID}"
```

### Grade por Semestre
```bash
curl -X GET "$BASE_URL/aulas/grade-semanal?semestre=2025/1"
```

## 9. Teste de Atualização de Aula

### Atualizar Aula
```bash
curl -X PUT $BASE_URL/aulas/{AULA_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "blocos": ["M2", "M3"]
  }'
```

## 10. Teste de Deleção de Aula

### Deletar Aula
```bash
curl -X DELETE $BASE_URL/aulas/{AULA_ID}
```

## Resultados Esperados

### Sucesso (200/201)
```json
{
  "sucesso": true,
  "mensagem": "...",
  "dados": {...}
}
```

### Conflito (409)
```json
{
  "sucesso": false,
  "mensagem": "Laboratório já ocupado no Segunda nos blocos M1",
  "tipo": "laboratorio",
  "aulaConflitante": {...}
}
```

### Erro (400/404/500)
```json
{
  "sucesso": false,
  "mensagem": "..."
}
```

## Script Completo de Teste

```bash
#!/bin/bash
BASE_URL="http://localhost:3000/api/v1"

echo "=== Testando API PM2025-2 ==="

# 1. Criar Instituição
echo "\n1. Criando Instituição..."
INST_RESPONSE=$(curl -s -X POST $BASE_URL/instituicoes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Universidade Teste","cnpj":"12345678000190"}')
INST_ID=$(echo $INST_RESPONSE | jq -r '.dados._id')
echo "Instituição ID: $INST_ID"

# 2. Criar Curso
echo "\n2. Criando Curso..."
CURSO_RESPONSE=$(curl -s -X POST $BASE_URL/cursos \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Ciência da Computação\",\"codigo\":\"CC001\",\"instituicao\":\"$INST_ID\"}")
CURSO_ID=$(echo $CURSO_RESPONSE | jq -r '.dados._id')
echo "Curso ID: $CURSO_ID"

# 3. Criar Professor
echo "\n3. Criando Professor..."
PROF_RESPONSE=$(curl -s -X POST $BASE_URL/professores \
  -H "Content-Type: application/json" \
  -d '{"nome":"Dr. João Silva","email":"joao@teste.com"}')
PROF_ID=$(echo $PROF_RESPONSE | jq -r '.dados._id')
echo "Professor ID: $PROF_ID"

# 4. Criar Disciplina
echo "\n4. Criando Disciplina..."
DISC_RESPONSE=$(curl -s -X POST $BASE_URL/disciplinas \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Banco de Dados\",\"codigo\":\"BD101\",\"curso\":\"$CURSO_ID\"}")
DISC_ID=$(echo $DISC_RESPONSE | jq -r '.dados._id')
echo "Disciplina ID: $DISC_ID"

# 5. Criar Laboratório
echo "\n5. Criando Laboratório..."
LAB_RESPONSE=$(curl -s -X POST $BASE_URL/laboratorios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Lab 1","capacidade":40}')
LAB_ID=$(echo $LAB_RESPONSE | jq -r '.dados._id')
echo "Laboratório ID: $LAB_ID"

# 6. Criar Aula
echo "\n6. Criando Aula..."
curl -s -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d "{\"semestre\":\"2025/1\",\"curso\":\"$CURSO_ID\",\"disciplina\":\"$DISC_ID\",\"professor\":\"$PROF_ID\",\"laboratorio\":\"$LAB_ID\",\"diaSemana\":\"Segunda\",\"blocos\":[\"M1\"],\"dataInicio\":\"2025-02-01\",\"dataFim\":\"2025-06-30\"}" | jq

# 7. Testar Conflito (deve retornar 409)
echo "\n7. Testando Conflito de Laboratório..."
curl -s -X POST $BASE_URL/aulas \
  -H "Content-Type: application/json" \
  -d "{\"semestre\":\"2025/1\",\"curso\":\"$CURSO_ID\",\"disciplina\":\"$DISC_ID\",\"professor\":\"$PROF_ID\",\"laboratorio\":\"$LAB_ID\",\"diaSemana\":\"Segunda\",\"blocos\":[\"M1\"],\"dataInicio\":\"2025-02-01\",\"dataFim\":\"2025-06-30\"}" | jq

# 8. Grade Semanal
echo "\n8. Consultando Grade Semanal..."
curl -s -X GET "$BASE_URL/aulas/grade-semanal?laboratorioId=$LAB_ID" | jq

echo "\n=== Testes Concluídos ==="
```
