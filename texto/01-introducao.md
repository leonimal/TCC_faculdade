# 1 Introdução

## 1.1 Contextualização

O acompanhamento das condições ambientais de uma sala de aula pode exigir mais do que observações isoladas. Quando temperatura do ar, umidade relativa e iluminância são registradas de forma contínua, torna-se possível organizar uma série temporal das condições medidas, identificar ocorrências que mereçam análise e preservar informações técnicas sobre o funcionamento do próprio sistema de coleta. Uma campanha em escala distrital mostrou que séries contínuas podem revelar variações entre salas e eventos que medidas agregadas não representam integralmente, embora seus resultados permaneçam dependentes do contexto observado (Botana Martinez et al., 2025).

No contexto deste trabalho, o monitoramento ambiental é tratado como um problema de aquisição, transmissão, armazenamento e visualização de dados. A proposta utiliza um nó IoT de baixo custo para obter as três variáveis selecionadas, transmitir as medições por rede Wi-Fi a uma aplicação e disponibilizá-las em histórico, indicadores e relatórios. A solução não se limita à leitura dos sensores: a rastreabilidade do instante da medição, da configuração aplicada, do estado de comunicação e de eventuais falhas é necessária para que os dados possam ser avaliados tecnicamente.

Temperatura do ar, umidade relativa e iluminância constituem o núcleo medido. Essas grandezas não esgotam a caracterização ambiental de uma sala nem permitem, isoladamente, concluir sobre conforto percebido, qualidade ambiental, aprendizagem ou desempenho acadêmico. Assim, tais aspectos não são tratados como resultados demonstráveis neste estudo. O interesse está em desenvolver e avaliar tecnicamente uma cadeia IoT que organize medições ambientais para apoiar a identificação de condições que possam demandar investigação posterior.

## 1.2 Problema de pesquisa

Salas de aula podem apresentar variações de temperatura do ar, umidade relativa e iluminância ao longo do período de utilização. Quando o acompanhamento depende de observações pontuais, não há necessariamente um histórico organizado que permita examinar o comportamento dessas condições ou distinguir uma ocorrência ambiental de uma falha de aquisição, comunicação ou armazenamento.

O problema investigado concentra-se, portanto, no desenvolvimento de uma solução de baixo custo capaz de coletar, identificar temporalmente, transmitir, armazenar e apresentar dados ambientais de modo rastreável. Não se pressupõe que a solução melhore a aprendizagem, o conforto percebido ou a qualidade do ambiente, pois tais efeitos exigiriam desenho de pesquisa e evidências próprios.

Dessa forma, estabelece-se a seguinte pergunta de pesquisa: **em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?**

## 1.3 Objetivo geral

Desenvolver e avaliar tecnicamente um sistema IoT de baixo custo para monitoramento ambiental em uma sala de aula, por meio da avaliação parcial dos sensores e de testes ponta a ponta da aquisição, transmissão, armazenamento e visualização dos dados.

## 1.4 Objetivos específicos

Para alcançar o objetivo geral, foram definidos os seguintes objetivos específicos:

1. Revisar a literatura e as referências técnicas relacionadas ao monitoramento ambiental, à Internet das Coisas e ao uso de sensores de baixo custo em salas de aula.
2. Definir os requisitos funcionais e técnicos do sistema, incluindo as métricas e os critérios de aceitação para sua avaliação.
3. Projetar e montar um nó IoT de baixo custo com os sensores ambientais selecionados e conectividade Wi-Fi.
4. Desenvolver o firmware responsável pela aquisição, identificação temporal e transmissão periódica das medições, incluindo o tratamento de falhas de leitura e comunicação.
5. Implementar uma API e um banco de dados MySQL para validar, receber, armazenar e consultar os dados ambientais.
6. Desenvolver uma aplicação web com visualização, histórico, indicadores, relatórios e alertas tecnicamente fundamentados, organizando os dados para subsidiar a identificação de condições que possam demandar investigação pela gestão escolar.
7. Avaliar parcialmente o comportamento dos sensores por comparação com os instrumentos de referência disponíveis, registrando os procedimentos, as métricas e as limitações da avaliação.
8. Avaliar o funcionamento ponta a ponta do sistema por meio de métricas de completude ou perda de dados, latência, disponibilidade e consistência entre as medições, a API, o banco de dados e a aplicação web.
9. Analisar o custo, as limitações técnicas, a reprodutibilidade e as possibilidades de expansão da solução.

## 1.5 Justificativa

O trabalho se justifica pela integração, em um protótipo de baixo custo, de hardware, firmware, comunicação HTTP/JSON, API, banco de dados e aplicação web. Estudos anteriores demonstram a viabilidade de integrar sensores ambientais em arquiteturas conectadas para salas de aula e, ao mesmo tempo, a necessidade de comparar o comportamento de sensores instalados com referências adequadas (Hernández; Cañas, 2024; Rus et al., 2025). No presente estudo, essa integração permite avaliar não apenas se uma leitura é produzida, mas também se ela é identificada, transmitida, persistida, consultada e apresentada de forma consistente, inclusive diante de falhas de comunicação e reenvios.

O sistema é projetado para organizar medições em visualizações, históricos, indicadores, relatórios e ocorrências informativas baseadas em faixas locais versionadas. Esses recursos podem subsidiar a identificação de situações recorrentes que mereçam investigação pela gestão escolar, ao disponibilizar registros rastreáveis em vez de depender exclusivamente de observações pontuais. Essa é uma finalidade projetada da solução, e não uma demonstração de uso, utilidade ou impacto gerencial.

Além da aplicação potencial, a proposta oferece um caso de estudo para documentar requisitos, decisões de projeto, critérios de aceitação, tratamento de dados ausentes e limitações de sensores de baixo custo. A avaliação parcial dos sensores será condicionada aos instrumentos de referência efetivamente disponíveis; sem referência adequada, os resultados serão apresentados como evidência funcional e descritiva, sem atribuição de precisão metrológica ao sistema.

## 1.6 Delimitação

O estudo está delimitado ao desenvolvimento e à avaliação técnica de um sistema para monitorar temperatura do ar, umidade relativa e iluminância em uma sala de aula da UNIP em Araçatuba, tratada como estudo de caso. Serão avaliados o nó IoT, a aquisição, a transmissão, o armazenamento, a consulta e a visualização das medições, além do comportamento parcial dos sensores quando houver instrumentos de referência adequados.

Não fazem parte do núcleo avaliado o monitoramento de ruído, dióxido de carbono, material particulado, qualidade química do ar, ocupação, gravação de áudio ou imagem e controle automático de climatização ou iluminação. Também não serão avaliados aprendizagem, desempenho acadêmico, conforto percebido, qualidade ambiental global, utilidade com gestores ou efeitos de intervenções na infraestrutura.

Os indicadores e as ocorrências por faixa local indicarão apenas condições medidas que possam demandar investigação. Eles não constituirão diagnóstico de causas, prescrição de intervenções, classificação definitiva da sala ou substituição de avaliação técnica especializada. Nenhuma faixa local será apresentada como parâmetro normativo, de conforto ou de conformidade.

## 1.7 Estrutura do trabalho

Este trabalho está organizado em seis capítulos. O primeiro apresenta a contextualização, o problema de pesquisa, os objetivos, a justificativa e a delimitação do estudo. O segundo reúne a fundamentação teórica e os trabalhos relacionados ao monitoramento ambiental, à IoT e aos sensores de baixo custo. O terceiro descreve o método, o protocolo experimental, os requisitos e os critérios de avaliação. O quarto documenta o desenvolvimento do nó IoT, da API, do banco de dados e da aplicação web. O quinto apresentará os testes, os resultados observados e a discussão das limitações. Por fim, o sexto sintetizará as conclusões, as contribuições demonstradas e as possibilidades de trabalhos futuros.
