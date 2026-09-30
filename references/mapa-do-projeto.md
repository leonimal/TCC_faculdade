# Mapa do projeto

Este arquivo orienta a navegação pelo workspace. Ele não substitui os arquivos mestres nem constitui fonte de decisões acadêmicas ou técnicas.

## Fontes de verdade

Ler sempre nesta ordem antes de trabalhar no projeto:

1. `projeto/contexto.md` — identidade, escopo, formulações aprovadas, arquitetura e estado atual.
2. `projeto/decisoes.md` — histórico das decisões confirmadas e suas consequências.
3. `projeto/pendencias.md` — informações e atividades ainda não definidas ou concluídas.
4. `projeto/cronograma.md` — fases, dependências, situação e prazos conhecidos.

Em caso de conflito, prevalece a decisão aceita mais recente em `projeto/decisoes.md`. Informações marcadas como pendentes devem permanecer “a definir” até confirmação dos autores.

## Rotas por tipo de trabalho

### Texto acadêmico

- `texto/README.md` — organização dos capítulos.
- `texto/01-introducao.md` — problema, pergunta, objetivos, justificativa e delimitação.
- `texto/02-fundamentacao.md` — fundamentação teórica.
- `texto/03-metodologia.md` — método e protocolo acadêmico.
- `texto/04-desenvolvimento.md` — construção do sistema.
- `texto/05-resultados.md` — resultados observados; não antecipar dados.
- `texto/06-conclusao.md` — conclusão final; completar somente após os resultados.

### Bibliografia e evidências

- `bibliografia/README.md` — fluxo bibliográfico.
- `bibliografia/matriz-de-evidencias.md` — rastreabilidade entre afirmações, requisitos e fontes.
- `bibliografia/referencias.bib` — referências conferidas na fonte original.
- `bibliografia/artigos/` — artigos armazenados para consulta.
- `monitoramento-ambiental-iot-salas-aula/report.md` — relatório intermediário da pesquisa aprofundada; não substitui as fontes originais.

### Hardware, firmware e experimento

- `experimento/README.md` — visão geral experimental.
- `experimento/hardware.md` — componentes, montagem, pinagem e alimentação.
- `experimento/pesquisa-selecao-hardware.md` — evidências da seleção dos componentes.
- `experimento/protocolo.md` — protocolo de avaliação e coleta.
- `experimento/testes.md` — testes e critérios de aceitação.
- `experimento/firmware/` — firmware do nó IoT.
- `experimento/dados-brutos/` — dados originais imutáveis.
- `experimento/dados-tratados/` — dados derivados.
- `experimento/analises/` — scripts e documentação das análises.
- `selecao-hardware-iot-tcc/report.md` — pesquisa estruturada de seleção de hardware.

### Software

- `software/README.md` — arquitetura e estado geral do software.
- `software/api/` — API de recepção e consulta.
- `software/database/` — esquema e artefatos do MySQL.
- `software/web/` — aplicação web, dashboard, relatórios e alertas.
- `software/docs/` — documentação técnica transversal.

### Histórico e diagnóstico

Usar apenas como contexto histórico, nunca como fonte de verdade vigente:

- `TCC ajustado.md` — rascunho textual anterior a ser migrado criticamente.
- `avaliacao.md` — comentários da primeira avaliação docente.
- `PLANO_DE_AJUSTES_TCC.md` — diagnóstico e plano inicial de reestruturação.
- `respostas_perguntas.md` — respostas anteriores dos autores.
- `historico/docx-convertidos/` — versões convertidas de documentos antigos.
- Arquivos `.docx` e `.pdf` na raiz — modelos e versões anteriores.

## Regras rápidas de roteamento

- Mudança de escopo ou decisão: atualizar `projeto/decisoes.md` após confirmação e refletir em `contexto.md` e `pendencias.md`.
- Escrita acadêmica: editar o capítulo correspondente em `texto/` e registrar evidências bibliográficas.
- Implementação: consultar primeiro hardware, protocolo, testes e `software/README.md`.
- Coleta e análise: nunca alterar dados brutos; gerar derivados por scripts documentados.
- Resultados e conclusão: registrar somente evidências efetivamente observadas.

