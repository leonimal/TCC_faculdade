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
