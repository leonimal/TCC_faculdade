# 3 Metodologia e projeto do sistema

Este capítulo apresenta o método utilizado para desenvolver e avaliar tecnicamente o sistema proposto. Os requisitos e os critérios de avaliação foram definidos antes dos ensaios e orientaram o planejamento da coleta, a organização dos registros e a análise das evidências obtidas.

## 3.1 Caracterização da pesquisa

A pesquisa possui caráter aplicado, pois envolveu a construção de um artefato de monitoramento ambiental e sua avaliação técnica em condições de uso delimitadas. O artefato é composto por um nó IoT, uma interface de comunicação HTTP/JSON, uma aplicação web integrada à API e uma base de dados relacional. O estudo reuniu evidências físicas prévias em sala de aula e três sessões formais de estabilidade operacional realizadas em outro ambiente.

O foco da pesquisa foi verificar a preservação das medições desde a aquisição até a visualização: leitura dos sensores, identificação temporal, transmissão, persistência, consulta e apresentação. Os sensores foram avaliados funcionalmente, por meio da inicialização, da resposta qualitativa a variações e da continuidade das leituras. A infraestrutura de dados foi examinada por métricas de completude, regularidade, latência e integridade da cadeia IoT.

## 3.2 Questão de pesquisa e escopo experimental

A questão de pesquisa é: “Em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?” Para responder à questão, foram monitoradas a temperatura do ar, a umidade relativa do ar e a iluminância.

O escopo experimental concentrou-se no comportamento funcional dos sensores e no desempenho da cadeia que recebe, preserva e apresenta as medições. Dashboard, relatórios e alertas locais foram examinados como recursos de consulta e acompanhamento. Os procedimentos das seções 3.8 a 3.11 definem as evidências utilizadas para avaliar esse funcionamento.

## 3.3 Ambiente e período de avaliação

A evidência física prévia incluiu testes do nó em sala de aula da UNIP em Araçatuba, SP, conforme relato dos autores. As três sessões formais finais foram realizadas no local de trabalho de um dos autores, exclusivamente para avaliar a estabilidade operacional da cadeia IoT. Os diários registram datas, horários, configuração, conectividade e eventos relevantes; os valores ambientais dessas sessões não são utilizados para caracterizar esse local.

Foi realizada uma noite-piloto na faculdade para verificar a comunicação remota do nó com a API e o MySQL no computador dos autores. Sua duração foi inferior ao período inicialmente planejado. Os autores também relataram testes físicos em sala de aula; uma auditoria identificou 345 medições válidas e sincronizadas em oito datas. Esses registros não possuem `run_id` e permanecem vinculados a `DEV-01` no banco, razão pela qual são tratados como evidência operacional prévia, sem reclassificação retroativa como coleta formal ou caracterização ambiental.

O protocolo final previu três sessões formais com duração efetiva mínima de oito horas cada, planejadas como não consecutivas, e uma quarta apenas se fosse necessária reposição. Na execução, as sessões ocorreram em dias seguidos, 19, 20 e 21/10/2026, no local de trabalho de um dos autores, totalizando 26 h 52 min 31 s. Todas utilizaram o mesmo nó, firmware 0.1.2, intervalo configurado de 60 s e cadeia de dados, com `run_id` exclusivo. Os horários efetivos, a conectividade, os eventos relevantes e as falhas identificadas foram preservados por sessão. Essa avaliação examinou estabilidade operacional em três sessões separadas, sem equivaler a operação ininterrupta por 24 horas. Não houve necessidade de uma quarta sessão.

## 3.4 Requisitos funcionais e não funcionais

Os requisitos funcionais estabeleceram que o sistema deveria adquirir as três variáveis selecionadas e associá-las a um identificador único, ao dispositivo, ao instante de leitura, à versão de configuração e ao estado de sincronização temporal. Para a aplicação, foram definidos o recebimento e a validação das mensagens, o armazenamento idempotente, as consultas e a apresentação de valores recentes, séries temporais, informações operacionais e relatórios descritivos.

Definiu-se um ciclo único de leitura e transmissão, configurável entre 10 e 300 segundos, com valor inicial de 60 segundos. O protocolo exigiu o registro do intervalo antes de cada execução e sua manutenção até o encerramento. Para indisponibilidades de Wi-Fi ou da API, foram especificadas a continuidade da aquisição, uma fila local persistente de até 256 registros e o reenvio ordenado após a reconexão. A remoção de uma medição da fila ficou condicionada à confirmação de armazenamento pela API ou da existência prévia do mesmo identificador.

Os requisitos não funcionais incluíram rastreabilidade, preservação dos dados brutos, segurança inicial de acesso à API, ausência de duplicatas, contabilização explícita de perdas, comunicação de estado operacional e tratamento visível de falhas. Para a análise, adotou-se a preservação das ausências e das leituras inválidas como evidências do funcionamento técnico.

## 3.5 Seleção dos sensores e do microcontrolador

O nó utilizou uma placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31 para temperatura e umidade relativa e um módulo anunciado como VEML7700 para iluminância. A seleção considerou compatibilidade com barramento I2C em 3,3 V, conectividade Wi-Fi, disponibilidade, documentação técnica, custo e viabilidade de integração ao protótipo. A placa substituiu a ESP32-C3 inicialmente prevista, por menor custo. Na inspeção e no upload, a unidade usada foi identificada como ESP32-D0WD-V3, com 4 MB de flash e interface serial CP210x.

As especificações de fabricante orientaram a integração. Na unidade montada, foram verificados o boot, a porta serial, a inicialização dos módulos no barramento I2C e a resposta qualitativa das leituras a variações provocadas pelos autores. Os GPIOs 32 (SDA) e 33 (SCL) foram usados na montagem. A implementação física é detalhada na seção 4.2.

## 3.6 Arquitetura e fluxo de dados

A arquitetura é formada por sensores conectados ao microcontrolador com Wi-Fi, comunicação HTTP/JSON, rotas de API em uma aplicação Next.js, banco MySQL e interface web. O firmware obtém a leitura, atribui identificadores e metadados, mantém o registro em fila local até a confirmação e comunica sua situação operacional. A API valida a mensagem, registra a tentativa de entrega e persiste a medição canônica de forma idempotente. A aplicação consulta o banco no servidor para compor dashboard, histórico e relatórios.

Cada medição inclui identificador único, identificador do dispositivo, identificação da inicialização do nó, número sequencial, instante da leitura quando sincronizado, versão de configuração, valores medidos, estados de qualidade e informação sobre sincronização temporal. A telemetria operacional informa conexão, intensidade do sinal, ocupação da fila, perdas acumuladas e estado dos sensores. Essa separação permite distinguir uma condição ambiental observada de um problema de transmissão, fila ou sincronização.

## 3.7 Modelo de dados e rastreabilidade

O banco preserva a medição canônica separadamente das tentativas de entrega. Essa estrutura permite reconhecer reenvios legítimos, impedir duplicações pelo identificador da medição e registrar conflitos de integridade sem sobrescrever dados. A configuração do intervalo é versionada, e sua aplicação pelo nó é confirmada ou rejeitada de modo auditável.

Os dados brutos foram preservados sem edição, sobrescrita ou correção manual. Os arquivos derivados das sessões formais foram produzidos por scripts identificados, com registro das entradas, regras e saídas. Para cada execução foram preservadas informações sobre versão do firmware, dispositivo, configuração aplicada, janela temporal, eventos e falhas relevantes. Esse conjunto de metadados permitiu reconciliar as medições persistidas e identificar lacunas na grade temporal.

## 3.8 Procedimentos de avaliação funcional dos sensores

A avaliação funcional considerou a inicialização dos módulos, a produção de leituras numéricas dentro das faixas físicas adotadas, a resposta qualitativa a variações e a continuidade da aquisição nas sessões formais. As faixas de validade utilizadas foram de -40 a 125 °C para temperatura, de 0 a 100% para umidade relativa e de 0 a 140.000 lx para iluminância. Esses limites serviram à classificação técnica das leituras.

As observações qualitativas incluíram cobrir e descobrir o sensor de iluminância e provocar variações próximas ao sensor de temperatura e umidade. Os autores relataram respostas coerentes no monitor serial, sem preservação de uma série específica desse procedimento exploratório. Nas sessões formais, a análise utilizou as leituras efetivamente armazenadas e seus estados de qualidade, com intervalo configurado de 60 segundos.

O protocolo inicial também previu uma execução específica de uma hora, a cada 10 segundos, com 360 tentativas esperadas e taxa mínima de 99% de leituras válidas. Esse ensaio não foi documentado como concluído e permanece distinto da evidência funcional obtida nas sessões formais. A comparação metrológica prevista inicialmente foi condicionada à disponibilidade de referência; diante de sua indisponibilidade, a avaliação realizada permaneceu funcional.

## 3.9 Validação ponta a ponta

A avaliação ponta a ponta combinou ensaios controlados da API, do banco e do dashboard com medições do nó físico e três sessões formais de estabilidade. Foram examinados identificadores, valores, estados de qualidade, configuração aplicada, completude, regularidade temporal, latência até a API e duplicidade. Um ensaio físico específico verificou a correspondência entre as leituras e a resposta HTML renderizada do dashboard. A disponibilidade foi acompanhada por telemetria e continuidade dos registros.

O intervalo de 60 segundos foi aplicado e confirmado nas três sessões formais. Os extremos de 10 e 300 segundos não foram repetidos no nó físico como ensaio completo de configuração. No teste de operação offline, os autores interromperam a conectividade e a alimentação do nó e examinaram a persistência da fila, a retomada dos envios e as confirmações de armazenamento após o restabelecimento. A análise distinguiu medições únicas de tentativas repetidas de entrega.

Os ensaios locais documentaram a parte de software, enquanto o teste físico do dashboard e as sessões formais acrescentaram evidência do funcionamento integrado com o firmware, a placa e a rede utilizadas. A síntese do capítulo 5 relaciona cada critério à evidência efetivamente obtida e ao alcance de sua verificação.

## 3.10 Métricas e critérios de aceitação

As métricas e os critérios definidos para a avaliação são apresentados na Tabela 1. O percentil 95 (P95) foi utilizado para resumir a regularidade temporal e as latências. Os valores de aceitação são metas internas de engenharia estabelecidas antes da coleta.

**Tabela 1 — Métricas e critérios de aceitação da cadeia ponta a ponta**

| Métrica | Definição operacional | Critério de aceitação |
|---|---|---|
| Completude | Registros únicos armazenados divididos pelos registros esperados | Pelo menos 99% em teste controlado e 95% em cada execução válida |
| Perda | Diferença entre registros esperados e registros únicos armazenados | No máximo 1% em teste controlado; toda perda identificada |
| Regularidade temporal | Erro absoluto entre intervalo observado e configurado | P95 até o maior valor entre 1 s e 5% do intervalo |
| Latência até a API | Recebimento pela API menos instante da leitura | P95 de até 5 s durante operação online |
| Latência ponta a ponta | Exibição no dashboard menos instante da leitura | P95 de até 10 s durante operação online |
| Disponibilidade | Tempo operacional dividido pelo tempo programado | Pelo menos 95% em cada execução válida |
| Consistência | Registros equivalentes entre as camadas divididos pelos auditados | 100% |
| Duplicidade | Identificadores repetidos no banco | Zero |
| Sincronização temporal | Diferença entre relógio do nó e referência | Até 2 s quando sincronizado |

**Fonte:** elaborada pelos autores com base nos critérios internos do projeto (2026).

A quantidade esperada foi calculada sobre a janela semiaberta entre início, inclusive, e término, exclusive: `N_esperado = teto((t_fim - t_início) / intervalo)`. O instante `t_início` correspondeu à primeira aquisição válida e sincronizada escolhida para delimitar a janela formal. A função teto é necessária porque a grade inclui essa posição inicial; por exemplo, uma janela de 5 minutos e 30 segundos com intervalo de 60 segundos contém seis posições esperadas. Registros anteriores ao início efetivo foram preservados fora da janela e não entraram no denominador de completude. O protocolo exigia ao menos oito horas por sessão, 95% de completude e disponibilidade, intervalo fixo, 99% de registros sincronizados, ausência de inconsistências ou duplicatas e registro dos eventos. Não foi produzido um cálculo independente do percentual de disponibilidade; seu acompanhamento se baseou na telemetria e na continuidade das medições.

## 3.11 Tratamento e análise dos dados

Foram formados subconjuntos operacionais separados para cada sessão formal, preservando medições e seus estados, tentativas, eventos de fila e registros fora da janela. Cada sessão foi avaliada individualmente antes da síntese acumulada, sem ocultar suas lacunas. Os registros físicos anteriores são apresentados separadamente como evidência operacional prévia, com a limitação de `run_id` e sala cadastrada. Não foi produzido subconjunto ambiental principal nem comparação entre horários distintos.

As posições esperadas foram geradas a partir do início de cada execução e do intervalo configurado. Uma posição sem medição válida e única foi identificada como `MISSING_SLOT`. Foram calculados total e percentual de ausências, número de lacunas e maior sequência consecutiva sem leitura válida. Não houve interpolação, preenchimento pela média ou repetição do último valor na análise principal.

As regras de inclusão consideraram elegíveis os reenvios após indisponibilidade que conservassem instante sincronizado, valores válidos e identificador único. Estabeleceu-se que valores incomuns dentro da faixa física seriam preservados, e que uma eventual exclusão manual exigiria evidência de falha técnica e registro de motivo, autor e data. O protocolo também previu análise de sensibilidade com e sem a exclusão caso ela pudesse influenciar materialmente uma conclusão.

## 3.12 Análise de custo e reprodutibilidade

O caráter de baixo custo foi avaliado a partir do valor efetivamente pago pelos componentes do nó. A apuração registrou modelo, quantidade, data da compra e total pago. O custo do protótipo físico foi apresentado separadamente dos recursos de desenvolvimento já disponíveis, como computador e rede local. Licenças de software gratuitas não foram contabilizadas como despesa de aquisição, para evitar que ausência de licença seja confundida com custo total nulo.

A análise distinguiu o custo da unidade experimental do custo estimado de reprodução. A primeira medida utilizou as despesas reais da compra; a segunda não foi calculada, pois fonte de operação, encapsulamento e lista de materiais de uma unidade implantável não foram definidos. Não foram usados preços atuais de anúncios como se fossem gastos realizados.

Sem custo-alvo ou referencial externo explícito de comparação, “baixo custo” é tratado como característica de projeto sustentada pelo gasto observado, e não como comparação universal de mercado. A conclusão explicita os itens incluídos e excluídos do cálculo.

A reprodutibilidade é apoiada pelo código, contrato da API, migrações, versões das dependências, lista de materiais, parâmetros de configuração, protocolo de testes e scripts de análise. A placa genérica, a ausência de referência metrológica e a infraestrutura usada nas sessões delimitam a repetição em outros contextos. O estudo utilizou um único nó físico, sem uma segunda unidade completa para repetir os ensaios em paralelo.

## 3.13 Aspectos éticos, privacidade e autorização

O sistema coletou medições ambientais e telemetria operacional do nó. Não houve identificação de pessoas, captação de imagem ou áudio, contagem de ocupantes ou associação das leituras a alunos, docentes ou funcionários. O estudo não avaliou comportamento, desempenho acadêmico ou percepção dos ocupantes.

Os autores confirmaram a autorização para os testes em sala de aula. O registro disponível neste projeto não inclui o documento comprobatório nem a identificação física da sala. Na apresentação pública dos resultados, credenciais, chaves de API e detalhes de acesso à infraestrutura devem permanecer omitidos.

## 3.14 Limitações metodológicas

O estudo contou com uma unidade operacional de cada sensor e um único nó físico. As evidências em sala de aula foram prévias e os registros correspondentes não identificam corretamente a sala no banco. As sessões formais ocorreram fora da sala de aula. Esse recorte não permite generalização estatística para outras salas ou condições sazonais. A posição, a altura e a orientação dos sensores nas sessões formais não foram documentadas; por isso, seus valores não são utilizados para caracterização ambiental do local.

A indisponibilidade de instrumentos de referência delimitou a avaliação dos sensores ao funcionamento, sem estimação de erro ou exatidão metrológica. A disponibilidade e o erro absoluto do relógio não receberam medição independente. As faixas locais de acompanhamento foram avaliadas como recurso de software, com configuração fora de execução ativa e histórico imutável das ocorrências. Seu caráter informacional segue a delimitação apresentada na introdução.
