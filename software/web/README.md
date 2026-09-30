# Aplicação web

Aplicação criada com Next.js, TypeScript, App Router, Tailwind CSS e ESLint. A API integra o mesmo projeto por Route Handlers, o acesso ao MySQL utiliza o runtime Node.js e a primeira versão funcional do dashboard consulta o banco diretamente em componentes de servidor (`DEC-016`).

Estrutura inicial:

- `app/`: páginas, layouts e Route Handlers;
- `app/api/v1/`: endpoints versionados do contrato da API;
- `lib/`: validação, regras de negócio, autenticação e acesso ao MySQL;
- `components/`: componentes do dashboard;
- `lib/measurements/*.test.ts`: testes unitários de validação, autenticação e idempotência.

## Dashboard implementado

A página inicial é renderizada dinamicamente no servidor e seleciona o dispositivo ativo com atividade mais recente. Ela apresenta:

- o valor válido mais recente de temperatura do ar, umidade relativa e iluminância, com o instante correspondente;
- séries temporais dos 180 registros mais recentes, preservando leituras inválidas como lacunas, sem interpolação;
- o último relatório operacional do nó, incluindo conexão informada, sincronização temporal, firmware, ocupação da fila, perdas e última confirmação;
- totais de entregas confirmadas e tentativas rejeitadas, além da configuração pendente ou aplicada mais recente;
- estados explícitos para banco não configurado, banco indisponível, ausência de dispositivo, medições vazias e relatório operacional ausente.

Um componente cliente solicita uma nova renderização do servidor a cada cinco segundos e também oferece atualização manual. As consultas ao MySQL continuam no servidor; a sessão de usuário é mantida por cookie `HttpOnly`, e `DATABASE_URL` e demais segredos não são serializados para o navegador.

Os gráficos não classificam as condições ambientais. O software não possui alerta normativo: a NBR 16401-2:2008 não pode ser aplicada diretamente às variáveis e à instrumentação deste protótipo. Há, porém, faixas locais de acompanhamento, inicialmente desabilitadas e configuráveis pela tela administrativa. Cada versão registra responsável informado, justificativa e limites; uma leitura válida e sincronizada fora da faixa gera alerta local imutável, consultável em `/alerts` com horário, variável, valor, limites e versão aplicada.

## Relatórios implementados

A página `/reports` apresenta um relatório descritivo do dispositivo ativo. O período é inclusivo no fuso `America/Sao_Paulo`, aceita no máximo 31 dias e, por padrão, cobre os sete dias locais mais recentes. O relatório contém totais de medições armazenadas, sincronizadas e sinalizadas, contagens válidas ou inválidas, mínimo, média e máximo de cada variável e uma tabela com até 200 registros recentes.

A rota `/reports/export` exporta até 5.000 medições em CSV UTF-8 separado por ponto e vírgula. Os estados técnicos de cada leitura são preservados. O relatório não estima lacunas temporais fora de uma execução experimental formalmente delimitada e não classifica o ambiente como adequado ou inadequado. Nesta versão local, dashboard e relatórios ainda não possuem autenticação de usuário; esse controle deverá ser definido antes de qualquer hospedagem externa.

## Execução local

1. Copiar `.env.example` para `.env.local`, ajustar `DATABASE_URL`, gerar um valor longo e aleatório para `NODE_API_KEY` e informar as variáveis do primeiro administrador.
2. Executar `npm install`.
3. Executar `npm run dev`.
4. Consultar `GET /api/v1/health` para verificar a aplicação ou `GET /api/v1/health?database=1` para incluir o MySQL.

## Demonstração visual manual do dashboard

Com o Docker Desktop aberto, prepare o banco e inicie a aplicação de produção no primeiro terminal:

```text
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml up -d
cd software\web
npm run db:migrate
npm run db:seed
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Abra `http://127.0.0.1:3100/` no navegador. Em um segundo terminal, execute:

```text
cd C:\Users\leonardor\Documents\TCC\software\web
npm run demo:dashboard
```

O comando envia uma nova leitura artificial a cada seis segundos e atualiza o estado operacional. A página solicita uma nova renderização a cada cinco segundos, portanto os cartões, gráficos, horário da leitura e ocupação da fila devem mudar sem recarregamento manual. A quinta amostra eleva temporariamente a fila acima de 80% para tornar a advertência visível.

Para encerrar com segurança no Windows, pressione `Enter` no segundo terminal e aguarde a mensagem `PASS limpeza`. O comando remove do MySQL somente as medições e os relatórios de estado criados por essa execução e confirma a limpeza. Ele também recupera resíduos identificados de uma demonstração anterior que tenha sido interrompida abruptamente e recusa iniciar caso exista uma coleta experimental ativa. Esses dados servem apenas para inspeção visual e não constituem evidência experimental do TCC.

Para demonstrar ao vivo as faixas locais de acompanhamento e os alertas locais no dashboard e em `/alerts`, use em outro terminal:

```text
cd C:\Users\leonardor\Documents\TCC\software\web
npm run demo:local-monitoring
```

Se ainda não houver configuração administrativa, esse roteiro cria apenas durante a demonstração faixas de 20–28 °C, 40–60% UR e 300–800 lx. Se já houver uma faixa configurada pela administração, ele a preserva e usa exatamente esses limites. A cada seis segundos, alterna leituras abaixo, acima, dentro e exatamente nos limites, para que seja possível observar a atualização e o histórico de alertas. Pressione `M` nesse terminal para encerrar: o comando remove as medições e estados artificiais e, somente se a tiver criado, também a faixa temporária. Ele se recusa a iniciar durante coleta experimental ativa; os valores de demonstração não têm caráter normativo nem experimental.

## Configurar faixas locais pela interface

Abra `http://127.0.0.1:3100/admin/local-monitoring` ou use o botão **Configurar faixas** no dashboard. Entre com uma conta de administrador e carregue a configuração. Em seguida, ative o acompanhamento, informe responsável, justificativa, referência opcional e os limites mínimo e máximo das variáveis desejadas. Ao salvar, a página cria uma versão efetiva: as próximas leituras válidas e sincronizadas fora desses limites gerarão alertas locais em `http://127.0.0.1:3100/alerts`. A mudança é bloqueada durante execução experimental ativa e não altera alertas históricos.

## Login e usuarios

O acesso humano exige login. As contas possuem perfil `VIEWER` (consulta) ou `ADMIN` (consulta e administracao); somente administradores visualizam a consulta e o cadastro de usuarios. A sessao e armazenada em cookie `HttpOnly`, e as senhas usam derivacao `scrypt`.

Depois de `npm run db:migrate`, configure `INITIAL_ADMIN_NAME`, `INITIAL_ADMIN_EMAIL` e `INITIAL_ADMIN_PASSWORD` em `.env.local` e execute `npm run users:bootstrap-admin` uma vez. Veja [ACESSO_E_USUARIOS.md](./ACESSO_E_USUARIOS.md) para o roteiro completo. A credencial `NODE_API_KEY` continua exclusiva para os dispositivos IoT.

## API implementada

- `GET /api/v1/health`: saúde da aplicação e, opcionalmente, do MySQL.
- `POST /api/v1/measurements`: recebe uma medição autenticada por `Authorization: Bearer <NODE_API_KEY>`, valida o contrato `v0.1` e realiza persistência idempotente.
- `GET` e `POST /api/v1/devices`: listam e cadastram administrativamente os identificadores públicos dos nós antes da gravação do firmware.
- `GET /api/v1/measurements`: consulta disponível à sessão autenticada de administrador, com filtros e paginação por cursor.
- `GET /api/v1/devices/{device_id}/configuration`: entrega ao nó a versão pendente ou aplicada mais recente.
- `PATCH /api/v1/devices/{device_id}/configuration`: cria administrativamente uma versão `PENDING` entre 10 e 300 segundos e bloqueia alterações durante execução ativa.
- `POST /api/v1/devices/{device_id}/configuration-ack`: registra de forma idempotente a aplicação ou rejeição de uma versão pelo nó.
- `POST /api/v1/devices/{device_id}/status`: registra o estado operacional do nó e devolve os indicadores calculados da fila local.
- `GET` e `PATCH /api/v1/devices/{device_id}/local-monitoring-profile`: consultam e versionam as faixas locais de acompanhamento; alterações são bloqueadas durante execução experimental ativa.

O endpoint de medições aceita no máximo 16 KiB por requisição. O hash de integridade considera `schema_version` e `measurement`, mas não `delivery`, permitindo que o mesmo conteúdo imutável seja reenviado com metadados de entrega atualizados.

As ações administrativas são autorizadas pela sessão de um usuário com perfil `ADMIN`; telas e chamadas do navegador não usam nem solicitam uma chave administrativa compartilhada. O segredo `NODE_API_KEY` permanece exclusivo para a comunicação dos nós IoT e não deverá usar prefixo `NEXT_PUBLIC_`.

Para executar as verificações locais:

```text
npm test
npm run lint
npm run build
```

Com o Docker Desktop em execução, o banco local é preparado a partir da raiz do TCC e deste diretório:

```text
docker compose -f software/compose.yaml up -d
cd software/web
npm run db:migrate
npm run db:seed
npm run dev -- --hostname 127.0.0.1 --port 3100
npm run test:integration
npm run test:api:quality
npm run test:configuration
npm run test:device-status
npm run test:dashboard
npm run test:dashboard:latency
npm run test:local-monitoring
npm run test:quality-analysis
```

Os testes integrados verificam medições, configuração, estado operacional e renderização do dashboard no MySQL real. O teste de configuração cobre leitura, autenticação, limites, criação de versão pendente, confirmações `APPLIED` e `REJECTED`, repetição idempotente, conflitos, versões substituídas e bloqueio durante execução ativa. O teste operacional cobre fila, advertência, perdas, conexão e sincronização temporal. O teste do dashboard carrega três medições controladas, preserva uma falha de temperatura como lacuna, confere valores, unidades, fila, segurança do HTML e uma amostra de latência leitura–dashboard. O mesmo teste confere o resumo e o histórico do relatório, a limitação normativa explícita, a integridade da exportação CSV e a rejeição de um período inválido.

`npm run test:local-monitoring` cria exclusivamente dados temporários identificados, verifica autenticação, limites invertidos, valores abaixo/no limite/acima de uma faixa local, histórico na página exclusiva de alertas, perfil desabilitado e bloqueio durante execução ativa. A rotina se recusa a iniciar se houver uma faixa local administrativa existente e remove todos os seus próprios perfis, regras, alertas, medições e tentativas ao final. O ensaio local de 31/08/2026 está registrado em [test-local-monitoring-2026-08-31.md](./test-local-monitoring-2026-08-31.md).

O benchmark `test:dashboard:latency` utiliza 100 amostras por padrão, confere no HTML os valores e instantes exatos de cada leitura e calcula mínimo, média, P50, P95 e máximo pelo método do posto mais próximo. A quantidade pode ser ajustada entre 20 e 1000 por `DASHBOARD_LATENCY_SAMPLES`. O resultado JSON é salvo em `test-results/`. Essa medição solicita a renderização imediatamente após a API e não inclui a espera da atualização automática do navegador. Todos os registros artificiais são removidos ao final.

O benchmark `test:api:quality` envia 100 requisições nominais por padrão e casos adicionais inválidos, incompletos, repetidos e conflitantes. A duração interna do Route Handler é exposta em `Server-Timing`, sem incluir credenciais ou conteúdo da medição. O script calcula o P95, audita integralmente as linhas no MySQL, reconcilia as tentativas, salva um JSON em `test-results/` e remove os registros temporários. A quantidade nominal pode ser ajustada entre 100 e 1000 por `API_QUALITY_SAMPLES`.

`test:quality-analysis` verifica o motor derivado de `T012` sem acessar ou alterar os dados brutos reais.

O registro detalhado da execução controlada está em [teste-dashboard-2026-08-25.md](./teste-dashboard-2026-08-25.md).

O benchmark repetido e suas limitações estão documentados em [teste-dashboard-latencia-2026-08-25.md](./teste-dashboard-latencia-2026-08-25.md).

A observação manual da atualização automática está registrada em [teste-dashboard-visual-2026-08-25.md](./teste-dashboard-visual-2026-08-25.md).

O benchmark da API e do MySQL está documentado em [teste-api-qualidade-2026-08-25.md](./teste-api-qualidade-2026-08-25.md).

O endpoint sem consulta ao banco funciona antes da configuração do MySQL. A verificação profunda retorna `503` enquanto a conexão não estiver configurada ou acessível.

O painel operacional deverá apresentar estado online ou offline, instante do último envio confirmado, quantidade e percentual de ocupação da fila, advertência a partir de 80% e contadores de registros confirmados, pendentes e descartados (`DEC-013`).
