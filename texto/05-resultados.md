# 5 Testes, resultados e discussão

Este capítulo reúne os resultados da avaliação técnica do protótipo: funcionamento dos sensores, estabilidade da cadeia IoT, recuperação de falhas, processamento dos dados e custo observado. A apresentação articula as três sessões formais aos ensaios complementares, relacionando as evidências aos critérios definidos e aos trabalhos discutidos na fundamentação.

## 5.1 Rastreabilidade da análise

As três sessões formais de estabilidade operacional foram executadas em 19, 20 e 21 de outubro de 2026, com o nó `classroom-node-physical-01`, firmware 0.1.2, configuração aplicada de 60 s e `run_id` exclusivo por sessão. A exportação somente leitura do MySQL foi preservada em `experimento/dados-brutos/sessoes-formais-2026-10-19-a-21.json`, com SHA-256 `9e32b809b22239f6c406905b9523306f87065f0e14d30c454df1dabd0d0cb85c`.

Os dados derivados foram produzidos por scripts versionados e estão em `experimento/dados-tratados/2026-10-21-sessoes-formais-v1/`. O procedimento construiu a grade temporal de cada sessão, classificou os registros, identificou lacunas e preservou os subconjuntos operacionais sem imputação. Portanto, valores ausentes não foram preenchidos artificialmente.

## 5.2 Avaliação funcional dos sensores

Nas janelas formais foram armazenadas 1.609 medições com valores válidos para temperatura do ar, umidade relativa e iluminância e estado temporal sincronizado. Em conjunto com a inicialização dos módulos e as observações qualitativas descritas na seção 3.8, esses registros sustentam a avaliação funcional dos sensores: produção de leituras, continuidade da aquisição e integração à cadeia de transmissão e armazenamento.

## 5.3 Estabilidade operacional da cadeia IoT

A Tabela 2 apresenta a duração efetiva, as posições esperadas, as medições armazenadas e os indicadores apurados em cada sessão.

Tabela 2 — Síntese das sessões formais de estabilidade operacional.

| Data | Duração efetiva | Posições esperadas | Medições armazenadas | Completude | P95 até a API | Lacunas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 19/10/2026 | 9 h 09 min 10 s | 550 | 549 | 99,818% | 2,353 s | 1 |
| 20/10/2026 | 8 h 46 min 46 s | 527 | 526 | 99,810% | 2,606 s | 1 |
| 21/10/2026 | 8 h 56 min 35 s | 537 | 534 | 99,441% | 2,511 s | 3 |
| **Acumulado** | **26 h 52 min 31 s** | **1.614** | **1.609** | **99,690%** | — | **5** |

Fonte: elaboração dos autores a partir da exportação preservada e da análise reproduzível das sessões formais (2026).

As três sessões superaram o critério de completude de 95% previsto para cada execução formal. Seus percentuais também ficaram acima de 99%, mas esse resultado não substitui o ensaio controlado de aquisição a cada 10 s descrito na seção 3.8. O erro de intervalo apresentou P95 de 0 s nas três janelas, e a latência P95 até a API permaneceu abaixo de 5 s. As cinco lacunas foram preservadas como `MISSING_SLOT`; a maior sequência consecutiva de ausências foi de uma posição em cada sessão. Não houve imputação, colisão de posições ou tentativa de ingestão `ALREADY_STORED` nos subconjuntos formais analisados.

A telemetria registrada nas janelas apresentou fila máxima de 0/256. O contador de perdas permaneceu em 1, valor já existente antes das sessões formais, sem nova perda telemetrizada. Na terceira sessão ocorreu troca de fonte de energia, com novo `boot_id`; o nó retornou `ONLINE`, com relógio sincronizado e fila vazia. O evento foi mantido no diário e a lacuna correspondente não foi removida da apuração.

## 5.4 API, banco de dados e visualização

O teste local controlado da API abrangeu 111 casos, sem resposta 5xx e com P95 interno de 149,558 ms no conjunto nominal. A auditoria do banco encontrou correspondência integral em 100 registros controlados, sem duplicidade canônica. Nas sessões formais, os 1.609 registros dentro das janelas analisadas também apresentaram identificadores únicos.

O ensaio T007, realizado com nó físico e rede real em 15 de outubro de 2026, mostrou 20 de 20 medições válidas e sincronizadas no dashboard autenticado. O P95 entre a leitura e a resposta HTML renderizada solicitada foi de 6,173 s, abaixo da meta de 10 s para essa consulta. No mesmo ensaio, o P95 entre a leitura e a API foi de 5,705 s, acima da meta específica de 5 s; nas sessões formais posteriores, os três valores de P95 até a API ficaram abaixo dela. A atualização visual periódica do navegador não foi cronometrada isoladamente, por isso o resultado da resposta HTML não representa a latência completa da atualização automática.

## 5.5 Recuperação de falhas e reprodutibilidade

No ensaio físico T010, o nó continuou a adquirir medições durante a indisponibilidade da conexão e preservou registros na fila após interrupção da alimentação. Com a reconexão, retomou os envios. A auditoria complementar dos 256 últimos envios marcados como `REPLAYED` identificou 254 respostas `STORED` e duas `ALREADY_STORED`: 254 medições únicas foram persistidas, sem duplicatas canônicas. A advertência de ocupação foi observada em 213/256, e o estado posterior registrou fila vazia (`0/256`) e uma perda contabilizada.

Os autores relataram que a fila chegou à capacidade de 256 registros, mas não há telemetria persistida desse instante. Também não foi cronometrado o tempo de esvaziamento após conexão estável. Portanto, T010 sustenta a recuperação funcional, o reenvio e a deduplicação, sem comprovar a meta temporal de esvaziamento em até cinco minutos.

O motor de análise T012 foi executado inicialmente com dados controlados e, após as sessões formais, aplicado à exportação real. O pipeline preservou a entrada bruta, registrou o checksum, produziu subconjuntos operacionais, classificações e arquivos de lacunas para cada execução. A reconciliação manteve a regra de janela semiaberta e a associação ao instante esperado mais próximo, sem modificar valores de origem.

## 5.6 Custo observado do protótipo

Os seis pedidos de componentes foram pagos em 28 de agosto de 2026 e totalizaram R$ 125,98, incluindo os valores de frete, tributos e demais encargos exibidos nos pedidos. Esse total inclui duas placas ESP32, mas apenas uma integrou o protótipo do TCC. A apuração utiliza os valores efetivamente pagos, documentados nas capturas dos pedidos, e não preços atuais de anúncios.

Os valores pagos nos seis pedidos são apresentados na Tabela 3. A quantidade adquirida é mantida no registro da compra, enquanto a atribuição ao protótipo considera os itens efetivamente destinados ao estudo.

Tabela 3 — Valores pagos nos pedidos de componentes.

| Item | Quantidade adquirida | Valor pago |
| --- | ---: | ---: |
| Placa de desenvolvimento ESP32-WROOM-32D-38P | 2 | R$ 52,48 |
| Módulo SHT31 | 1 | R$ 17,92 |
| Módulo VEML7700 | 1 | R$ 10,18 |
| Cabo USB de dados | 1 | R$ 14,69 |
| Protoboard MB102 | 1 | R$ 15,19 |
| Kit de jumpers Dupont | 1 | R$ 15,52 |
| **Total dos pedidos** |  | **R$ 125,98** |

Fonte: elaborada pelos autores a partir dos pedidos pagos em 28 ago. 2026.

Das duas placas incluídas no pedido, apenas uma foi destinada ao protótipo deste estudo. Considerando metade do valor pago pelas placas (R$ 26,24), o conjunto eletrônico de uma placa, SHT31 e VEML7700 corresponde a R$ 54,34. Com o cabo, a protoboard e os jumpers utilizados na montagem de bancada, o custo atribuível à unidade experimental é R$ 99,74; os R$ 26,24 da segunda placa não integram esse valor.

A apuração corresponde à montagem de bancada e exclui fonte de operação, encapsulamento, computador, internet, energia, mão de obra e infraestrutura já disponível. A expressão “baixo custo” caracteriza o gasto observado nesse recorte. Uma comparação econômica entre soluções ou a estimativa de uma unidade pronta para implantação exigiria incluir os respectivos recursos de operação e reprodução.

## 5.7 Discussão dos resultados

A completude obtida nas três sessões, associada à preservação das lacunas e dos identificadores, mostra que o desempenho pode ser examinado a partir de registros rastreáveis. A retomada após reinicialização e o ensaio de reenvio acrescentam evidências de recuperação da cadeia. O resultado relevante é a integração desses mecanismos: aquisição, comunicação e armazenamento permanecem vinculados a uma medição identificável, inclusive quando há falhas ou tentativas repetidas de entrega.

Hernández e Cañas (2024) também articulam sensoriamento, comunicação e armazenamento em uma solução destinada a salas de aula. Neste TCC, essa relação foi examinada em um único nó, com três variáveis e métricas próprias da cadeia de dados. A aproximação está na avaliação da integração; as diferenças de rede, escala e duração orientam uma comparação de abordagem, sem estabelecer equivalência numérica de desempenho entre os sistemas.

A distinção entre funcionamento da cadeia e desempenho metrológico também é importante para interpretar as leituras válidas. Rus et al. (2025) observaram associação entre séries acompanhada de diferenças sistemáticas em relação a um instrumento profissional. À luz dessa evidência, a continuidade e a validade técnica dos registros deste protótipo sustentam seu funcionamento, enquanto a estimação do erro de medição permanece uma etapa própria de avaliação comparativa.

O Quadro 2 sintetiza a relação entre critérios e evidências. Ele distingue os resultados quantitativos obtidos dos aspectos acompanhados operacionalmente e dos critérios cuja verificação permaneceu parcial.

**Quadro 2 — Síntese da avaliação dos critérios técnicos**

| Aspecto e critério | Evidência obtida | Alcance da verificação |
|---|---|---|
| Aquisição funcional dos três sensores | 1.609 registros formais com valores válidos e resposta qualitativa observada em testes exploratórios | Funcionamento verificado; ensaio específico de uma hora a 10 s não documentado |
| Completude: pelo menos 95% por sessão | De 99,441% a 99,818%; 99,690% no acumulado | Critério atendido nas três sessões |
| Regularidade: P95 dentro da tolerância definida na Tabela 1 | P95 do erro de intervalo de 0 s em cada sessão | Critério atendido no intervalo de 60 s |
| Latência até a API: P95 de até 5 s | De 2,353 s a 2,606 s nas sessões formais; 5,705 s no T007 anterior | Critério atendido nas sessões formais e excedido no ensaio anterior |
| Consistência integral e ausência de duplicatas | Correspondência em 100/100 registros controlados e identificadores únicos nas sessões formais | Verificação nos conjuntos auditados |
| Visualização: P95 de até 10 s até o dashboard | 20/20 medições conferidas; P95 de 6,173 s até a resposta HTML solicitada | Consulta verificada; atualização visual automática não cronometrada |
| Recuperação offline e esvaziamento em até 5 min | Persistência após interrupção de energia; 254 respostas `STORED` e duas `ALREADY_STORED` nos 256 envios auditados | Recuperação funcional verificada; tempo de esvaziamento não cronometrado |
| Disponibilidade: pelo menos 95% do tempo programado | Telemetria e continuidade dos registros | Acompanhamento operacional; percentual de tempo disponível não apurado |
| Sincronização: erro absoluto de até 2 s | Estado de sincronização presente em todos os registros formais | Marcação verificada; erro absoluto do relógio não medido independentemente |

**Fonte:** elaborado pelos autores a partir dos critérios e dos ensaios do projeto (2026).

## 5.8 Limitações

As sessões formais avaliaram a estabilidade operacional no local de trabalho de um dos autores. As evidências prévias em sala de aula permaneceram separadas, com as limitações de identificação descritas na metodologia. A duração e o número de unidades avaliadas delimitam a aplicação dos resultados às condições ensaiadas.

A avaliação dos sensores foi funcional, sem comparação com instrumento de referência. Os critérios temporais e os aspectos verificados parcialmente estão sintetizados no Quadro 2. O apoio à gestão permanece uma finalidade informacional da solução, cuja utilidade depende de avaliação posterior com usuários.

## 5.9 Resposta à pergunta de pesquisa

No recorte avaliado, o sistema atendeu aos critérios de completude, regularidade e latência até a API nas três sessões formais. As auditorias de registros, o ensaio de visualização e a recuperação offline complementaram a verificação funcional da aquisição, da transmissão, do armazenamento e da consulta. O Quadro 2 distingue esses resultados dos critérios que permaneceram sem medição independente ou com verificação parcial. Assim, a resposta à pergunta de pesquisa se apoia no funcionamento integrado demonstrado, dentro das condições e métricas efetivamente examinadas.
