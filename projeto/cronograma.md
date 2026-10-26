# Cronograma mestre

Atualizado em 30 de setembro de 2026. O envio final permanece previsto para **30 de novembro de 2026**; a apresentação/validação do cronograma de implementação está prevista para 1º de dezembro de 2026.

| Fase | Entregável | Situação atual | Próximo marco |
| --- | --- | --- | --- |
| 1 | Escopo, pergunta e objetivos | Concluído pelos autores (`DEC-008` a `DEC-010`); ainda precisa ser submetido ao orientador. | Submissão ao orientador. |
| 2 | Seleção e conferência inicial de hardware | Componentes recebidos; ESP32-D0WD-V3, SHT3X e VEML7700 reconhecidos, com boot e I²C confirmados. | Conferir 3,3 V, leituras contínuas e estabilidade. |
| 3 | Protocolo experimental | Parcial: duração, janela, intervalo, recuperação offline, métricas e tratamento de dados definidos. | Fixar datas, posição e instrumentos de referência. |
| 4 | Protótipo eletrônico e firmware | Protótipo montado; leituras básicas e firmware gravado em `COM3`. | Executar T001–T003 e registrar resultados. |
| 5 | Transmissão e integração física | Transmissão confirmada para a API local e por Quick Tunnel HTTPS no hotspot do Windows. | Noite-piloto com hotspot do celular e registro operacional. |
| 6 | API e banco de dados | Implementados e testados localmente: ingestão, consultas, configuração, telemetria, MySQL e migrações. | Preparar estratégia de hospedagem, backup e credenciais definitivas. |
| 7 | Aplicação web | Implementados: autenticação, salas, nós, monitoramento por sala, Caderno/CSV, alertas locais e notificações. | Demonstrar a evolução e corrigir achados dos testes. |
| 8 | Testes ponta a ponta | Parcial: evidência de transmissão real; T005/T006 aprovados localmente e T007 parcial. | Medir latência, completude, disponibilidade e recuperação offline no ambiente de estudo. |
| 9 | Validação parcial dos sensores | Pendente de instrumento de referência ou delimitação formal de validação somente funcional. | Obter referência e executar comparação. |
| 10 | Estabilidade operacional final | Concluída: três sessões formais não consecutivas de ao menos oito horas foram realizadas em 19, 20 e 21/10/2026 no local de trabalho de um dos autores; cada uma atende aos critérios operacionais do protocolo, condicionada à preservação e análise reproduzível dos registros. | Integrar os dados tratados e apresentar os resultados por sessão e de forma acumulada. |
| 11 | Análise dos dados | Motor inicial pronto, sem dados reais processados. | Gerar subconjuntos versionados, análises e tabelas a partir da coleta. |
| 12 | Resultados, discussão e conclusão | Capítulos preparados sem dados fictícios. | Redigir após análise dos dados reais. |
| 13 | Revisão e apresentação | Pendente de texto final e resultados físicos. | Normalização UNIP, revisão final e defesa. |

## Acompanhamento das entregas de implementação

| Data | Entrega | Situação |
| --- | --- | --- |
| 22/09/2026 | Planejamento da implementação | Preparada em `cronograma/cronograma_entrega.md`. |
| 29/09/2026 | Preparação do ambiente | Preparada em `cronograma/cronograma_entrega2.md`; confirmar repositório Git/GitHub e primeiro commit. |
| 06/10/2026 | Banco de dados | Demonstrar esquema, migrações, relações e execução local do MySQL. |
| 13/10/2026 | Estrutura do sistema | Demonstrar navegação, rotas, autenticação, salas, nós e persistência. |
| 20/10 a 01/12/2026 | Funcionalidades, integração, testes, refinamento e apresentação | Seguir os marcos detalhados em `cronograma/cronograma_pedido_professor.md`. |

## Dependências críticas

- noite-piloto no hotspot do celular, antes de coleta válida;
- instrumentos de referência ou delimitação formal da validação funcional;
- definição das datas e do local/posição final da coleta;
- definição de credenciais, backup e hospedagem para o ambiente escolhido;
- preservação de evidências operacionais e de dados brutos sem alteração.
