# Checklist de Entrega Final - PM2025-2
**Data:** 2025-06-12 00:30
**Status:** Em Progresso

## RF01 - Cadastros Básicos ✅

### Backend
- [x] Modelo Instituição
- [x] Modelo Curso
- [x] Modelo Professor
- [x] Modelo Disciplina
- [x] Modelo Laboratório
- [x] Modelo Bloco
- [x] Controllers para todas entidades
- [x] Rotas REST (GET, POST, PUT, DELETE)
- [x] Validações básicas
- [x] Tratamento de erros JSON

### Frontend
- [x] Componente Instituições com CRUD
- [ ] Componente Cursos com CRUD
- [ ] Componente Professores com CRUD
- [ ] Componente Disciplinas com CRUD
- [ ] Componente Laboratórios com CRUD
- [ ] Componente Blocos com CRUD

### Mobile
- [x] CRUD Instituições
- [ ] CRUD Professores
- [ ] CRUD Laboratórios

## RF02 - Cadastro de Aulas com Validação ✅

### Backend
- [x] Modelo Aula criado
- [x] Validação CA01 - Conflito de Laboratório
- [x] Validação CA02 - Conflito de Professor
- [x] Endpoint POST /api/v1/aulas com validação
- [x] Endpoint GET /api/v1/aulas com filtros
- [x] Endpoint PUT /api/v1/aulas/:id
- [x] Endpoint DELETE /api/v1/aulas/:id
- [x] Retorno 409 com mensagem descritiva

### Frontend
- [x] Formulário de criação de aula
- [x] Seleção de disciplina, professor, laboratório, dia, blocos
- [x] Feedback de conflito com mensagem clara
- [ ] Página de listagem de aulas
- [ ] Integração completa no menu

### Mobile
- [ ] Tela de consulta de horários
- [ ] Tela de criação de aula
- [ ] Teste de conflito

### Testes
- [ ] Cenário: Duas aulas no mesmo laboratório+bloco (deve falhar)
- [ ] Cenário: Duas aulas com mesmo professor (deve falhar)
- [ ] Validar códigos HTTP corretos (409)
- [ ] Validar mensagens descritivas

## RF03 - Consulta de Horários ✅

### Backend
- [x] Endpoint GET /api/v1/aulas com filtros
- [x] Filtro por laboratorioId
- [x] Filtro por professorId
- [x] Filtro por cursoId
- [x] Filtro por disciplinaId
- [x] Filtro por diaSemana
- [x] Endpoint /api/v1/aulas/grade-semanal

### Frontend
- [x] Componente Grade Semanal
- [x] Filtros rápidos (laboratório, professor)
- [x] Visualização por grade (dias x blocos)
- [ ] Export/Print (opcional)

### Mobile
- [ ] Listar aulas por dia
- [ ] Filtros básicos

## Infraestrutura ✅

- [x] Docker Compose com MongoDB
- [x] Portainer configurado
- [x] Instruções de deploy local
- [x] Scripts npm/yarn documentados

## Documentação ✅

- [x] README.md atualizado
- [x] Endpoints documentados
- [x] Exemplos de requisições
- [x] Prompts salvos em .amazonq/prompts/
- [x] Padrão q-dev-chat-<data>-<hora>.md
- [x] Documentação Swagger

## Validações de Aceite

### CA01 - Conflito de Laboratório ✅
- [x] Sistema verifica laboratório ocupado
- [x] Mesmo dia da semana
- [x] Mesmo bloco de horário
- [x] Retorna erro 409
- [x] Mensagem descritiva

### CA02 - Conflito de Professor ✅
- [x] Sistema verifica professor alocado
- [x] Mesmo dia da semana
- [x] Mesmo bloco de horário
- [x] Retorna erro 409
- [x] Mensagem descritiva

### CA03 - Consulta de Horários ✅
- [x] Filtro por laboratório
- [x] Filtro por curso
- [x] Filtro por disciplina
- [x] Filtro por professor
- [x] Grade semanal visual
- [x] Exibe todos os blocos alocados

## Commits e PRs

- [x] Commits pequenos e claros
- [x] Repositório: https://github.com/JVOP2/trabalho-final.git
- [ ] PRs abertos e revisados

## Pendências

### Alta Prioridade
1. Integrar componentes de Aulas no Menu principal
2. Criar página de listagem de aulas no frontend
3. Implementar telas mobile para aulas
4. Criar componentes CRUD para Cursos, Professores, Disciplinas, Laboratórios, Blocos

### Média Prioridade
5. Testes unitários ou scripts curl/Postman
6. Script de seed para blocos (RNF05)
7. Validar todos os cenários de teste

### Baixa Prioridade
8. Export/Print da grade semanal
9. Melhorias de UX
10. Otimizações de performance

## Arquivos Criados Nesta Sessão

### Backend
- `projeto/backend/src/models/Aula.js`
- `projeto/backend/src/controllers/aulaController.js`
- `projeto/backend/src/routes/aulas.js`

### Frontend
- `projeto/frontend/src/components/Aulas/GradeSemanal.jsx`
- `projeto/frontend/src/components/Aulas/FormularioAula.jsx`

### Documentação
- `.amazonq/prompts/q-dev-chat-2025-01-09-implementacao-aulas.md`
- `.amazonq/prompts/q-dev-chat-2025-01-09-checklist-final.md`
- `README.md` (atualizado)

## Próximos Passos Imediatos

1. Integrar GradeSemanal e FormularioAula no Menu.jsx
2. Criar componente de listagem de aulas
3. Testar fluxo completo de criação de aula com conflitos
4. Implementar telas mobile básicas
5. Criar scripts de teste curl/Postman
