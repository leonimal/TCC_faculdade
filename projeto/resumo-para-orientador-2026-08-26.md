# Resumo do estado do TCC para orientação

**Projeto:** Desenvolvimento e avaliação técnica de um sistema IoT de baixo custo para monitoramento ambiental em salas de aula  
**Autores:** Enrico Garcia Silva Costa (RA N295694) e Leonardo Pedrozo Elias Rodrigues (RA G78GGE-0)  
**Orientador:** Prof. Me. Rafael Marcelino de Jesus
**Prazo final informado:** 30 de novembro de 2026

## Síntese do projeto

O TCC desenvolve e avalia tecnicamente um sistema IoT de baixo custo para registrar temperatura do ar, umidade relativa e iluminância em uma sala de aula da UNIP em Araçatuba. O foco é a cadeia técnica de aquisição, identificação temporal, transmissão, armazenamento e visualização de dados.

O trabalho não avalia ruído, CO₂, material particulado, ocupação, áudio, imagem, conforto percebido, aprendizagem ou utilidade gerencial comprovada. Dashboard e relatórios são tratados como recursos informacionais que podem subsidiar investigação posterior.

## Formulações aprovadas pelos autores

- **Pergunta de pesquisa:** “Em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?”
- **Objetivo geral:** desenvolver e avaliar tecnicamente o sistema por meio de avaliação parcial dos sensores e de testes ponta a ponta.
- **Ambiente previsto:** uma sala de aula, como estudo de caso.
- **Coleta planejada:** piloto de uma aula e, após aprovação, duas semanas letivas noturnas, com meta de dez noites e mínimo de oito noites válidas.

## Implementação já preparada

| Camada | Estado atual |
|---|---|
| Nó IoT | Firmware PlatformIO/Arduino compilado para alvo compatível com ESP32-C3, com leitura SHT31/VEML7700, identificação, NTP, fila LittleFS de 256 registros, reenvio ordenado, configuração remota e telemetria. A montagem e a validação física permanecem pendentes. |
| API e banco | API integrada ao Next.js, MySQL local com migrações versionadas, ingestão idempotente, consulta de medições, configuração versionada e estado operacional. |
| Dashboard e relatórios | Valores recentes, séries temporais, estado operacional, relatórios descritivos e CSV implementados e testados localmente. Alertas ambientais permanecem inativos. |
| Dados e método | Protocolo, métricas, critérios de aceitação, tratamento de lacunas e estrutura de análise definidos antes da coleta. |

## Evidências locais disponíveis

- **T005 — API:** 111 casos no benchmark local controlado, sem resposta HTTP 5xx; P95 interno do Route Handler de 149,558 ms, abaixo do critério local de 500 ms.
- **T006 — persistência:** 100 de 100 registros esperados reconciliados no MySQL, sem identificadores duplicados.
- **T007 — dashboard:** ensaio local com 100 medições sequenciais e correspondência entre envio e apresentação; P95 de 56 ms no caminho local API–MySQL–renderização. Esse resultado não inclui firmware físico, rede da sala nem espera pela atualização periódica; portanto, T007 permanece parcial.
- **T012 — tratamento de dados:** motor inicial testado com conjunto artificial, sem imputação; a integração com arquivos brutos reais e checksum permanece pendente.

Essas evidências não substituem validação física dos sensores, comunicação real, operação offline real, latência ponta a ponta ou coleta ambiental.

## Dependências e próximos passos

1. Receber e inspecionar fisicamente ESP32-C3, SHT31 e VEML7700; confirmar pinagem, alimentação, GPIOs e endereços I²C.
2. Preencher a configuração local, gravar o firmware e executar os testes físicos de leitura, comunicação, fila offline, reinicialização e sincronização temporal.
3. Registrar a autorização formal para coleta, a sala, a posição de instalação, as datas e os instrumentos de referência disponíveis.
4. Realizar piloto e coleta principal; integrar os dados reais ao tratamento, atualizar resultados, discussão, conclusão, resumo e abstract.

## Pontos para orientação

Solicitamos orientação objetiva sobre os seguintes itens:

1. Há necessidade de ajuste no título, pergunta de pesquisa, objetivo geral ou objetivos específicos antes de submeter a versão ao cronograma da disciplina?
2. Qual modelo e quais exigências formais da UNIP devem ser usados para a normalização do texto e para a entrega?
3. Qual é a data e o conteúdo da próxima entrega intermediária?
4. Qual setor ou responsável deve formalizar a autorização para instalação e coleta na sala de aula?
5. É possível disponibilizar ou indicar acesso às versões originais e vigentes das normas técnicas necessárias para fundamentar parâmetros de alertas? Até a conferência dessas fontes, os alertas ambientais permanecerão inativos.
6. Há instrumento de referência disponível, ou orientação para documentar a validação apenas funcional de alguma variável?

## Materiais disponíveis para consulta

- apresentação: `apresentacao-tcc-iot.html`;
- roteiro de fala e perguntas para banca: `apresentacao-roteiro-de-fala.md`;
- protocolo experimental: `experimento/protocolo.md`;
- modelo de autorização: `projeto/modelo-autorizacao-coleta.md`;
- resultados locais documentados: `texto/05-resultados.md`.
