# Contexto mestre do TCC

## Ensaio inicial do tunel HTTPS com o no fisico - 2026-09-21

O `cloudflared` foi instalado no PC domestico e um Quick Tunnel temporario HTTPS foi criado para a aplicacao local, mantida em `127.0.0.1:3100`; MySQL permaneceu acessivel somente localmente. A rota publica de saude respondeu com banco alcancavel. O firmware do ESP32 foi adaptado para validar o certificado TLS apresentado pelo `trycloudflare.com`, sem usar modo inseguro, e para substituir o DNS defeituoso entregue pelo hotspot do Windows por resolvedores publicos apos obter o endereco IP por DHCP.

No ESP32-D0WD-V3 em `COM3`, com SHT31 e VEML7700 inicializados, a primeira gravacao HTTPS falhou somente na resolucao DNS pelo hotspot. Apos a correcao e nova gravacao, o no recebeu `192.168.137.232`, configurou DNS publico, sincronizou o relogio pela resposta da API e confirmou multiplas medicoes enviadas pela URL HTTPS publica. Essa evidencia confirma o percurso funcional do no ate a API pelo tunel no ambiente de teste. Ela nao conclui a noite-piloto, T004, T007, disponibilidade, latencia, nem a validacao usando o hotspot do celular na faculdade. A URL de Quick Tunnel muda se o processo for interrompido, portanto devera ser regravada ou substituida antes de nova sessao.

## Operação remota da coleta pelo PC doméstico — 2026-09-18

Os autores decidiram não contratar hospedagem em nuvem para os testes e a próxima coleta. A API Next.js e o MySQL permanecerão no PC doméstico, que deverá ficar ligado, conectado à internet e sem suspensão. O nó será levado à faculdade e se conectará ao hotspot do celular; a API será publicada por túnel HTTPS seguro (`DEC-036`). A configuração local atual do firmware usa HTTP e IP privado, portanto a conexão HTTPS pública ainda precisa ser adaptada e validada em uma noite-piloto antes de qualquer coleta válida. O nó mantém fila persistente de até 256 registros caso a conectividade falhe.

## Atalhos contextuais ao monitoramento por sala — 2026-09-18

O Caderno de observação e a Central de alertas passaram a oferecer no cabeçalho um atalho para o Monitoramento em tempo real (`DEC-035`). No Caderno, o atalho preserva a sala consultada; na Central, preserva a sala somente quando há exatamente uma selecionada e, em consultas multissala, abre o monitoramento para uma nova escolha de sala.

## Notificações persistentes de alertas locais — 2026-09-18

O sistema passou a disponibilizar, ao lado do menu global e em todas as telas autenticadas, um botão de notificações de alertas locais (`DEC-034`). A bolha fica vermelha e mostra a quantidade quando há ocorrências ainda não limpas pelo usuário; aberta, identifica sala, variável e direção em relação à faixa local. A leitura é atualizada por consulta periódica e a ação de limpar é individual por usuário, sem apagar ou modificar o histórico técnico da Central de alertas.

## Precisão consistente e opcional no CSV do Caderno — 2026-09-18

O CSV do Caderno de observação passou a exportar, por padrão, os mesmos arredondamentos apresentados na tabela: uma casa decimal para temperatura e umidade relativa e nenhuma para iluminância (`DEC-033`). O filtro também permite escolher explicitamente os valores brutos recebidos do sensor quando essa precisão for necessária. A escolha integra o endereço de exportação, sem alterar os registros armazenados ou os cálculos do relatório.

## Filtro de integridade temporal no Caderno — 2026-09-18

O Caderno de observação e a exportação CSV passaram a oferecer o seletor “Horário da leitura” (`DEC-032`): somente registros com data e hora (padrão), somente registros sem data e hora ou todas as leituras. Para registros não sincronizados, o período escolhido é aplicado ao instante de chegada ao servidor, sem apresentá-lo como instante de medição. O mesmo recorte controla totais, estatísticas, tabela e CSV.

## Sincronização temporal do nó físico recuperada — 2026-09-18

O nó físico foi atualizado em `COM3` para repetir a solicitação NTP enquanto não houver horário válido e, como alternativa na rede local, sincronizar o relógio UTC pelo cabeçalho `Date` retornado pela API (`DEC-031`). A primeira leitura pós-reinicialização pode permanecer sem horário, mas a leitura recebida às 21:05:17 já foi persistida com `measured_at` `2026-09-18 21:05:16` e `SYNCED`. Assim, as próximas leituras associadas à sala entram no Caderno de observação no período correto. O Caderno também passou a avisar separadamente quantas leituras chegaram ao servidor sem horário confiável, sem incluí-las em estatísticas, histórico ou CSV.

## Monitoramento em tempo real unificado por sala — 2026-09-18

A página inicial foi unificada como “Monitoramento em tempo real” (`DEC-030`). Ela permite escolher uma sala, preserva essa escolha em `?room={codigo}` e apresenta exclusivamente as medições e a telemetria do nó associado à sala. A antiga rota `/monitoring` permanece como redirecionamento de compatibilidade. Com isso, o sistema não mais escolhe e exibe implicitamente um nó ativo sem sala associada; esse nó precisa ser vinculado administrativamente antes de seus dados aparecerem no monitoramento de uma sala.

## Seletor visual de nó no cadastro e na edição de salas — 2026-09-18

As telas administrativas de cadastro e edição de salas passaram a oferecer um seletor visual para o nó IoT, em substituição à digitação manual do identificador. Ao abrir a caixa, os nós ativos livres aparecem em verde suave; nós associados a outra sala aparecem em vermelho suave, identificando a sala atual e deixando explícito que a escolha transfere o vínculo ao salvar. Nós inativos permanecem visíveis, porém indisponíveis para seleção. A opção de manter a sala sem nó continua disponível.

A alteração reutiliza a regra de associação histórica já existente: uma transferência encerra o vínculo ativo anterior e as leituras e alertas já recebidos não são reclassificados. Ela foi compilada com sucesso, aprovada por ESLint e pelos 60 testes unitários; o ensaio integrado de salas não pôde autenticar com as credenciais administrativas locais vigentes (HTTP 401), sem alteração de dados pelo teste.

## Integração inicial do nó físico à API local — 2026-09-17

O firmware completo do nó `classroom-node-physical-01` foi compilado para o ESP32-D0WD-V3 e gravado em `COM3`; o binário teve SHA-256 `99618531487C1DC72C4A480E81DF01D3BA91664D22894F68C1F6DD882C551B1B`. No hotspot local do Windows, o nó obteve o endereço `192.168.137.57`. A API local, disponível no gateway `192.168.137.1:3100`, recebeu e confirmou uma medição pelo monitor serial (`Medição confirmada: efafb21a-f21b-4816-9747-d92246bebc60`).

Durante a preparação, foram corrigidos o filtro de compilação que incluía o diagnóstico I²C junto ao firmware, o uso excessivo da pilha no envio da fila e a recomposição do caminho de arquivos no LittleFS. A fila local continha somente registros diagnósticos com identificador anterior e foi apagada com autorização dos autores antes da confirmação. A evidência demonstra uma entrega ponta a ponta inicial; não constitui T004 completo, validação de exatidão, ensaio de estabilidade ou coleta experimental.

## Preparação da integração do nó físico com a API local — 2026-09-17

O MySQL local foi iniciado, as migrações e a carga de desenvolvimento foram conferidas, e a API respondeu com banco alcançável. Para não misturar o hardware com o nó e a sala artificiais `DEV-01`, foi cadastrado o nó ativo `classroom-node-physical-01`, com nome visível “Nó físico 01” e sem sala associada. Esse mesmo identificador foi preparado em `FirmwareConfig.local.h`.

A aplicação de desenvolvimento passou a escutar na rede local em `0.0.0.0:3100`; no momento da preparação, o endereço LAN do computador era `192.168.0.66`, portanto a URL configurada sem segredo é `http://192.168.0.66:3100/api/v1`. SSID, senha Wi-Fi e `NODE_API_KEY` ainda precisam ser preenchidos somente no arquivo local antes da gravação. Não houve envio do ESP32 à API, medição persistida nem início de coleta experimental nesta etapa.

## Resposta qualitativa dos sensores — 2026-09-17

No monitor serial local, os autores cobriram e descobriram o VEML7700, abafaram e sopraram o SHT3X e relataram resposta coerente das leituras de iluminância, temperatura e umidade relativa. Não foram preservados valores nem séries desse ensaio exploratório. Portanto, ele confirma a resposta qualitativa observada dos módulos, mas não constitui T001, T002 ou T003 e não permite afirmar exatidão, taxa de leituras válidas ou estabilidade.

## Primeiras leituras numéricas do diagnóstico — 2026-09-17

Foi executado o ambiente local `diagnostic-i2c`, separado do firmware de coleta, sem Wi-Fi ou API. Em GPIO 32/33 e endereço SHT3X `0x44`, foram observadas três leituras em intervalos de 10 segundos: temperatura entre 24,54 e 24,55 °C, umidade relativa entre 42,76 e 42,81% e iluminância entre 150,22 e 150,68 lx. Os valores são evidência de aquisição básica e ainda não de exatidão, estabilidade, calibração ou resultado ambiental.

O próximo diagnóstico previsto é provocar variações controladas e qualitativas — obstruir e iluminar o VEML7700, e aproximar a mão do SHT3X sem contato — antes do ensaio formal T001–T003 de uma hora.

## Primeiro boot físico e detecção I2C — 2026-09-17

O ESP32 foi reconhecido pelo Windows em `COM3` por uma ponte USB–serial Silicon Labs CP210x. A gravação do firmware `0.1.0` pelo PlatformIO identificou o chip como ESP32-D0WD-V3, com Wi-Fi, Bluetooth, dois núcleos e 4 MB de flash. No boot, com GPIO 32 como SDA e GPIO 33 como SCL, o monitor serial registrou `SHT31=pronto; VEML7700=pronto`; assim, os dois módulos responderam à inicialização I2C.

O binário enviado teve SHA-256 `FC82AD61FDEFB741E9F0D3191E75C185691A0B4FAA6588A0D452EB6C0B397BB1`. A configuração usada foi provisória, sem credenciais reais e sem transmissão à API; as mensagens de Wi-Fi sem rede encontrada são esperadas nesse diagnóstico. A evidência é detalhada em `experimento/firmware/teste-inicial-i2c-2026-09-17.md`. Ela não valida ainda valores ambientais, estabilidade de uma hora, comparação com referência, API, fila offline ou coleta experimental.

## Componentes recebidos e inspeção visual inicial — 2026-09-17

Os autores confirmaram o recebimento do conjunto físico inicial e preservaram fotos em `experimento/fotos/`. A inspeção visual identificou uma placa de desenvolvimento ESP32 de 38 pinos com módulo marcado `ESP-32D`, um breakout marcado `SHT3X` e um breakout marcado `VEML 7700`. A placa, a protoboard, o cabo USB de dados e os jumpers macho-macho estão disponíveis para a primeira montagem no Windows.

Essa evidência confirma somente a disponibilidade e as marcações externas observáveis. A porta serial, o chip USB–serial, a saída de 3,3 V, os endereços I2C, as leituras dos sensores, a gravação do firmware e a comunicação com a API permanecem pendentes de teste. Nenhuma medição experimental foi iniciada.

Para a primeira montagem, os autores escolheram GPIO 32 como SDA e GPIO 33 como SCL (`DEC-029`). A escolha usa dois GPIOs expostos, evita pinos de inicialização e será aplicada ao arquivo local do firmware apenas depois de a ligação física ser conferida. Os dois sensores permanecem no mesmo barramento I²C; a mudança não elimina o compartilhamento de SDA e SCL.

## Monitoramento em tempo real por sala — 2026-09-11

Foi disponibilizada a rota `/monitoring` como acesso direto, pelo menu global, ao monitoramento em tempo real. A tela reutiliza o dashboard dinâmico já validado, mantém a atualização periódica e permite selecionar uma sala cadastrada por vez. A escolha fica representada no endereço como `?room={codigo}`, de modo que o acesso pode ser retomado ou compartilhado sem perder o recorte. Salas sem nó associado continuam visíveis no seletor como preparação administrativa, mas o dashboard informa a indisponibilidade de dados até que exista um nó ativo.

O monitoramento em tempo real não substitui o Caderno de observação: este preserva o filtro temporal e a exportação CSV de uma sala, enquanto a Central de alertas continua sendo a única consulta multissala. A implementação foi aprovada com 60 testes unitários, ESLint, build de produção e ensaio integrado contra MySQL em 11/09/2026. O ensaio criou e removeu um nó e duas salas temporárias, confirmando autenticação, listagem das salas e preservação da seleção; não foram criados resultados experimentais.

## Seletor de sala no Caderno de observação — 2026-09-10

A página `/reports` passou a mostrar, no próprio filtro, um seletor explícito de uma única sala cadastrada. Ao abrir o Caderno pelo menu, a sala associada ao nó ativo com atividade mais recente continua sendo apresentada como seleção inicial, mas o usuário pode trocá-la antes de consultar o período. A escolha é preservada ao alterar as datas; totais, estatísticas, histórico e CSV continuam restritos à sala selecionada. A página não oferece consulta multissala, pois seus agregados e sua exportação representam uma única origem por vez (`DEC-027`).

Os 60 testes unitários, ESLint, o build de produção e o ensaio integrado com MySQL foram aprovados em 10/09/2026. O ensaio criou duas salas e um nó temporários, confirmou o isolamento histórico e que o seletor lista e preserva a sala consultada, e removeu todos os dados temporários ao final; não foram criados resultados experimentais.

## Ajuste planejado no Caderno de observação — 2026-09-09

A página /reports é o relatório descritivo por período: apresenta totais, estatísticas das três variáveis, histórico e exportação CSV de uma sala. Quando aberta diretamente pelo menu sem o parâmetro room, ela escolhe implicitamente a sala ligada ao nó ativo com atividade mais recente; ao ser acessada a partir do painel de uma sala, o parâmetro já é preservado. Foi identificada a necessidade de um seletor explícito de uma sala no filtro da própria página. A próxima implementação deve manter o recorte unitário, pois os agregados e o CSV atuais representam somente uma sala; uma consulta multissala exigiria redesenho e identificação da origem de cada registro. Nenhuma alteração de código foi feita nesta análise.

## Autenticacao de usuarios e controle de acesso — 2026-09-09

Foi implementado o controle inicial de acesso para usuarios humanos (`DEC-026`). O sistema passa a exigir login para dashboard, salas, nos, relatorios, alertas e exportacao CSV. O perfil `VIEWER` somente consulta; o perfil `ADMIN` tambem administra salas, nos, faixas locais e usuarios. A nova consulta de usuarios, com atalho para cadastro no mesmo fluxo das consultas existentes, e visivel apenas aos administradores. Essa consulta permite editar nome, perfil, senha opcional e status ativo/inativo; o sistema preserva ao menos um administrador ativo. Os atalhos administrativos ficam ocultos para `VIEWER`, e o menu global nao e renderizado na tela de login.

As senhas sao derivadas com `scrypt` e as sessoes sao mantidas por cookie `HttpOnly`; nao ha senha ou usuario real versionado. O primeiro administrador e criado por variaveis locais e `npm run users:bootstrap-admin`. A comunicacao dos ESP32 permanece separada por `NODE_API_KEY`. Em 09/09/2026, os formularios e a documentacao operacional deixaram de solicitar ou enviar a antiga chave administrativa compartilhada: cadastro, edicao, consulta administrativa de nos e configuracao de faixas usam somente a sessao autenticada. A migracao `004_add_application_users.sql` foi aplicada no MySQL local; ESLint, 60 testes unitarios e build foram aprovados. O ensaio ponta a ponta confirmou login administrativo e de consulta, cadastro, edicao, inativacao, bloqueio de login inativo, reativacao e bloqueio de consulta de usuarios para `VIEWER`; as contas e sessoes temporarias foram removidas no fim.

## Edicao administrativa de salas e nos — 2026-09-08

As consultas de salas e de nos passaram a oferecer uma acao de edicao para cada cadastro. A edicao de sala atualiza nome, bloco, piso e associacao/dados de instalacao do no; uma troca ou remocao de associacao preserva o recorte historico ja atribuido a medicoes e alertas. A edicao de no atualiza nome visivel e disponibilidade. O codigo da sala e o identificador publico do no permanecem imutaveis, pois identificam registros historicos e, no caso do no, correspondem a `TCC_DEVICE_ID` gravado no firmware. As telas de cadastro e de edicao incluem `Retornar a consulta` no canto superior direito (`DEC-025`).

## Filtro multissala na Central de alertas — 2026-09-08

A Central de alertas permite consultar uma ou mais salas cadastradas por um seletor compacto. O botao mostra o resumo da selecao; ao abri-lo, apresenta busca por codigo ou nome, checkboxes, acoes de selecionar todas ou limpar e uma lista rolavel, evitando poluicao quando houver muitas salas. A tela identifica todas as salas efetivamente consideradas e cada alerta mostra sua sala de origem. Sem marcacao, a tela declara explicitamente que consulta todas as salas cadastradas. O filtro preserva o periodo informado e nao altera dados, regras ou alertas historicos (`DEC-024`).

## Consultas como entrada para cadastros — 2026-09-08

O menu global passou a expor `Consulta de salas` e `Consulta de nos`, removendo os atalhos diretos de cadastro. Cada consulta apresenta seu respectivo botao contextual de cadastro no cabecalho: `Cadastrar sala` e `Cadastrar no`. A consulta de nos mostra os identificadores reconhecidos, seus nomes, status e a sala atualmente associada. As rotas administrativas continuam protegidas e sao acessadas somente por esses botoes.

## Cadastro administrativo de nos IoT — 2026-09-08

Foi implementado o cadastro administrativo protegido de nos IoT na rota `/admin/devices` e na API `GET`/`POST /api/v1/devices` (`DEC-023`). Antes de gravar um ESP32, o responsavel registra o identificador publico unico e o nome visivel do no. Esse mesmo identificador deve ser definido em `TCC_DEVICE_ID` na configuracao local do firmware. A tela tambem lista os nos cadastrados e informa a sala atualmente associada, quando houver.

A sala nao e gravada no firmware: apos o cadastro e a programacao, a associacao e feita na tela de salas. Assim, transferir um no entre salas nao exige nova gravacao, e o vinculo historico ja existente continua preservando a sala de cada medicao e alerta. O cadastro, por si so, nao cria medicoes, coleta ou resultado experimental. O ensaio integrado cria e remove um no temporario, verificando credencial administrativa, cadastro, conflito de identificador e listagem.

## Salas, nós e recorte histórico da interface — 2026-09-01

Foi implementada a estrutura de software para cadastrar salas, associar um nó ativo a uma sala e preservar a sala atribuída a cada medição e alerta no momento do recebimento (`DEC-022`). A associação registra início, encerramento, posição, altura, responsável e observações; quando um nó for associado a uma nova sala, a associação anterior será encerrada, sem reclassificar o histórico. A interface passou a oferecer lista de salas, painel por sala e caminhos de relatório, CSV e alertas com filtro pela sala selecionada. O cadastro administrativo permite criar uma sala sem nó, exclusivamente como preparação, ou vinculá-la a um nó ativo.

A migração `003_add_classrooms.sql` foi aplicada ao MySQL local em 01/09/2026 e o seed criou a sala de desenvolvimento `DEV-01`, sem significado experimental. ESLint, TypeScript sem emissão, 56 testes unitários, build de produção e o ensaio integrado `npm run test:classrooms` foram aprovados. O ensaio cria e remove um nó e salas temporários, comprovando cadastro protegido, transferência, preservação da sala em medições e alertas e isolamento entre relatórios, CSV e alertas. Nenhuma sala física adicional, medição artificial persistente ou resultado experimental foi criado; a avaliação metodológica permanece em uma sala de aula como estudo de caso.

## Navegação global da aplicação web — 2026-09-01

A aplicação Next.js passou a concentrar a navegação entre estação, relatórios, alertas locais e configuração de faixas em um menu global. O acionador fixo no canto superior direito abre um painel lateral da direita para a esquerda, identifica a página corrente e substitui os atalhos duplicados que existiam nos cabeçalhos. O componente está no layout raiz, portanto permanece disponível em todas as páginas da interface, e inclui fechamento por botão, máscara, tecla Escape, foco visível, bloqueio de rolagem e respeito à preferência de redução de movimento.

ESLint, testes unitários (53 testes) e build de produção foram executados após a alteração; as quatro rotas de interface responderam com sucesso na verificação local.

## Faixas locais e histórico de ocorrências — 2026-08-31

Os autores aprovaram a implementação de faixas locais de acompanhamento e o histórico diário de alertas locais (`DEC-019`, atualizado na apresentação pela `DEC-020`). Não há valores padrão e o perfil inicia desabilitado. A administração registra responsável informado, justificativa, referência de origem opcional, limites e versão; o sistema bloqueia mudanças durante execução experimental ativa. Apenas leitura válida, temporalmente sincronizada e fora da faixa vigente no instante da medição gera um alerta local, que preserva horário, variável, direção, valor, limites, identificação da leitura e versão da regra.

Os alertas locais são exibidos separadamente em `/alerts`, com linhas em tonalidade vermelha suave, como informação rastreável para investigação, sem declarar conforto, adequação ou conformidade com a NBR. A validação unitária local aprovou 53 testes, ESLint e build de produção. Com o Docker Desktop ativo, a migração `002_add_local_monitoring_history.sql` foi aplicada e o ensaio integrado T008 foi aprovado: verificou dois alertas simulados fora da faixa, nenhum no limite ou com perfil desabilitado, renderização do histórico separado e bloqueio de alteração durante execução ativa. Os dados artificiais foram removidos ao final; o registro está em `software/web/test-local-monitoring-2026-08-31.md`.

Também foi disponibilizada a demonstração manual `npm run demo:local-monitoring` em `software/web/`. Ela publica continuamente dados artificiais variados para inspeção ao vivo no dashboard e em `/alerts`. Quando há faixa administrativa configurada, usa exatamente essa versão sem alterá-la; sem faixa existente, cria uma faixa temporária. A tecla `M` encerra a execução e remove somente os dados artificiais e, se for o caso, o perfil temporário. Em 31/08/2026, o roteiro percorreu todos os cenários previstos e a limpeza foi confirmada no MySQL; não constitui evidência experimental ou parâmetro normativo.

A administração local também pode configurar as faixas efetivas em `/admin/local-monitoring`, acessível pelo botão “Configurar faixas” no dashboard e no relatório. A tela solicita a credencial administrativa provisória apenas na requisição, sem gravá-la no navegador, e permite ativar ou desativar o acompanhamento, selecionar variáveis, definir mínimo e máximo, registrar responsável, justificativa e referência opcional. A gravação cria a versão que será aplicada às próximas leituras válidas e sincronizadas; os alertas históricos permanecem inalterados. A página, a ausência de token no HTML, ESLint, build e o ensaio integrado de faixas foram validados em 31/08/2026.

## Autorização de coleta e referência térmica institucional — 2026-08-31

Os autores confirmaram que já possuem autorização para a coleta na sala da UNIP. A identificação, a data e o documento comprobatório deverão ser preservados no registro da coleta, sem expor dados pessoais desnecessários.

A ABNT NBR 16401-2:2008, fornecida pela UNIP e preservada em `NBR/`, foi conferida como a referência institucional informada para as salas. Ela trata de conforto térmico em recintos providos de ar-condicionado e considera temperatura operativa, velocidade do ar, umidade relativa, vestimenta e atividade. O sistema deste TCC mede apenas temperatura do ar, umidade relativa e iluminância; portanto, seus dados não comprovam conformidade com a norma e não devem acionar alertas de conformidade. A norma não define parâmetros de iluminância.

## Compra de componentes e atualização da placa — 2026-08-31

Os autores confirmaram a compra inicial de duas placas de desenvolvimento anunciadas como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31, um módulo anunciado como VEML7700, uma protoboard, um cabo USB de dados e um kit de jumpers. As capturas em `modules/` registram pagamento em 28 de agosto de 2026 e total de R$ 125,98; em 31 de agosto, os pedidos ainda estavam aguardando entrega.

Por confirmação explícita dos autores, a placa ESP32-WROOM-32D-38P substitui a ESP32-C3 anteriormente prevista, devido ao menor custo (`DEC-018`). A identificação da placa, seu chip USB–serial, capacidade de flash, tensão de 3,3 V, GPIOs e compatibilidade física continuam pendentes do recebimento e da inspeção. A compilação anterior para ESP32-C3 foi preservada como evidência histórica e não é atribuída à nova placa. A configuração atual compilou com sucesso para o ambiente genérico `esp32dev`; o registro está em `experimento/firmware/compilacao-2026-08-31.md`.

## Revisão acadêmica e ABNT da redação — 2026-08-26

Os capítulos ativos em `texto/` foram auditados com base no escopo aprovado, na rastreabilidade das evidências e nas referências vigentes da skill `tcc-abnt-excelencia`. A redação mantém alinhados título, pergunta, objetivos, método, desenvolvimento e resultados disponíveis, sem antecipar validação física, coleta ambiental ou conclusão.

Foram ampliados os trabalhos relacionados com três fontes primárias conferidas, normalizadas as chamadas autor-data conforme a ABNT NBR 10520:2023, criada a lista ativa `texto/07-referencias.md` e atualizada a matriz de evidências. A unidade das diferenças de umidade relativa foi esclarecida como ponto percentual de UR. Também foi corrigida a contagem da grade temporal: como a janela semiaberta inclui a posição inicial, a quantidade esperada utiliza teto, e não piso, quando a duração não é múltipla exata do intervalo. O script e seu teste foram atualizados com a mesma regra.

O parecer completo está em `texto/auditoria-tcc-abnt-2026-08-26.md`. A redação está adequada como versão em desenvolvimento, mas ainda não é uma versão final submetível: resumo, abstract, resultados físicos, resposta final à pergunta, conclusão, ilustrações definitivas e inspeção do DOCX dependem das etapas pendentes e do manual ou template formal da UNIP.

## Automação de escrita acadêmica — 2026-08-26

A skill local `software/skilltcc/` foi validada e instalada globalmente no Codex como `tcc-abnt-excelencia`, em `C:\Users\leonardor\.codex\skills\tcc-abnt-excelencia`. Ela orienta planejamento, pesquisa, redação, revisão e controle de conformidade ABNT sem inventar dados ou fontes; seus materiais de referência abrangem regras ABNT/institucionais, metodologia, pesquisa de fontes e auditoria de qualidade.

## Atualização de interface — 2026-08-26

A página `/reports` em `software/web/` foi redesenhada para compartilhar a linguagem visual da central de instrumentação do dashboard. A consulta de período passou a ser apresentada como faixa temporal funcional; os totais, as três variáveis e o histórico mantêm a separação entre estatística descritiva, estados técnicos e classificação ambiental, que continua ausente. Filtros, exportação CSV, paginação de dados, estados seguros e as restrições do período foram preservados.

ESLint e build de produção foram aprovados. A renderização local do relatório sem medições foi inspecionada com sucesso; a inspeção da tabela com dados reais depende de existirem medições no período consultado.

## Atualização de documentação — 2026-08-26

Foi criado `software/COMO_SUBIR_APLICACAO.md`, um roteiro operacional para iniciar localmente o MySQL em Docker e a única aplicação Next.js que reúne dashboard, relatórios e API. O guia documenta configuração segura dos três arquivos locais de ambiente, migrações, seed, execução de desenvolvimento ou produção local, health check, testes, demonstração controlada, parada sem remoção do volume e diagnóstico básico. Ele não contém credenciais reais e não substitui a configuração do firmware quando o hardware chegar.

## Atualização de implementação — 2026-08-26

O dashboard principal em `software/web/` foi redesenhado como uma central de instrumentação: as três medições aparecem em faixas com identidade visual própria e a telemetria operacional permanece separada da observação ambiental. A implementação preserva consulta no servidor, atualização periódica, estados seguros, acessibilidade de foco e a regra de não classificar a sala enquanto os alertas aguardam fontes técnicas originais.

Foram aprovados ESLint e build de produção. A renderização do estado seguro sem banco foi inspecionada localmente em 1440 px. O teste integrado `npm run test:dashboard` não pôde ser repetido porque o Docker/MySQL local estava desligado (`ECONNREFUSED 127.0.0.1:3306`); isso não altera a evidência integrada já registrada, mas a verificação visual do estado com dados reais deve ser repetida quando o MySQL estiver ativo.

## Identificação

- Instituição: Universidade Paulista — UNIP
- Campus: Araçatuba — SP
- Curso: Bacharelado em Ciência da Computação
- Ano: 2026
- Prazo final para envio: 30 de novembro de 2026
- Orientador oficial: Prof. Me. Aldriano José da Silva
- Autores: Enrico Garcia Silva Costa (RA N295694) e Leonardo Pedrozo Elias Rodrigues (RA G78GGE-0)
- Modalidade: TCC aplicado com pesquisa, desenvolvimento de software e protótipo físico

## Título aprovado

**Desenvolvimento e avaliação técnica de um sistema IoT de baixo custo para monitoramento ambiental em salas de aula**

Título aprovado pelos autores em `DEC-008`. O termo “inteligente” foi removido por não corresponder a uma capacidade demonstrada no escopo.

## Problema preliminar

Salas de aula podem apresentar condições inadequadas de temperatura, umidade e iluminação, mas seu acompanhamento costuma depender de percepções pontuais. Sem coleta contínua e histórico organizado, torna-se difícil observar padrões e identificar condições que merecem atenção.

## Pergunta de pesquisa aprovada

Em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?

## Objetivo geral aprovado

Desenvolver e avaliar tecnicamente um sistema IoT de baixo custo para monitoramento ambiental em uma sala de aula, por meio da avaliação parcial dos sensores e de testes ponta a ponta da aquisição, transmissão, armazenamento e visualização dos dados.

## Objetivos específicos aprovados

1. Revisar a literatura e as referências técnicas relacionadas ao monitoramento ambiental, à Internet das Coisas e ao uso de sensores de baixo custo em salas de aula.
2. Definir os requisitos funcionais e técnicos do sistema, incluindo as métricas e os critérios de aceitação para sua avaliação.
3. Projetar e montar um nó IoT de baixo custo com os sensores ambientais selecionados e conectividade Wi-Fi.
4. Desenvolver o firmware responsável pela aquisição, identificação temporal e transmissão periódica das medições, incluindo o tratamento de falhas de leitura e comunicação.
5. Implementar uma API e um banco de dados MySQL para validar, receber, armazenar e consultar os dados ambientais.
6. Desenvolver uma aplicação web com visualização, histórico, indicadores, relatórios e alertas tecnicamente fundamentados, organizando os dados para subsidiar a identificação de condições que possam demandar investigação pela gestão escolar.
7. Avaliar parcialmente o comportamento dos sensores por comparação com os instrumentos de referência disponíveis, registrando os procedimentos, as métricas e as limitações da avaliação.
8. Avaliar o funcionamento ponta a ponta do sistema por meio de métricas de completude ou perda de dados, latência, disponibilidade e consistência entre as medições, a API, o banco de dados e a aplicação web.
9. Analisar o custo, as limitações técnicas, a reprodutibilidade e as possibilidades de expansão da solução.

## Contribuição delimitada

A contribuição demonstrada será o desenvolvimento e a validação funcional e técnica do sistema, incluindo sua capacidade de organizar medições em visualizações, históricos, indicadores, relatórios e alertas. Esses recursos terão como finalidade projetada subsidiar a identificação de condições que possam demandar investigação pela gestão escolar.

A utilidade efetiva dessas informações, seu uso por gestores, a qualidade das decisões administrativas e os efeitos de eventuais intervenções permanecerão como aplicações potenciais, pois não haverá avaliação direta com gestores, professores ou alunos.

O trabalho não deverá afirmar que comprovou melhora da aprendizagem, do conforto percebido ou da qualidade do ambiente. Essas conclusões exigiriam outros desenhos experimentais.

## Variáveis do núcleo

- Temperatura do ar
- Umidade relativa do ar
- Iluminância

## Fora do escopo avaliado

- Som, ruído e conformidade acústica
- CO2 e qualidade química do ar
- Material particulado
- Contagem ou identificação de ocupantes
- Gravação de áudio ou imagem
- Avaliação de aprendizagem ou desempenho acadêmico
- Comprovação da utilidade com usuários da gestão
- Diagnóstico das causas de condições ambientais ou prescrição de intervenções na infraestrutura
- Controle automático de climatização ou iluminação, salvo futura redefinição formal

## Arquitetura preliminar

Sensores → microcontrolador com Wi-Fi → HTTP/JSON → rotas de API da aplicação Next.js → MySQL → interface Next.js → dashboard, relatórios e alertas (`DEC-016`).

O intervalo único de leitura e transmissão será configurável pelo software entre 10 e 300 segundos, com valor padrão inicial de 60 segundos. A configuração poderá ser alterada durante desenvolvimento e testes, mas permanecerá fixa durante cada execução experimental válida e durante toda a coleta principal (`DEC-012`).

Na indisponibilidade de comunicação, o nó continuará adquirindo dados e utilizará uma fila local persistente limitada a 256 registros. Os registros serão removidos somente após confirmação da API e reenviados em ordem após a reconexão, com deduplicação e contabilização explícita de perdas (`DEC-013`).

Os critérios técnicos aprovados incluem pelo menos 99% de leituras válidas nos testes funcionais dos sensores, completude mínima de 99% em teste controlado e 95% em cada noite válida, latência online P95 de até 5 segundos até a API e 10 segundos até o dashboard, disponibilidade mínima de 95%, consistência integral dos registros auditados, ausência de duplicatas e sincronização temporal com erro de até 2 segundos quando marcada como válida. A comparação dos sensores utilizará viés, MAE, RMSE, erro absoluto P95 e, quando aplicável, MAPE, mas sua classificação dependerá da qualidade dos instrumentos de referência (`DEC-014`).

Os dados brutos serão imutáveis. O tratamento produzirá separadamente um subconjunto operacional, destinado à avaliação de falhas e do desempenho técnico, e um subconjunto ambiental principal, formado apenas por medições válidas, únicas, sincronizadas e pertencentes a noites válidas. Ausências não serão preenchidas artificialmente, reenvios offline continuarão elegíveis quando a leitura for válida e valores incomuns não serão removidos sem evidência de falha técnica (`DEC-015`).

O nó utilizará uma placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31 para temperatura e umidade relativa e um módulo anunciado como VEML7700 para iluminância. A placa ESP32-C3 prevista anteriormente foi substituída pela placa efetivamente adquirida, de menor custo, conforme `DEC-018`. Foram adquiridas duas placas ESP32, uma unidade de cada sensor, uma protoboard, um cabo USB de dados e um kit de jumpers; os pedidos ainda aguardavam entrega em 31 de agosto de 2026 e nenhum componente foi validado no protótipo.

## Ambiente de avaliação

- Abrangência: uma sala de aula, tratada como estudo de caso, sem generalização automática para outras salas ou instituições
- Local previsto: sala de aula da UNIP em Araçatuba
- Período: duas semanas letivas consecutivas, de segunda a sexta-feira, das 18h45 às 22h00; aulas das 19h15 às 22h00, meta de 10 noites e mínimo de 8 noites válidas (`DEC-011`)
- Dados coletados: somente dados ambientais e operacionais do sistema
- Autorização: obtida pelos autores e confirmada em 31 de agosto de 2026; a identificação e a evidência documental serão preservadas no registro da coleta antes da execução

## Estado atual

- Hardware: o conjunto físico foi recebido e inspecionado em 17/09/2026. A placa usada é um ESP32-D0WD-V3 de 38 pinos, identificado em `COM3` por ponte CP210x, com 4 MB de flash; os módulos marcados como SHT3X e VEML7700 responderam à inicialização I²C em GPIO 32 (SDA) e GPIO 33 (SCL). Ainda faltam conferência elétrica de 3,3 V, leituras contínuas e ensaios formais de estabilidade e comparação com referência.
- Firmware e nó físico: o firmware PlatformIO/Arduino foi compilado e gravado no nó `classroom-node-physical-01`. Há leitura básica, fila LittleFS persistente de 256 registros, reenvio idempotente, configuração remota, telemetria e sincronização NTP com alternativa pelo cabeçalho `Date` da API. Em 17/09/2026, uma medição foi confirmada pela API local; em 21/09/2026, múltiplas medições foram confirmadas por Quick Tunnel HTTPS. Essas evidências não substituem o piloto, T004, T007, disponibilidade, latência nem validação dos sensores.
- API, banco e aplicação web: a aplicação Next.js com TypeScript integra interface e Route Handlers. Saúde, ingestão, consultas, configuração versionada, estado operacional, autenticação de usuários, salas, nós, dashboard por sala, Caderno de observação/CSV e alertas locais estão implementados. O MySQL local usa Docker Compose, migrações com checksum e seed de desenvolvimento; hospedagem definitiva, backup e rotação definitiva de credenciais permanecem pendentes.
- Operação remota: a próxima coleta será operada no PC doméstico, com API e MySQL locais e aplicação publicada temporariamente por túnel HTTPS seguro (`DEC-036`). O firmware valida o certificado do túnel e usa DNS público após DHCP quando necessário. A noite-piloto ainda deve ocorrer com o hotspot do celular na faculdade, registrando conectividade, disponibilidade, latência e efeitos de reinicialização do túnel.
- Dados e limites metodológicos: o núcleo continua restrito a temperatura do ar, umidade relativa e iluminância. Não há alerta normativo, avaliação de conforto, aprendizagem ou utilidade gerencial comprovada. Os instrumentos de referência ainda não estão disponíveis; a validação dos sensores será parcial e condicionada a eles.
- Critérios e análise: métricas e critérios de aceitação foram aprovados em `DEC-014`; T005 e T006 foram aprovados em ensaio local controlado, T007 permanece parcial e os testes com firmware/rede do ambiente de estudo continuam pendentes. O motor de qualidade de dados já trata grade temporal, lacunas e reconciliação sem imputação, mas sua aplicação a dados reais com checksum e subconjuntos versionados ainda é pendente.

## Fontes de contexto

- `TCC ajustado.md`: rascunho textual oficial mais recente
- `avaliacao.md`: comentários da primeira avaliação do professor
- `PLANO_DE_AJUSTES_TCC.md`: diagnóstico e plano de reestruturação
- `respostas_perguntas.md`: respostas dos autores
- `monitoramento-ambiental-iot-salas-aula/report.md`: pesquisa bibliográfica aprofundada

## Ponto de retomada — 2026-08-24

A API `v0.1` está funcional no projeto Next.js e possui saúde, ingestão e consulta de medições, consulta e alteração da configuração, confirmação `APPLIED`/`REJECTED` e recebimento do estado operacional. A auditoria de encerramento aprovou 29 testes unitários, ESLint, build de produção, health check com MySQL, migração idempotente, seed idempotente e os três testes integrados HTTP/MySQL. O banco foi deixado sem registros artificiais; permaneceram um dispositivo de desenvolvimento e sua configuração versão 1, intervalo de 60 segundos e estado `APPLIED`.

O MySQL local permanece no contêiner `tcc-iot-mysql`, saudável e exposto somente em `127.0.0.1:3306`. O servidor Next.js usado nos testes foi encerrado e a porta 3100 ficou livre. Para retomar:

```text
docker compose -f software/compose.yaml up -d
cd software/web
npm run dev -- --hostname 127.0.0.1 --port 3100
```

O próximo passo recomendado enquanto o hardware permanece pendente é implementar o dashboard dinâmico com consultas exclusivamente no servidor, começando pelos valores mais recentes, histórico das três variáveis e último estado operacional do nó. A credencial `ADMIN_API_KEY` não deverá ser enviada ao navegador. O workspace ainda não é um repositório Git; foi criado um `.gitignore` na raiz para proteger credenciais locais e artefatos caso o versionamento seja iniciado futuramente.

## Ponto de retomada — 2026-08-25

O dashboard dinâmico inicial foi implementado na página principal do projeto Next.js. O servidor seleciona o dispositivo ativo com atividade mais recente e consulta diretamente o MySQL para apresentar o último valor válido de temperatura do ar, umidade relativa e iluminância, o histórico dos 180 registros mais recentes, o último relatório operacional, a configuração vigente e os totais de entregas confirmadas ou rejeitadas. Leituras inválidas permanecem como lacunas nos gráficos e não são interpoladas.

A atualização automática ocorre a cada cinco segundos por nova renderização do servidor. `ADMIN_API_KEY` e `DATABASE_URL` não são enviados ao navegador. A interface trata banco não configurado ou indisponível, ausência de dispositivo, medições vazias e ausência de telemetria operacional. A partir das DEC-019 e DEC-020, o software pode registrar alertas locais por faixas locais versionadas, mas não emite alerta de conforto ou de conformidade com a NBR.

A verificação de encerramento aprovou 32 testes unitários, ESLint, build de produção, resposta HTTP `200` da página, health check profundo com MySQL e inspeção visual do estado real sem medições. O MySQL foi preservado sem inclusão de dados artificiais. Os próximos passos recomendados são implementar o firmware quando o hardware estiver disponível ou, enquanto a compra permanecer pendente, avançar em relatórios. O teste controlado do dashboard é descrito abaixo.

### Teste integrado do dashboard — 2026-08-25

O teste controlado `npm run test:dashboard` validou a cadeia API–MySQL–dashboard com três medições temporárias, incluindo uma falha de temperatura preservada como lacuna, e um relatório operacional com fila de 12 em 256 registros. Foram conferidos os últimos valores, as unidades, as contagens válidas do histórico, o estado operacional, a ausência das credenciais no HTML e a remoção integral dos registros temporários. Duas execuções finais registraram 588 ms e 125 ms de latência leitura–dashboard em ambiente local com o servidor de produção previamente iniciado.

O benchmark complementar `npm run test:dashboard:latency` executou 100 medições temporárias e obteve 100% de correspondência entre leitura e resposta renderizada, com média de 40,78 ms, P50 de 38 ms, P95 de 56 ms e máximo de 98 ms. O cálculo utilizou o método do posto mais próximo, as amostras foram preservadas em JSON e a limpeza confirmou zero registro artificial no MySQL. Como a renderização foi solicitada imediatamente após cada resposta da API, o ensaio não incluiu a espera do temporizador de cinco segundos no navegador, a rede da sala ou o firmware físico. Assim, `T007` permanece parcialmente atendido.

Para permitir a conferência humana da atualização automática, foi acrescentado o comando `npm run demo:dashboard`. Ele envia medições artificiais em intervalos de seis segundos, exercita também o estado operacional, recusa execução durante coleta ativa e remove seus próprios registros ao ser encerrado com `Enter`. A atualização foi observada manualmente no navegador e registrada em `software/web/teste-dashboard-visual-2026-08-25.md`. A demonstração é auxiliar e `T007` permanece parcial até a repetição da latência ponta a ponta com o firmware físico e a rede do ambiente de estudo.

### Relatórios descritivos — 2026-08-25

Foi implementada a página `/reports`, com período inclusivo no fuso de São Paulo limitado a 31 dias, totais técnicos, mínimo, média e máximo das leituras válidas, contagens válidas e inválidas e histórico de até 200 medições. A rota `/reports/export` gera CSV UTF-8 com até 5.000 registros e preserva os estados de qualidade. O módulo não calcula ausências fora de uma execução experimental formalmente delimitada e não realiza classificação normativa ambiental.

Foram aprovados 47 testes unitários, ESLint e build de produção. Em verificação HTTP contra o MySQL real, a página e o CSV responderam corretamente, um período invertido foi rejeitado com `400` e a limpeza da demonstração confirmou ausência de dados artificiais remanescentes. O teste integrado do dashboard foi ampliado para conferir também o relatório e a exportação. A autenticação definitiva de usuários antes de hospedagem externa continua pendente.

### Qualidade da API, banco e dados — 2026-08-25

O comando `npm run test:api:quality` executou 100 requisições nominais e 11 casos adicionais sem erro 5xx. A latência interna medida por `Server-Timing` apresentou P95 de 149,558 ms, abaixo do limite de 500 ms. A auditoria encontrou 100/100 registros integralmente correspondentes, zero identificador duplicado e tentativas `STORED`, `ALREADY_STORED` e `INTEGRITY_CONFLICT` reconciliadas. `T005` e `T006` foram aprovados no ambiente local controlado; a hospedagem definitiva permanece fora dessa evidência.

O motor `experimento/analises/quality-analysis.mjs` implementou a base reproduzível de `T012`: janela semiaberta, grade temporal, classificações primárias, duplicatas operacionais, `MISSING_SLOT`, regularidade, exclusão auditada e reconciliação sem imputação. Três casos automatizados foram aprovados. `T012` permanece parcial até a integração com arquivos reais, checksums e geração versionada dos subconjuntos operacional e ambiental.

## Ponto de retomada — 2026-08-26

Enquanto o hardware permanece pendente, foi criado `experimento/firmware/` como projeto PlatformIO para o ESP32-C3, usando Arduino, ArduinoJson, Adafruit SHT31, Adafruit VEML7700, Preferences e LittleFS. O firmware gera medições compatíveis com o contrato `v0.1`, persiste e reenvia em ordem até 256 registros, mantém perdas explícitas quando a fila está cheia, consulta/aplica a configuração de intervalo e relata o estado operacional.

`python -m platformio run` foi concluído com sucesso no alvo `esp32-c3-devkitm-1`, consumindo 40.276 bytes de RAM (12,3%) e 971.588 bytes de flash (74,1% da partição de programa). A compilação atesta o código e suas dependências, não a compatibilidade física da placa genérica adquirida. Por isso, `FirmwareConfig.local.h` exige preenchimento local de credenciais, endereço do servidor, GPIOs I2C e endereço SHT31 somente depois da conferência da serigrafia e da tensão dos módulos. A checklist de primeira montagem registra os passos que ainda dependem dos componentes.

Para reduzir erros na primeira integração física, foram acrescentados `experimento/firmware/preparar-primeira-gravacao.ps1` e `experimento/firmware/registro-primeira-montagem.md`. O script valida a configuração local sem exibir SSID, senha ou chave da API, bloqueia GPIOs ainda indefinidos ou repetidos e impede o uso de `localhost` como servidor do ESP32 antes de compilar e, quando solicitado, enviar o firmware pela porta serial. Sua sintaxe foi verificada, mas a execução efetiva continua dependente da placa, da porta serial, da rede e dos sensores recebidos. O registro preservará as marcações, ligações, logs e evidências dos primeiros testes.

### Redação da introdução — 2026-08-26

O capítulo `texto/01-introducao.md` foi reescrito a partir das formulações aprovadas de título, problema, pergunta, objetivo geral, objetivos específicos, contribuição e delimitação. O texto antigo, que ainda incluía ESP8266, ruído, alertas concluídos e alegações sobre aprendizagem, conforto ou impacto gerencial, não foi migrado nesses pontos. A introdução agora delimita a contribuição como desenvolvimento e avaliação técnica da cadeia IoT e preserva alertas ambientais como pendentes de fontes técnicas originais. As citações de fundamentação externa serão inseridas no capítulo 2 somente após a conferência das fontes correspondentes na matriz de evidências.

### Redação da fundamentação teórica — 2026-08-26

Foi redigido `texto/02-fundamentacao.md`, com os conceitos de monitoramento ambiental, temperatura, umidade relativa, iluminância, IoT, qualidade dos dados, rastreabilidade, dashboards e trabalhos relacionados. O texto mantém o núcleo do estudo nas três variáveis definidas e apresenta a contribuição como avaliação técnica ponta a ponta; não atribui ao sistema efeitos sobre conforto percebido, aprendizagem, gestão ou qualidade ambiental global.

Foram verificadas e registradas na matriz bibliográfica as fichas técnicas SHT3x-DIS e VEML7700, a orientação de calibração do NIST/SEMATECH, o relatório NISTIR 8259A e o artigo de Hernández e Cañas (2024) sobre monitoramento IoT em salas de aula. As referências foram adicionadas a `bibliografia/referencias.bib`. A definição de parâmetros e regras de alertas continua pendente da consulta às normas técnicas originais aplicáveis; portanto, o capítulo não fixa valores normativos nem classifica uma sala como adequada ou inadequada.

### Redação da metodologia — 2026-08-26

O capítulo `texto/03-metodologia.md` foi transformado de uma estrutura parcial em uma primeira versão completa. Ele descreve o estudo de caso, o núcleo de três variáveis, o ambiente e período planejados, requisitos, componentes, arquitetura, rastreabilidade, validação parcial dos sensores, validação ponta a ponta, métricas, tratamento de dados, privacidade e limitações.

Datas de coleta, identificação da sala, posição final dos sensores, autorização formal e instrumentos de referência foram mantidos como pendências. O texto não antecipa resultados, não afirma precisão metrológica nem encerra a validação ponta a ponta antes do funcionamento do firmware na placa física.

### Redação do desenvolvimento e implementação — 2026-08-26

Foi redigida a primeira versão completa de `texto/04-desenvolvimento.md`. O capítulo documenta os componentes previstos, o firmware compilado, o contrato HTTP/JSON, a API, o MySQL local, a aplicação web, dashboard, relatórios, confiabilidade e tratamento de falhas. A montagem, o upload na placa, a configuração física dos GPIOs, os testes com sensores, a hospedagem definitiva e a autenticação definitiva permanecem explicitamente pendentes.

O texto registra que alertas ambientais não estão ativos: sua implementação depende da consulta às fontes técnicas originais aplicáveis. As verificações locais de API, banco, dashboard e tratamento de dados são descritas como evidência de software, sem substituir a validação ponta a ponta com o nó físico.

### Preparação do capítulo de resultados — 2026-08-26

`texto/05-resultados.md` foi reorganizado para separar as evidências locais já observadas das verificações físicas ainda pendentes. Foram preservados os ensaios controlados de API, MySQL, dashboard, relatórios e tratamento de dados, enquanto validação dos sensores, comunicação com a placa, coleta ambiental, comparação com trabalhos relacionados e resposta final à pergunta de pesquisa permanecem preparados para preenchimento apenas após dados reais.

### Preparação das considerações finais — 2026-08-26

`texto/06-conclusao.md` recebeu um roteiro de preenchimento, não uma conclusão provisória. Ele define as evidências que deverão sustentar a síntese, o atendimento aos objetivos, as contribuições, limitações e trabalhos futuros após os resultados físicos. A resposta à pergunta de pesquisa, o resumo e o abstract continuam pendentes da coleta e da análise final.

### Revisão editorial transversal — 2026-08-26

Foi executada revisão de escopo, evidência e coerência nos capítulos 1 a 6, registrada em `texto/revisao-editorial-2026-08-26.md`. Não foram encontrados termos herdados sendo usados como escopo ativo; as menções a ruído, CO₂, conforto, aprendizagem e impacto gerencial permanecem delimitadoras. As pendências que exigem fontes originais, hardware, dados reais ou normalização formal foram preservadas.
### Apresentação para banca — 2026-08-26

Foi criada `apresentacao-tcc-iot.html`, uma apresentação autossuficiente de 14 slides para exposição oral à banca. O arquivo utiliza tema institucional em azul-marinho, marfim e dourado, navegação por teclado, toque e roda do mouse, além de modo de edição local opcional. Seu conteúdo distingue explicitamente as evidências locais de software (T005, T006 e parte de T007) da validação física ainda pendente e evita conclusões ambientais, metrológicas ou gerenciais antes da coleta real. A primeira capa foi renderizada localmente para inspeção visual; a revisão de conteúdo e o ensaio oral continuam recomendados antes da banca.

Foi criado também `apresentacao-roteiro-de-fala.md`, com fala proposta para cada slide, transições, respostas para perguntas recorrentes da banca e respostas prudentes para limites ainda pendentes. O roteiro não adiciona resultados ao trabalho: ele preserva a distinção entre implementação, ensaio local, evidência física futura e aplicação potencial.

### Auditoria documental ativa — 2026-08-26

Foi executada uma nova auditoria nos seis capítulos ativos, na apresentação, no roteiro de fala e na bibliografia de apoio, registrada em `texto/auditoria-documental-2026-08-26.md`. Não foram encontrados resíduos ativos do modelo anterior nem alegações de conforto, aprendizagem, qualidade ambiental global ou utilidade gerencial apresentadas como resultado demonstrado. As referências e os parâmetros de alertas que ainda dependem de fontes técnicas originais, bem como os resultados físicos e a normalização UNIP, permaneceram como pendências explícitas.

### Autorização da coleta — 2026-08-26

Foi preparado `projeto/modelo-autorizacao-coleta.md`, com campos ainda a preencher para sala, posição de instalação, datas, responsável e condições da unidade. O modelo descreve somente a coleta de temperatura, umidade relativa, iluminância e telemetria operacional, sem dados pessoais, imagem, áudio ou identificação de ocupantes. A situação registrada neste ponto foi superada pela confirmação dos autores, em 31 de agosto de 2026, de que a autorização foi obtida; sua identificação e evidência documental serão preservadas antes da coleta-piloto.

### Preparação para orientação — 2026-08-26

Foi preparado `projeto/resumo-para-orientador-2026-08-26.md`, reunindo formulações aprovadas, estado da implementação, evidências locais, limitações, dependências e perguntas objetivas para o orientador. O documento não declara validação física, resultados ambientais ou parâmetros de alerta como concluídos. A submissão efetiva do material ao orientador permanece sob responsabilidade dos autores.
