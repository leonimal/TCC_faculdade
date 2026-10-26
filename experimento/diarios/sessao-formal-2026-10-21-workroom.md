# Diario de coleta - sessao formal de 8 h

| Campo | Registro |
| --- | --- |
| Tipo de execucao | Sessao formal de 8 h |
| `run_id` | `00e0ee37-26e8-40a9-838f-fc1751c0129a` |
| Data | 21/10/2026 |
| Sala/local | workroom |
| Local e conectividade | No e servidor na mesma rede do hotspot local; API em `192.168.137.1:3100` |
| Responsavel | Leonardo |
| Dispositivo e firmware | `classroom-node-physical-01`, firmware 0.1.2 |
| Intervalo e versao de configuracao | 60 s, versao 4 aplicada |
| Inicio efetivo / termino efetivo | 21/10/2026 08:09:41 / Em andamento |
| Posicao, altura e orientacao dos sensores | A preencher |
| Instrumento de referencia | Indisponivel; avaliacao funcional |

## Eventos

| Horario | Categoria | Descricao objetiva | Acao adotada | Registros possivelmente afetados | Impacto na validade |
| --- | --- | --- | --- | --- | --- |
| Antes do inicio efetivo | preparacao | API local iniciada na interface do hotspot; saude da API e MySQL confirmada. | Servico mantido em `0.0.0.0:3100`; no confirmado `ONLINE`, `SYNCED` e com fila `0/256`. | Nenhum da janela formal. | Sem impacto. |
| Antes do inicio efetivo | configuracao | O firmware ainda continha o `run_id` da segunda sessao. | Atualizado somente o `run_id` local e gravado no ESP32; upload concluido com verificacao de hash. | Nenhum da janela formal. | Sem impacto, pois ocorreu antes da primeira medicao formal. |
| Antes do inicio efetivo | preparacao | Dois registros foram associados ao novo `run_id` antes da medicao que delimitou a janela formal. | Registros preservados fora da janela temporal da apuracao. | 2. | Sem impacto, desde que permaneçam fora da janela analitica. |
| 08:09:41 | inicio | Primeira medicao sincronizada e plenamente valida do novo `run_id` foi persistida. | Inicio efetivo fixado diretamente pela medicao; chegada a API em 08:09:42.134. | Nenhum. | Inicio da janela formal. |
| Entre 08:12:31 e 08:14:47 | energia | O no foi conectado a uma nova fonte de energia durante a sessao. Um novo `boot_id` foi observado na primeira medicao posterior. | Recuperacao verificada pela medicao de 08:14:47 e pelo ciclo seguinte de 08:15:47; no `ONLINE`, relogio `SYNCED` e fila `0/256`. | Uma posicao esperada no intervalo pode ter sido afetada; lacuna preservada para a apuracao final. | Sem invalidar a sessao: a completude final foi 99,441%, acima do criterio de 95%. |

## Encerramento

- Janela efetiva: 8 h 56 min 35 s, de 08:09:41 a 17:06:16 (America/Sao_Paulo).
- Execucao: `COMPLETED`.
- Apuracao da janela temporal: 537 registros esperados; 534 armazenados (99,441% de completude); todos sincronizados e plenamente validos.
- Regularidade: P95 do erro absoluto de intervalo de 0 s; latencia ate a API com P95 de 2,511 s.
- Fila: maior profundidade telemetrizada de 0/256; o contador de perdas permaneceu em 1, valor ja existente antes desta sessao, sem nova perda telemetrizada.
- Integridade: os 534 registros armazenados possuem identificadores unicos; a chave primaria do banco preserva a unicidade das medicoes.
- A sessao atende aos criterios operacionais definidos no protocolo, condicionada a preservacao dos registros e a analise reproduzivel posterior.
