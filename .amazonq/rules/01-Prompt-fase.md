

# Objetivo
- Implementar CRUDs para: Curso, Professor, Disciplina, Laboratório, Blocos (frontend, backend, mobile, infra). 


# Backend 
1) Criar modelos Mongoose: instituicoes, cursos, professores, disciplinas, laboratorios, blocos, seguindo o esboço do documento. 

2) Implementar rotas REST: /api/cursos, /api/professores, /api/disciplinas, /api/laboratorios, /api/blocos (GET, POST, PUT, DELETE). 

3) Validações básicas (campos obrigatórios, formatos de e-mail, capacidade numérica etc.) e tratamento de erros JSON.

4) Validações básicas (campos obrigatórios, formatos de e-mail, capacidade numérica etc.) e tratamento de erros JSON.

5) Testes unitários simples (ou scripts curl/Postman) para cada rota.


# Frontend 
1) Tela CRUD genérica reutilizável (lista, formulário de criação/edição, botão excluir).

2) Páginas: Cursos, Professores, Disciplinas, Laboratórios, Blocos.

3) Integração com a API (fetch/axios).

4) Grade mínima responsiva e navegação simples (Dashboard). 

# Mobile 
1. App simples    (React Native / Expo) com pelo menos telas de listagem e criação para um ou dois cadastros (ex.: Professores e Laboratórios) — pode ser mais leve, o importante é conectar ao backend.

Infraestrutura
2. Dockerizar backend e MongoDB (docker-compose) ou instruções de deploy local.
Instruções de como subir o sistema (script npm/yarn).

3. Para a documentação de prompts e chats guardar os prompts do Amazon Q usados e exportar os chats para .amazonq\prompts\ conforme orientação do documento. Salvar cada execução com o padrão q-dev-chat-<data>-<hora>.md. 

## Implementação Realizada:

### Backend 
- Modelos Mongoose criados: Curso, Professor, Disciplina, Laboratório, Bloco
- Controllers implementados para todas as entidades
- Rotas REST criadas: /api/v1/cursos, /api/v1/professores, /api/v1/disciplinas, /api/v1/laboratorios, /api/v1/blocos
- Validações básicas implementadas (campos obrigatórios, formatos, etc.)
-  Tratamento de erros JSON

### Próximos Passos:
- Frontend - Páginas CRUD para todas entidades
- Mobile - Telas de listagem e criação
- Testes unitários/scripts curl
- Atualizar README.md

## Estrutura Criada:

### Modelos:
- `Curso`: nome, código, instituição, cargaHoraria, ativo
- `Professor`: nome, email, telefone, especialidade, ativo  
- `Disciplina`: nome, código, curso, cargaHoraria, ativo
- `Laboratório`: nome, capacidade, equipamentos, ativo
- `Bloco`: nome, número, laboratórios[], ativo

### Endpoints Disponíveis:
- GET/POST/PUT/DELETE `/api/v1/cursos`
- GET/POST/PUT/DELETE `/api/v1/professores`
- GET/POST/PUT/DELETE `/api/v1/disciplinas`
- GET/POST/PUT/DELETE `/api/v1/laboratorios`
- GET/POST/PUT/DELETE `/api/v1/blocos`

# Checklist de aceite 
- As APIs CRUD respondem corretamente (GET/POST/PUT/DELETE).
- Frontend permite criar, listar, editar e excluir itens dos cadastros.
- Back-end valida e persiste dados no MongoDB.
- Scripts para subir ambiente funcionam (local/docker).
- Prompts e chats salvos na pasta indicada.
- Commit por funcionalidade e PR no repositório.
