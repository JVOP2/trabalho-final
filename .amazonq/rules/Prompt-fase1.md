

# Infraestrutura
1) Dockerizar backend e MongoDB (docker-compose) ou instruções de deploy local.
2) Instruções de como subir o sistema (script npm/yarn).
3) Documentação de prompts e chats
- Guardar os prompts do Amazon Q usados e exportar os chats para .amazonq\prompts\ . Salvar cada execução com o padrão q-dev-chat-<data>-<hora>.md. 

# Checklist de aceite 
- As APIs CRUD respondem corretamente (GET/POST/PUT/DELETE).
- Frontend permite criar, listar, editar e excluir itens dos cadastros.
- Back-end valida e persiste dados no MongoDB.
- Scripts para subir ambiente funcionam (local/docker).
- Prompts e chats salvos na pasta indicada.
- Commit por funcionalidade e PR no repositório.
