# 4 Desenvolvimento e implementação

Este capítulo descreve a implementação do sistema até o estágio atual. As funcionalidades de software e a compilação do firmware foram realizadas em ambiente local; a montagem, o upload e a avaliação com os componentes físicos permanecem etapas futuras e não são apresentados como concluídos.

## 4.1 Componentes e ferramentas

O nó IoT foi projetado para utilizar uma placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31 e um módulo anunciado como VEML7700. A programação foi organizada como projeto PlatformIO com framework Arduino. O firmware utiliza ArduinoJson, bibliotecas Adafruit para SHT31 e VEML7700, Preferences, LittleFS, Wi-Fi e HTTPClient.

No servidor, a solução utiliza uma aplicação Next.js com TypeScript e App Router. As rotas HTTP são Route Handlers executados em runtime Node.js; a persistência local utiliza MySQL em Docker Compose e o acesso à base é realizado com `mysql2`. A escolha mantém interface e API no mesmo projeto, reduzindo a quantidade de serviços necessários para o protótipo.

## 4.2 Projeto e montagem do hardware

Os módulos serão conectados por I2C, com alimentação em 3,3 V e GND comum. A definição dos GPIOs de SDA e SCL foi mantida fora do código versionado porque a placa é genérica e sua serigrafia deverá ser conferida na unidade recebida. Também deverão ser confirmados o endereço do SHT31, a tensão aceita pelos módulos, a porta serial e a estabilidade do cabo USB antes da primeira energização.

Foram preparados uma checklist, um registro preenchível da primeira montagem e um script de pré-verificação. O script exige configuração local, rejeita valores de exemplo, impede o uso de `localhost` como endereço da API pelo ESP32 e confere GPIOs distintos antes de compilar ou enviar o firmware. A montagem física, as fotos, as ligações efetivas e o teste de inicialização serão registrados apenas após o recebimento dos componentes.

## 4.3 Firmware do nó IoT

O firmware foi implementado para obter temperatura, umidade relativa e iluminância, atribuir identificadores UUID de inicialização e medição, manter número de sequência persistente e registrar timestamps UTC quando houver sincronização NTP. Cada leitura contém valores e estados de qualidade; falhas de leitura e valores fora da faixa física são preservados como estados técnicos, não convertidos em valores estimados.

As medições não confirmadas são armazenadas em uma fila LittleFS persistente e ordenada, limitada a 256 registros. A fila somente remove uma medição após a API responder `STORED` ou `ALREADY_STORED`. Em indisponibilidade de Wi-Fi ou API, a aquisição continua e os registros são reenviados do mais antigo ao mais recente após a reconexão. Caso a capacidade seja atingida, os itens pendentes são preservados e novas perdas são contabilizadas explicitamente.

O nó também consulta a configuração remota do intervalo, persiste a última configuração válida e confirma sua aplicação ou rejeição. Sua telemetria informa conexão, ocupação da fila, perdas, sinal Wi-Fi, sincronização temporal e estado dos sensores. A compilação anterior para o alvo `esp32-c3-devkitm-1` confirma apenas o código e suas dependências no estágio pré-hardware. Após a substituição da placa, o projeto foi configurado e compilado com sucesso para o ambiente genérico `esp32dev`, com uso de 14,5% da RAM e 76,1% da flash disponíveis nesse perfil. Essa evidência não aprova a compatibilidade elétrica nem o funcionamento físico da placa anunciada como ESP32-WROOM-32D-38P, que permanecem pendentes de inspeção e ensaio.

## 4.4 Comunicação HTTP e formato das mensagens

A comunicação utiliza JSON em UTF-8 pela base `/api/v1`. Cada mensagem de medição contém a versão do esquema, identificador da medição, dispositivo, inicialização, sequência, execução experimental quando existente, versão da configuração, instante de leitura, tempo de atividade, sincronização temporal e as três leituras. A entrega informa se o envio é online ou reenviado, instante de envio, ocupação da fila e perdas acumuladas.

O contrato trata a medição como imutável. A API calcula um hash do conteúdo canônico; um reenvio com o mesmo identificador e conteúdo recebe confirmação idempotente, enquanto o mesmo identificador com conteúdo diferente gera conflito de integridade. Essa regra permite que o firmware repita a tentativa após uma falha de rede sem criar uma segunda medição no banco.

## 4.5 API

Foram implementadas rotas de saúde, ingestão, consulta paginada de medições, consulta e alteração de configuração, confirmação da configuração pelo nó e recebimento do estado operacional. A ingestão valida autenticação Bearer provisória, conteúdo JSON, tamanho do payload, esquema, referências e estados técnicos antes de iniciar a persistência transacional. As respostas distinguem armazenamento novo, reenvio já armazenado, conflito de integridade, erro de validação, falha de autenticação e indisponibilidade do servidor.

A consulta administrativa aplica filtros temporais semiabertos, ordenação determinística e paginação por cursor. A configuração aceita somente intervalos inteiros entre 10 e 300 segundos, mantém versões pendentes e aplicadas e bloqueia alterações durante uma execução experimental ativa. A API também recebe telemetria do nó para que fila, perdas, conexão e sincronização possam ser exibidas sem inferências a partir dos valores ambientais.

O mecanismo atual de autenticação utiliza chaves compartilhadas de desenvolvimento para nó e administração. A vinculação definitiva de credenciais, hospedagem externa, TLS e gestão de segredos permanecem pendentes; portanto, não são considerados resultados de segurança do protótipo.

## 4.6 Banco de dados MySQL

O ambiente de desenvolvimento utiliza MySQL local em Docker Compose, com volume persistente e acesso publicado somente em `127.0.0.1`. O esquema é aplicado por migrações SQL versionadas, registradas com checksum, evitando alteração silenciosa de uma migração já aplicada. Um seed idempotente mantém o dispositivo e a configuração necessários aos testes locais.

O modelo separa medições canônicas, tentativas de entrega, configurações e estados operacionais. A chave primária da medição e a restrição composta por dispositivo, inicialização e sequência impedem duplicações canônicas. As tentativas de entrega ficam registradas como `STORED`, `ALREADY_STORED` ou `INTEGRITY_CONFLICT`, permitindo reconciliar reenvios sem confundir repetição de transporte com uma nova observação ambiental.

## 4.7 Aplicação web

A interface web e a API pertencem à mesma aplicação Next.js. As páginas executadas no servidor consultam o MySQL por meio de módulos de repositório, sem realizar chamadas HTTP internas à própria API. Dessa forma, `DATABASE_URL` e a chave administrativa não são enviados ao navegador. Um componente de cliente solicita atualização periódica da renderização, mas não acessa diretamente a base de dados.

A aplicação trata explicitamente banco não configurado ou indisponível, ausência de dispositivo, medições vazias e ausência de telemetria operacional. Esses estados não são preenchidos com dados simulados e não constituem evidência experimental. A demonstração visual existente utiliza registros artificiais somente em ambiente local controlado e os remove após o encerramento.

## 4.8 Dashboard e histórico

O dashboard apresenta o último valor válido de temperatura, umidade relativa e iluminância, sempre acompanhado do instante de medição. O histórico utiliza registros recentes e representa leituras inválidas ou ausentes como lacunas, sem interpolação. O painel operacional mostra versão do firmware, conexão declarada, sincronização temporal, ocupação da fila, advertência a partir de 80% da capacidade, perdas acumuladas e último envio confirmado.

Também são exibidos totais de entregas confirmadas ou rejeitadas e a configuração de intervalo pendente ou aplicada. O painel organiza as informações para inspeção técnica e futura investigação, mas não classifica a sala como adequada ou inadequada. Alertas locais, quando houver, são apresentados em página própria como registros de faixa local e não como alertas normativos.

## 4.9 Relatórios

A página de relatórios oferece filtro de datas inclusivo no fuso de São Paulo, limitado a 31 dias por consulta. Para cada variável, calcula mínimo, média e máximo somente sobre leituras válidas, além de apresentar totais de registros, leituras válidas e inválidas, sincronização temporal e sinalizações técnicas. O histórico tabular preserva identificador, instante, valores e estados de qualidade.

A rota de exportação produz CSV UTF-8 separado por ponto e vírgula, limitado a 5.000 registros e contendo os estados técnicos necessários à análise posterior. Ausências temporais somente serão calculadas em execuções formalmente delimitadas, nas quais exista uma grade esperada a partir do intervalo configurado. O relatório permanece descritivo e não aplica critérios ambientais normativos.

## 4.10 Alertas

Não foram implementados alertas ambientais normativos. Em seu lugar, a aplicação possui um perfil de faixas locais, inicialmente desabilitado, que registra responsável informado, justificativa, referência de origem opcional, instante de vigência e versão. A alteração é bloqueada durante execução experimental ativa. Para cada leitura persistida pela primeira vez, somente valores válidos e temporalmente sincronizados podem gerar um alerta local; o registro preserva horário, variável, direção, valor observado, limites e versão da faixa vigente. A página exclusiva de alertas permite consultar esses registros no período selecionado com destaque avermelhado suave. Esse recurso não emite notificação externa, não recomenda intervenção e não classifica a sala quanto a conforto ou conformidade.

## 4.11 Segurança, confiabilidade e recuperação de falhas

A confiabilidade foi incorporada desde a estrutura dos registros: identificadores únicos, confirmação idempotente, fila persistente, rastreamento de perdas, configuração versionada e telemetria operacional. A cadeia distingue falha de leitura, registro fora da faixa, perda por fila cheia, duplicata, reenvio e instante sem sincronização. Isso permite analisar falhas sem alterar a medição canônica ou esconder lacunas.

O motor de tratamento de dados opera sobre uma execução delimitada e não modifica sua entrada. Ele gera grade temporal, categorias primárias, posições `MISSING_SLOT`, reconciliação de contagens e exclusões auditáveis, sem imputação. Os testes locais da API, banco, dashboard e tratamento de dados produzem evidências da implementação de software. A verificação completa de recuperação após interrupções, latência ponta a ponta e disponibilidade dependerá da execução do firmware na montagem física e na rede do ambiente de estudo.
