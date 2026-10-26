# 4 Desenvolvimento e implementação

Este capítulo descreve a implementação do protótipo e sua integração física e lógica. O nó foi montado, recebeu o firmware e operou com os sensores, a API, o banco de dados e a aplicação web nos ensaios e nas sessões formais apresentados no capítulo 5.

## 4.1 Componentes e ferramentas

O nó IoT utilizou uma placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31 e um módulo anunciado como VEML7700. Na inspeção e no upload, a placa foi identificada como ESP32-D0WD-V3, com 4 MB de flash e interface serial CP210x. A programação foi organizada como projeto PlatformIO com framework Arduino. O firmware utiliza ArduinoJson, bibliotecas Adafruit para SHT31 e VEML7700, Preferences, LittleFS, Wi-Fi e HTTPClient.

No servidor, a solução utiliza uma aplicação Next.js com TypeScript e App Router. As rotas HTTP são Route Handlers executados em runtime Node.js; a persistência local utiliza MySQL em Docker Compose e o acesso à base é realizado com `mysql2`. A escolha mantém interface e API no mesmo projeto, reduzindo a quantidade de serviços necessários para o protótipo.

## 4.2 Projeto e montagem do hardware

Os dois módulos foram conectados ao mesmo barramento I2C, com alimentação pela saída de 3,3 V da placa e GND comum. A montagem utilizou GPIO 32 para SDA e GPIO 33 para SCL, configurados em arquivo local do firmware. Na inicialização física, o SHT31 respondeu no endereço `0x44` e ambos os módulos foram reconhecidos. O upload e o monitoramento serial ocorreram pela porta `COM3`, com interface CP210x. Não houve medição independente da tensão de alimentação por multímetro.

Foram preparados uma checklist, um registro da primeira montagem e um script de pré-verificação. O script exige configuração local, rejeita valores de exemplo, impede o uso de `localhost` como endereço da API pelo ESP32 e confere GPIOs distintos antes de compilar ou enviar o firmware. As ligações efetivas, a identificação da placa e os testes iniciais dos sensores foram registrados nos documentos e fotografias do experimento.

## 4.3 Firmware do nó IoT

O firmware foi implementado para obter temperatura, umidade relativa e iluminância, atribuir identificadores UUID de inicialização e medição, manter número de sequência persistente e registrar timestamps UTC quando o relógio estiver sincronizado. Para obter o horário, tenta NTP e, quando necessário, utiliza o cabeçalho `Date` de uma resposta bem-sucedida da API local. Cada leitura contém valores e estados de qualidade; falhas de leitura e valores fora da faixa física são preservados como estados técnicos, não convertidos em valores estimados.

As medições não confirmadas são armazenadas em uma fila LittleFS persistente e ordenada, limitada a 256 registros. A fila somente remove uma medição após a API responder `STORED` ou `ALREADY_STORED`. Em indisponibilidade de Wi-Fi ou API, a aquisição continua e os registros são reenviados do mais antigo ao mais recente após a reconexão. Caso a capacidade seja atingida, os itens pendentes são preservados e novas perdas são contabilizadas explicitamente.

O nó também consulta a configuração remota do intervalo, persiste a última configuração válida e confirma sua aplicação ou rejeição. Sua telemetria informa conexão, ocupação da fila, perdas, sinal Wi-Fi, sincronização temporal e estado dos sensores. A versão 0.1.2 do firmware foi utilizada nas três sessões formais com o nó físico, permitindo relacionar as medições à implementação avaliada.

## 4.4 Comunicação HTTP e formato das mensagens

A comunicação utiliza JSON em UTF-8 pela base `/api/v1`. Cada mensagem de medição contém a versão do esquema, identificador da medição, dispositivo, inicialização, sequência, execução experimental quando existente, versão da configuração, instante de leitura, tempo de atividade, sincronização temporal e as três leituras. A entrega informa se o envio é online ou reenviado, instante de envio, ocupação da fila e perdas acumuladas.

O contrato trata a medição como imutável. A API calcula um hash do conteúdo canônico; um reenvio com o mesmo identificador e conteúdo recebe confirmação idempotente, enquanto o mesmo identificador com conteúdo diferente gera conflito de integridade. Essa regra permite que o firmware repita a tentativa após uma falha de rede sem criar uma segunda medição no banco.

## 4.5 API

Foram implementadas rotas de saúde, ingestão, consulta paginada de medições, consulta e alteração de configuração, confirmação da configuração pelo nó e recebimento do estado operacional. A ingestão valida a credencial Bearer do nó, conteúdo JSON, tamanho do payload, esquema, referências e estados técnicos antes de iniciar a persistência transacional. As respostas distinguem armazenamento novo, reenvio já armazenado, conflito de integridade, erro de validação, falha de autenticação e indisponibilidade do servidor.

A consulta administrativa aplica filtros temporais semiabertos, ordenação determinística e paginação por cursor. A configuração aceita somente intervalos inteiros entre 10 e 300 segundos, mantém versões pendentes e aplicadas e bloqueia alterações durante uma execução experimental ativa. A API também recebe telemetria do nó para que fila, perdas, conexão e sincronização possam ser exibidas sem inferências a partir dos valores ambientais.

O acesso humano à aplicação utiliza contas individuais com perfis `VIEWER` e `ADMIN`, senhas protegidas por `scrypt` e sessões em cookie `HttpOnly`. A credencial do nó é separada das contas de usuário. A operação das sessões formais ocorreu em rede local; houve uso de HTTPS em ensaio de conectividade por túnel, mas não implantação permanente em hospedagem externa. A implementação desses controles não equivale a uma auditoria abrangente de segurança.

## 4.6 Banco de dados MySQL

O ambiente de desenvolvimento utiliza MySQL local em Docker Compose, com volume persistente e acesso publicado somente em `127.0.0.1`. O esquema é aplicado por migrações SQL versionadas, registradas com checksum, evitando alteração silenciosa de uma migração já aplicada. Um seed idempotente mantém o dispositivo e a configuração necessários aos testes locais.

O modelo separa medições canônicas, tentativas de entrega, configurações e estados operacionais. A chave primária da medição e a restrição composta por dispositivo, inicialização e sequência impedem duplicações canônicas. As tentativas de entrega ficam registradas como `STORED`, `ALREADY_STORED` ou `INTEGRITY_CONFLICT`, permitindo reconciliar reenvios sem confundir repetição de transporte com uma nova observação ambiental.

## 4.7 Aplicação web

A interface web e a API pertencem à mesma aplicação Next.js. As páginas executadas no servidor consultam o MySQL por meio de módulos de repositório, sem realizar chamadas HTTP internas à própria API. Dessa forma, a credencial de acesso ao banco não é enviada ao navegador. A interface requer login para consultas e exportação; funções de administração são restritas ao perfil `ADMIN`. Um componente de cliente solicita atualização periódica da renderização, mas não acessa diretamente a base de dados.

A aplicação apresenta estados explícitos para banco não configurado ou indisponível, ausência de dispositivo, medições vazias e ausência de telemetria operacional. Durante os testes de interface, a demonstração visual utilizou registros artificiais identificados e restritos ao ambiente local controlado, com remoção ao encerramento.

## 4.8 Dashboard e histórico

O dashboard apresenta o último valor válido de temperatura, umidade relativa e iluminância, sempre acompanhado do instante de medição. O histórico utiliza registros recentes e representa leituras inválidas como lacunas, sem interpolação. O painel operacional mostra versão do firmware, conexão declarada, sincronização temporal, ocupação da fila, advertência a partir de 80% da capacidade, perdas acumuladas e último envio confirmado.

Também são exibidos totais de entregas confirmadas ou rejeitadas e a configuração de intervalo pendente ou aplicada. O painel organiza a inspeção técnica por sala cadastrada. As ocorrências de faixas locais, quando existentes, aparecem em página própria, preservando a distinção entre histórico de medições e alertas locais.

## 4.9 Relatórios

A página de relatórios oferece filtro de datas inclusivo no fuso de São Paulo, limitado a 31 dias por consulta. Para cada variável, calcula mínimo, média e máximo somente sobre leituras válidas, além de apresentar totais de registros, leituras válidas e inválidas, sincronização temporal e sinalizações técnicas. O histórico tabular preserva identificador, instante, valores e estados de qualidade.

A rota de exportação produz CSV UTF-8 separado por ponto e vírgula, limitado a 5.000 registros e contendo os estados técnicos necessários à análise posterior. A exportação padrão usa os valores apresentados na tabela; uma opção permite obter os valores brutos para análise técnica. Na análise das execuções formalmente delimitadas, as ausências temporais são calculadas a partir da grade esperada para o intervalo configurado. O relatório reúne estatísticas descritivas e mantém os estados de qualidade disponíveis para consulta.

## 4.10 Alertas

A aplicação possui um perfil de faixas locais, inicialmente desabilitado, que registra responsável informado, justificativa, referência de origem opcional, instante de vigência e versão. A alteração é bloqueada durante execução experimental ativa. Para cada leitura persistida pela primeira vez, valores válidos e temporalmente sincronizados podem gerar um alerta local quando estiverem fora da faixa vigente. O registro preserva horário, variável, direção, valor observado, limites e versão da regra.

A página exclusiva de alertas permite consultar essas ocorrências no período selecionado. Nas páginas autenticadas, um botão apresenta novos alertas ao usuário e permite limpar sua própria lista de notificações, sem apagar o histórico. A atualização do aviso é periódica e ocorre no sistema web. As mensagens têm caráter informativo, sem classificação normativa da sala ou recomendação automática de intervenção.

## 4.11 Segurança, confiabilidade e recuperação de falhas

A confiabilidade foi incorporada desde a estrutura dos registros: identificadores únicos, confirmação idempotente, fila persistente, rastreamento de perdas, configuração versionada e telemetria operacional. A cadeia distingue falha de leitura, registro fora da faixa, perda por fila cheia, duplicata, reenvio e instante sem sincronização. Isso permite analisar falhas sem alterar a medição canônica ou esconder lacunas.

O motor de tratamento de dados opera sobre uma execução delimitada e não modifica sua entrada. Ele gera grade temporal, categorias primárias, posições `MISSING_SLOT`, reconciliação de contagens e exclusões auditáveis, sem imputação. Os ensaios com o nó físico examinaram recuperação e reenvio após interrupções, correspondência das medições no dashboard autenticado e estabilidade em três sessões prolongadas. O capítulo 5 apresenta os resultados e relaciona cada procedimento aos critérios técnicos definidos.
