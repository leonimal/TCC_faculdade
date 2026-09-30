---
status: historico
fonte_original: "TCC_Modelo-UNIP2026Final2 (enrico e leo).docx"
convertido_para_markdown: 2026-08-14
fonte_de_verdade: false
---

> **Documento histórico convertido automaticamente.** Pode conter escopo, nomes, referências, decisões e formatação desatualizados. Em caso de conflito, prevalecem `projeto/contexto.md`, `projeto/decisoes.md` e `projeto/pendencias.md`.

UNIVERSIDADE PAULISTA



Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues





SISTEMA DE MONITORAMENTO PARA SALAS DE AULA













ARAÇATUBA - SP
2026

Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues

SISTEMA DE MONITORAMENTO PARA SALAS DE AULA


Trabalho de conclusão de curso para obtenção do título de Bacharel em Ciência da Computação apresentado à Universidade Paulista - UNIP.

Orientador: Prof. Me. Aldriano José da Silva













ARAÇATUBA - SP
2026

Enrico Garcia Silva Costa
Leonardo Pedrozo Elias Rodrigues

SISTEMA DE MONITORAMENTO PARA SALAS DE AULA


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


Agradecemos à Deus por tudo o que fez e faz por nós diariamente nas nossas vidas e de todos;
As nossas famílias por toda a base e apoio oferecida em nossa caminhada;
Ao orientador xxxxxxx que nos orientou de maneira clara e coesa, além de sempre oferecer sugestões;
Aos amigos que fizemos durante todos esses anos de estudos.



RESUMO

Neste trabalho de conclusão de curso, foi realizado o desenvolvimento de um sistema e de um produto com a finalidade de coletar dados para o monitoramento do ambiente escolar, apoiando a gestão na identificação de fatores que impactam a atenção e o conforto dos alunos. A proposta consiste na criação de uma solução tecnológica capaz de acompanhar, de forma contínua, diferentes condições ambientais presentes nas salas de aula, permitindo uma análise mais precisa sobre como esses fatores podem influenciar o processo de aprendizagem.

O sistema desenvolvido é responsável por coletar informações relacionadas à temperatura, umidade, iluminação, nível de ruído e ocupação do ambiente. Esses dados são obtidos por meio de sensores instalados no espaço escolar e posteriormente processados para gerar informações relevantes sobre as condições do ambiente de aprendizagem. A partir da análise dessas variáveis, torna-se possível identificar padrões e situações que podem interferir diretamente no bem-estar, na concentração e no desempenho dos estudantes durante as atividades escolares.

Com os dados coletados, são criados dashboards interativos que apresentam os indicadores ambientais de forma clara e organizada. Esses painéis permitem que gestores e responsáveis pela instituição visualizem rapidamente as condições do ambiente monitorado, facilitando a interpretação das informações e auxiliando na tomada de decisões. Dessa forma, a ferramenta contribui para a adoção de medidas que possam melhorar a qualidade do espaço educacional, como ajustes na ventilação, iluminação ou controle de ruídos.




Portanto, este trabalho demonstra como o uso de tecnologias de monitoramento ambiental pode apoiar a gestão escolar na compreensão das condições físicas das salas de aula, permitindo intervenções mais eficientes e baseadas em dados.



ABSTRACT

This final course project involved the development of a system and a product designed to collect data for monitoring the school environment, supporting management in identifying factors that impact student attention and comfort. The proposal consists of creating a technological solution capable of continuously monitoring different environmental conditions present in classrooms, allowing for a more precise analysis of how these factors can influence the learning process.

The developed system collects information related to temperature, humidity, lighting, noise level, and occupancy of the environment. This data is obtained through sensors installed in the school space and subsequently processed to generate relevant information about the learning environment conditions. From the analysis of these variables, it becomes possible to identify patterns and situations that can directly interfere with the well-being, concentration, and performance of students during school activities.

With the collected data, interactive dashboards are created that present the environmental indicators in a clear and organized way. These panels allow managers and those responsible for the institution to quickly visualize the conditions of the monitored environment, facilitating the interpretation of information and assisting in decision-making. In this way, the tool contributes to the adoption of measures that can improve the quality of the educational space, such as adjustments to ventilation, lighting, or noise control.





Therefore, this work demonstrates how the use of environmental monitoring technologies can support school management in understanding the physical conditions of classrooms, allowing for more efficient and data-driven interventions.


LISTA DE ILUSTRAÇÕES
Figura 1 – a figura 1 representa	15
Figura 2 - Página	19
Figura 3 - Página	20
Figura 4 - página	21





















LISTA DE TABELAS
Tabela 1 – Tabelaxxxxx representa	25
Tabela 2 – Tabela xxxx	32


LISTA DE ABREVIATURAS E SIGLAS
Abreviaturas e siglas referentes à partes técnicas
CdU		Caso de Uso
CSS		Cascading Style Sheets
DAO		Data Access Object
DDL		Data Definition Language
DML		Data Manipulation Language
ER		Engenharia de Requisitos
EXIF		Exchangeable Image File Format
HTML		Hypertext Markup Language
HTTP		HyperText Transfer Protocol
GB		Gigabyte
ID		Identity
IDE		Integrated Development Environment
RF		Requisito Funcional
RN		Regra de Negócio
RNF		Requisito Não-Funcional
SGBD		Sistema Gerenciador de Banco de Dados
SQL		Structured Query Language
VPC		Virtual Private Cloud
API 		Application Programming Interface


SUMÁRIO

1 INTRODUÇÃO

A qualidade do ambiente escolar exerce influência direta no processo de ensino e aprendizagem. Fatores como temperatura, iluminação, nível de ruído, ventilação e quantidade de pessoas presentes em uma sala podem afetar significativamente a concentração, o conforto e o desempenho dos alunos durante as atividades escolares. Apesar disso, muitas instituições de ensino ainda possuem dificuldades em monitorar essas condições de forma contínua e baseada em dados, o que pode limitar a identificação de problemas ambientais que impactam a qualidade das aulas.

Com o avanço das tecnologias de sensores, dispositivos conectados e sistemas de análise de dados, tornou-se possível desenvolver soluções capazes de monitorar ambientes em tempo real. Esses sistemas permitem coletar, processar e apresentar informações relevantes sobre as condições físicas de determinados espaços, contribuindo para uma gestão mais eficiente e baseada em evidências. No contexto educacional, a utilização dessas tecnologias pode oferecer suporte para a criação de ambientes mais adequados ao aprendizado, promovendo maior bem-estar para alunos e professores.

Nesse cenário, o presente trabalho propõe o desenvolvimento de um sistema inteligente de monitoramento ambiental voltado para salas de aula. A solução desenvolvida tem como objetivo coletar dados relacionados à temperatura, umidade, iluminação, níveis de ruído e ocupação do ambiente escolar, permitindo a análise das condições que podem influenciar a atenção e o conforto dos estudantes. A partir dessas informações, o sistema organiza os dados e os apresenta por meio de dashboards, possibilitando uma visualização clara e acessível dos indicadores ambientais.


Além de apresentar os dados coletados, o sistema busca auxiliar a gestão escolar na interpretação das informações, contribuindo para a identificação de padrões e situações que possam comprometer o ambiente de aprendizagem. Dessa forma, torna-se possível apoiar a tomada de decisões relacionadas à melhoria das condições das salas de aula, como ajustes estruturais, mudanças na organização do espaço ou intervenções voltadas ao conforto ambiental.

Portanto, este trabalho de conclusão de curso tem como finalidade desenvolver e apresentar uma solução tecnológica capaz de apoiar o monitoramento do ambiente escolar, utilizando a coleta e análise de dados para gerar informações úteis à gestão educacional. Ao integrar tecnologia, análise de dados e visualização de informações, o projeto busca contribuir para a melhoria da qualidade dos ambientes de ensino, favorecendo condições mais adequadas para o aprendizado e o bem-estar dos alunos.

## 1.1	OBJETIVOS
SDA
2  FUNDAMENTAÇÃO TEÓRICA

A Internet das Coisas (IoT) representa um dos principais avanços tecnológicos da atualidade, permitindo a interconexão entre dispositivos físicos por meio da internet. Essa tecnologia possibilita a coleta, transmissão e análise de dados em tempo real, sendo amplamente utilizada em áreas como automação residencial, indústria, saúde, agricultura e educação.

No contexto educacional, a utilização de dispositivos inteligentes permite criar ambientes mais eficientes, seguros e confortáveis. O monitoramento contínuo das condições ambientais pode auxiliar gestores escolares na tomada de decisões relacionadas à climatização, iluminação e controle de ruídos, contribuindo diretamente para melhoria do processo educacional.

O monitoramento ambiental consiste na coleta contínua de variáveis físicas do ambiente, permitindo identificar alterações que possam comprometer o conforto e a saúde dos ocupantes. Entre as principais variáveis monitoradas destacam-se temperatura, umidade, luminosidade e nível sonoro.

A temperatura inadequada pode causar desconforto térmico, fadiga e redução da concentração. Já o excesso de ruído pode prejudicar significativamente a compreensão oral e o desempenho cognitivo dos estudantes. A iluminação insuficiente também impacta diretamente a capacidade visual e a produtividade no ambiente escolar.

Além disso, o uso de sistemas embarcados, como o ESP8266, possibilita a implementação de soluções IoT de baixo custo e alta eficiência. Esses dispositivos possuem conectividade Wi-Fi integrada, permitindo comunicação direta com servidores e plataformas web.



## 2.1 – EXEMPLOS DE SISTEMAS DE MONITORAMENTO INTELIGENTE

Atualmente, diversas soluções tecnológicas vêm sendo utilizadas para monitoramento inteligente de ambientes. Esses sistemas utilizam sensores, redes de comunicação e plataformas de análise de dados para fornecer informações em tempo real sobre condições ambientais.

Os sistemas de monitoramento inteligente têm como principal objetivo automatizar processos de coleta de dados, permitindo maior precisão nas análises e redução da necessidade de intervenção humana.

2.1.1 SMART CAMPUS

O conceito de Smart Campus está relacionado à aplicação de tecnologias inteligentes em instituições de ensino. Nesse modelo, sensores e dispositivos IoT são utilizados para monitorar iluminação, climatização, segurança, consumo energético e ocupação de ambientes.

Os sistemas Smart Campus permitem que gestores acompanhem dados em tempo real, promovendo maior eficiência operacional e melhoria na experiência dos alunos e professores.

Além disso, essas soluções contribuem para redução do desperdício de energia e otimização dos recursos institucionais.





### 2.1.2 SISTEMAS DE AUTOMAÇÃO PREDIAL
Os sistemas de automação predial são amplamente utilizados em edifícios inteligentes para controle e monitoramento de variáveis ambientais. Esses sistemas permitem automatizar equipamentos como ar-condicionado, iluminação e ventilação.

A utilização de sensores integrados possibilita identificar alterações ambientais e realizar ajustes automáticos para manutenção do conforto dos usuários. No contexto educacional, a automação predial pode contribuir significativamente para melhoria do ambiente de aprendizagem.

### 2.1.3 PLATAFORMAS DE MONITORAMENTO IOT
As plataformas de monitoramento IoT são responsáveis pelo gerenciamento e visualização dos dados coletados pelos sensores. Essas plataformas geralmente disponibilizam dashboards gráficos que permitem acompanhar informações em tempo real.

Além da visualização, muitas plataformas oferecem funcionalidades como emissão de alertas automáticos, geração de relatórios e armazenamento histórico de dados. Essas características tornam as plataformas IoT fundamentais para aplicações de monitoramento ambiental inteligente.













## 2.2 RELAÇÃO DAS PLATAFORMAS E SUAS CARACTERÍSTICAS

Os sistemas de monitoramento inteligente apresentam diversas características em comum, como utilização de sensores, comunicação em rede e processamento de dados em tempo real. Entretanto, existem diferenças relacionadas ao custo, escalabilidade, precisão e complexidade de implementação.

Soluções baseadas em ESP8266 destacam-se pelo baixo custo e facilidade de integração, sendo amplamente utilizadas em projetos acadêmicos e aplicações IoT.  O protocolo MQTT também se destaca devido à sua leveza e eficiência, permitindo comunicação rápida entre dispositivos mesmo em redes com baixa largura de banda.

Além disso, dashboards web oferecem interfaces intuitivas para acompanhamento das informações coletadas, facilitando a interpretação dos dados por parte dos usuários. A combinação dessas tecnologias possibilita o desenvolvimento de sistemas acessíveis, eficientes e adequados ao ambiente educacional.
## 2.3 BANCO DE DADOS
## 2.4 API
## 2.4.1 PROTOCOLO HTTP E COMUNICAÇÃO
## 2.5 NODE MCU ESP8266
## 2.5.1 PRINCIPAIS CARACTERISTICAS
## 2.5.2 FUNCIONAMENTO

## 2.6 SENSOR DE TEMPERATURA E UMIDADE DHT11
## 2.6.1 PRINCIPAIS CARACTERISTICAS
## 2.6.2 FUNCIONAMENTO
## 2.7 SENSOR DE RUÍDO MAX9814
## 2.7.1 PRINCIPAIS CARACTERISTICAS
## 2.7.2 FUNCIONAMENTO
## 2.8 SENSOR DE ILUMINAÇÃO BH1750
## 2.8.1 PRINCIPAIS CARACTERISTICAS
## 2.8.2 FUNCIONAMENTO
## 2.9 NEXT.JS
## 2.9.1 CARACTERISTICAS DO SISTEMA WEB
## 2.9.2 CRIAÇÃO DOS DASHBOADS







3 PROJETO
O projeto consiste no desenvolvimento de um sistema inteligente capaz de monitorar continuamente as condições ambientais de salas de aula utilizando sensores IoT conectados a um microcontrolador ESP8266. O sistema será responsável pela coleta de dados relacionados à temperatura, umidade, luminosidade e ruído, transmitindo essas informações para um servidor por meio do protocolo MQTT.

Posteriormente, os dados serão armazenados em banco de dados e exibidos em um dashboard web desenvolvido para acompanhamento em tempo real. O projeto busca oferecer uma solução acessível e eficiente para auxiliar instituições de ensino na melhoria do conforto ambiental e da qualidade do ambiente educacional.


3.1 ENGENHARIA DE REQUISITOS
Engenharia de requisitos se resume a um conjunto de processos que viabilizam, especificam e validam os requisitos de um sistema além de produzir um documento de requisitos. Também tem como propósito determinar uma ordem para todos os processos de definição dos requisitos. Essa estruturação é necessária porque as diversas situações para que um sistema é desenvolvido exigem observações corretas no entendimento do problema antes de idealizar uma solução.
Portanto a engenharia de requisitos é um procedimento onde os requisitos de um sistema a ser desenvolvido são coletados para que sejam analisados, documentados e gerenciados durante todas as etapas de vida do projeto.

3.1.1 CONTEXTO DO PROJETO
Atualmente, muitas instituições de ensino não possuem mecanismos automatizados capazes de monitorar continuamente as condições ambientais das salas de aula. Problemas relacionados ao calor excessivo, iluminação inadequada e altos níveis de ruído são frequentemente percebidos apenas de maneira subjetiva, dificultando ações corretivas rápidas e eficientes.

Nesse contexto, o projeto propõe o desenvolvimento de um sistema inteligente de baixo custo capaz de realizar o monitoramento ambiental em tempo real, auxiliando gestores escolares na tomada de decisões. O sistema permitirá identificar situações críticas e gerar alertas preventivos, promovendo melhores condições de conforto e aprendizagem.

3.1.2 LEVANTAMENTO DE REQUISITOS
O levantamento de requisitos foi realizado com base nas necessidades observadas no ambiente educacional e nas funcionalidades esperadas para o sistema.

Requisitos Funcionais

- Coletar dados de temperatura e umidade utilizando sensor DHT11;
- Coletar dados de luminosidade utilizando sensor BH1750;
- Monitorar níveis de ruído utilizando sensor MAX9814;
- Transmitir informações utilizando protocolo MQTT;
- Armazenar os dados em banco de dados;
- Exibir informações em dashboard web;
- Gerar alertas automáticos;
- Permitir acompanhamento em tempo real.


Requisitos Não Funcionais

- Baixo custo de implementação;
- Facilidade de manutenção;
- Interface amigável;
- Confiabilidade na transmissão dos dados;
- Escalabilidade do sistema;
- Baixo consumo energético;
- Disponibilidade contínua do sistema.


## 3.2 DIAGRAMA DE CASOS DE USO
O diagrama de casos de uso representa as interações entre os usuários e o sistema de monitoramento ambiental.

Os principais atores do sistema são:

- Administrador;
- Coordenador escolar;
- Professor.

As funcionalidades do sistema incluem:

- Visualizar dados ambientais;
- Consultar histórico de medições;
- Receber alertas automáticos;
- Monitorar salas em tempo real;
- Gerenciar sensores e dispositivos;
- Acompanhar indicadores ambientais.

O diagrama de casos de uso auxilia na compreensão das funcionalidades do sistema e no relacionamento entre usuários e recursos disponíveis.

## 3.3 COLETA DE DADOS A PARTIR DOS SENSORES
## 3.4 RECEBIMENTO DE DADOS: ESP8266
## 3.4.1 TRANSFERENCIA DE DADOS

## 3.5 ARMAZENAMENTO DE DADOS: MYSQL








# 4 DESENVOLVIMENTO

O desenvolvimento do sistema foi realizado em etapas, envolvendo integração de hardware, programação do firmware, implementação da comunicação em rede e desenvolvimento da interface web. Inicialmente, foi realizada a montagem do nó sensor utilizando o ESP8266 integrado aos sensores DHT11, BH1750 e MAX9814.

Em seguida, foi desenvolvido o firmware responsável pela leitura dos sensores e transmissão dos dados utilizando o protocolo MQTT. Posteriormente, foi implementado o sistema de armazenamento em banco de dados e desenvolvido o dashboard web para visualização das informações. O sistema foi projetado visando baixo custo, facilidade de manutenção e possibilidade de expansão futura.

## 4.1 ESCOLHA DAS LINGUAGENS E FERRAMENTAS
A escolha das tecnologias utilizadas no projeto foi baseada em critérios como custo, facilidade de desenvolvimento, desempenho e compatibilidade com aplicações IoT. O microcontrolador ESP8266 foi selecionado devido à conectividade Wi-Fi integrada, baixo consumo energético e ampla utilização em projetos embarcados.

Os sensores escolhidos foram:

- DHT11 para temperatura e umidade;
- BH1750 para luminosidade;
- MAX9814 para monitoramento de ruído.

Para programação do ESP8266 foi utilizada a linguagem C++ por meio da Arduino IDE.

O desenvolvimento do dashboard web foi realizado utilizando React.js e TypeScript, permitindo criação de interfaces modernas e responsivas. A comunicação entre os dispositivos foi implementada utilizando o protocolo MQTT, reconhecido pela eficiência em aplicações IoT.

O banco de dados Firebird foi utilizado para armazenamento das informações coletadas.

## 4.2 PROTOTIPAGEM
Inicialmente, foi construído um protótipo básico contendo o ESP8266 conectado aos sensores responsáveis pela coleta dos dados ambientais. Após validação do hardware, foi implementada a comunicação MQTT para transmissão das informações ao servidor.

Em seguida, foi desenvolvido o dashboard web para exibição dos dados em tempo real por meio de gráficos e indicadores visuais. O sistema também passou a emitir alertas automáticos quando os valores monitorados ultrapassavam limites considerados inadequados para o ambiente educacional.

Por fim, o protótipo foi preparado para testes em ambiente real, permitindo validar o funcionamento do sistema em salas de aula e analisar sua eficiência no monitoramento ambiental contínuo.





# REFERÊNCIAS

BGE. PNAD: Educação e Qualificação Profissional 2014. 2014. Disponível em: <https://biblioteca.ibge.gov.br/visualizacao/livros/liv100061.pdf>. Acesso em: 14 de abril de 2018.

LEITE, Júlio C. S. P. Livro vivo: Engenharia de requisitos. 2007. Disponível em: <http://livrodeengenhariaderequisitos.blogspot.com.br/>. Acesso em: 01 de maio de 2018.
HAMMAN, Renan. 7 sites para você fazer cursos completos à distância. 2015. Disponível em: <https://www.tecmundo.com.br/educacao/72740-7-sites-voce-fazer-cursos-distancia.htm>. Acesso em: 07 de maio de 2018.

STALLINGS, William. Criptografia e segurança de redes: Princípios e práticas. 4ª Edição. São Paulo (Brasil): Prentice Hall Brasil, 2008.
