# Acesso e usuários

O sistema exige login para consultar dashboard, salas, nós, relatórios, alertas e exportação CSV. As sessões duram até 12 horas e são mantidas em cookie `HttpOnly`, sem expor o identificador de sessão ao JavaScript do navegador.

## Perfis

- `VIEWER`: consulta as informações monitoradas, sem alterar cadastros, configurações ou faixas locais.
- `ADMIN`: possui as permissões de consulta e pode administrar salas, nós, faixas locais e usuários.

Somente `ADMIN` visualiza a entrada **Consulta de usuários** e pode acessar `/users` e `/admin/users`.

## Primeiro administrador

Após executar `npm run db:migrate`, complete no arquivo local `software/web/.env.local`:

```text
INITIAL_ADMIN_NAME=Nome do administrador
INITIAL_ADMIN_EMAIL=admin@exemplo.com
INITIAL_ADMIN_PASSWORD=uma-senha-forte-com-pelo-menos-12-caracteres
```

Em seguida, execute uma única vez:

```text
npm run users:bootstrap-admin
```

O comando cria a conta apenas se o e-mail ainda não existir e nunca deve receber valores reais em arquivos versionados. Depois do login, o administrador cadastra os demais usuários por **Consulta de usuários → Cadastrar usuário**.

## Dispositivos IoT

O login humano não substitui a credencial dos ESP32. A comunicação dos nós continua usando `NODE_API_KEY`, separada das sessões de usuários.
