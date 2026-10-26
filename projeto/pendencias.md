# Pendências do projeto

## Administrativas

- [x] Atualizar o orientador oficial nos materiais ativos para Prof. Me. Rafael Marcelino de Jesus e preservar a decisão anterior somente como histórico (`DEC-037`, 06/10/2026).
- [x] RA de Enrico Garcia Silva Costa informado: N295694.
- [x] RA de Leonardo Pedrozo Elias Rodrigues informado: G78GGE-0.
- [x] Informar o mês do prazo final do TCC: novembro de 2026.
- [x] Confirmar o dia exato do prazo final: 30 de novembro de 2026.
- [x] Registrar as entregas de implementação de 22/09 e 29/09/2026 e o calendário de acompanhamento até 01/12/2026 em `cronograma/`. A próxima entrega é a demonstração do banco de dados em 06/10/2026.
- [x] Conferir o guia geral de normalização da Biblioteca da UNIP e aplicá-lo ao gerador do DOCX, com sumário e paginação verificados no Word e na prévia PDF em 22/10/2026.
- [ ] Confirmar com o orientador eventuais orientações específicas do curso além do guia geral da UNIP.
- [ ] Obter a ficha catalográfica oficial, inseri-la após a folha de rosto e atualizar sumário e paginação.
- [ ] Completar os dados da folha de aprovação quando forem informados, sem antecipar aprovação ou nomes de banca.
- [x] Obter autorização para coleta na sala da UNIP; confirmada pelos autores em 31/08/2026. Preservar a identificação e a evidência documental no registro da coleta antes da execução.
- [x] Preparar modelo preenchível para solicitar e registrar a autorização da coleta (`projeto/modelo-autorizacao-coleta.md`).

## Decisões técnicas

- [x] Receber o conjunto inicial de hardware e preservar fotos para a inspeção: em 17/09/2026 foram registrados uma placa ESP32 de 38 pinos marcada `ESP-32D`, módulos marcados `SHT3X` e `VEML 7700`, protoboard, cabo USB de dados e jumpers macho-macho em `experimento/fotos/`. A confirmação elétrica, serial e funcional permanece pendente.

- [x] Definir a pinagem I2C planejada da primeira montagem: GPIO 32 para SDA e GPIO 33 para SCL (`DEC-029`). A conexão física, o endereço do SHT31 e a leitura dos sensores continuam pendentes de confirmação.

- [x] Verificar o boot físico, a porta serial e a inicialização I2C da primeira montagem: em 17/09/2026, a placa foi reconhecida em `COM3` como CP210x, identificada como ESP32-D0WD-V3 com 4 MB de flash, e o firmware registrou `SHT31=pronto; VEML7700=pronto` em GPIO 32/33. O registro não valida medições, estabilidade, API ou coleta (`experimento/firmware/teste-inicial-i2c-2026-09-17.md`).

- [x] Observar as primeiras leituras numéricas do diagnóstico local: em 17/09/2026, três leituras a cada 10 s apresentaram 24,54–24,55 °C, 42,76–42,81% UR e 150,22–150,68 lx. A resposta a variações físicas e o ensaio formal de uma hora permanecem pendentes.

- [x] Observar qualitativamente a resposta dos sensores: em 17/09/2026, os autores relataram variações coerentes no monitor serial ao cobrir e descobrir o VEML7700 e ao abafar e soprar o SHT3X. Não foram preservados valores; o ensaio formal T001–T003 permanece pendente.

- [x] Disponibilizar no menu global o acesso direto ao monitoramento em tempo real, com seletor de uma sala cadastrada por vez e URL que preserva o recorte (`DEC-028`). Em 11/09/2026, 60 testes unitários, ESLint, build e ensaio integrado com MySQL foram aprovados, com limpeza confirmada dos dados temporários.

- [x] Comparar ESP8266 e ESP32 e registrar a escolha (`DEC-006`, atualizada pela `DEC-018`: placa genérica anunciada como `ESP32-WROOM-32D-38P`).
- [x] Selecionar o sensor de temperatura e umidade (`DEC-006`: Sensirion SHT31).
- [x] Selecionar o sensor de iluminância (`DEC-006`: Vishay VEML7700).
- [x] Definir fornecedores, modelos e quantidades iniciais; a compra efetiva substituiu a placa anterior por duas unidades anunciadas como `ESP32-WROOM-32D-38P` (`DEC-018`).
- [x] Confirmar o custo total pago e registrar a compra efetivamente realizada: R$ 125,98 em 28/08/2026, com entrega pendente nas capturas de 31/08/2026 (`modules/`).
- [x] Definir alimentação inicial: USB do computador durante desenvolvimento e fonte USB 5 V confiável durante operação.
- [ ] Definir encapsulamento e custo-alvo final do nó. O custo observado do protótipo de bancada foi documentado em `texto/05-resultados.md`: R$ 125,98 no total dos pedidos, incluindo uma segunda placa não destinada ao TCC; R$ 54,34 no conjunto eletrônico de uma unidade e R$ 99,74 na montagem de bancada atribuível ao estudo (`DEC-044`).
- [ ] Concluir a conferência física: a serigrafia `ESP-32D`, a ponte CP210x, `COM3`, 4 MB de flash, GPIO 32/33 e a inicialização I2C dos dois sensores já foram observados. As leituras contínuas e a estabilidade operacional foram evidenciadas nas três sessões formais; ainda falta, se desejado, medir a saída de 3,3 V com instrumento adequado.
- [x] Definir o ambiente operacional dos testes e da próxima coleta: API, banco e aplicação web ficarão no PC doméstico, publicados por túnel HTTPS seguro, sem hospedagem em nuvem contratada (`DEC-036`). A hospedagem definitiva permanece a definir.
- [x] Elaborar o contrato inicial `v0.1` da API e o esquema MySQL inicial, preservando idempotência, rastreabilidade, estados de qualidade, configuração e operação offline.
- [x] Definir a tecnologia da aplicação e da API: Next.js com TypeScript e rotas de API integradas no runtime Node.js (`DEC-016`).
- [x] Criar o projeto Next.js com TypeScript e App Router em `software/web/`.
- [x] Definir a biblioteca de acesso ao MySQL: `mysql2`, com pool reutilizável no runtime Node.js.
- [x] Implementar o firmware inicial compilável para ESP32, com leituras SHT31/VEML7700, fila persistente, entrega idempotente, configuração e telemetria operacional; a compilação local pré-hardware foi aprovada para `esp32dev` em 31/08/2026, sem inferir validação no hardware físico.
- [x] Preparar a pré-verificação de configuração, o roteiro de upload e o registro preenchível da primeira montagem, sem definir GPIOs ou resultados antes da inspeção dos componentes recebidos.
- [x] Concluir a configuração local do firmware e a primeira transmissão real: o nó `classroom-node-physical-01` foi gravado em `COM3`, conectou-se ao hotspot local e teve uma medição confirmada pela API em 17/09/2026. Credenciais permanecem somente em `FirmwareConfig.local.h`; a confirmação inicial não conclui T004 nem autoriza coleta experimental.
- [x] Implementar a estratégia local de migrações do MySQL com histórico, checksum e arquivos SQL crescentes (`DEC-017`).
- [ ] Adaptar e validar migrações, segredos e backups conforme a hospedagem definitiva.
- [x] Concluir a validação operacional inicial do túnel HTTPS com a noite-piloto no hotspot do celular antes da coleta válida (`DEC-036`). Em 06/10/2026, o nó físico na faculdade transmitiu medições pelo túnel HTTPS para a API e o MySQL no PC doméstico, comprovando a comunicação remota ponta a ponta. A duração foi inferior à janela inicialmente planejada; a sessão permanece identificada como piloto e não substitui a apuração de disponibilidade, completude e latência das noites de validação definitiva. Registrar disponibilidade do PC, internet móvel e falhas de conectividade como eventos operacionais em cada execução.
- [x] Concluir T010 como validação funcional e operacional (`DEC-039`): a auditoria dos 256 últimos envios `REPLAYED` registrou 254 `STORED`, 2 `ALREADY_STORED`, zero falhas e 254 medições únicas persistidas, sem duplicata; o nó terminou `ONLINE`, com fila `0/256` e uma perda explicitamente contabilizada. A advertência foi observada a 213/256. Os autores confirmaram a chegada a 256 registros, mas o pico não foi telemetrizado, e o tempo de esvaziamento após conexão estável não foi cronometrado. Essas ressalvas devem acompanhar qualquer apresentação do resultado (`experimento/firmware/teste-t010-persistencia-2026-10-07.md`).
- [x] Implementar `POST /api/v1/measurements` com validação, autenticação inicial, persistência idempotente e testes unitários.
- [x] Implementar `GET /api/v1/measurements` com filtros, ordenação determinística, limite e paginação por cursor.
- [x] Implementar consulta e alteração versionada da configuração, incluindo limites de 10–300 segundos e bloqueio durante execução ativa.
- [x] Implementar a confirmação idempotente `APPLIED`/`REJECTED` da configuração pelo nó, incluindo conflitos, versões substituídas e bloqueio durante execução ativa.
- [x] Implementar o endpoint de estado operacional descrito no contrato `v0.1`, incluindo firmware, conexão, fila, perdas e sincronização temporal.
- [x] Implementar o dashboard dinâmico com consulta no servidor, valores mais recentes, histórico de temperatura, umidade relativa e iluminância e último estado operacional do nó.
- [x] Executar teste integrado controlado do dashboard contra API e MySQL, com conferência de valores, lacunas, estado operacional, segurança do HTML, amostra de latência e remoção automática dos dados temporários.
- [x] Executar benchmark local do dashboard com 100 renderizações solicitadas, cálculo reproduzível de P50/P95 e preservação das amostras em JSON.
- [x] Disponibilizar comando seguro de alimentação artificial para inspeção manual da atualização periódica do dashboard, com bloqueio durante coleta ativa e limpeza automática ao encerrar.
- [x] Observar manualmente a atualização periódica real no navegador durante a demonstração local controlada e registrar suas limitações.
- [x] Concluir `T007` com o firmware físico e a rede do ambiente de estudo: em 15/10/2026, 20/20 medições `ONLINE`, válidas e sincronizadas foram exibidas integralmente no dashboard autenticado, com P95 leitura → resposta HTML renderizada solicitada de 6.173 ms, abaixo da meta de 10 s. A atualização visual automática de até 5 s não foi cronometrada separadamente. O P95 leitura → API foi 5.705 ms e permanece como evidência acima da meta específica de T004 (`software/web/teste-t007-fisico-2026-10-15.md`).
- [x] Implementar o relatório descritivo inicial com filtro de datas, indicadores, histórico e exportação CSV, sem classificação ambiental normativa.
- [x] Ajustar o Caderno de observação (`/reports`) para permitir escolher explicitamente uma única sala no próprio filtro, preservando-a ao alterar o período e mantendo estatísticas, tabela e CSV restritos à sala escolhida (`DEC-027`). Em 10/09/2026, 60 testes unitários, ESLint, build e ensaio integrado com MySQL foram aprovados, com limpeza confirmada dos dados temporários.
- [x] Implementar faixas locais de acompanhamento inicialmente desabilitadas, versionadas e bloqueadas durante execução ativa, com alertas locais imutáveis de leituras válidas e sincronizadas (`DEC-019`, `DEC-020`).
- [x] Separar os alertas locais em `/alerts`, com filtro temporal e destaque avermelhado suave, preservando `/reports` para as medições (`DEC-020`).
- [x] Disponibilizar tela administrativa local para configurar, habilitar ou desabilitar as faixas efetivas, incluindo limites por variável, responsável, justificativa, referência e sessão de administrador (`/admin/local-monitoring`).
- [x] Aplicar a migração `002_add_local_monitoring_history.sql` no MySQL local e executar o ensaio integrado controlado de T008 em 31/08/2026; os dados artificiais foram limpos ao final (`software/web/test-local-monitoring-2026-08-31.md`).
- [x] Disponibilizar e verificar a demonstração manual contínua das faixas locais, com valores variados e encerramento por `M` seguido de limpeza dos dados temporários (`npm run demo:local-monitoring`).
- [x] Executar teste integrado inicial da ingestão contra MySQL, cobrindo criação, reenvio idêntico, conflito, validação e auditoria no banco.
- [x] Executar benchmark local controlado de `T005` com 100 requisições nominais, casos inválidos/repetidos, zero erro 5xx e medição interna por `Server-Timing`.
- [x] Executar auditoria controlada de `T006` com 100/100 registros correspondentes, zero identificador duplicado e reconciliação das tentativas.
- [ ] Definir o mecanismo definitivo de autenticação dos dispositivos e dos usuários administrativos conforme o ambiente de hospedagem.
- [x] Definir intervalo de leitura e transmissão: ciclo único configurável entre 10 e 300 segundos, com padrão inicial de 60 segundos e valor fixo durante cada execução experimental válida (`DEC-012`).
- [x] Definir comportamento offline e recuperação de falhas: fila local persistente de 256 registros, advertência em 80%, reenvio ordenado, remoção após confirmação, deduplicação e perdas contabilizadas (`DEC-013`).

- [x] Redesenhar a página principal do dashboard como central de instrumentação, preservando dados, estados seguros, atualização e a separação entre medições e telemetria operacional.
- [x] Documentar, em `software/COMO_SUBIR_APLICACAO.md`, o roteiro para iniciar localmente o MySQL, a aplicação Next.js, dashboard e API com segurança.
- [x] Redesenhar a página de relatórios com a mesma linguagem visual do dashboard, preservando filtro temporal, exportação CSV, estados seguros e limites metodológicos.
- [x] Centralizar a navegação das páginas web em um menu lateral global, com acesso à estação, relatórios, alertas e configuração de faixas (`DEC-021`).
- [x] Implementar cadastro de salas, associação histórica entre sala e nó e consultas de dashboard, alertas, relatórios e CSV por sala (`DEC-022`).
- [x] Aplicar a migração `003_add_classrooms.sql`, executar o seed de desenvolvimento e realizar ensaio integrado de cadastro, associação, transferência e isolamento de medições, alertas e CSV por sala (`DEC-022`); concluído em 01/09/2026 com `npm run test:classrooms` e limpeza confirmada dos dados temporários.

- [x] Disponibilizar cadastro administrativo protegido de nos IoT, com identificador publico correspondente a `TCC_DEVICE_ID`, listagem e indicacao de sala associada (`DEC-023`); concluido em 08/09/2026 com ensaio integrado de cadastro, conflito, consulta e limpeza do no temporario.

- [x] Permitir consulta da Central de alertas por uma ou mais salas cadastradas, com seletor compacto pesquisavel, identificacao da sala em cada alerta e ensaio integrado multissala (`DEC-024`); concluido em 08/09/2026 com limpeza dos dados temporarios confirmada.

- [x] Permitir editar cada sala e no pela respectiva consulta, preservando codigo de sala e Device ID, com retorno contextual para as consultas e ensaios integrados de edicao (`DEC-025`); concluido em 08/09/2026.

## Autenticacao e acesso

- [x] Implementar autenticacao de usuarios com contas individuais, perfis `ADMIN` e `VIEWER`, sessoes por cookie `HttpOnly`, consulta/cadastro/edicao administrativo de usuarios, ativacao/inativacao e login obrigatorio para dados e exportacao (`DEC-026`). A migracao foi aplicada no MySQL local e o ensaio ponta a ponta passou, com limpeza das contas temporarias.
- [ ] Definir a individualizacao e rotacao definitiva das credenciais dos dispositivos IoT conforme o ambiente de hospedagem.

## Metodologia

- [x] Confirmar quantas salas serão monitoradas: uma sala de aula, como estudo de caso (`DEC-009`).
- [x] Consolidar as medições físicas prévias como evidência operacional, sem reclassificação retroativa dos registros sem `run_id` vinculados a `DEV-01` (`DEC-042`).
- [x] Definir a validação operacional final: três sessões formais e não consecutivas de oito horas, com quarta sessão apenas se houver invalidação (`DEC-043`).
- [x] Definir as datas planejadas e o local das três sessões: 19, 20 e 21/10/2026, no local de trabalho de um dos autores (`DEC-043`).
- [x] Concluir a primeira sessão formal em 19/10/2026: `workroom`, `run_id` `98d1dd84-49ae-41c5-aa46-28ba98f7fd78`, janela efetiva de 09:01:06 a 18:10:16 (9 h 09 min), configuração v4 de 60 s. Os seis registros anteriores ao início efetivo foram preservados como `OUTSIDE_WINDOW`.
- [x] Concluir e apurar a segunda sessão formal em 20/10/2026: `workroom`, `run_id` `4719d5b0-9425-4de0-a57c-5f5a39bd80ec`, configuração v4 de 60 s e janela efetiva de 08:25:44 a 17:12:30 (8 h 46 min 46 s). Foram armazenados 526 dos 527 registros esperados (99,810%), todos sincronizados e plenamente válidos; P95 do erro de intervalo de 0 s e P95 de latência até a API de 2,606 s. A fila permaneceu em 0/256, sem nova perda. Onze registros anteriores ao início efetivo foram preservados fora da janela temporal.
- [x] Concluir e apurar a terceira sessao formal em 21/10/2026: `workroom`, `run_id` `00e0ee37-26e8-40a9-838f-fc1751c0129a`, configuracao v4 de 60 s e janela efetiva de 08:09:41 a 17:06:16 (8 h 56 min 35 s). Foram armazenadas 534 das 537 medicoes esperadas (99,441%), todas sincronizadas e plenamente validas; P95 do erro de intervalo de 0 s e P95 de latencia ate a API de 2,511 s. A fila permaneceu em 0/256, sem nova perda telemetrizada. Dois registros anteriores ao inicio efetivo foram preservados fora da janela temporal. A troca de fonte de energia durante a sessao gerou novo `boot_id`, seguida de recuperacao `ONLINE` e `SYNCED`.
- [x] Confirmar se um quarto dia de reposicao e necessario: nao necessario, pois as tres sessoes formais programadas foram concluidas com os criterios operacionais atendidos.
- [x] Na manhã de 19/10/2026, conectar o nó ao hotspot, aplicar e confirmar a configuração de aquisição e transmissão antes de iniciar a primeira sessão formal; somente após essa confirmação cadastrar/ativar o respectivo `run_id`. A configuração v4 de 60 s foi confirmada como `APPLIED`; a sessão foi ativada em `workroom` com `run_id` `98d1dd84-49ae-41c5-aa46-28ba98f7fd78`. O encerramento e a apuração de validade permanecem pendentes.
- [x] Documentar a validação apenas funcional de temperatura, umidade relativa e iluminância (`DEC-040`): não haverá instrumentos de referência disponíveis para a coleta real. O estudo demonstrará aquisição, transmissão, persistência, integridade e comportamento funcional dos sensores, sem afirmar exatidão, calibração, viés, MAE, RMSE ou conformidade metrológica.
- [x] Definir métricas e critérios de aceitação antes dos testes (`DEC-014`).
- [x] Delimitar o uso dos parâmetros ambientais no sistema (`DEC-019`, `DEC-020`, `DEC-045`). A edição consultada de 2008 da ABNT NBR 16401-2 permanece apenas como referência térmica contextual, sem alegação de vigência ou conformidade; não sustenta alerta normativo com as variáveis do protótipo. Foram implementadas somente faixas locais de acompanhamento, inicialmente desabilitadas, com versão, responsável informado, justificativa e histórico imutável de alertas locais.
- [x] Executar T008 com MySQL e casos controlados abaixo, no limite e acima das faixas locais; a evidência foi registrada sem interpretar os alertas locais como conformidade ambiental (`software/web/test-local-monitoring-2026-08-31.md`).
- [x] Definir procedimento para dados ausentes, falhas e exclusões (`DEC-015`).
- [x] Implementar e testar o motor inicial de `T012` para grade temporal, categorias primárias, `MISSING_SLOT`, regularidade e reconciliação sem imputação.
- [x] Integrar o motor de `T012` aos arquivos reais: a exportação somente leitura das três sessões formais foi preservada em `experimento/dados-brutos/sessoes-formais-2026-10-19-a-21.json` (SHA-256 `9e32b809b22239f6c406905b9523306f87065f0e14d30c454df1dabd0d0cb85c`); os produtos versionados, a reconciliação e as lacunas sem imputação foram gerados em `experimento/dados-tratados/2026-10-21-sessoes-formais-v1/`.
- [x] Definir o enquadramento do apoio à gestão como finalidade informacional, sem utilidade ou impacto comprovados (`DEC-009`).
- [x] Criar matriz entre condição observada, indicador apresentado, critério técnico e temporal e possível investigação pela gestão em `projeto/matriz-apoio-gestao.md`.

## Texto acadêmico

- [x] Auditar a redação ativa com a skill `tcc-abnt-excelencia`, registrar parecer por severidade e aplicar correções seguras de coerência, citações, referências, unidades e grade temporal (`texto/auditoria-tcc-abnt-2026-08-26.md`).
- [x] Criar a lista ativa de referências citadas e verificadas em `texto/07-referencias.md`, mantendo `bibliografia/referencias.bib` como registro estruturado.
- [x] Preparar resumo do estado e pontos para orientação (`projeto/resumo-para-orientador-2026-08-26.md`).
- [x] Preparar apresentação inicial de 14 slides para banca, separando evidências locais de software das validações físicas pendentes (`apresentacao-tcc-iot.html`).
- [x] Preparar roteiro de fala e banco inicial de perguntas para a banca (`apresentacao-roteiro-de-fala.md`).
- [x] Aprovar título definitivo (`DEC-008`).
- [x] Aprovar pergunta de pesquisa e objetivo geral (`DEC-008`).
- [x] Revisar e aprovar a versão final dos objetivos específicos (`DEC-010`).
- [ ] Submeter ao orientador o título, a pergunta e os objetivos aprovados pelos autores.
- [x] Concluir a segunda revisão editorial dos capítulos 1 a 6, resumo, abstract e referências, a partir da versão ativa em `texto/`, e atualizar o Markdown consolidado, o DOCX e o PDF (`DEC-046`; `texto/revisao-editorial-2026-10-22.md`).
- [ ] Realizar a leitura final da versão revisada pelos autores e pelo orientador antes da submissão.
- [x] Redigir a primeira versão de `texto/03-metodologia.md` a partir do protocolo, das métricas e dos critérios aprovados, sem antecipar dados ou resultados físicos.
- [x] Redigir a primeira versão de `texto/04-desenvolvimento.md` a partir da implementação existente, sem declarar montagem, alertas ou validação física como concluídos.
- [x] Preparar `texto/05-resultados.md` para receber evidências físicas, preservando apenas os ensaios locais já observados e sem inserir dados ambientais fictícios.
- [x] Preparar o roteiro de `texto/06-conclusao.md` sem antecipar síntese, resposta à pergunta ou conclusões antes dos resultados físicos.
- [x] Auditar e remover, nos materiais ativos, afirmações não demonstráveis sobre aprendizagem, conforto e melhoria ambiental (`texto/auditoria-documental-2026-08-26.md`).
- [x] Auditar a cobertura bibliográfica das afirmações ativas: as dez fontes citadas nos capítulos 1, 2 e 5 possuem entrada correspondente em `texto/07-referencias.md` e registro em `bibliografia/referencias.bib`; a correspondência foi reconferida em 22/10/2026, incluindo Allen et al. (1998) na segunda revisão editorial. A edição de 2008 da NBR 16401-2 é apenas contextual (`DEC-045`). Critérios ambientais normativos para alertas permanecem fora do escopo ativo; qualquer inclusão futura exigirá fonte técnica original aplicável e vigente.
- [x] Auditar nomes e elementos herdados do modelo antigo nos materiais ativos; nenhum resíduo ativo exigiu substituição (`texto/auditoria-documental-2026-08-26.md`).
