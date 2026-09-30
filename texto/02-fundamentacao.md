# 2 Fundamentação teórica e trabalhos relacionados

Este capítulo apresenta os conceitos e as evidências que orientam o escopo técnico do sistema. A discussão distingue as grandezas efetivamente medidas das interpretações que exigiriam outras variáveis, instrumentos ou procedimentos. Também separa especificações nominais dos componentes da avaliação que será realizada no protótipo.

## 2.1 Monitoramento ambiental em salas de aula

O monitoramento ambiental em uma sala de aula consiste em obter, identificar temporalmente e organizar dados sobre grandezas físicas observadas em um ponto e período definidos. Para que esses dados sejam interpretáveis, devem permanecer associados ao local de instalação, à configuração de aquisição, ao instante da leitura e aos eventos que possam afetar a medição ou a comunicação.

Hernández e Cañas (2024) apresentam um dispositivo IoT destinado à medição de variáveis ambientais em salas de aula universitárias, incluindo temperatura do ar, umidade relativa e iluminância. Esse trabalho evidencia a viabilidade de integrar sensores ambientais a uma arquitetura conectada; contudo, seu conjunto de variáveis, sua rede de comunicação e seus objetivos não são transferidos automaticamente para o presente estudo.

Em outra escala, Botana Martinez et al. (2025) analisaram dados contínuos de temperatura e umidade relativa provenientes de 3.666 salas de aula. O estudo mostra que séries temporais podem revelar diferenças entre salas de um mesmo edifício e ocorrências que medidas de tendência central isoladas não representam adequadamente. Esse resultado reforça a utilidade de preservar o histórico e o contexto temporal, mas não autoriza generalizar os valores daquela campanha para a sala avaliada neste TCC.

Neste TCC, o monitoramento está delimitado a temperatura do ar, umidade relativa e iluminância em uma única sala, como estudo de caso. As três grandezas permitem registrar condições físicas selecionadas, mas não caracterizam sozinhas a qualidade ambiental global da sala. Em particular, não serão inferidos conforto percebido, aprendizagem, desempenho acadêmico ou efeitos de intervenções prediais.

## 2.2 Temperatura do ar, umidade relativa e limites de interpretação

A ABNT NBR 16401-2:2008, informada pela UNIP como referência para as salas e conferida no documento original, trata do conforto térmico em recintos providos de ar-condicionado. Seus parâmetros dependem da temperatura operativa, da velocidade do ar, da umidade relativa e de condições dos ocupantes, como vestimenta e atividade. O protótipo deste TCC mede temperatura do ar e umidade relativa, mas não mede temperatura operativa, temperatura radiante média ou velocidade do ar; por isso, seus registros não permitem declarar conformidade da sala com a norma nem inferir conforto percebido (ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS, 2008).

A mesma norma não define requisitos de iluminância. Assim, a iluminância continuará registrada como variável ambiental independente, sem classificação normativa. O software poderá registrar ocorrências com base em faixas locais estabelecidas e versionadas pela administração, sem atribuir a elas caráter de alerta automático normativo.

Temperatura do ar e umidade relativa são grandezas físicas distintas. A primeira descreve o estado térmico do ar no ponto de leitura; a segunda expressa a relação entre a quantidade de vapor de água presente e a quantidade máxima que o ar poderia conter na mesma temperatura. Em sistemas digitais, ambas podem ser adquiridas pelo mesmo componente, desde que sua interface, alimentação, endereço de comunicação e condições de instalação sejam documentados.

O SHT3x-DIS, família à qual pertence o SHT31 selecionado para o protótipo, fornece saída digital para temperatura e umidade relativa, possui interface I2C e disponibiliza endereços selecionáveis pelo usuário (Sensirion AG, 2022). Essas características justificam sua adequação de integração ao nó IoT, mas não comprovam o desempenho da unidade comercial recebida, da montagem realizada ou da posição escolhida na sala.

Temperatura e umidade relativa não devem ser usadas, isoladamente, como sinônimos de conforto térmico. A avaliação de conforto percebido pode depender de outras condições físicas e de informações sobre os ocupantes, que não integram o desenho desta pesquisa. Portanto, os dados coletados serão apresentados como medições das duas grandezas selecionadas, e qualquer comparação com instrumento de referência será descrita como avaliação parcial do sensor, com métricas e limitações explicitadas.

## 2.3 Iluminância e condições visuais

Iluminância é a grandeza expressa em lux utilizada para descrever a luz incidente em determinado ponto e plano de medição. Uma leitura pontual, por sua natureza, representa as condições no local, na altura e na orientação em que o sensor foi instalado; ela não demonstra, por si só, a uniformidade da iluminação de toda a sala ou a experiência visual dos ocupantes.

O VEML7700 é um sensor digital de luz ambiente com interface I2C, faixa de medição ajustável e tempos de integração configuráveis (Vishay Semiconductors, 2024). No presente trabalho, esses recursos serão empregados para adquirir iluminância e registrar as condições de operação do nó. A posição, a altura, a orientação e eventuais obstruções do sensor deverão ser registradas antes da coleta, pois constituem parte do contexto necessário à interpretação dos valores.

Guillán Lorenzo et al. (2022) compararam o VEML7700 e outros sensores comerciais de baixo custo com um instrumento profissional em uma plataforma IoT de medição de iluminância solar. Embora o ambiente externo e a finalidade do estudo sejam diferentes dos deste TCC, o trabalho oferece evidência de que o desempenho do componente deve ser analisado por comparação e sob condições de operação explicitadas, em vez de ser inferido apenas do datasheet.

O sistema não utilizará, nesta etapa, uma única leitura de iluminância para declarar que a sala é adequada ou inadequada. A definição de parâmetros para alertas depende da conferência das fontes técnicas originais aplicáveis e será tratada separadamente no desenvolvimento e no protocolo experimental.

## 2.4 Internet das Coisas e monitoramento ambiental

Neste trabalho, Internet das Coisas é empregada para designar a integração entre um dispositivo com capacidade de sensoriamento, conectividade de rede e processamento local, e serviços que recebem, armazenam e apresentam seus dados. A conexão entre o mundo físico e a aplicação depende tanto da leitura dos sensores quanto da identificação do dispositivo, da configuração, da comunicação e da capacidade de informar seu estado operacional.

O NIST descreve dispositivos IoT como equipamentos que combinam capacidades físicas ou de sensoriamento com interfaces de rede e propõe capacidades básicas de cibersegurança para protegê-los e proteger os dados relacionados (Fagan et al., 2020). Para o escopo deste protótipo, essa referência não é usada como certificação de segurança. Ela fundamenta a importância de identificar o nó, restringir o acesso lógico, controlar configurações, proteger dados e expor o estado operacional como aspectos de projeto a serem considerados.

A arquitetura adotada conecta sensores a um microcontrolador com Wi-Fi; este envia mensagens HTTP/JSON para a API integrada à aplicação; a API persiste as medições no MySQL; e a aplicação apresenta dashboard, histórico e relatórios. Essa escolha será detalhada no capítulo de desenvolvimento. Na fundamentação, importa ressaltar que o valor analítico de uma medição depende de sua rastreabilidade ao longo dessa cadeia, e não apenas da existência de um valor numérico no painel.

## 2.5 Sensores de baixo custo, comparação e qualidade dos dados

Especificações de fabricante descrevem o desempenho declarado de um componente em condições e procedimentos próprios. Elas são necessárias para conhecer faixas de operação, interfaces e recursos do sensor, mas não substituem a avaliação da unidade adquirida no circuito, na instalação e no ambiente de uso do protótipo.

O procedimento de calibração e de comparação com referência deve deixar explícitos o instrumento utilizado, as condições de medição e a forma de estimar diferenças entre valores observados e de referência. O NIST/SEMATECH ressalta que resultados de calibração devem ser analisados no contexto da relação entre o instrumento sob avaliação e padrões ou referências adequados (NIST/SEMATECH, s.d.). No projeto, essa orientação sustenta a decisão de condicionar qualquer classificação comparativa à disponibilidade de instrumento de referência identificado e com desempenho documentado.

Quando houver referência adequada, serão calculados viés, erro absoluto médio, raiz do erro quadrático médio e percentil 95 do erro absoluto; para iluminância em faixas aplicáveis, também será calculado o erro percentual absoluto médio. Sem referência adequada, o estudo manterá a avaliação funcional — taxa de leituras válidas, faixas físicas e registro de falhas — sem atribuir precisão metrológica ao sistema.

Em duas salas universitárias, Rus et al. (2025) compararam sensores integrados a uma automação predial com um instrumento profissional e observaram correlações elevadas acompanhadas de deslocamentos sistemáticos entre as leituras. O caso evidencia que consistência temporal e associação entre séries não eliminam a necessidade de examinar viés, posição de instalação e qualidade da referência. Sua arquitetura baseada em KNX e seu conjunto de variáveis diferem dos adotados neste TCC, de modo que os resultados não são transferidos ao protótipo.

A qualidade dos dados também inclui a preservação de falhas, duplicidades, lacunas e estados de sincronização. Valores ausentes ou inválidos não serão substituídos por interpolação na análise principal. Essa regra permite que a avaliação técnica diferencie uma série ambiental observada de uma série artificialmente preenchida e preserva evidências sobre o funcionamento da cadeia.

## 2.6 Aquisição, comunicação, armazenamento e rastreabilidade

Uma cadeia de monitoramento ambiental inicia na aquisição, mas só se torna auditável quando conserva a identidade da medição e seu contexto até a consulta posterior. Por isso, cada registro do sistema possui identificador único, identificação do dispositivo, identificação da inicialização, número de sequência, versão de configuração, instante da leitura e estado de sincronização temporal.

O uso de mensagens HTTP/JSON permite transportar a leitura e seus metadados por uma interface explícita. No entanto, a confirmação de uma requisição não elimina a necessidade de tratamento de falhas de rede. O projeto adota fila local persistente para medições ainda não confirmadas, reenvio em ordem e remoção somente após a API informar armazenamento ou existência prévia do mesmo identificador. Dessa forma, a idempotência é tratada como requisito de integridade da cadeia e não como mera conveniência de implementação.

O armazenamento relacional mantém a medição canônica e registra tentativas de entrega separadamente. Esse desenho permite distinguir reenvio legítimo de conflito de integridade e oferece base para verificar completude, perdas, duplicidade, latência, disponibilidade e consistência. Os limites quantitativos usados nos testes são metas internas previamente definidas pelo projeto; não são valores extraídos de normas ambientais.

## 2.7 Dashboards, relatórios e alertas

Dashboards e relatórios cumprem, neste estudo, a função de tornar consultáveis as medições e os estados técnicos do sistema. Os valores mais recentes, as séries temporais, as lacunas, a configuração aplicada, a ocupação da fila e as perdas comunicadas pelo nó são apresentados sem substituir leituras inválidas por valores estimados.

Um alerta ambiental, para ser tecnicamente defensável, deve informar a grandeza medida, a regra aplicada, a duração considerada, a fonte do parâmetro e as limitações de interpretação. Enquanto esses parâmetros não forem verificados nas fontes técnicas originais, o dashboard não classificará as condições ambientais nem emitirá alertas como se fossem recomendações aprovadas. Distintamente, uma ocorrência informativa pode registrar que uma leitura válida e sincronizada ficou fora de uma faixa local, desde que preserve a versão, os limites e a justificativa da regra aplicada.

Assim, a aplicação organiza informações que podem subsidiar investigação pela gestão escolar, mas não diagnostica as causas de uma condição ambiental nem prescreve intervenções de infraestrutura. A utilidade efetiva das informações para usuários administrativos não será avaliada neste trabalho.

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

Em contraste com esses trabalhos, o presente estudo restringe o núcleo a três variáveis e prioriza a avaliação técnica ponta a ponta: aquisição, identificação temporal, transmissão HTTP/JSON, persistência idempotente, visualização, relatórios, estado operacional e recuperação após indisponibilidade de comunicação. Ruído e dióxido de carbono não são variáveis avaliadas, pois exigiriam seleção de sensores, protocolos e interpretações adicionais.

A lacuna abordada não consiste em demonstrar melhoria ambiental ou educacional. O estudo busca documentar, em um caso de baixo custo, em que medida uma cadeia IoT conserva medições e metadados de forma tecnicamente verificável, distinguindo a avaliação parcial dos sensores da avaliação da infraestrutura de dados. A comparação apresentada também evidencia que resultados obtidos em outras escalas, arquiteturas ou ambientes não substituem a validação do protótipo nas condições delimitadas para esta pesquisa.
