# Plano de ajustes do TCC

## Tema avaliado

**Tema atual:** Sistema de Monitoramento Ambiental Inteligente com IoT para Salas de Aula.

## Parecer geral

O tema é válido para um TCC aplicado na área de Computação, Sistemas de Informação ou Internet das Coisas. Ele apresenta um problema real, integra hardware e software e permite avaliação experimental.

No estado atual, porém, o documento está mais próximo de uma especificação detalhada de sistema do que de uma pesquisa concluída. Existem requisitos, endpoints, estrutura de banco de dados e funcionalidades planejadas, mas ainda faltam resultados empíricos que comprovem o funcionamento, a confiabilidade e a contribuição acadêmica da solução.

O maior risco perante a banca é a contradição entre o capítulo de testes, que ainda contém instruções como “Inserir aqui” e resultados esperados, e a conclusão, que já afirma que o sistema foi desenvolvido e demonstrou viabilidade.

## Recomendação central

Manter o tema, mas posicionar o trabalho como o desenvolvimento e a validação técnica de um protótipo IoT de baixo custo, delimitado inicialmente a uma sala de aula ou ambiente controlado.

### Título recomendado

> Desenvolvimento e validação de um protótipo IoT de baixo custo para monitoramento ambiental em sala de aula

O termo “inteligente” deve ser removido, a menos que o sistema possua e avalie objetivamente alguma capacidade de previsão, adaptação, aprendizado ou tomada de decisão que vá além da comparação com limites fixos.

## Pergunta de pesquisa recomendada

> Em que medida um protótipo IoT de baixo custo consegue coletar, transmitir, armazenar e classificar, com confiabilidade, variáveis ambientais de uma sala de aula?

A pergunta atual promete apoio à tomada de decisão da gestão escolar. Essa promessa somente poderá ser mantida se o sistema for avaliado com gestores ou professores, verificando compreensão, utilidade e decisões tomadas a partir das informações. Caso não seja possível realizar essa avaliação, a pergunta deve permanecer concentrada na validação técnica.

## Objetivo geral recomendado

> Desenvolver e avaliar um protótipo IoT de baixo custo para coleta, transmissão, armazenamento, visualização e classificação de variáveis ambientais em uma sala de aula, verificando a confiabilidade das medições e o funcionamento da solução ponta a ponta.

## Alterações prioritárias

### 1. Confirmar o escopo real

- Verificar quais funcionalidades estão efetivamente implementadas.
- Manter no escopo principal somente o que puder ser demonstrado e testado.
- Delimitar o experimento a uma sala ou ambiente controlado.
- Não prometer melhora na aprendizagem, concentração ou gestão sem pesquisa específica com participantes.
- Separar funcionalidades essenciais do MVP de funcionalidades futuras.

### 2. Corrigir a coerência temporal do texto

- Usar o futuro somente para atividades que ainda serão realizadas.
- Usar o passado apenas para funcionalidades e testes realmente concluídos.
- Não afirmar viabilidade, funcionamento ou contribuição antes da apresentação dos resultados.
- Reescrever resumo e conclusão somente após finalizar os testes.
- Remover todos os marcadores “Inserir aqui”, “Adicionar referências” e equivalentes antes da entrega.

### 3. Especificar o hardware

Para cada sensor, informar:

- fabricante e modelo exato;
- variável medida;
- unidade de medida;
- faixa de operação;
- resolução;
- precisão informada pelo fabricante;
- tensão e forma de conexão;
- biblioteca utilizada;
- intervalo de amostragem;
- limitações conhecidas;
- procedimento de calibração ou comparação.

Incluir também:

- modelo exato da placa ESP8266;
- diagrama elétrico;
- fotografia ou esquema da montagem;
- custo aproximado de cada componente e do protótipo completo.

### 4. Verificar as medições de ruído e luminosidade

- Confirmar se o sensor sonoro realmente mede pressão sonora em dB ou apenas fornece um valor analógico relativo.
- Não apresentar valores como dB sem calibração e fundamentação técnica.
- Confirmar se o sensor de luminosidade e o procedimento adotado permitem apresentar valores em lux.
- Caso não seja possível produzir medições defensáveis, tratar os valores como indicadores relativos ou retirar a variável do escopo principal.

### 5. Fundamentar os limites ambientais

Para temperatura, umidade, luminosidade e ruído, registrar:

- fonte normativa, técnica ou científica;
- número e versão da norma, quando aplicável;
- justificativa de aplicação em salas de aula;
- unidade e condições de medição;
- faixa considerada adequada;
- limites de atenção e de alerta;
- limitações da interpretação.

Não mencionar apenas “NR” ou “NBR” de maneira genérica. Confirmar com o orientador quais normas realmente se aplicam. Verificar especialmente se a NBR 10151 é suficiente e apropriada para o contexto interno de sala de aula.

### 6. Fortalecer a fundamentação teórica

Adicionar fontes e citações no corpo do texto sobre:

- condições ambientais em salas de aula;
- conforto térmico;
- iluminação de ambientes educacionais;
- acústica e ruído em sala de aula;
- influência das condições ambientais no conforto e bem-estar;
- Internet das Coisas;
- sensores de baixo custo;
- calibração e validação de sensores;
- APIs REST e comunicação IoT;
- visualização de dados e dashboards;
- engenharia e rastreabilidade de requisitos;
- métodos de avaliação de sistemas computacionais.

Criar uma seção de trabalhos relacionados, comparando o projeto com soluções semelhantes. Para cada trabalho relacionado, apresentar objetivo, tecnologias, variáveis monitoradas, método de validação, resultados e diferença em relação ao TCC.

### 7. Reestruturar a metodologia

A metodologia deve informar de forma reproduzível:

- natureza e classificação da pesquisa;
- ambiente da avaliação;
- período e duração da coleta;
- quantidade prevista de amostras;
- frequência das leituras;
- condições ou cenários testados;
- instrumentos de referência;
- procedimento de comparação e calibração;
- métricas utilizadas;
- critérios de aceitação definidos antes dos testes;
- tratamento de falhas e valores ausentes;
- método de análise dos dados;
- limitações do procedimento.

Se houver coleta com gestores, professores ou alunos, verificar previamente autorização institucional, consentimento e eventuais exigências éticas. O sensor de ruído deve registrar somente nível sonoro, nunca conversas ou áudio.

### 8. Separar os níveis de validação

#### Validação dos sensores

- Comparar as leituras com instrumentos de referência.
- Calcular diferença absoluta, diferença média ou erro percentual, conforme aplicável.
- Informar quantidade de comparações e condições do teste.
- Apresentar limitações da precisão obtida.

#### Validação do sistema ponta a ponta

- Verificar leitura do sensor.
- Verificar envio do ESP8266.
- Verificar recebimento e validação pela API.
- Verificar armazenamento no MySQL.
- Verificar apresentação no dashboard.
- Verificar geração dos alertas.
- Medir perdas, latência e disponibilidade.

#### Validação da utilidade

Somente será necessária se permanecer a alegação de apoio à gestão. Nesse caso, avaliar o sistema com gestores ou professores por meio de tarefas, questionário, entrevista ou outro método definido e fundamentado.

### 9. Tornar os requisitos mensuráveis

Substituir expressões vagas como “tempo adequado”, “interface simples” e “registrar corretamente” por critérios verificáveis. Exemplos a serem ajustados às condições reais do projeto:

- pelo menos 95% das leituras transmitidas devem chegar ao banco;
- a API deve responder em até 2 segundos no ambiente de teste;
- uma nova leitura deve aparecer no dashboard em até 5 segundos;
- alertas devem ser gerados em 100% dos casos de teste fora da faixa;
- nenhum alerta deve ser gerado nos casos dentro da faixa;
- usuários sem permissão não devem acessar funções restritas;
- o sistema deve permanecer operacional durante o período de teste definido.

Os números finais precisam ser realistas, justificados e definidos antes da execução dos testes.

### 10. Produzir os diagramas e modelos pendentes

- Diagrama de arquitetura do sistema.
- Diagrama de implantação, se pertinente.
- Diagrama de casos de uso.
- Modelo entidade-relacionamento do banco.
- Fluxo da leitura desde o sensor até o dashboard.
- Esquema do circuito e conexão dos sensores.
- Tabelas completas de requisitos funcionais e não funcionais.

### 11. Executar e documentar os testes

Cada teste deve informar:

- identificador;
- requisito associado;
- objetivo;
- pré-condições;
- entrada ou procedimento;
- resultado esperado;
- resultado obtido;
- evidência;
- data de execução;
- status: aprovado ou reprovado;
- observações.

A evidência mínima recomendada inclui:

- dados brutos com data e hora;
- tabelas e gráficos das leituras;
- comparação com instrumentos de referência;
- quantidade de transmissões enviadas, recebidas e perdidas;
- latência das requisições;
- respostas da API;
- registros armazenados no banco;
- telas do dashboard com dados reais;
- relatórios gerados;
- testes dos alertas abaixo, dentro e acima dos limites;
- falhas encontradas e correções realizadas;
- custo do protótipo.

Prints podem ser usados como evidência complementar, mas não substituem análise, métricas, tabelas e interpretação dos resultados.

### 12. Reescrever resultados e conclusão

O capítulo de resultados deve responder diretamente à pergunta de pesquisa. Ele precisa apresentar:

- o que foi testado;
- quantas observações foram realizadas;
- resultados quantitativos;
- comparação com critérios de aceitação;
- interpretação dos dados;
- problemas encontrados;
- limitações;
- requisitos atendidos e não atendidos.

A conclusão deve declarar apenas o que os resultados permitirem demonstrar. Evitar afirmações sobre melhoria da aprendizagem, conforto real ou tomada de decisão caso essas dimensões não tenham sido avaliadas.

## Matriz de validação dos requisitos

Esta matriz deve ser preenchida antes da reescrita final do TCC.

| Requisito | Implementado? | Evidência existente | Teste necessário | Métrica de aprovação | Prioridade |
|---|---|---|---|---|---|
| RF01 — Cadastrar usuário |  |  |  |  | MVP/Extra |
| RF02 — Efetuar login |  |  |  |  | MVP/Extra |
| RF03 — Atribuir permissões |  |  |  |  | MVP/Extra |
| RF04 — Cadastrar sala |  |  |  |  | MVP/Extra |
| RF05 — Cadastrar dispositivo |  |  |  |  | MVP/Extra |
| RF06 — Definir intervalo de leitura |  |  |  |  | MVP/Extra |
| RF07 — Coletar temperatura |  |  |  |  | MVP/Extra |
| RF08 — Coletar umidade |  |  |  |  | MVP/Extra |
| RF09 — Coletar luminosidade |  |  |  |  | MVP/Extra |
| RF10 — Coletar nível de ruído |  |  |  |  | MVP/Extra |
| RF11 — Enviar dados por HTTP |  |  |  |  | MVP/Extra |
| RF12 — Armazenar leituras no MySQL |  |  |  |  | MVP/Extra |
| RF13 — Exibir dashboard |  |  |  |  | MVP/Extra |
| RF14 — Consultar histórico |  |  |  |  | MVP/Extra |
| RF15 — Gerar relatório por período |  |  |  |  | MVP/Extra |
| RF16 — Gerar alertas automáticos |  |  |  |  | MVP/Extra |
| RF17 — Consultar alertas |  |  |  |  | MVP/Extra |
| RF18 — Gerenciar parâmetros |  |  |  |  | MVP/Extra |

## Ordem recomendada de execução

1. Preencher a matriz de validação dos requisitos.
2. Definir o MVP que realmente será entregue.
3. Confirmar sensores, unidades e instrumentos de referência disponíveis.
4. Reformular título, pergunta de pesquisa e objetivo geral.
5. Definir protocolo, métricas e critérios de aceitação.
6. Montar ou finalizar o fluxo completo do protótipo.
7. Executar os testes e preservar os dados brutos.
8. Criar tabelas, gráficos, diagramas e evidências.
9. Ampliar a fundamentação e os trabalhos relacionados.
10. Escrever os resultados reais.
11. Reescrever resumo e conclusão.
12. Revisar formatação e regras do manual da UNIP.

## Perguntas que a banca provavelmente fará

- O que torna o sistema inteligente?
- Qual é a contribuição original do projeto?
- Por que essas quatro variáveis foram escolhidas?
- Quais modelos de sensores foram utilizados?
- Como os sensores foram calibrados?
- O sensor de ruído mede realmente em dB?
- O sensor de luminosidade mede realmente em lux?
- Quais normas justificam os limites adotados?
- Quantas leituras foram coletadas e durante quanto tempo?
- Qual foi a taxa de perda de dados?
- Qual foi a precisão observada?
- Como foi comprovado que os alertas funcionam?
- Qual decisão concreta o dashboard permite tomar?
- O que o projeto apresenta de diferente de soluções existentes?
- Quais requisitos foram realmente validados?
- Quais são as principais limitações do protótipo?

## Critério para considerar o TCC pronto para defesa

O trabalho estará academicamente defensável quando:

- título, pergunta, objetivos, método, resultados e conclusão estiverem alinhados;
- não houver placeholders ou funcionalidades fictícias;
- todas as afirmações técnicas relevantes possuírem fontes;
- os parâmetros ambientais tiverem fundamentação adequada;
- sensores e unidades estiverem claramente caracterizados;
- o protocolo de testes puder ser reproduzido;
- os resultados forem apresentados com dados e métricas;
- cada conclusão estiver apoiada por evidência;
- limitações forem reconhecidas com transparência;
- o texto estiver de acordo com o manual e o modelo exigidos pela UNIP.

## Síntese final

O problema principal não é o tema. O tema é válido e tem potencial para um bom TCC. O que falta é transformar a descrição do sistema em uma avaliação acadêmica baseada em evidências. A prioridade deve ser comprovar, com um protocolo reproduzível, o que o protótipo realmente mede, quais partes funcionam e com qual confiabilidade.
