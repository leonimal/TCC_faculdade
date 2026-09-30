# 3 Metodologia e projeto do sistema

Este capítulo apresenta o método definido para desenvolver e avaliar tecnicamente o sistema proposto. As decisões metodológicas foram estabelecidas antes da coleta principal para distinguir o que constitui implementação, o que será verificado por testes e o que somente poderá ser afirmado após a obtenção de dados reais.

## 3.1 Caracterização da pesquisa

A pesquisa possui caráter aplicado, pois envolve a construção de um artefato de monitoramento ambiental e sua avaliação técnica em condições de uso delimitadas. O artefato é composto por um nó IoT, uma interface de comunicação HTTP/JSON, uma aplicação web integrada à API e uma base de dados relacional. A avaliação será conduzida como estudo de caso em uma única sala de aula, sem a pretensão de generalizar automaticamente os resultados para outras salas, instituições ou períodos do ano.

O foco da pesquisa é verificar se a cadeia técnica preserva as medições desde a aquisição até a visualização: leitura dos sensores, identificação temporal, transmissão, persistência, consulta e apresentação. A comparação com instrumentos de referência, quando for possível, será tratada como avaliação parcial dos sensores. Assim, o funcionamento da infraestrutura de dados não será interpretado como comprovação de exatidão metrológica, e uma eventual comparação de sensores não substituirá os testes de completude, disponibilidade, latência e integridade da cadeia IoT.

## 3.2 Questão de pesquisa e escopo experimental

A questão de pesquisa é: “Em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?” Para respondê-la, o estudo medirá temperatura do ar, umidade relativa do ar e iluminância.

O escopo não contempla a medição de ruído, dióxido de carbono, material particulado, identificação de ocupantes, captura de áudio ou imagem, controle automático de equipamentos ou diagnóstico das causas de uma condição ambiental. O estudo também não avaliará aprendizagem, conforto percebido, decisões administrativas ou efeitos de intervenções na infraestrutura. Dashboard, relatórios e futuros alertas serão tratados como recursos informacionais que podem subsidiar investigações posteriores, sem comprovação de utilidade gerencial.

## 3.3 Ambiente e período de avaliação

A coleta foi autorizada para a sala de aula selecionada. A ABNT NBR 16401-2:2008 será usada apenas como referência institucional para contextualizar a interpretação térmica. Embora a norma oriente medições de temperatura e velocidade do ar na zona ocupada e preveja medições sucessivas de umidade relativa, o presente sistema não contém os instrumentos necessários para uma avaliação completa de temperatura operativa, velocidade do ar e temperatura radiante. Por isso, a instalação será documentada quanto à posição, altura e condições locais, mas não será apresentada como ensaio de conformidade com a norma (ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS, 2008).

O ambiente previsto é uma sala de aula da UNIP em Araçatuba, SP. A identificação da sala, sua posição de instalação, a altura dos sensores, a distância em relação a fontes de calor, janelas, luminárias e demais condições locais serão registradas antes da coleta-piloto. A autorização para realizar a coleta já foi confirmada pelos autores; sua identificação e evidência documental serão preservadas no registro da coleta antes do início das medições.

Será realizada inicialmente uma coleta-piloto correspondente a um período de aula. Sua finalidade é verificar a montagem, a conectividade, o registro temporal e a geração dos dados, sem incorporá-la automaticamente à caracterização ambiental principal. Após a aprovação do piloto, a coleta principal está planejada para duas semanas letivas consecutivas, de segunda a sexta-feira, no período noturno. A janela diária prevista inicia às 18h45 e termina às 22h00, enquanto as aulas ocorrem das 19h15 às 22h00.

A meta é obter dez noites de coleta, com mínimo de oito noites válidas. As datas de calendário permanecem a definir. Em cada execução serão registrados os horários efetivos de início e fim, o intervalo configurado, os eventos relevantes, as falhas identificadas e sua possível influência sobre a validade da noite.

## 3.4 Requisitos funcionais e não funcionais

O sistema deverá adquirir as três variáveis selecionadas, associá-las a um identificador único, ao dispositivo, ao instante de leitura, à versão de configuração e ao estado de sincronização temporal. A aplicação deverá receber e validar as mensagens, armazenar medições de forma idempotente, disponibilizar consultas e apresentar valores recentes, séries temporais, informações operacionais e relatórios descritivos.

O ciclo de leitura e transmissão será único e configurável entre 10 e 300 segundos, com valor inicial de 60 segundos. Antes de cada execução válida, o intervalo deverá ser registrado e permanecer fixo até o encerramento. Durante uma indisponibilidade de Wi-Fi ou da API, o nó deverá continuar adquirindo leituras, manter uma fila local persistente de até 256 registros e reenviar as pendências em ordem após a reconexão. A remoção local somente poderá ocorrer após a confirmação de armazenamento pela API ou da existência prévia do mesmo identificador.

Entre os requisitos não funcionais estão rastreabilidade, preservação dos dados brutos, segurança inicial de acesso à API, ausência de duplicatas, contabilização explícita de perdas, comunicação de estado operacional e tratamento visível de falhas. O sistema não deverá preencher artificialmente ausências nem ocultar leituras inválidas nos resultados técnicos.

## 3.5 Seleção dos sensores e do microcontrolador

O nó previsto utilizará uma placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, um módulo anunciado como SHT31 para temperatura e umidade relativa e um módulo anunciado como VEML7700 para iluminância. A seleção considerou compatibilidade com barramento I2C em 3,3 V, conectividade Wi-Fi, disponibilidade, documentação técnica, custo e viabilidade de integração ao protótipo. A placa foi adquirida em substituição à ESP32-C3 inicialmente prevista, por menor custo; sua identificação efetiva, pinagem e características elétricas serão verificadas no registro de montagem após a entrega.

As especificações de fabricante orientam a integração, mas não demonstram o desempenho das unidades comerciais recebidas. Antes da primeira energização serão conferidos a marcação da placa, o circuito USB, a porta serial, a saída de 3,3 V, a tensão aceita pelos módulos, a serigrafia e os endereços I2C. Os GPIOs de SDA e SCL somente serão definidos após essa inspeção; nenhum pino foi assumido previamente no firmware.

## 3.6 Arquitetura e fluxo de dados

A arquitetura é formada por sensores conectados ao microcontrolador com Wi-Fi, comunicação HTTP/JSON, rotas de API em uma aplicação Next.js, banco MySQL e interface web. O firmware obtém a leitura, atribui identificadores e metadados, mantém o registro em fila local até a confirmação e comunica sua situação operacional. A API valida a mensagem, registra a tentativa de entrega e persiste a medição canônica de forma idempotente. A aplicação consulta o banco no servidor para compor dashboard, histórico e relatórios.

Cada medição incluirá, no mínimo, identificador único da medição, identificador do dispositivo, identificador da inicialização do nó, número sequencial, instante da leitura, versão de configuração, valores medidos, estados de qualidade e informação sobre sincronização temporal. A telemetria operacional incluirá conexão, intensidade do sinal, ocupação da fila, perdas acumuladas e estado dos sensores. Essa separação permite distinguir uma condição ambiental observada de um problema de transmissão, fila ou sincronização.

## 3.7 Modelo de dados e rastreabilidade

O banco preservará a medição canônica separadamente das tentativas de entrega. Essa estrutura permite reconhecer reenvios legítimos, impedir duplicações pelo identificador da medição e registrar conflitos de integridade sem sobrescrever dados. A configuração do intervalo será versionada e sua aplicação pelo nó será confirmada ou rejeitada de modo auditável.

Os dados brutos serão mantidos sem edição, sobrescrita ou correção manual. Arquivos e consultas derivados serão produzidos por scripts identificados, com registro das entradas, parâmetros, regras e saídas. Para cada execução serão preservadas informações sobre versão do firmware, dispositivo, configuração aplicada, janela temporal, posição de instalação, eventos e falhas relevantes. Esse conjunto de metadados será utilizado para reconciliar os registros produzidos pelo nó com aqueles recebidos pela API, persistidos no banco e apresentados pela aplicação.

## 3.8 Protocolo de validação dos sensores

A avaliação inicial de cada variável consistirá em uma execução funcional de uma hora, com intervalo de 10 segundos e 360 tentativas esperadas. Serão aceitas apenas leituras numéricas dentro das faixas físicas adotadas para o protótipo: de -40 a 125 °C para temperatura, de 0 a 100% para umidade relativa e de 0 a 140.000 lx para iluminância. Leituras rejeitadas, erros de comunicação e falhas de integridade, quando aplicáveis, serão contabilizados.

A taxa de leituras válidas deverá ser de pelo menos 99%. Quando houver instrumento de referência adequado, as observações serão pareadas temporalmente e serão calculados erro individual, viés, erro absoluto médio (MAE), raiz do erro quadrático médio (RMSE) e percentil 95 do erro absoluto. Para iluminância com referência igual ou superior a 50 lx, será calculado também o erro percentual absoluto médio (MAPE).

As metas internas condicionais são MAE de até 0,5 °C e módulo do viés de até 0,3 °C para temperatura; MAE de até 5 pontos percentuais de umidade relativa (p.p. UR) e módulo do viés de até 3 p.p. UR; e MAPE de até 15% em iluminância a partir de 50 lx, ou MAE de até 10 lx abaixo dessa faixa. Tais metas não constituem limites normativos nem reproduzem automaticamente a especificação do fabricante. Uma classificação comparativa somente será emitida se o instrumento de referência possuir identificação, resolução, estado de calibração ou incerteza documentados e desempenho adequadamente superior. Sem essa condição, a comparação será descritiva e a evidência permanecerá funcional.

## 3.9 Validação ponta a ponta

A validação ponta a ponta verificará a passagem de uma leitura pelo firmware, API, MySQL e dashboard. Em execução online controlada, serão comparados os identificadores, valores, unidades, timestamps, configuração aplicada e estados de qualidade produzidos e recebidos. Serão observadas completude, perdas, regularidade temporal, latência até a API, latência até o dashboard, disponibilidade, consistência e duplicidade.

Também serão executados testes de configuração com intervalos de 10, 60 e 300 segundos, incluindo rejeição de valores fora da faixa e persistência após reinicialização. Para a operação offline, serão interrompidos Wi-Fi ou API de maneira controlada para verificar continuidade da aquisição, persistência após reinicialização, advertência a partir de 205 registros, comportamento com fila cheia, reenvio em ordem, confirmação idempotente e contabilização de perdas. A sincronização temporal será conferida no início e no fim das execuções, além de ser observada após uma reinicialização sem rede.

Os ensaios locais da API, do banco de dados e do dashboard já constituem evidência preliminar da parte de software. Entretanto, a validação ponta a ponta somente será considerada concluída após a repetição com o firmware executando na placa recebida e na rede de avaliação.

## 3.10 Métricas e critérios de aceitação

As métricas adotadas são apresentadas na Tabela 1. Os valores são critérios internos de engenharia definidos antes da coleta; não representam limites ambientais normativos.

**Tabela 1 — Métricas e critérios de aceitação da cadeia ponta a ponta**

| Métrica | Definição operacional | Critério de aceitação |
|---|---|---|
| Completude | Registros únicos armazenados divididos pelos registros esperados | Pelo menos 99% em teste controlado e 95% em cada noite válida |
| Perda | Diferença entre registros esperados e registros únicos armazenados | No máximo 1% em teste controlado; toda perda identificada |
| Regularidade temporal | Erro absoluto entre intervalo observado e configurado | P95 até o maior valor entre 1 s e 5% do intervalo |
| Latência até a API | Recebimento pela API menos instante da leitura | P95 de até 5 s durante operação online |
| Latência ponta a ponta | Exibição no dashboard menos instante da leitura | P95 de até 10 s durante operação online |
| Disponibilidade | Tempo operacional dividido pelo tempo programado | Pelo menos 95% em cada noite válida |
| Consistência | Registros equivalentes entre as camadas divididos pelos auditados | 100% |
| Duplicidade | Identificadores repetidos no banco | Zero |
| Sincronização temporal | Diferença entre relógio do nó e referência | Até 2 s quando sincronizado |

**Fonte:** elaborada pelos autores com base nos critérios internos do projeto (2026).

A quantidade esperada será calculada sobre a janela semiaberta entre início, inclusive, e término, exclusive: `N_esperado = teto((t_fim - t_início) / intervalo)`. O instante `t_início` corresponderá à primeira aquisição programada da execução. A função teto é necessária porque a grade inclui essa posição inicial; por exemplo, uma janela de 5 minutos e 30 segundos com intervalo de 60 segundos contém seis posições esperadas. Registros fora da janela serão preservados, mas não entrarão no denominador de completude. Uma noite será válida somente se cobrir a janela planejada, alcançar ao menos 95% de completude e disponibilidade, manter o intervalo registrado, possuir ao menos 99% de registros sincronizados, não apresentar inconsistência ou duplicidade e conter registro de eventos e falhas.

## 3.11 Tratamento e análise dos dados

Serão formados dois subconjuntos analíticos. O subconjunto operacional reunirá medições válidas, tentativas com falha, perdas, duplicidades, reenvios, eventos de fila, registros fora da janela e registros sem sincronização. Ele será usado para avaliar a robustez técnica da cadeia. O subconjunto ambiental principal conterá apenas medições válidas, únicas, sincronizadas, dentro da janela prevista e pertencentes a noites válidas. Dados da coleta-piloto e de noites inválidas não integrarão a caracterização ambiental principal, mas serão preservados para análise de falhas.

As posições esperadas serão geradas a partir do início de cada execução e do intervalo configurado. Uma posição sem medição válida e única será identificada como `MISSING_SLOT`. Serão calculados total e percentual de ausências, número de lacunas, maior sequência consecutiva sem leitura válida e, quando identificável, a causa correspondente. Não haverá interpolação, preenchimento pela média ou repetição do último valor na análise principal.

Reenvios realizados após indisponibilidade continuarão elegíveis quando conservarem instante sincronizado, valores válidos e identificador único. Valores incomuns dentro da faixa física não serão removidos automaticamente. Uma exclusão manual exigirá evidência de falha técnica e registrará motivo, autor e data; quando puder influenciar materialmente uma conclusão, será feita análise de sensibilidade com e sem a exclusão.

## 3.12 Análise de custo e reprodutibilidade

O caráter de baixo custo será avaliado a partir do valor efetivamente pago pelos componentes do nó. A apuração registrará modelo, quantidade, fornecedor, preço unitário, frete, descontos, data da compra e custo total entregue. O custo do protótipo físico será apresentado separadamente dos recursos de desenvolvimento já disponíveis, como computador, rede local e instrumentos emprestados. Licenças de software gratuitas não serão contabilizadas como despesa de aquisição, mas essa condição será declarada para evitar que ausência de licença seja confundida com custo total nulo.

A análise distinguirá o custo da unidade experimental do custo estimado de reprodução. A primeira medida utilizará as despesas reais da compra; a segunda será calculada somente se houver uma lista de materiais confirmada após a montagem, incluindo placa, sensores, alimentação, cabos, conectores e encapsulamento. Não serão usados preços atuais de anúncios como se fossem gastos realizados, e qualquer comparação com alternativas indicará a data e as condições da consulta.

Até que os autores definam um custo-alvo ou um referencial explícito de comparação, “baixo custo” será tratado como critério de projeto, não como resultado comprovado. A conclusão somente qualificará o valor observado depois de explicitar esse referencial e os itens incluídos no cálculo.

A reprodutibilidade será examinada pela disponibilidade do código, contrato da API, migrações, versões das dependências, lista de materiais, ligações elétricas confirmadas, parâmetros de configuração, protocolo de testes e scripts de análise. Limitações causadas por placa genérica, ausência de peça reserva, instrumentos de referência e infraestrutura externa serão registradas junto ao custo.

## 3.13 Aspectos éticos, privacidade e autorização

O sistema coletará exclusivamente medições ambientais e telemetria operacional do nó. Não haverá identificação de pessoas, captação de imagem ou áudio, contagem de ocupantes ou associação de dados a alunos, docentes ou funcionários. O estudo não pretende avaliar comportamento, desempenho acadêmico ou percepção dos ocupantes.

Apesar de não envolver dados pessoais previstos, a instalação e a coleta na sala dependerão de autorização formal da instituição ou do responsável competente. A autorização, a identificação da sala e as datas serão registradas antes da coleta-piloto. Relatórios públicos ou acadêmicos deverão omitir credenciais, chaves de API, endereços internos de rede e quaisquer informações que possam comprometer a segurança da infraestrutura.

## 3.14 Limitações metodológicas

O estudo avaliará uma única sala e um período delimitado, utilizando uma unidade de cada componente inicialmente selecionado. Essa configuração restringe a repetição por hardware e não permite generalização estatística para outras salas ou condições sazonais. A seleção da placa genérica também exige que sua pinagem e funcionamento sejam confirmados na unidade recebida antes de qualquer conclusão sobre o protótipo.

A validação dos sensores será parcial e dependerá da disponibilidade de instrumentos de referência adequados. Sem referência com desempenho documentado, a pesquisa poderá demonstrar leitura funcional e comparar valores de forma descritiva, mas não atribuir precisão metrológica ao sistema. Por fim, parâmetros de alertas ambientais normativos permanecem fora da implementação avaliável até a conferência das normas técnicas originais aplicáveis. As faixas locais de acompanhamento serão avaliadas somente como recurso de software: devem ser configuradas antes da execução, permanecer congeladas durante a coleta válida e produzir histórico imutável de alertas locais para leituras válidas e temporalmente sincronizadas.
