---
status: historico
fonte_original: TCC_adequado_modelo_UNIP.docx
convertido_para_markdown: 2026-08-14
fonte_de_verdade: false
---

> **Documento histórico convertido automaticamente.** Pode conter escopo, nomes, referências, decisões e formatação desatualizados. Em caso de conflito, prevalecem `projeto/contexto.md`, `projeto/decisoes.md` e `projeto/pendencias.md`.

UNIVERSIDADE PAULISTA




Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues







SISTEMA DE MONITORAMENTO AMBIENTAL INTELIGENTE COM IOT PARA SALAS DE AULA













ARAÇATUBA - SP
2026


Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues




SISTEMA DE MONITORAMENTO AMBIENTAL INTELIGENTE COM IOT PARA SALAS DE AULA



Trabalho de conclusão de curso para obtenção do título de Bacharel em Ciência da Computação apresentado à Universidade Paulista - UNIP.
Orientador: Prof. Me. Aldriano José da Silva













ARAÇATUBA - SP
2026


Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues



SISTEMA DE MONITORAMENTO AMBIENTAL INTELIGENTE COM IOT PARA SALAS DE AULA


Trabalho de conclusão de curso para obtenção do título de Bacharel em Ciência da Computação apresentado à Universidade Paulista - UNIP.
Orientador: Prof. Me. Aldriano José da Silva


Aprovado em:
BANCA EXAMINADORA

_____________________/__/____
Prof. Nome do Professor
Universidade Paulista – UNIP
_____________________/__/____
Prof. Nome do Professor
Universidade Paulista – UNIP
_____________________/__/____
Prof. Nome do Professor
Universidade Paulista – UNIP

ARAÇATUBA - SP
2026

AGRADECIMENTOS





Agradecemos a Deus por tudo o que fez e faz por nós diariamente;
Às nossas famílias por toda a base oferecida em nossa caminhada;
Ao orientador Prof. Me. Aldriano José da Silva, pelas orientações, sugestões e acompanhamento durante o desenvolvimento deste trabalho;
Aos amigos que fizemos durante todos esses anos de estudos.

RESUMO


Este trabalho apresenta o desenvolvimento de um sistema de monitoramento ambiental inteligente com Internet das Coisas voltado para salas de aula. A proposta tem como objetivo coletar, armazenar e apresentar dados ambientais que possam auxiliar a gestão escolar na identificação de condições que interferem no conforto e no bem-estar dos alunos. O sistema utiliza um microcontrolador ESP8266 integrado a sensores responsáveis pela leitura de temperatura, umidade, luminosidade e níveis de ruído. As informações coletadas são enviadas por meio de requisições HTTP para uma API, que realiza o processamento e armazenamento dos dados em um banco MySQL. Posteriormente, os dados são exibidos em um sistema web com dashboards, relatórios por período e alertas automáticos. A solução busca oferecer uma alternativa de baixo custo para apoiar decisões relacionadas à melhoria das condições ambientais em ambientes educacionais.
Palavras-chave: Internet das Coisas. Monitoramento ambiental. Salas de aula. ESP8266. MySQL.

ABSTRACT


This work presents the development of an intelligent environmental monitoring system based on the Internet of Things for classrooms. The proposal aims to collect, store, and display environmental data that may support school management in identifying conditions that affect students’ comfort and well-being. The system uses an ESP8266 microcontroller connected to sensors responsible for measuring temperature, humidity, luminosity, and noise levels. The collected data are sent through HTTP requests to an API, which processes and stores the information in a MySQL database. Subsequently, the data are displayed in a web system with dashboards, period-based reports, and automatic alerts. The solution seeks to provide a low-cost alternative to support decision-making related to the improvement of environmental conditions in educational spaces.
Keywords: Internet of Things. Environmental monitoring. Classrooms. ESP8266. MySQL.

LISTA DE ILUSTRAÇÕES



Figura 1 – Diagrama de casos de uso	34
Figura 2 – Modelo entidade-relacionamento do banco MySQL	34
Figura 3 – Arquitetura do sistema	34
Figura 4 – Telas do sistema web	34

LISTA DE TABELAS



Tabela 1 – Requisitos funcionais	19
Tabela 2 – Requisitos não funcionais	20
Tabela 3 – Regras de negócio	21
Tabela 4 – Exemplo de estrutura de classificação	24
Tabela 5 – Endpoints previstos	27

LISTA DE ABREVIATURAS E SIGLAS


Abreviaturas e siglas referentes às partes técnicas do projeto
API	Application Programming Interface
CSS	Cascading Style Sheets
ESP8266	Microcontrolador com conectividade Wi-Fi utilizado em aplicações IoT
HTTP	HyperText Transfer Protocol
HTML	HyperText Markup Language
IoT	Internet of Things / Internet das Coisas
JSON	JavaScript Object Notation
MySQL	Sistema Gerenciador de Banco de Dados relacional
Next.js	Framework React utilizado no desenvolvimento de aplicações web
REST	Representational State Transfer
RF	Requisito Funcional
RN	Regra de Negócio
RNF	Requisito Não Funcional
SGBD	Sistema Gerenciador de Banco de Dados
SQL	Structured Query Language
URL	Uniform Resource Locator
Wi-Fi	Tecnologia de rede sem fio

SUMÁRIO

1 INTRODUÇÃO	10
1.1 Contextualização do tema	10
1.2 Problema de pesquisa	10
1.3 Objetivo geral	11
1.4 Objetivos específicos	11
1.5 Justificativa	11
1.6 Delimitação do projeto	12
1.7 Estrutura do trabalho	12
2 FUNDAMENTAÇÃO TEÓRICA	14
2.1 Ambientes escolares e condições ambientais de aprendizagem	14
2.2 Sistemas de monitoramento inteligente	14
2.3 Internet das Coisas	14
2.4 Sensores aplicados ao monitoramento ambiental	15
2.4.1 Sensor de temperatura e umidade	15
2.4.2 Sensor de luminosidade	15
2.4.3 Sensor de ruído	16
2.5 Microcontrolador ESP8266	16
2.6 Comunicação HTTP em sistemas IoT	16
2.7 APIs REST para recebimento e consulta de dados	16
2.8 Banco de dados MySQL	17
2.9 Dashboards e visualização de dados	17
2.10 Parâmetros ambientais e alertas automáticos	17
3 METODOLOGIA E PROJETO DO SISTEMA	19
3.1 Caracterização da pesquisa	19
3.2 Contexto do projeto	19
3.3 Requisitos do sistema	19
3.3.1 Requisitos funcionais	19
3.3.2 Requisitos não funcionais	20
3.3.3 Regras de negócio	21
3.4 Casos de uso	21
3.5 Arquitetura do sistema	22
3.6 Fluxo de dados	22
3.7 Modelagem do banco de dados	23
3.8 Parâmetros classificatórios e regras de alerta	24
3.9 Critérios de teste e validação	24
4 DESENVOLVIMENTO DO SISTEMA	25
4.1 Ferramentas utilizadas	25
4.2 Desenvolvimento do hardware	25
4.3 Programação do ESP8266	25
4.4 Envio dos dados por HTTP	26
4.5 Desenvolvimento da API	26
4.6 Integração da API com o MySQL	27
4.7 Desenvolvimento do sistema web	27
4.8 Desenvolvimento dos dashboards	27
4.9 Implementação dos alertas automáticos	28
4.10 Implementação dos relatórios por período	28
5 TESTES E RESULTADOS	29
5.1 Testes de leitura dos sensores	29
5.2 Testes de envio dos dados por HTTP	29
5.3 Testes de armazenamento no MySQL	29
5.4 Testes da API	29
5.5 Testes do dashboard	29
5.6 Testes dos alertas automáticos	30
5.7 Resultados obtidos	30
5.8 Limitações do projeto	30
6 CONSIDERAÇÕES FINAIS	31
6.1 Conclusão	31
6.2 Contribuições do projeto	31
6.3 Trabalhos futuros	31
REFERÊNCIAS	33
APÊNDICES	34
Apêndice A — Tabela de requisitos funcionais	34
Apêndice B — Tabela de requisitos não funcionais	34
Apêndice C — Diagrama de casos de uso	34
Apêndice D — Modelo do banco de dados	34
Apêndice E — Arquitetura do sistema	34
Apêndice F — Telas do sistema web	34

# 1 INTRODUÇÃO
## 1.1 Contextualização do tema
A qualidade do ambiente escolar possui relação direta com o conforto, a concentração e o bem-estar dos alunos durante o processo de ensino e aprendizagem. Fatores como temperatura, umidade, luminosidade e níveis de ruído podem interferir na experiência dos estudantes em sala de aula, tornando o ambiente mais ou menos adequado para a realização das atividades educacionais.
Apesar da relevância desses fatores, muitas instituições de ensino ainda realizam a percepção das condições ambientais de forma subjetiva, sem o apoio de dados coletados continuamente. Situações como calor excessivo, baixa iluminação, umidade inadequada ou ruído elevado costumam ser identificadas apenas quando já causam desconforto perceptível aos alunos, professores ou gestores. Dessa forma, a ausência de monitoramento sistemático dificulta a tomada de decisões preventivas e baseadas em evidências.
Com o avanço da Internet das Coisas, tornou-se possível desenvolver sistemas capazes de coletar dados de ambientes físicos por meio de sensores, transmitir essas informações para sistemas computacionais e apresentá-las de maneira organizada em dashboards e relatórios. Esse tipo de solução pode contribuir para que gestores escolares acompanhem as condições das salas de aula de forma mais objetiva, facilitando a identificação de problemas e a adoção de medidas corretivas.
Nesse contexto, este trabalho propõe o desenvolvimento de um sistema de monitoramento ambiental inteligente com IoT para salas de aula. A solução utiliza sensores conectados a um microcontrolador ESP8266, responsável pela coleta de dados ambientais e envio dessas informações para uma API por meio de requisições HTTP. Os dados são armazenados em um banco de dados MySQL e apresentados em um sistema web com dashboards, relatórios e alertas automáticos.
## 1.2 Problema de pesquisa
Muitas instituições de ensino não possuem mecanismos automatizados para monitorar, registrar e analisar continuamente as condições ambientais das salas de aula. Com isso, fatores como temperatura, umidade, luminosidade e níveis de ruído podem ser percebidos apenas de maneira subjetiva, dificultando a identificação de situações inadequadas e a tomada de decisões por parte da gestão escolar.
Diante desse cenário, o problema de pesquisa deste trabalho pode ser formulado da seguinte forma:
Como um sistema baseado em Internet das Coisas pode auxiliar no monitoramento de variáveis ambientais em salas de aula e apoiar a gestão escolar na tomada de decisões relacionadas ao conforto e à qualidade do ambiente educacional?
## 1.3 Objetivo geral
Desenvolver um sistema de monitoramento ambiental inteligente com IoT para salas de aula, capaz de coletar dados de temperatura, umidade, luminosidade e ruído, armazená-los em banco de dados MySQL e apresentá-los em um sistema web por meio de dashboards, relatórios e alertas automáticos.
## 1.4 Objetivos específicos
Os objetivos específicos deste trabalho são:
a) estudar a aplicação de tecnologias IoT no monitoramento ambiental de salas de aula; b) definir as variáveis ambientais a serem monitoradas pelo sistema; c) desenvolver um protótipo com ESP8266 e sensores para coleta de dados ambientais; d) implementar o envio das leituras por meio de requisições HTTP; e) desenvolver uma API para recebimento, validação e consulta dos dados coletados; f) estruturar um banco de dados MySQL para armazenar usuários, salas, dispositivos, leituras, parâmetros e alertas; g) desenvolver um sistema web para visualização das informações coletadas; h) implementar dashboards para acompanhamento das variáveis ambientais; i) criar relatórios por sala, variável e período; j) definir regras para geração de alertas automáticos; k) realizar testes de funcionamento do protótipo e da comunicação entre os componentes do sistema.
## 1.5 Justificativa
O ambiente escolar deve oferecer condições adequadas para o desenvolvimento das atividades educacionais. Quando a sala de aula apresenta calor excessivo, iluminação insuficiente, ruídos elevados ou condições ambientais desconfortáveis, o desempenho e a concentração dos alunos podem ser prejudicados. Por esse motivo, o acompanhamento dessas variáveis pode auxiliar gestores e responsáveis pela instituição a compreender melhor o ambiente físico em que o processo de aprendizagem ocorre.
A utilização de um sistema automatizado de monitoramento contribui para transformar percepções subjetivas em dados objetivos. Em vez de depender apenas de reclamações ou observações pontuais, a instituição passa a contar com registros históricos, gráficos, relatórios e alertas que indicam quando determinada condição ambiental se encontra fora dos parâmetros definidos.
Além disso, o uso de tecnologias de baixo custo, como o ESP8266 e sensores compatíveis com aplicações IoT, torna a proposta viável para ambientes acadêmicos e instituições que buscam soluções acessíveis. A integração com uma API, um banco de dados MySQL e um sistema web permite organizar as informações e disponibilizá-las de maneira clara para diferentes perfis de usuários, como administradores, coordenadores e professores.
Este trabalho também se justifica por sua contribuição tecnológica, pois integra hardware, software, banco de dados, comunicação HTTP e visualização de dados em uma única solução aplicada ao contexto educacional.
## 1.6 Delimitação do projeto
Este trabalho está delimitado ao desenvolvimento de um protótipo funcional para monitoramento ambiental de salas de aula. O sistema realiza a coleta de dados relacionados à temperatura, umidade, luminosidade e ruído, utilizando sensores conectados ao ESP8266. As informações são enviadas para uma API por meio de requisições HTTP e armazenadas em um banco de dados MySQL.
O projeto não tem como objetivo substituir avaliações técnicas especializadas de conforto ambiental, segurança do trabalho ou infraestrutura escolar. Os parâmetros utilizados para classificação e geração de alertas serão definidos com base em referências técnicas e necessidades do projeto, devendo ser revisados em aplicações reais conforme normas, legislação vigente e orientação especializada.
## 1.7 Estrutura do trabalho
Este trabalho está organizado em seis capítulos. O primeiro capítulo apresenta a introdução, o problema de pesquisa, os objetivos, a justificativa e a delimitação do projeto. O segundo capítulo aborda a fundamentação teórica, contemplando conceitos de ambientes escolares, monitoramento ambiental, IoT, sensores, ESP8266, comunicação HTTP, APIs, banco de dados MySQL e dashboards. O terceiro capítulo apresenta a metodologia e o projeto do sistema, incluindo requisitos, casos de uso, arquitetura, fluxo de dados e modelagem do banco. O quarto capítulo descreve o desenvolvimento do sistema, abordando hardware, API, banco de dados, sistema web, dashboards, alertas e relatórios. O quinto capítulo apresenta os testes e resultados obtidos. Por fim, o sexto capítulo apresenta as considerações finais, contribuições e possibilidades de trabalhos futuros.

# 2 FUNDAMENTAÇÃO TEÓRICA
## 2.1 Ambientes escolares e condições ambientais de aprendizagem
As salas de aula são ambientes destinados à concentração, comunicação, interação e desenvolvimento de atividades educacionais. Para que esses processos ocorram de forma adequada, é importante que o espaço físico apresente condições ambientais compatíveis com o conforto dos alunos e professores.
Entre os fatores que podem influenciar a qualidade do ambiente escolar, destacam-se a temperatura, a umidade, a iluminação e os níveis de ruído. A temperatura inadequada pode gerar desconforto térmico, sensação de cansaço e dificuldade de concentração. A umidade, quando muito baixa ou elevada, pode afetar a percepção de conforto do ambiente. A luminosidade insuficiente pode prejudicar a visualização de materiais, quadros e telas, enquanto níveis elevados de ruído podem comprometer a comunicação entre professor e alunos.
Nesse sentido, o monitoramento dessas variáveis permite compreender melhor as condições físicas das salas de aula e fornece informações que podem apoiar ações de melhoria no ambiente educacional.
## 2.2 Sistemas de monitoramento inteligente
Sistemas de monitoramento inteligente são soluções que utilizam sensores, dispositivos computacionais, redes de comunicação e sistemas de informação para acompanhar variáveis de determinado ambiente ou processo. Esses sistemas permitem coletar dados de forma contínua, processá-los e apresentá-los aos usuários de maneira compreensível.
No contexto escolar, um sistema de monitoramento inteligente pode ser utilizado para acompanhar as condições ambientais das salas de aula e identificar situações que possam comprometer o conforto e a qualidade das atividades educacionais. A principal vantagem desse tipo de solução é a possibilidade de transformar dados coletados em indicadores úteis para tomada de decisão.
## 2.3 Internet das Coisas
A Internet das Coisas, também conhecida como IoT, refere-se à conexão de dispositivos físicos à internet ou a redes de comunicação, permitindo que eles coletem, enviem e recebam dados. Em aplicações IoT, sensores e microcontroladores são frequentemente utilizados para observar variáveis do ambiente e transmitir essas informações para sistemas computacionais.
No projeto proposto, a IoT é aplicada ao monitoramento ambiental de salas de aula. O ESP8266 atua como dispositivo de coleta e comunicação, recebendo informações dos sensores e enviando os dados para a API do sistema por meio de requisições HTTP. Dessa forma, o ambiente físico passa a ser integrado ao sistema web, permitindo acompanhamento em tempo real e consulta histórica das medições.
## 2.4 Sensores aplicados ao monitoramento ambiental
Sensores são dispositivos capazes de identificar variações físicas ou ambientais e convertê-las em sinais que podem ser interpretados por sistemas eletrônicos. No monitoramento ambiental, sensores podem ser utilizados para medir temperatura, umidade, luminosidade, ruído, presença, qualidade do ar e outras variáveis.
Neste projeto, foram consideradas quatro variáveis principais: temperatura, umidade, luminosidade e ruído. A escolha dessas variáveis está relacionada à sua influência no conforto ambiental e à viabilidade de medição por sensores de baixo custo.
### 2.4.1 Sensor de temperatura e umidade
O sensor de temperatura e umidade é utilizado para medir as condições térmicas do ambiente. Essas informações são relevantes porque ambientes muito quentes, frios, secos ou úmidos podem gerar desconforto e afetar a permanência dos alunos na sala de aula.
No sistema proposto, o sensor de temperatura e umidade será conectado ao ESP8266, que realizará leituras periódicas e enviará os dados para a API. Esses dados serão armazenados no banco MySQL e exibidos no dashboard do sistema.
### 2.4.2 Sensor de luminosidade
O sensor de luminosidade é responsável por identificar a intensidade de luz presente no ambiente. A iluminação adequada é importante para leitura, escrita, visualização de quadros, projeções e demais atividades escolares.
No sistema, as leituras de luminosidade serão utilizadas para indicar se determinada sala apresenta níveis baixos, adequados ou elevados de iluminação, conforme os parâmetros configurados no sistema.
### 2.4.3 Sensor de ruído
O sensor de ruído é utilizado para monitorar os níveis sonoros do ambiente. Em salas de aula, o excesso de ruído pode dificultar a comunicação oral, prejudicar a concentração e comprometer o andamento das atividades.
No projeto, o sensor de ruído permitirá registrar variações sonoras durante o período de funcionamento da sala. Esses dados poderão ser consultados em gráficos e relatórios, auxiliando a identificação de horários ou situações em que o ruído se apresenta mais elevado.
## 2.5 Microcontrolador ESP8266
O ESP8266 é um microcontrolador com conectividade Wi-Fi integrada, amplamente utilizado em projetos de Internet das Coisas. Sua utilização é adequada para aplicações de baixo custo que exigem leitura de sensores e comunicação com sistemas externos.
Neste trabalho, o ESP8266 será responsável por realizar a leitura dos sensores ambientais e enviar os dados coletados para a API do sistema. A comunicação será realizada por meio de requisições HTTP, nas quais os dados serão enviados em formato JSON.
## 2.6 Comunicação HTTP em sistemas IoT
O protocolo HTTP é amplamente utilizado na comunicação entre clientes e servidores em aplicações web. Em sistemas IoT, esse protocolo pode ser utilizado para permitir que dispositivos enviem dados a uma API ou consultem informações de um servidor.
No sistema proposto, o ESP8266 enviará as leituras ambientais para a API utilizando requisições HTTP do tipo POST. O sistema web, por sua vez, poderá consultar os dados armazenados por meio de requisições HTTP do tipo GET. Essa abordagem facilita a integração entre o dispositivo físico, a aplicação web e o banco de dados.
## 2.7 APIs REST para recebimento e consulta de dados
Uma API é um conjunto de rotas e regras que permite a comunicação entre diferentes sistemas. Em uma arquitetura baseada em API REST, os recursos são acessados por meio de endpoints, geralmente utilizando métodos HTTP como GET, POST, PUT e DELETE.
Neste projeto, a API terá a função de receber os dados enviados pelo ESP8266, validar as informações, armazená-las no banco de dados MySQL e disponibilizá-las para consulta pelo sistema web. Além disso, a API poderá ser responsável por verificar parâmetros classificatórios e gerar alertas quando os valores coletados estiverem fora dos limites definidos.
## 2.8 Banco de dados MySQL
O MySQL é um sistema gerenciador de banco de dados relacional utilizado para armazenar e organizar informações em tabelas. Em sistemas de monitoramento, o banco de dados é essencial para manter o histórico das medições, permitindo consultas por sala, variável, data, horário e período.
Neste trabalho, o MySQL será utilizado para armazenar dados de usuários, salas, dispositivos, leituras ambientais, parâmetros classificatórios, alertas e relatórios. Essa estrutura permite que o sistema mantenha um registro organizado das informações coletadas e possibilite a geração de dashboards e relatórios históricos.
## 2.9 Dashboards e visualização de dados
Dashboards são painéis visuais utilizados para apresentar informações de forma clara e objetiva. Eles podem conter gráficos, indicadores, filtros, tabelas e alertas, facilitando a interpretação dos dados por parte dos usuários.
No sistema proposto, os dashboards serão utilizados para exibir as condições ambientais das salas de aula. O usuário poderá visualizar dados de temperatura, umidade, luminosidade e ruído, além de consultar o histórico das medições e identificar situações classificadas como inadequadas.
## 2.10 Parâmetros ambientais e alertas automáticos
Para que o sistema seja capaz de gerar alertas automáticos, é necessário definir parâmetros classificatórios para cada variável monitorada. Esses parâmetros podem indicar faixas consideradas adequadas, inadequadas ou críticas, conforme critérios definidos no projeto e em referências técnicas aplicáveis.
Neste trabalho, os parâmetros classificatórios serão armazenados no banco de dados, permitindo que o sistema compare cada leitura recebida com os limites configurados. Quando uma leitura estiver fora da faixa definida, o sistema registrará um alerta e o exibirá no dashboard.

# 3 METODOLOGIA E PROJETO DO SISTEMA
## 3.1 Caracterização da pesquisa
Este trabalho caracteriza-se como uma pesquisa aplicada, pois tem como finalidade desenvolver uma solução tecnológica para um problema identificado no contexto escolar: a ausência de monitoramento contínuo das condições ambientais em salas de aula.
Quanto aos procedimentos, o trabalho envolve desenvolvimento experimental e prototipagem, uma vez que será construído um sistema composto por hardware, API, banco de dados e interface web. O projeto também possui caráter descritivo, pois apresenta as etapas de desenvolvimento, os componentes utilizados, a arquitetura do sistema e os testes realizados.
## 3.2 Contexto do projeto
O projeto foi idealizado a partir da necessidade de acompanhar variáveis ambientais em salas de aula de forma automatizada. Em muitas instituições de ensino, fatores como temperatura elevada, baixa luminosidade ou ruído excessivo são percebidos de forma subjetiva, sem registros históricos que permitam análise posterior.
A proposta do sistema é oferecer uma ferramenta capaz de coletar dados ambientais por meio de sensores, armazená-los em banco de dados e apresentá-los em um sistema web. Com isso, gestores e responsáveis pela instituição podem acompanhar as condições das salas e tomar decisões com base em informações registradas.
## 3.3 Requisitos do sistema
Os requisitos do sistema foram definidos com base nas funcionalidades necessárias para coleta, armazenamento, visualização e análise das informações ambientais.
### 3.3.1 Requisitos funcionais
Tabela 1 – Requisitos funcionais

### 3.3.2 Requisitos não funcionais
Tabela 2 – Requisitos não funcionais

### 3.3.3 Regras de negócio
Tabela 3 – Regras de negócio

## 3.4 Casos de uso
Os principais atores do sistema são:
• Administrador;
• Coordenador escolar;
• Professor.
O administrador é responsável por gerenciar usuários, salas, dispositivos e parâmetros classificatórios. O coordenador escolar pode acompanhar dashboards, consultar históricos, visualizar alertas e gerar relatórios. O professor pode visualizar as condições ambientais das salas às quais possui acesso.
Principais casos de uso:
• cadastrar usuário;
• realizar login;
• cadastrar sala;
• cadastrar dispositivo;
• definir intervalo de leitura;
• visualizar dashboard;
• consultar histórico de medições;
• gerar relatório;
• visualizar alertas;
• gerenciar parâmetros ambientais.
## 3.5 Arquitetura do sistema
A arquitetura do sistema foi organizada em camadas, permitindo separar a coleta dos dados, o processamento, o armazenamento e a visualização das informações.
A primeira camada é composta pelos sensores ambientais conectados ao ESP8266. Essa camada é responsável pela coleta dos dados de temperatura, umidade, luminosidade e ruído. A segunda camada é composta pela comunicação HTTP, utilizada para enviar as leituras do ESP8266 para a API. A terceira camada é formada pela API, responsável por receber, validar, processar e armazenar os dados. A quarta camada é composta pelo banco de dados MySQL, onde são armazenadas as informações do sistema. Por fim, a quinta camada é o sistema web, que apresenta dashboards, relatórios e alertas aos usuários.
Representação simplificada da arquitetura:
Sensores ambientais → ESP8266 → Requisição HTTP → API → Banco de dados MySQL → Sistema web → Dashboard, relatórios e alertas.
## 3.6 Fluxo de dados
O fluxo de dados do sistema ocorre da seguinte forma:
1. Os sensores realizam a leitura das variáveis ambientais.
2. O ESP8266 recebe os valores coletados.
3. O ESP8266 organiza os dados em formato JSON.
4. Os dados são enviados para a API por meio de uma requisição HTTP POST.
5. A API valida as informações recebidas.
6. As leituras são armazenadas no banco de dados MySQL.
7. O sistema compara as leituras com os parâmetros classificatórios.
8. Caso algum valor esteja fora do limite definido, um alerta é registrado.
9. O sistema web consulta os dados por meio da API.
10. Os dados são exibidos em dashboards, relatórios e telas de alerta.
Exemplo de JSON enviado pelo ESP8266:
{
"sala_id": 1,
"dispositivo_id": 1,
"temperatura": 27.5,
"umidade": 62,
"luminosidade": 340,
"ruido": 58,
"data_hora": "2026-06-22 10:30:00"
}
## 3.7 Modelagem do banco de dados
A modelagem do banco de dados foi definida para permitir o armazenamento das principais informações do sistema. As tabelas previstas são:
usuarios Armazena os dados dos usuários do sistema.
Campos sugeridos: id, nome, email, senha, perfil, data_cadastro.
salas Armazena as salas monitoradas.
Campos sugeridos: id, nome, bloco, capacidade, descricao.
dispositivos Armazena os dispositivos vinculados às salas.
Campos sugeridos: id, identificador, sala_id, status, intervalo_leitura.
leituras Armazena as medições coletadas pelos sensores.
Campos sugeridos: id, dispositivo_id, sala_id, temperatura, umidade, luminosidade, ruido, data_hora.
parametros_classificatorios Armazena os limites utilizados para classificar as leituras.
Campos sugeridos: id, variavel, valor_minimo, valor_maximo, classificacao, nivel_alerta, mensagem.
alertas Armazena os alertas gerados pelo sistema.
Campos sugeridos: id, leitura_id, sala_id, variavel, valor_medido, mensagem, nivel_alerta, data_hora.
relatorios Armazena registros de relatórios gerados, caso seja necessário manter histórico.
Campos sugeridos: id, sala_id, tipo_relatorio, periodo_inicio, periodo_fim, data_geracao.
## 3.8 Parâmetros classificatórios e regras de alerta
Os parâmetros classificatórios têm a finalidade de indicar quais faixas de valores são consideradas adequadas, inadequadas ou críticas para cada variável monitorada. Esses parâmetros serão armazenados no banco de dados para permitir ajustes futuros sem necessidade de alteração direta no código-fonte.
Exemplo de estrutura de classificação:
Tabela 4 – Exemplo de estrutura de classificação

Os alertas serão emitidos quando o valor de uma leitura ultrapassar os limites cadastrados na tabela de parâmetros. Inicialmente, os alertas serão exibidos no dashboard do sistema e registrados no banco de dados. Como melhoria futura, o sistema poderá enviar notificações por e-mail, aplicativo ou outro canal de comunicação.
## 3.9 Critérios de teste e validação
A validação do sistema será realizada por meio de testes funcionais e técnicos. Os testes devem verificar se os sensores realizam leituras corretamente, se o ESP8266 envia os dados por HTTP, se a API recebe e armazena as informações no MySQL, se o dashboard apresenta os dados corretamente e se os alertas são gerados quando os parâmetros são ultrapassados.

# 4 DESENVOLVIMENTO DO SISTEMA
## 4.1 Ferramentas utilizadas
O desenvolvimento do sistema utilizou ferramentas de hardware e software voltadas à criação de uma solução IoT integrada a uma aplicação web. Para a coleta de dados ambientais, foi utilizado o microcontrolador ESP8266 conectado a sensores de temperatura, umidade, luminosidade e ruído. A programação do dispositivo foi realizada por meio da linguagem C++ na Arduino IDE.
Para o desenvolvimento da aplicação web, foi utilizado Next.js com TypeScript, permitindo a criação de uma interface moderna, organizada e responsiva. A API foi implementada por meio dos API Routes do Next.js para receber os dados enviados pelo ESP8266, realizar validações e disponibilizar consultas para o sistema web. O banco de dados MySQL foi utilizado para armazenamento das leituras, usuários, salas, dispositivos, parâmetros e alertas.
## 4.2 Desenvolvimento do hardware
A etapa de desenvolvimento do hardware consistiu na montagem do protótipo responsável pela coleta das variáveis ambientais. O ESP8266 foi utilizado como unidade central de controle, recebendo os sinais dos sensores e realizando a comunicação com a API.
Os sensores utilizados no projeto foram:
• sensor de temperatura e umidade;
• sensor de luminosidade;
• sensor de ruído.
Cada sensor foi conectado ao ESP8266 de acordo com suas especificações de alimentação e comunicação. Após a montagem inicial, foram realizados testes individuais para verificar se as leituras estavam sendo obtidas corretamente.
## 4.3 Programação do ESP8266
A programação do ESP8266 foi realizada para permitir a leitura periódica dos sensores e o envio das informações para a API. O firmware do dispositivo possui as seguintes responsabilidades:
• conectar o ESP8266 à rede Wi-Fi;
• realizar a leitura dos sensores;
• organizar os dados em formato JSON;
• enviar os dados para a API por meio de requisição HTTP POST;
• aguardar o intervalo de leitura definido;
• repetir o processo continuamente.
O intervalo entre as leituras poderá ser configurado conforme a necessidade do ambiente monitorado. Essa configuração é importante para equilibrar a frequência de coleta, o consumo de energia e a quantidade de dados armazenados no banco.
## 4.4 Envio dos dados por HTTP
A comunicação entre o ESP8266 e a API foi definida com base no protocolo HTTP. A cada ciclo de leitura, o dispositivo envia uma requisição HTTP POST para um endpoint da API, contendo os valores coletados pelos sensores.
Exemplo de endpoint:
POST /api/leituras
Exemplo de corpo da requisição:
{
"sala_id": 1,
"dispositivo_id": 1,
"temperatura": 27.5,
"umidade": 62,
"luminosidade": 340,
"ruido": 58
}
A API recebe a requisição, valida se os campos obrigatórios foram enviados e realiza o armazenamento no banco de dados.
## 4.5 Desenvolvimento da API
A API, implementada por meio dos API Routes do Next.js, é responsável por intermediar a comunicação entre o dispositivo IoT, o banco de dados e o sistema web. Suas principais funções são:
• receber leituras enviadas pelo ESP8266;
• validar os dados recebidos;
• armazenar as leituras no MySQL;
• consultar histórico de medições;
• retornar dados para o dashboard;
• gerar relatórios por período;
• comparar leituras com parâmetros classificatórios;
• registrar alertas automáticos.
Endpoints previstos:
Tabela 5 – Endpoints previstos

## 4.6 Integração da API com o MySQL
A integração com o MySQL permite que os dados coletados sejam armazenados de forma organizada e permanente. Sempre que uma nova leitura é recebida pela API, os valores são inseridos na tabela de leituras junto com a identificação da sala, do dispositivo e do horário de coleta.
Após o armazenamento, o sistema pode consultar esses dados para construir gráficos, gerar relatórios e verificar o histórico ambiental das salas monitoradas.
## 4.7 Desenvolvimento do sistema web
O sistema web foi desenvolvido para permitir que usuários autorizados visualizem as informações coletadas pelo sistema. A interface deve apresentar telas para login, cadastro de usuários, cadastro de salas, cadastro de dispositivos, visualização de dashboards, consulta de históricos, relatórios e alertas.
O uso de uma interface web facilita o acesso às informações por gestores e professores, permitindo que os dados sejam visualizados em diferentes dispositivos, como computadores, notebooks ou tablets.
## 4.8 Desenvolvimento dos dashboards
Os dashboards foram planejados para apresentar os dados ambientais de forma clara e objetiva. Cada sala monitorada poderá possuir indicadores individuais de temperatura, umidade, luminosidade e ruído.
Os gráficos previstos incluem:
• gráfico de temperatura por período;
• gráfico de umidade por período;
• gráfico de luminosidade por período;
• gráfico de ruído por período;
• cartões com a última leitura registrada;
• lista de alertas recentes;
• comparação entre salas, se houver mais de uma sala cadastrada.
## 4.9 Implementação dos alertas automáticos
Os alertas automáticos serão gerados quando uma leitura estiver fora dos parâmetros cadastrados no sistema. O processo ocorre da seguinte forma:
1. A API recebe uma nova leitura.
2. A leitura é armazenada no banco de dados.
3. O sistema consulta os parâmetros cadastrados para a variável correspondente.
4. O valor medido é comparado com o limite mínimo e máximo definido.
5. Caso o valor esteja fora da faixa adequada, um alerta é registrado.
6. O alerta é exibido no dashboard.
Essa funcionalidade permite que o sistema não apenas registre dados, mas também auxilie na identificação de situações que exigem atenção.
## 4.10 Implementação dos relatórios por período
Os relatórios têm como objetivo permitir a análise histórica das condições ambientais. O usuário poderá gerar relatórios filtrando por sala, variável e intervalo de datas.
Relatórios previstos:
• relatório de temperatura por período;
• relatório de umidade por período;
• relatório de luminosidade por período;
• relatório de ruído por período;
• relatório geral da sala;
• relatório de alertas emitidos.
Esses relatórios poderão ser utilizados pela gestão escolar para identificar padrões, horários críticos e possíveis necessidades de intervenção no ambiente.

# 5 TESTES E RESULTADOS
## 5.1 Testes de leitura dos sensores
Os testes de leitura dos sensores têm como objetivo verificar se os dados de temperatura, umidade, luminosidade e ruído estão sendo capturados corretamente pelo ESP8266.
Nesta etapa, devem ser registrados os valores obtidos em diferentes condições ambientais. Os resultados podem ser apresentados em tabela contendo data, horário, variável, valor medido e observações.
Inserir aqui tabela com os testes realizados.
## 5.2 Testes de envio dos dados por HTTP
Os testes de envio por HTTP devem verificar se o ESP8266 consegue estabelecer conexão com a rede Wi-Fi e enviar corretamente os dados para a API. Para isso, devem ser observadas as respostas retornadas pela API após cada requisição.
Inserir aqui evidências de funcionamento, como logs, prints da requisição ou registros recebidos pela API.
## 5.3 Testes de armazenamento no MySQL
Os testes de armazenamento têm como objetivo verificar se as leituras recebidas pela API estão sendo gravadas corretamente no banco de dados MySQL.
Inserir aqui prints ou tabelas demonstrando registros salvos no banco.
## 5.4 Testes da API
Os testes da API devem validar se os endpoints estão funcionando corretamente. Devem ser testadas as rotas de envio de leituras, consulta de dados, geração de relatórios e consulta de alertas.
Inserir aqui tabela com método, rota, entrada, resultado esperado e resultado obtido.
## 5.5 Testes do dashboard
Os testes do dashboard devem verificar se as informações armazenadas no banco são exibidas corretamente no sistema web. Devem ser observados os gráficos, indicadores, filtros e alertas apresentados.
Inserir aqui imagens das telas do sistema web.
## 5.6 Testes dos alertas automáticos
Os testes dos alertas devem verificar se o sistema registra alertas quando os valores coletados ultrapassam os parâmetros configurados. Para isso, podem ser utilizados dados reais ou dados simulados.
Inserir aqui tabela com variável, valor medido, parâmetro, alerta esperado e resultado obtido.
## 5.7 Resultados obtidos
Com os testes realizados, espera-se demonstrar que o sistema é capaz de coletar dados ambientais por meio dos sensores, enviar essas informações por HTTP para a API, armazená-las no banco MySQL e apresentá-las no sistema web.
Os resultados devem evidenciar:
• funcionamento da coleta de dados;
• comunicação entre ESP8266 e API;
• armazenamento das leituras no MySQL;
• exibição dos dados no dashboard;
• geração de alertas automáticos;
• geração de relatórios por período.
Inserir aqui os resultados reais obtidos após os testes.
## 5.8 Limitações do projeto
Como limitação, o sistema desenvolvido consiste em um protótipo acadêmico e pode apresentar restrições relacionadas à precisão dos sensores utilizados, à estabilidade da conexão de rede, à quantidade de salas monitoradas e à necessidade de calibração dos parâmetros ambientais.
Outra limitação está relacionada à definição dos limites classificatórios, que devem ser validados com base em normas técnicas, referências adequadas e, em aplicações reais, orientação especializada.

# 6 CONSIDERAÇÕES FINAIS
## 6.1 Conclusão
Este trabalho apresentou o desenvolvimento de um sistema de monitoramento ambiental inteligente com IoT para salas de aula. A proposta buscou integrar sensores, microcontrolador ESP8266, comunicação HTTP, API, banco de dados MySQL e sistema web para permitir a coleta, armazenamento, visualização e análise de dados ambientais.
A partir da estrutura proposta, o sistema permite acompanhar variáveis como temperatura, umidade, luminosidade e ruído, oferecendo dashboards, relatórios por período e alertas automáticos. Dessa forma, a solução contribui para que gestores escolares possam tomar decisões com base em dados objetivos sobre as condições ambientais das salas de aula.
O desenvolvimento do projeto demonstrou a viabilidade de utilizar tecnologias acessíveis para criar uma ferramenta de apoio à gestão escolar. Embora o sistema não substitua avaliações técnicas especializadas, ele pode servir como instrumento auxiliar para identificação de situações que exigem atenção e melhoria no ambiente educacional.
## 6.2 Contribuições do projeto
As principais contribuições deste trabalho são:
• desenvolvimento de um protótipo de monitoramento ambiental com IoT;
• integração entre ESP8266, sensores, API, MySQL e sistema web;
• estruturação de dashboards para visualização dos dados coletados;
• definição de requisitos funcionais e não funcionais;
• proposta de alertas automáticos baseados em parâmetros classificatórios;
• criação de relatórios por sala, variável e período;
• aplicação de tecnologia de baixo custo ao contexto escolar.
## 6.3 Trabalhos futuros
Como trabalhos futuros, sugere-se:
• ampliar a quantidade de salas monitoradas;
• incluir novos sensores, como qualidade do ar e presença;
• implementar notificações por e-mail ou aplicativo;
• aprimorar os parâmetros classificatórios com base em normas técnicas específicas;
• realizar testes em ambiente escolar real por um período maior;
• aplicar análise estatística sobre os dados coletados;
• desenvolver versões mobile do sistema;
• implementar recursos de previsão ou recomendação com base no histórico das medições.

# REFERÊNCIAS
ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR 10151: Acústica — Medição e avaliação de níveis de pressão sonora em áreas habitadas. Rio de Janeiro: ABNT.
ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. NBR ISO/IEC 12207: Engenharia de sistemas e software — Processos de ciclo de vida de software. Rio de Janeiro: ABNT.
SANTOS, Aldo von Wangenheim; BREZOLIN, Adriano. Internet das Coisas: fundamentos e aplicações. São Paulo: Érica, 2019.
TANENBAUM, Andrew S.; WETHERALL, David J. Redes de computadores. 5. ed. São Paulo: Pearson, 2011.
[Adicionar referências sobre conforto térmico, iluminação, ruído em ambientes escolares, APIs REST, MySQL, ESP8266, visualização de dados e engenharia de requisitos.]

# APÊNDICES
## Apêndice A — Tabela de requisitos funcionais
Inserir tabela completa dos requisitos funcionais.
## Apêndice B — Tabela de requisitos não funcionais
Inserir tabela completa dos requisitos não funcionais.
## Apêndice C — Diagrama de casos de uso
Figura 1 – Diagrama de casos de uso
Inserir imagem do diagrama de casos de uso.
## Apêndice D — Modelo do banco de dados
Figura 2 – Modelo entidade-relacionamento do banco MySQL
Inserir diagrama entidade-relacionamento do banco MySQL.
## Apêndice E — Arquitetura do sistema
Figura 3 – Arquitetura do sistema
Inserir diagrama mostrando sensores, ESP8266, API, MySQL e sistema web.
## Apêndice F — Telas do sistema web
Figura 4 – Telas do sistema web
Inserir imagens do dashboard, relatórios, alertas e cadastro de salas/dispositivos.
| Código | Requisito funcional | Descrição |
| --- | --- | --- |
| RF01 | Cadastrar usuário | O sistema deve permitir o cadastro de usuários. |
| RF02 | Efetuar login | O sistema deve permitir autenticação dos usuários. |
| RF03 | Atribuir permissões | O sistema deve permitir definir perfis como administrador, coordenador e professor. |
| RF04 | Cadastrar sala | O sistema deve permitir o cadastro das salas monitoradas. |
| RF05 | Cadastrar dispositivo | O sistema deve permitir cadastrar dispositivos ESP8266 vinculados às salas. |
| RF06 | Definir intervalo de leitura | O sistema deve permitir configurar o tempo entre as leituras dos sensores. |
| RF07 | Coletar temperatura | O sistema deve coletar dados de temperatura. |
| RF08 | Coletar umidade | O sistema deve coletar dados de umidade. |
| RF09 | Coletar luminosidade | O sistema deve coletar dados de luminosidade. |
| RF10 | Coletar nível de ruído | O sistema deve coletar dados referentes ao nível de ruído. |
| RF11 | Enviar dados por HTTP | O ESP8266 deve enviar as leituras para a API por meio de requisições HTTP. |
| RF12 | Armazenar leituras no MySQL | O sistema deve armazenar as leituras ambientais no banco de dados. |
| RF13 | Exibir dashboard | O sistema deve apresentar os dados em gráficos e indicadores. |
| RF14 | Consultar histórico | O sistema deve permitir consulta das medições anteriores. |
| RF15 | Gerar relatório por período | O sistema deve gerar relatórios por sala, variável, data e horário. |
| RF16 | Gerar alertas automáticos | O sistema deve gerar alertas quando uma variável ultrapassar os parâmetros definidos. |
| RF17 | Consultar alertas | O sistema deve permitir visualizar os alertas registrados. |
| RF18 | Gerenciar parâmetros | O sistema deve permitir cadastrar ou editar parâmetros classificatórios das variáveis. |
| Código | Requisito não funcional | Descrição |
| --- | --- | --- |
| RNF01 | Baixo custo | O sistema deve utilizar componentes acessíveis e compatíveis com projetos acadêmicos. |
| RNF02 | Usabilidade | A interface deve ser simples e compreensível para os usuários. |
| RNF03 | Confiabilidade | O sistema deve registrar corretamente as leituras recebidas. |
| RNF04 | Disponibilidade | O sistema web deve estar disponível para consulta das informações. |
| RNF05 | Escalabilidade | A estrutura deve permitir inclusão de novas salas e dispositivos. |
| RNF06 | Manutenibilidade | O sistema deve ser organizado para facilitar ajustes e futuras melhorias. |
| RNF07 | Segurança | O acesso ao sistema deve ser controlado por autenticação. |
| RNF08 | Desempenho | A API deve responder às requisições em tempo adequado para a aplicação proposta. |
| Código | Regra de negócio | Descrição |
| --- | --- | --- |
| RN01 | Dispositivo vinculado à sala | Cada dispositivo deve estar vinculado a uma sala cadastrada. |
| RN02 | Leitura com data e hora | Toda leitura deve ser registrada com data e hora. |
| RN03 | Alerta por parâmetro | Um alerta deve ser gerado quando uma leitura estiver fora dos parâmetros definidos. |
| RN04 | Relatório por período | Os relatórios devem permitir filtro por data inicial, data final, sala e variável. |
| RN05 | Acesso por perfil | Usuários com diferentes perfis podem ter permissões diferentes no sistema. |
| RN06 | Configuração do intervalo | O intervalo de leitura deve ser configurado conforme a necessidade do ambiente monitorado. |
| Variável | Condição | Classificação | Ação do sistema |
| --- | --- | --- | --- |
| Temperatura | Abaixo ou acima da faixa definida | Inadequada | Registrar alerta |
| Umidade | Fora da faixa definida | Inadequada | Registrar alerta |
| Luminosidade | Abaixo do mínimo definido | Inadequada | Registrar alerta |
| Ruído | Acima do limite definido | Crítica | Registrar alerta |
| Método | Rota | Função |
| --- | --- | --- |
| POST | /api/leituras | Receber leitura enviada pelo ESP8266 |
| GET | /api/leituras | Consultar leituras registradas |
| GET | /api/salas | Listar salas cadastradas |
| POST | /api/salas | Cadastrar sala |
| GET | /api/alertas | Consultar alertas |
| GET | /api/relatorios | Gerar relatório por período |
| POST | /api/parametros | Cadastrar parâmetro classificatório |
