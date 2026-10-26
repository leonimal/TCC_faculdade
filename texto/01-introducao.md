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
