# Como subir a aplicação completa localmente


Este roteiro inicia todo o software local do TCC:

```text
Navegador → Next.js (dashboard, relatórios e API) → MySQL em Docker
```

O firmware do ESP32 não faz parte desta inicialização. Quando o hardware chegar, ele deverá apontar para esta aplicação já em execução, usando o endereço IP da máquina na rede local — nunca `localhost`.

## 1. Pré-requisitos

- Windows com PowerShell;
- Docker Desktop aberto e com a engine em execução;
- Node.js instalado (preferencialmente uma versão LTS atual);
- porta local `3306` disponível para o MySQL e porta `3100` disponível para a aplicação.

Abra o PowerShell na raiz do TCC:

```powershell
cd C:\Users\leonardor\Documents\TCC
```

Verifique as ferramentas antes de continuar:

```powershell
docker version
node --version
npm --version
```

## 2. Configurar os arquivos locais de segredo

Estes arquivos não devem ser versionados ou compartilhados. Os comandos abaixo interrompem o processo caso algum arquivo local já exista; assim, suas credenciais não são sobrescritas por acidente.

```powershell
if (Test-Path software\database\mysql.env.local) { throw "software\database\mysql.env.local já existe." }
if (Test-Path software\database\.env.local) { throw "software\database\.env.local já existe." }
if (Test-Path software\web\.env.local) { throw "software\web\.env.local já existe." }
Copy-Item software\database\mysql.env.example software\database\mysql.env.local
Copy-Item software\database\.env.example software\database\.env.local
Copy-Item software\web\.env.example software\web\.env.local
```

Abra os três arquivos criados e substitua todos os valores de exemplo.

| Arquivo | O que configurar |
| --- | --- |
| `software/database/mysql.env.local` | Banco, usuário da aplicação, senha da aplicação e senha do `root` do MySQL. |
| `software/database/.env.local` | `DATABASE_ADMIN_URL`, usando `root` e a mesma senha definida em `MYSQL_ROOT_PASSWORD`. |
| `software/web/.env.local` | `DATABASE_URL`, usando o usuário da aplicação e a mesma senha definida em `MYSQL_PASSWORD`; `NODE_API_KEY` longo e aleatório; e as variáveis do primeiro administrador. |

Exemplo de coerência, usando apenas marcadores — não copie estas senhas:

```text
mysql.env.local
  MYSQL_USER=tcc_app
  MYSQL_PASSWORD=SENHA_DA_APLICACAO
  MYSQL_ROOT_PASSWORD=SENHA_DO_ROOT

database/.env.local
  DATABASE_ADMIN_URL=mysql://root:SENHA_DO_ROOT@127.0.0.1:3306/tcc_iot

web/.env.local
  DATABASE_URL=mysql://tcc_app:SENHA_DA_APLICACAO@127.0.0.1:3306/tcc_iot
  NODE_API_KEY=SEGREDO_LONGO_DO_NO
  INITIAL_ADMIN_NAME=Nome do administrador inicial
  INITIAL_ADMIN_EMAIL=admin@example.com
  INITIAL_ADMIN_PASSWORD=senha-inicial-com-no-minimo-12-caracteres
```

Use senhas longas e diferentes. Se uma senha usada dentro de uma URL possuir caracteres reservados, como `@`, `:`, `/`, `?` ou `#`, ela precisa ser codificada para URL em `DATABASE_URL` e `DATABASE_ADMIN_URL`.

> Se o arquivo local já existir, não o copie novamente: edite-o manualmente para não sobrescrever suas credenciais.

## 3. Iniciar o MySQL local

Ainda na raiz do TCC, execute:

```powershell
docker compose -f software/compose.yaml up -d
docker compose -f software/compose.yaml ps
```

Espere o serviço `tcc-iot-mysql` apresentar estado saudável. Caso precise acompanhar a inicialização:

```powershell
docker compose -f software/compose.yaml logs -f mysql
```

Use `Ctrl+C` somente para parar a exibição dos logs; o MySQL continuará em execução.

## 4. Instalar dependências, preparar o banco e iniciar a aplicação

Entre na aplicação web:

```powershell
cd software\web
npm install
npm run db:migrate
npm run db:seed
npm run dev -- --hostname 127.0.0.1 --port 3100
```

O último comando mantém o terminal ocupado. Enquanto ele estiver em execução, abra no navegador:

- Dashboard: `http://127.0.0.1:3100/`
- Relatórios: `http://127.0.0.1:3100/reports`
- Saúde da aplicação e do banco: `http://127.0.0.1:3100/api/v1/health?database=1`

Para consultar a saúde pelo PowerShell, em outro terminal:

```powershell
Invoke-RestMethod http://127.0.0.1:3100/api/v1/health?database=1
```

Uma resposta saudável confirma que a aplicação Next.js e o MySQL estão acessíveis. O dashboard aparecer sem valores até que existam leituras do nó ou de uma demonstração controlada.

## 5. Fluxo rápido para as próximas vezes

Depois da primeira configuração, normalmente bastam dois terminais.

**Terminal 1 — raiz do TCC**

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml up -d
```

**Terminal 2 — aplicação**

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run dev -- --hostname 127.0.0.1 --port 3100
```

Execute `npm run db:migrate` novamente apenas quando houver uma migração nova. O comando é idempotente, mas migrações já aplicadas não devem ser editadas.

## 6. Executar como produção local

Para uma execução mais próxima da versão que será hospedada, encerre o modo de desenvolvimento com `Ctrl+C` e use:

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

O endereço continua sendo `http://127.0.0.1:3100/`.

## 7. Verificações recomendadas

Com o MySQL em execução e a aplicação iniciada, em `software/web`:

```powershell
npm test
npm run lint
npm run build
npm run test:integration
npm run test:configuration
npm run test:device-status
npm run test:dashboard
```

Os testes integrados inserem e removem seus próprios dados temporários. Não rode testes de demonstração durante uma coleta experimental real.

Para uma demonstração visual controlada do dashboard, com a aplicação de produção já iniciada, use em outro terminal:

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run demo:dashboard
```

Pressione `Enter` nesse terminal para encerrar. O script remove somente os dados artificiais criados por ele e não representa resultado experimental.

Para uma demonstração ao vivo das faixas locais e do histórico de ocorrências no relatório, use em outro terminal:

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run demo:local-monitoring
```

O script alterna dados artificiais abaixo, dentro e acima das faixas temporárias. Abra o dashboard e `http://127.0.0.1:3100/reports`; pressione `M` no terminal da demonstração para encerrar e limpar os dados criados por ela. Ele não inicia quando houver coleta experimental ativa ou uma faixa local administrativa existente.

## 8. Parar com segurança

1. No terminal da aplicação, pressione `Ctrl+C`.
2. Para interromper o MySQL sem apagar seus dados locais:

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml stop
```

Não use `docker compose down -v`: a opção `-v` remove o volume persistente do MySQL e pode apagar dados locais importantes.

## 9. Problemas comuns

### Docker não conecta

Abra o Docker Desktop, aguarde a engine ficar ativa e rode novamente:

```powershell
docker compose -f software/compose.yaml up -d
```

### A saúde profunda retorna erro ou o dashboard informa banco indisponível

Confira se o contêiner está saudável e se as três configurações locais usam o mesmo banco, usuários e senhas:

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml ps
docker compose -f software/compose.yaml logs --tail 100 mysql
```

Depois, em `software/web`, execute novamente `npm run db:migrate` e `npm run db:seed`.

### A porta 3100 já está ocupada

Encerre a outra instância da aplicação ou escolha outra porta, por exemplo:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3101
```

Nesse caso, use `http://127.0.0.1:3101/` no navegador.

### O botão de login não reage

Atualize a página com `Ctrl+F5` e tente novamente. A tela possui envio nativo como reserva: mesmo que o JavaScript do navegador não carregue, o formulário deve enviar o login e redirecionar para a aplicação. Em instalações locais, abra preferencialmente `http://127.0.0.1:3100/login`.

### Uma sala não mostra as medições do nó

As medições são vinculadas à sala no instante em que chegam à API. Confirme, em **Consulta de salas** → **Editar sala**, que o identificador do nó ativo está associado à sala correta. Um nó sem sala associada ainda pode aparecer no painel geral, mas não fornece dados para nenhuma sala. Ao associar um nó, apenas as próximas medições recebem esse vínculo; o histórico anterior permanece preservado sem reclassificação.

### A porta 3306 já está ocupada

Pare outro MySQL local que esteja usando a porta ou altere conscientemente o mapeamento em `software/compose.yaml` e as URLs de conexão. Não altere esse arquivo durante uma coleta sem registrar a mudança.

## Referências internas

- Arquitetura e estado geral: `software/README.md`
- Aplicação, API, dashboard e testes: `software/web/README.md`
- Banco e migrações: `software/database/README.md`
- Contrato HTTP/JSON: `software/api/contrato.md`
