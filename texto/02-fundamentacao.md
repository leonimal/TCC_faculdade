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
