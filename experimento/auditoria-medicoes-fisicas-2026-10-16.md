# Auditoria das medições físicas já registradas — 2026-10-16

## Finalidade

Registrar a consulta somente leitura que verificou as medições já persistidas pelo nó `classroom-node-physical-01`, antes da definição das sessões formais finais de estabilidade operacional.

## Resultado da consulta

Foram encontrados 345 registros com `measured_at` preenchido, estado temporal `SYNCED` e as três variáveis com estado `VALID`. Os registros ocorreram em oito datas, nos horários de Brasília:

| Data | Primeiro registro | Último registro | Registros |
|---|---:|---:|---:|
| 2026-09-18 | 18:05:16 | 19:09:17 | 65 |
| 2026-09-21 | 17:25:12 | 17:26:12 | 2 |
| 2026-09-29 | 18:33:00 | 18:51:19 | 18 |
| 2026-10-05 | 17:55:24 | 19:06:57 | 69 |
| 2026-10-06 | 18:46:23 | 21:09:25 | 22 |
| 2026-10-07 | 18:52:48 | 20:38:58 | 87 |
| 2026-10-08 | 21:55:54 | 22:06:46 | 10 |
| 2026-10-15 | 17:29:38 | 17:57:17 | 72 |

Todos os registros consultados estavam sem `run_id` e associados à sala `DEV-01` no banco. Assim, a consulta não recupera, por si só, a identificação da sala física nem comprova uma janela planejada de aula.

## Interpretação autorizada

Conforme confirmação dos autores, houve testes do nó em sala de aula. As medições são evidência operacional física prévia, mas não serão reclassificadas retroativamente como coleta principal ou caracterização ambiental formal. Elas sustentam a decisão `DEC-042` junto à noite-piloto, T007 e T010. A decisão vigente `DEC-043` prevê três sessões formais não consecutivas de oito horas como validação operacional final.

## Método de consulta

Consulta somente leitura nas tabelas `measurements`, `devices` e `classrooms`, filtrando `devices.public_id = 'classroom-node-physical-01'`. Os horários foram convertidos de UTC para BRT por subtração de três horas exclusivamente para apresentação. Nenhum registro foi criado, alterado ou removido.
