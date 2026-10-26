<!-- Arquivo consolidado gerado. Edite os capítulos individuais em texto/. -->



# Resumo

Este trabalho teve como objetivo desenvolver e avaliar tecnicamente um sistema de Internet das Coisas (IoT) de baixo custo destinado ao monitoramento de temperatura do ar, umidade relativa e iluminância em salas de aula. A pesquisa aplicada envolveu a montagem de um nó físico com ESP32 e sensores SHT31 e VEML7700, além de firmware com fila persistente, comunicação HTTP/JSON, interface de programação de aplicações (API), banco de dados MySQL e aplicação web para consulta, histórico e relatórios. A avaliação incluiu testes controlados dos componentes de software e da recuperação offline, além de testes preliminares com o protótipo em sala de aula. A estabilidade operacional foi examinada em três sessões formais realizadas em ambiente de trabalho, com intervalo de aquisição de 60 s. Em quase 27 horas de sessões formais, o sistema armazenou 99,7% das medições previstas, todas com valores válidos e horário sincronizado. O ensaio de interrupção da conexão e da alimentação mostrou que os registros pendentes foram preservados e enviados após a reconexão, sem duplicação no banco de dados. Os resultados sustentam a integração da aquisição, transmissão, armazenamento e consulta, com preservação dos registros e das falhas para uma análise rastreável do funcionamento técnico.

Palavras-chave: Internet das Coisas; monitoramento ambiental; sensores de baixo custo; salas de aula; rastreabilidade de dados.



# Abstract

This study aimed to develop and technically evaluate a low-cost Internet of Things (IoT) system designed to monitor air temperature, relative humidity, and illuminance in classrooms. This applied research involved assembling a physical node with an ESP32 board and SHT31 and VEML7700 sensors, as well as firmware with a persistent queue, HTTP/JSON communication, an application programming interface (API), a MySQL database, and a web application for queries, history, and reports. The evaluation included controlled tests of the software components and offline recovery, as well as preliminary tests of the prototype in a classroom. Operational stability was assessed in three formal sessions conducted in a workplace at a 60-second acquisition interval. Across nearly 27 hours of formal sessions, the system stored 99.7% of the expected measurements, all with valid values and synchronized timestamps. The connection and power interruption test showed that pending records were preserved and transmitted after reconnection, without duplicate database records. The results support the integration of acquisition, transmission, storage, and queries, with records and failures preserved for a traceable analysis of technical operation.

Keywords: Internet of Things; environmental monitoring; low-cost sensors; classrooms; data traceability.



# 1 Introdução

## 1.1 Contextualização

Entre o início e o fim de uma aula, temperatura do ar, umidade relativa e iluminância podem mudar. Uma medição isolada registra apenas um instante desse período; o monitoramento contínuo permite observar as variações e identificar lacunas na coleta. Em um estudo com temperatura e umidade relativa monitoradas em 3.666 salas de aula, Botana Martinez et al. (2025) identificaram diferenças de temperatura entre salas de um mesmo edifício e episódios de calor que as médias do período completo mostravam com menos clareza. Esse resultado reforça a importância de conservar o histórico e o contexto de cada medição.

No contexto deste trabalho, o monitoramento ambiental é tratado como um problema de aquisição, transmissão, armazenamento e visualização de dados. O sistema desenvolvido utiliza um nó de Internet das Coisas (IoT) de baixo custo para obter as três variáveis selecionadas e transmitir as medições por rede Wi-Fi a uma interface de programação de aplicações (API). A aplicação disponibiliza histórico, indicadores e relatórios, preservando o instante da medição, a configuração aplicada, o estado de comunicação e eventuais falhas. Essa rastreabilidade permite avaliar tecnicamente o percurso dos dados.

Temperatura do ar, umidade relativa e iluminância permitem acompanhar condições físicas selecionadas da sala. A interpretação do conforto térmico também envolve outras condições físicas e características dos ocupantes (Associação Brasileira de Normas Técnicas, 2008). Valores persistentemente muito elevados ou reduzidos podem sinalizar situações que justifiquem investigação mais aprofundada, incluindo percepção dos ocupantes, ocupação, ventilação, vestimentas e outras variáveis pertinentes. Nesse contexto, a organização de registros ambientais oferece uma base para identificar ocorrências e orientar análises complementares.

## 1.2 Problema de pesquisa

Para que esse histórico possa ser analisado, cada leitura precisa ser identificada temporalmente e preservada até a consulta. Também é necessário tornar visíveis as ausências e as falhas, pois elas podem ser confundidas com mudanças nas condições ambientais. O desafio técnico está em manter essas informações ao longo das etapas de aquisição, comunicação e armazenamento.

O problema investigado concentra-se, portanto, no desenvolvimento de uma solução de baixo custo capaz de coletar, identificar temporalmente, transmitir, armazenar e apresentar dados ambientais de modo rastreável. A avaliação realizada priorizou o desempenho técnico da cadeia de monitoramento e sua capacidade de disponibilizar informações que possam subsidiar análises posteriores sobre as condições do ambiente.

Dessa forma, estabelece-se a seguinte pergunta de pesquisa: **em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?**

## 1.3 Objetivo geral

Desenvolver e avaliar tecnicamente um sistema IoT de baixo custo para monitoramento ambiental em uma sala de aula, por meio da avaliação funcional dos sensores e de testes ponta a ponta da aquisição, transmissão, armazenamento e visualização dos dados.

## 1.4 Objetivos específicos

Para alcançar o objetivo geral, foram definidos os seguintes objetivos específicos:

1. Revisar a literatura e as referências técnicas relacionadas ao monitoramento ambiental, à Internet das Coisas e ao uso de sensores de baixo custo em salas de aula.
2. Definir os requisitos funcionais e técnicos do sistema, incluindo as métricas e os critérios de aceitação para sua avaliação.
3. Projetar e montar um nó IoT de baixo custo com os sensores ambientais selecionados e conectividade Wi-Fi.
4. Desenvolver o firmware responsável pela aquisição, identificação temporal e transmissão periódica das medições, incluindo o tratamento de falhas de leitura e comunicação.
5. Implementar uma API e um banco de dados MySQL para validar, receber, armazenar e consultar os dados ambientais.
6. Desenvolver uma aplicação web com visualização, histórico, indicadores, relatórios e ocorrências informativas baseadas em faixas locais versionadas, organizando os dados para subsidiar a identificação de condições que possam demandar investigação pela gestão escolar.
7. Avaliar funcionalmente o comportamento dos sensores, registrando os procedimentos, a validade das leituras, a continuidade da aquisição e as limitações da avaliação.
8. Avaliar o funcionamento ponta a ponta do sistema por meio de métricas de completude ou perda de dados, latência, disponibilidade e consistência entre as medições, a API, o banco de dados e a aplicação web.
9. Analisar o custo, as limitações técnicas, a reprodutibilidade e as possibilidades de expansão da solução.

## 1.5 Justificativa

Na arquitetura proposta, cada sala monitorada depende de um nó físico. Por isso, o custo de uma unidade importa para uma possível ampliação do monitoramento a outras salas. A seleção dos componentes considerou esse gasto junto com a disponibilidade, a documentação técnica e os recursos necessários para registrar e transmitir as medições. O estudo apura o valor pago pelo protótipo de bancada; uma implantação em várias salas exigiria uma análise de custo mais ampla.

O trabalho também se justifica pela integração de hardware, firmware, comunicação HTTP/JSON, API, banco de dados e aplicação web. Estudos anteriores demonstram a viabilidade de integrar sensores ambientais em arquiteturas conectadas para salas de aula e, ao mesmo tempo, a necessidade de comparar o comportamento de sensores instalados com referências adequadas (Hernández; Cañas, 2024; Rus et al., 2025). No presente estudo, essa integração permite avaliar não apenas se uma leitura é produzida, mas também se ela é identificada, transmitida, persistida, consultada e apresentada de forma consistente, inclusive diante de falhas de comunicação e reenvios.

O sistema organiza medições em visualizações, históricos, indicadores, relatórios e ocorrências informativas baseadas em faixas locais versionadas. Esses recursos podem subsidiar a identificação de situações recorrentes que mereçam investigação pela gestão escolar, ao disponibilizar registros rastreáveis para consulta. Essa finalidade orientou a organização das informações e dos recursos da aplicação.

Além da aplicação potencial, a proposta oferece um caso de estudo para documentar requisitos, decisões de projeto, critérios de aceitação, tratamento de dados ausentes e limitações de sensores de baixo custo. A avaliação realizada registra o funcionamento dos sensores na aquisição contínua, sua resposta a variações e sua integração às demais etapas do sistema, contribuindo para a análise da viabilidade técnica do protótipo.

## 1.6 Delimitação

O estudo está delimitado ao desenvolvimento e à avaliação técnica de um sistema IoT para monitorar temperatura do ar, umidade relativa e iluminância. Foram avaliados o nó IoT, a aquisição, a transmissão, o armazenamento, a consulta e a visualização das medições, bem como o comportamento funcional dos sensores na cadeia implementada. A avaliação reuniu evidências físicas prévias em sala de aula e três sessões formais de estabilidade operacional realizadas no local de trabalho de um dos autores.

Os dados obtidos são utilizados para descrever as grandezas monitoradas e identificar condições que possam demandar investigação posterior. O estudo não realiza diagnóstico das causas dessas condições, nem avaliação de conforto percebido, conformidade ambiental, aprendizagem ou impacto de intervenções na infraestrutura. As faixas locais de acompanhamento têm caráter informacional, servindo para destacar medições que mereçam análise complementar, sem substituir avaliações técnicas específicas.

## 1.7 Estrutura do trabalho

Este trabalho está organizado em seis capítulos. O primeiro apresenta a contextualização, o problema de pesquisa, os objetivos, a justificativa e a delimitação do estudo. O segundo reúne a fundamentação teórica e os trabalhos relacionados ao monitoramento ambiental, à IoT e aos sensores de baixo custo. O terceiro descreve o método, o protocolo experimental, os requisitos e os critérios de avaliação. O quarto documenta o desenvolvimento do nó IoT, da API, do banco de dados e da aplicação web. O quinto apresenta os testes, os resultados observados e sua discussão em relação aos critérios técnicos e à literatura. Por fim, o sexto sintetiza as conclusões, as contribuições demonstradas e as possibilidades de trabalhos futuros.



# 2 Fundamentação teórica e trabalhos relacionados

Este capítulo reúne os conceitos que fundamentam o monitoramento ambiental e a avaliação de sistemas IoT de baixo custo. A discussão relaciona as grandezas medidas, as características dos sensores e a qualidade dos dados às decisões de aquisição, comunicação, armazenamento e apresentação. Os trabalhos relacionados situam a contribuição do protótipo nesse conjunto de temas.

## 2.1 Monitoramento ambiental em salas de aula

O monitoramento ambiental em uma sala de aula consiste em obter, identificar temporalmente e organizar dados sobre grandezas físicas observadas em um ponto e período definidos. Para que esses dados sejam interpretáveis, devem permanecer associados ao local de instalação, à configuração de aquisição, ao instante da leitura e aos eventos que possam afetar a medição ou a comunicação.

Hernández e Cañas (2024) apresentam um dispositivo IoT destinado à medição de variáveis ambientais em salas de aula universitárias, incluindo temperatura do ar, umidade relativa e iluminância. O trabalho evidencia a viabilidade de integrar sensores ambientais, comunicação em rede e armazenamento, oferecendo uma referência de arquitetura para o monitoramento desses espaços.

Em outra escala, Botana Martinez et al. (2025) analisaram dados contínuos de temperatura e umidade relativa provenientes de 3.666 salas de aula. O estudo mostra que séries temporais podem revelar diferenças entre salas de um mesmo edifício e ocorrências que medidas de tendência central isoladas não representam adequadamente. Esse resultado reforça a importância de preservar o histórico e o contexto temporal das medições.

Esses estudos aproximam duas necessidades do monitoramento: produzir registros ao longo do tempo e conservar informações que permitam interpretar sua origem e suas condições de aquisição. No presente TCC, essa relação orienta a escolha das três grandezas e a ênfase na rastreabilidade da cadeia de dados.

## 2.2 Temperatura do ar e umidade relativa

Temperatura do ar e umidade relativa são grandezas físicas distintas. A primeira descreve o estado térmico do ar no ponto de leitura. A umidade relativa expressa, em porcentagem, a razão entre a pressão parcial do vapor de água presente no ar e a pressão de saturação do vapor à mesma temperatura. Dessa forma, alterações de temperatura podem modificar a umidade relativa mesmo quando a quantidade de vapor presente permanece semelhante (Allen et al., 1998).

Em sistemas digitais, as duas grandezas podem ser adquiridas pelo mesmo componente. O SHT3x-DIS, família à qual pertence o SHT31 selecionado para o protótipo, fornece saída digital para temperatura e umidade relativa, possui interface I2C e disponibiliza endereços selecionáveis pelo usuário (Sensirion AG, 2022). Essas características favorecem sua integração ao nó IoT e orientam a documentação da interface, da alimentação e do endereço de comunicação.

A edição de 2008 da ABNT NBR 16401-2, disponibilizada pela UNIP e consultada neste trabalho como referência contextual, trata do conforto térmico em recintos providos de ar-condicionado. Seus parâmetros consideram temperatura operativa, velocidade do ar, umidade relativa e condições dos ocupantes, como vestimenta e atividade (Associação Brasileira de Normas Técnicas, 2008). Essa abrangência delimita a interpretação dos registros do protótipo: temperatura do ar e umidade relativa oferecem informações para acompanhamento, enquanto a avaliação de conforto e de conformidade requer as demais grandezas e procedimentos pertinentes. A norma térmica citada não estabelece requisitos de iluminância.

## 2.3 Iluminância e condições visuais

Iluminância é a grandeza expressa em lux utilizada para descrever a luz incidente em determinado ponto e plano de medição. Uma leitura pontual, por sua natureza, representa as condições no local, na altura e na orientação em que o sensor foi instalado; ela não demonstra, por si só, a uniformidade da iluminação de toda a sala ou a experiência visual dos ocupantes.

O VEML7700 é um sensor digital de luz ambiente com interface I2C, faixa de medição ajustável e tempos de integração configuráveis (Vishay Semiconductors, 2024). Sua aplicação exige considerar a posição, a altura, a orientação e eventuais obstruções do sensor, pois esses fatores integram o contexto espacial da leitura.

Guillán Lorenzo et al. (2022) compararam o VEML7700 e outros sensores comerciais de baixo custo com um instrumento profissional em uma plataforma IoT de medição de iluminância solar. Embora o ambiente externo e a finalidade do estudo sejam diferentes dos deste TCC, o trabalho oferece evidência de que o desempenho do componente deve ser analisado por comparação e sob condições de operação explicitadas, em vez de ser inferido apenas do datasheet.

Para o projeto, a iluminância complementa os registros de temperatura e umidade relativa como uma grandeza de acompanhamento ambiental. O significado das faixas locais usadas na aplicação é discutido na seção 2.7.

## 2.4 Internet das Coisas e monitoramento ambiental

Neste trabalho, Internet das Coisas é empregada para designar a integração entre um dispositivo com capacidade de sensoriamento, conectividade de rede e processamento local, e serviços que recebem, armazenam e apresentam seus dados. A conexão entre o mundo físico e a aplicação depende tanto da leitura dos sensores quanto da identificação do dispositivo, da configuração, da comunicação e da capacidade de informar seu estado operacional.

O NIST descreve dispositivos IoT como equipamentos que combinam capacidades físicas ou de sensoriamento com interfaces de rede e propõe capacidades básicas de cibersegurança para protegê-los e proteger os dados relacionados (Fagan et al., 2020). Essa referência fundamenta a importância de identificar o nó, restringir o acesso lógico, controlar configurações, proteger dados e expor o estado operacional como aspectos de projeto.

No sistema proposto, essa integração é organizada em aquisição, comunicação, armazenamento e apresentação. A articulação entre essas etapas orienta a avaliação técnica: uma medição precisa conservar sua identidade e seu contexto até a consulta posterior. A arquitetura e sua implementação são detalhadas nos capítulos 3 e 4.

## 2.5 Sensores de baixo custo, comparação e qualidade dos dados

Especificações de fabricante descrevem o desempenho declarado de um componente em condições e procedimentos próprios. Elas são necessárias para conhecer faixas de operação, interfaces e recursos do sensor, mas não substituem a avaliação da unidade adquirida no circuito, na instalação e no ambiente de uso do protótipo.

O procedimento de calibração e de comparação com referência deve deixar explícitos o instrumento utilizado, as condições de medição e a forma de estimar diferenças entre valores observados e de referência. O NIST/SEMATECH ressalta que resultados de calibração devem ser analisados no contexto da relação entre o instrumento sob avaliação e padrões ou referências adequados (NIST/SEMATECH, s. d.). Essa orientação fundamenta a identificação e a documentação da referência antes de qualquer classificação comparativa.

Uma comparação metrológica pode utilizar viés, erro absoluto médio (MAE), raiz do erro quadrático médio (RMSE) e percentil 95 do erro absoluto; em faixas aplicáveis, também pode utilizar o erro percentual absoluto médio (MAPE). Esses indicadores descrevem diferenças em relação à referência. A avaliação funcional, por sua vez, examina inicialização, validade das leituras segundo as faixas adotadas, resposta qualitativa, continuidade da aquisição e registro de falhas. As duas abordagens respondem a perguntas distintas sobre o sensor e sua integração ao sistema.

Em duas salas universitárias, Rus et al. (2025) compararam sensores integrados a uma automação predial com um instrumento profissional e observaram correlações elevadas acompanhadas de deslocamentos sistemáticos entre as leituras. O caso evidencia a importância de analisar conjuntamente associação entre séries, viés, posição de instalação e qualidade da referência. A diferença entre a arquitetura KNX desse estudo e a solução aqui desenvolvida é retomada na síntese dos trabalhos relacionados.

A qualidade dos dados também inclui o tratamento explícito de falhas, duplicidades, lacunas e estados de sincronização. A preservação dessas informações permite examinar a continuidade da aquisição e distinguir registros observados de eventuais valores estimados durante uma análise.

## 2.6 Aquisição, comunicação, armazenamento e rastreabilidade

Uma cadeia de monitoramento ambiental inicia na aquisição, mas só se torna auditável quando conserva a identidade da medição e seu contexto até a consulta posterior. Por isso, cada registro do sistema possui identificador único, identificação do dispositivo, identificação da inicialização, número de sequência, versão de configuração, instante da leitura e estado de sincronização temporal.

O uso de mensagens HTTP/JSON permite transportar a leitura e seus metadados por uma interface explícita. No entanto, a confirmação de uma requisição não elimina a necessidade de tratamento de falhas de rede. O projeto adota fila local persistente para medições ainda não confirmadas, reenvio em ordem e remoção somente após a API informar armazenamento ou existência prévia do mesmo identificador. Dessa forma, a idempotência é tratada como requisito de integridade da cadeia e não como mera conveniência de implementação.

O armazenamento relacional mantém a medição canônica e registra tentativas de entrega separadamente. Esse desenho permite distinguir reenvio legítimo de conflito de integridade e oferece base para verificar completude, perdas, duplicidade, latência, disponibilidade e consistência. Os limites quantitativos usados nos testes são metas internas previamente definidas pelo projeto; não são valores extraídos de normas ambientais.

## 2.7 Dashboards, relatórios e alertas

Dashboards e relatórios cumprem, neste estudo, a função de tornar consultáveis as medições e os estados técnicos do sistema. Os valores mais recentes, as séries temporais, as lacunas, a configuração aplicada, a ocupação da fila e as perdas comunicadas pelo nó são apresentados sem substituir leituras inválidas por valores estimados.

Uma classificação ambiental baseada em limiares exigiria grandeza medida, regra aplicada, duração considerada, fonte do parâmetro e limites de interpretação. O sistema não realiza essa classificação. Seus alertas locais registram quando uma leitura válida e sincronizada fica fora de uma faixa definida pela administração, preservando versão, limites e justificativa da regra aplicada.

Esses recursos organizam informações para a investigação de ocorrências e de sua recorrência. A interpretação dos registros e a escolha de eventuais intervenções dependem de análise técnica e do contexto de utilização do ambiente.

## 2.8 Trabalhos relacionados e posição do estudo

Os trabalhos selecionados se aproximam deste TCC por aspectos diferentes, conforme sintetiza o Quadro 1.

**Quadro 1 — Síntese dos trabalhos relacionados**

| Trabalho | Escopo e método | Relação com este TCC | Diferença relevante |
|---|---|---|---|
| Hernández e Cañas (2024) | Dispositivo IoT para temperatura, umidade relativa, iluminância, dióxido de carbono e ruído em salas universitárias | Integração de sensores ambientais e comunicação em rede | Maior número de variáveis e outra organização de rede |
| Botana Martinez et al. (2025) | Monitoramento contínuo de temperatura e umidade relativa em 3.666 salas | Uso de séries temporais e contextualização das medições | Escala distrital, sensores comerciais e foco em exposição ao calor |
| Rus et al. (2025) | Comparação entre sensores KNX instalados e instrumento profissional em duas salas universitárias | Necessidade de comparação, análise de viés e registro da instalação | Automação predial KNX, conjunto de variáveis e método misto distintos |
| Guillán Lorenzo et al. (2022) | Comparação de sensores de iluminância de baixo custo, incluindo VEML7700, com instrumento profissional | Evidência para a avaliação comparativa do sensor selecionado | Medição solar em ambiente externo, não iluminação de sala de aula |

**Fonte:** elaborado pelos autores (2026).

Os trabalhos se aproximam pelo uso de sensores e pela organização de medições ambientais, mas diferem em escala, arquitetura e finalidade de avaliação. Essa diversidade orienta uma comparação conceitual entre soluções e procedimentos; os indicadores numéricos de estudos conduzidos em outros ambientes dependem de suas condições próprias de medição.

A contribuição deste estudo está na documentação e na avaliação de uma cadeia IoT de baixo custo, com ênfase na rastreabilidade das medições, na integridade dos registros e na recuperação após falhas de comunicação. O núcleo de três variáveis permite acompanhar a aquisição, a identificação temporal, a transmissão HTTP/JSON, a persistência idempotente e a visualização. A avaliação funcional dos sensores e os testes da infraestrutura de dados fornecem evidências complementares sobre o funcionamento do protótipo.



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



# 6 Considerações finais

Este trabalho desenvolveu e avaliou tecnicamente um sistema IoT de baixo custo para registrar temperatura do ar, umidade relativa e iluminância. O protótipo integrou um nó físico, firmware, comunicação HTTP/JSON, API, MySQL e aplicação web com dashboard, relatórios e telemetria operacional.

## 6.1 Síntese e resposta à pergunta de pesquisa

A avaliação respondeu à pergunta de pesquisa ao demonstrar atendimento aos critérios de completude, regularidade e latência até a API nas sessões formais, complementado por verificações de armazenamento e visualização. Em 26 h 52 min 31 s de observação acumulada, foram armazenadas 1.609 medições para 1.614 posições esperadas, com completude de 99,690%. A latência P95 até a API variou entre 2,353 s e 2,606 s. O alcance dos demais critérios foi discriminado na síntese dos resultados.

A principal contribuição foi integrar o monitoramento das três grandezas a mecanismos de rastreabilidade e recuperação de falhas. Identificadores únicos, configuração versionada, fila persistente e confirmação idempotente permitiram acompanhar o percurso das medições e distinguir novas aquisições de reenvios. A preservação das lacunas, dos eventos e dos arquivos de origem também ofereceu uma base verificável para a análise dos resultados.

## 6.2 Atendimento aos objetivos

A revisão da literatura orientou a seleção das variáveis e a distinção entre avaliação funcional, desempenho metrológico e integridade dos dados. A definição prévia dos requisitos e dos critérios sustentou o desenvolvimento do nó IoT, do firmware, da API, do banco relacional e da aplicação web com consulta, histórico, relatórios e alertas locais.

O objetivo de avaliação dos sensores foi atendido em seu recorte funcional, com resposta qualitativa a variações e produção de leituras válidas nas sessões formais. A cadeia foi examinada por ensaios de API, banco, dashboard e recuperação da fila, além das três sessões de estabilidade. Os procedimentos e os scripts de análise documentaram a relação entre as evidências e os resultados.

A análise de custos apurou R$ 99,74 para a montagem de bancada de um nó, incluindo a placa, os sensores e os acessórios utilizados. Esse valor caracteriza o protótipo avaliado; fonte de operação, encapsulamento e infraestrutura de servidor e rede permanecem componentes de uma futura apuração de implantação.

## 6.3 Limitações e trabalhos futuros

O alcance dos resultados corresponde a um único nó, com uma unidade de cada sensor, avaliado em sessões formais fora da sala de aula. A evidência obtida é técnico-funcional e se refere às condições e às métricas efetivamente examinadas.

Como trabalhos futuros, recomendam-se novas sessões em salas de aula e em outros períodos, comparação com instrumentos de referência adequados, medição independente da disponibilidade e da atualização visual automática, além de encapsulamento e apuração do custo de uma unidade pronta para implantação. Também cabem hospedagem com gestão de credenciais e backup e avaliação da experiência de uso por gestores. A eventual adoção de critérios ambientais para os alertas dependerá da conferência das fontes técnicas originais aplicáveis.



# Referências

ALLEN, Richard G.; PEREIRA, Luis S.; RAES, Dirk; SMITH, Martin. *Crop evapotranspiration: guidelines for computing crop water requirements*. Rome: FAO, 1998. (FAO Irrigation and Drainage Paper, 56). Disponível em: https://www.fao.org/4/x0490e/x0490e00.htm. Acesso em: 22 out. 2026.

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. *ABNT NBR 16401-2: instalações de ar-condicionado — sistemas centrais e unitários — parte 2: parâmetros de conforto térmico*. Rio de Janeiro: ABNT, 2008.

BOTANA MARTINEZ, M. Pilar; VYAS, Priam Dinesh; WALSH, Katherine H.; MAIN, Lauren; BOLTON, Lauren; YUAN, Yirong; YAJIMA, Masanao; FABIAN, M. Patricia. Rethinking heat in thousands of school classrooms through continuous monitoring and novel exposure metrics. *Indoor Environments*, v. 2, n. 3, art. 100105, 2025. DOI: 10.1016/j.indenv.2025.100105. Disponível em: https://doi.org/10.1016/j.indenv.2025.100105. Acesso em: 26 ago. 2026.

FAGAN, Michael; MEGAS, Katerina N.; SCARFONE, Karen; SMITH, Matthew. *IoT Device Cybersecurity Capability Core Baseline*. Gaithersburg: National Institute of Standards and Technology, 2020. NISTIR 8259A. DOI: 10.6028/NIST.IR.8259A. Disponível em: https://nvlpubs.nist.gov/nistpubs/ir/2020/NIST.IR.8259A.pdf. Acesso em: 26 ago. 2026.

GUILLÁN LORENZO, Omar; SUÁREZ-GARCÍA, Andrés; GONZÁLEZ PEÑA, David; GARCÍA FUENTE, Manuel; GRANADOS-LÓPEZ, Diego. A low-cost luxometer benchmark for solar illuminance measurement system based on the Internet of Things. *Sensors*, v. 22, n. 19, art. 7107, 2022. DOI: 10.3390/s22197107. Disponível em: https://doi.org/10.3390/s22197107. Acesso em: 26 ago. 2026.

HERNÁNDEZ, Wilmar; CAÑAS, Norberto. Sensing classroom temperature, relative humidity, illuminance, CO2, and noise: an integral solution based on an IoT device for dense deployments. *Sensors*, v. 24, n. 16, art. 5129, 2024. DOI: 10.3390/s24165129. Disponível em: https://doi.org/10.3390/s24165129. Acesso em: 26 ago. 2026.

NIST/SEMATECH. *NIST/SEMATECH e-Handbook of Statistical Methods: calibration*. [S. l.], [s. d.]. Disponível em: https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3.htm. Acesso em: 24 ago. 2026.

RUS, Tania; MOLDOVAN, Raluca Paula; MÂRZA, Carmen Maria; CORSIUC, Georgiana; ILUŢIU-VARVARA, Dana-Adriana. Data-driven environments: evaluating IoT sensors and KNX protocol for monitoring indoor conditions in educational facilities. *Frontiers in Built Environment*, v. 11, art. 1688582, 2025. DOI: 10.3389/fbuil.2025.1688582. Disponível em: https://doi.org/10.3389/fbuil.2025.1688582. Acesso em: 26 ago. 2026.

SENSIRION AG. *Datasheet SHT3x-DIS: humidity and temperature sensor*. Version 7. [S. l.]: Sensirion AG, 2022. Disponível em: https://sensirion.com/media/documents/213E6A3B/63A5A569/Datasheet_SHT3x_DIS.pdf. Acesso em: 24 ago. 2026.

VISHAY SEMICONDUCTORS. *VEML7700: high accuracy ambient light sensor with I2C interface*. Revision 1.8. [S. l.]: Vishay Semiconductors, 2024. Disponível em: https://www.vishay.com/docs/84286/veml7700.pdf. Acesso em: 24 ago. 2026.
