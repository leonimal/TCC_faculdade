# Evidência inicial de integração API–MySQL

- Data: 2026-08-24
- Ambiente: Windows, Docker Desktop com engine Linux/WSL 2, MySQL 8.4.11 e Next.js 16.3.2
- Natureza: teste controlado de desenvolvimento; não constitui resultado da coleta experimental

## Preparação verificada

- contêiner `tcc-iot-mysql` saudável;
- migração `001_initial_schema` aplicada e registrada com checksum;
- reaplicação da migração resultou em `SKIP`;
- seed de desenvolvimento reaplicável;
- dispositivo `classroom-node-01` ativo;
- configuração versão 1, intervalo de 60 segundos e estado `APPLIED`.

## Casos executados

| Caso | Resultado esperado | Resultado observado |
|---|---|---|
| Primeira entrega válida | `201 STORED` | Aprovado |
| Reenvio idêntico com metadados de entrega diferentes | `200 ALREADY_STORED` | Aprovado |
| Mesmo identificador com conteúdo imutável diferente | `409 INTEGRITY_CONFLICT` | Aprovado |
| Medição sincronizada sem `measured_at` | `422 VALIDATION_ERROR` | Aprovado |
| Auditoria no MySQL | Uma medição e três tentativas válidas registradas | Aprovado |
| Health check com banco | `200`, banco acessível | Aprovado |
| Consulta sem credencial administrativa válida | `401 UNAUTHORIZED` | Aprovado |
| Consulta com `limit=1001` | `422 VALIDATION_ERROR` | Aprovado |
| Duas páginas com `limit=1` | Ordem decrescente e cursor sem repetição | Aprovado |
| Filtro `device_id` | Somente o dispositivo solicitado | Aprovado |
| Consulta da configuração aplicada | Versão 1 e intervalo de 60 s | Aprovado |
| Alteração sem credencial administrativa válida | `401 UNAUTHORIZED` | Aprovado |
| Alteração para 9 segundos | `422 VALIDATION_ERROR` | Aprovado |
| Alteração válida para 30 segundos | Nova versão `PENDING` e `201 Created` | Aprovado |
| Consulta após alteração | Versão `PENDING` mais recente | Aprovado |
| Alteração durante execução ativa | `409 ACTIVE_RUN_LOCK` | Aprovado |
| Confirmação sem credencial válida do nó | `401 UNAUTHORIZED` | Aprovado |
| Rejeição sem motivo | `422 VALIDATION_ERROR` | Aprovado |
| Confirmação aplicada e repetição | `RECORDED` e depois `ALREADY_RECORDED` | Aprovado |
| Rejeição com motivo e repetição | `RECORDED` e depois `ALREADY_RECORDED` | Aprovado |
| Confirmação divergente | `409 ACK_CONFLICT` | Aprovado |
| Confirmação de versão substituída | `409 CONFIGURATION_SUPERSEDED` | Aprovado |
| Aplicação durante execução ativa | `409 ACTIVE_RUN_LOCK` | Aprovado |
| Estado operacional sem credencial válida | `401 UNAUTHORIZED` | Aprovado |
| Profundidade de fila acima de 256 | `422 VALIDATION_ERROR` | Aprovado |
| Estado `SYNCED` sem `observed_at` | `422 VALIDATION_ERROR` | Aprovado |
| Estado para dispositivo inexistente | `404 DEVICE_NOT_FOUND` | Aprovado |
| Ocupação de 205 em 256 registros | `201`, 80,08% e advertência ativa | Aprovado |
| Observação `OFFLINE` e `UNSYNCED` | `201`, instante do nó nulo | Aprovado |
| Persistência do estado operacional | Campos e objeto `details` íntegros no MySQL | Aprovado |

Os scripts removeram as medições, tentativas, configurações, estados operacionais e execução ativa artificiais após as asserções e restauraram a configuração controlada de desenvolvimento. Permaneceram somente a estrutura migrada, o histórico da migração e os dados controlados de desenvolvimento. Esta evidência não substitui o T005 completo de pelo menos 100 requisições, a avaliação de latência P95, o T009 completo com aplicação e persistência no firmware físico nem o T010 completo com fila persistente e recuperação no nó.
