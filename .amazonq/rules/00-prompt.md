# Preparação do ambiente e estrutura inicial
- Estou iniciando a implementação.
- Quero estruturar um backend em Node.js + Express com MongoDB usando Mongoose.
- Preciso que você gere a estrutura inicial do projeto com:
* pasta /src
* arquivos base: server.js, app.js, /src/config/db.js, /src/routes/index.js
* middlewares padrão (JSON, CORS, erro simples)
* conexão com MongoDB organização recomendada de pastas para modelos, controllers e rotas.
- Crie também a lista de dependências que devo instalar e uma explicação curta de como executar o projeto. 

# Estrutura base do Frontend
- Agora quero configurar o frontend em React para o RF01.
- Quero uma estrutura organizada com:
* /src/pages
* /src/components
* /src/services/api.js para conexão com o backend
* menu lateral simples e navegação entre páginas com React Router.
- Gere o código inicial dos arquivos principais e diga quais libs devo instalar.


# Infraestrutura inicial / Docker
- Quero preparar o ambiente com Docker para facilitar desenvolvimento.
- Monte um docker-compose.yml com os serviços:
* backend
* mongodb
- Também inclua o Dockerfile do backend.  
- Explique como subir o ambiente com um único comando.


# Modelagem inicial e CRUD de Cursos
- Modelo Curso + Controller + Rotas
- "Quero iniciar os CRUDs do RF01 pelo cadastro de Cursos.
- Gere:
* o modelo Mongoose Curso com campos básicos (nome, instituiçãoId, turno, status).
* um controller com funções: listar, criar, atualizar e deletar.
* rotas REST completas.
- Inclua boas práticas, validações e mensagens claras."

# Página React para Cursos
- Agora preciso da página de Cursos no frontend.
- Quero:
* tela de listagem em tabela
* botão 'Novo Curso'
* formulário de criação/edição
* chamada à API usando axios
* mensagens de feedback e tratamento de erro.
- Gere o JSX e a lógica do componente.


# CRUD de Professores
- Modelo Professor + Controller + Rotas
- Quero criar o CRUD de Professores no backend.
- O modelo precisa de: nome, email, formação, status.
- Gere modelo, controller e rotas completas.
- Inclua validação de e-mail e mensagens adequadas.

# Página de Professores no React
- Agora gere a página de Professores para o frontend:
* tabela
* formulário de criação/edição
* conexão com API
* tratamento de erros
* componentes limpos e reutilizáveis.
- Siga o mesmo padrão criado para Cursos.


# CRUD de Disciplinas
- Modelo Disciplina + Rotas
- Quero implementar o CRUD de Disciplinas no backend.
- O modelo deve incluir: nome, cargaHoraria, cursoId, status.
- Gere controller + rotas seguindo o padrão dos dias anteriores.

# Tela Disciplinas no Frontend
- Agora preciso da tela de Disciplinas no frontend com:
* listagem
* formulário
* select para vincular Curso
* integração com a API
* tratamento de estados e mensagens.


# CRUD de Laboratórios e Blocos
- Modelo Laboratório + Rotas
- Vou criar o cadastro de Laboratórios.
- Modelo precisa de: nome, capacidade, recursos, blocoId, status.
- Gere modelo, controller e rotas completas.

# CRUD de Blocos
- Agora gere o CRUD de Blocos (nome, descrição, status).
- Inclua modelo, controller e rotas.

# Telas React para Laboratórios e Blocos
- Crie as telas React para Laboratórios e Blocos:
* tabelas
* formulários
* selects relacionando Laboratórios → Blocos
* integração com API.

# Mobile básico
- App Mobile simples conectado ao backend
- Quero gerar um app mobile simples (React Native / Expo) que:
*  liste Professores
* permita adicionar um novo
* se conecte ao backend já criado.
- Gere a estrutura do app, telas e serviço API."

# Revisão geral e testes do RF01
- Roteiro de testes e validação
- Quero um roteiro de testes completo para validar o RF01, cobrindo todos os CRUDs:
* casos positivos
* erros esperados
* comportamento de API
* comportamento no frontend
- Crie também uma checklist final para confirmar que RF01 está aceito.

- (Cadastro de Aulas + Validação de Conflitos)

# Modelagem de Aulas
- Modelo Aula
- Ele deve conter: cursoId, disciplinaId, professorId, laboratorioId, diaSemana, bloco, dataInicio, dataFim.
- Gere o modelo completo e explique como relacionar com outras coleções."


# Lógica de conflito
- Validação de conflito (professor/laboratório)
- Agora implemente no controller da criação de aula:
* checagem de conflito de laboratório por dia + bloco
* checagem de conflito de professor por dia + bloco
* Se houver conflito, retornar erro 409 com mensagem clara.
- Gere o controller com essa lógica.


# Frontend de criação de aulas
- Tela de criação de Aulas
- Crie a tela para cadastrar Aulas no frontend:
* selects de curso, disciplina, professor e laboratório
* campo bloco
* submit com aviso caso haja conflito
* exibição da mensagem retornada pela API.
- Inclua layout limpo e organizado.


# Grade Semanal 
- Implementar Grade Semanal
- Quero implementar uma Grade Semanal no frontend para o RF03:
*	linhas: blocos
*	colunas: dias da semana
*	células: aula existente (curso + disciplina + professor)
*	filtro por laboratório ou professor.
- Gere o componente completo.


# Mobile para consultas
- Consulta de Aulas no Mobile
- Quero uma tela mobile simples que consulte Aulas do backend e exiba por dia da semana.
- Gere o componente e o serviço API.


# Documentação e prompts para entrega
- Geração automática da pasta .amazonq/prompts
- Preciso gerar um conjunto de arquivos markdown que contenham todos os prompts utilizados durante o desenvolvimento .



# Testes finais e checklist
- Checklist final de RF02 e RF03
- Quero uma checklist completa para validar RF02 e RF03:
* conflitos funcionando
* aulas aparecendo corretamente
* grade semanal
* mobile funcionando
* estrutura de repositório
* ambiente funcional.
- Gere a lista detalhada de itens a confirmar antes da entrega.
