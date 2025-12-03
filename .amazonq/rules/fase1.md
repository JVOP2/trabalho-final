
# Objetivo
- Implementar CRUDs para: Curso, Professor, Disciplina, Laboratório, Blocos (frontend, backend, mobile, infra). 


# Backend 
1) Criar modelos Mongoose: instituicoes, cursos, professores, disciplinas, laboratorios, blocos, seguindo o esboço do documento. 

2) Implementar rotas REST: /api/cursos, /api/professores, /api/disciplinas, /api/laboratorios, /api/blocos (GET, POST, PUT, DELETE). 

3) Validações básicas (campos obrigatórios, formatos de e-mail, capacidade numérica etc.) e tratamento de erros JSON.

- Testes unitários simples (ou scripts curl/Postman) para cada rota.

# Frontend 
1) Tela CRUD genérica reutilizável (lista, formulário de criação/edição, botão excluir).

2) Páginas: Cursos, Professores, Disciplinas, Laboratórios, Blocos.

3) Integração com a API (fetch/axios).

4) Grade mínima responsiva e navegação simples (Dashboard). 

# Mobile 
- App simples    (React Native / Expo) com pelo menos telas de listagem e criação para um ou dois cadastros (ex.: Professores e Laboratórios) — pode ser mais leve, o importante é conectar ao backend.