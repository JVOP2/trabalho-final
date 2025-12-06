# Cadastro de Aulas com validação
# Objetivo

- Permitir criar alocações de aulas respeitando validação de conflito (laboratório ocupado e professor já alocado). Critérios de aceite: CA01 e CA02. 

# Tarefas principais

- Criar coleção aulas com campos: semestre, cursoId, disciplinaId, professorId, laboratorioId, diaSemana, blocos, dataInicio, dataFim. 

# Backend
- Endpoint POST /api/aulas com lógica que:
* verifica conflito de laboratório no mesmo diaSemana e mesmo bloco;
* verifica conflito de professor no mesmo diaSemana e mesmo bloco;
* retorna erro descritivo se houver conflito (por exemplo, 409 + mensagem).
* Endpoints GET /api/aulas, PUT /api/aulas/:id, DELETE /api/aulas/:id.

# Frontend
Formulário de criação de aula (escolher disciplina, professor, laboratório, dia e bloco).
Ao tentar salvar, mostrar feedback claro de conflito (mensagem com qual recurso conflitou).
Página de listagem/grade semanal onde se visualize as alocações por laboratório e por professor.

# Mobile
Tela de consulta e criação simples (pelo menos consultar horários e tentar criar uma aula para testar conflito).
Testes e Aceite
Cenários de teste: tentar criar duas aulas no mesmo laboratório+bloco (deve falhar), tentar criar duas aulas com mesmo professor (deve falhar). Validar que mensagens e códigos HTTP estejam corretos. Critérios CA01 e CA02 aplicados. 
