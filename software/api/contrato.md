# Contrato inicial da API

Status: especificação `v0.1`, parcialmente implementada.

Implementação: Route Handlers no App Router do mesmo projeto Next.js da interface, em runtime Node.js (`DEC-016`).

## Convenções

- Base: `/api/v1`.
- Conteúdo: `application/json; charset=utf-8`.
- Instantes: UTC no formato RFC 3339, com milissegundos.
- Identificadores de medições, inicializações e execuções: UUID em texto.
- Autenticação: obrigatória para nó e administração. A ingestão utiliza inicialmente `Authorization: Bearer <NODE_API_KEY>`; o mecanismo definitivo ainda deverá ser revisto conforme o ambiente de hospedagem.
- Uma medição é imutável. Reenvios repetem o mesmo `measurement_id` e o mesmo conteúdo.

## Saúde da aplicação

`GET /api/v1/health`

- Sem parâmetros: verifica o processo da aplicação e não acessa o banco.
- Com `?database=1`: verifica também a conexão MySQL; retorna `503` quando ausente ou indisponível.
- A resposta não expõe credenciais nem mensagens internas de conexão.

## Receber medição

`POST /api/v1/measurements`

Status: implementado. Requer `Content-Type: application/json`, autenticação Bearer e payload de até 16 KiB.

```json
{
  "schema_version": 1,
  "measurement": {
    "measurement_id": "550e8400-e29b-41d4-a716-446655440000",
    "device_id": "classroom-node-01",
    "boot_id": "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
    "sequence_number": 1234,
    "run_id": null,
    "configuration_version": 1,
    "measured_at": "2026-08-24T22:15:30.125Z",
    "device_uptime_ms": 987654,
    "time_sync_status": "SYNCED",
    "readings": {
      "temperature_c": { "value": 24.31, "status": "VALID" },
      "relative_humidity_pct": { "value": 52.7, "status": "VALID" },
      "illuminance_lx": { "value": 487.2, "status": "VALID" }
    }
  },
  "delivery": {
    "mode": "ONLINE",
    "sent_at": "2026-08-24T22:15:30.300Z",
    "queue_depth_before_send": 0,
    "queue_capacity": 256,
    "dropped_total": 0
  }
}
```

Regras:

- `configuration_version` identifica a configuração aplicada à leitura.
- `sequence_number` cresce durante uma inicialização; a combinação `device_id`, `boot_id` e `sequence_number` é única.
- `measured_at` é obrigatório quando `time_sync_status` for `SYNCED` e será `null` quando o relógio não for confiável.
- Para leitura `VALID`, `value` é obrigatório; para falha, `value` será `null`.
- Estados de leitura aceitos: `VALID`, `READ_ERROR`, `CRC_ERROR` e `OUT_OF_RANGE`.
- `delivery.mode` aceita `ONLINE` e `REPLAYED`; ele descreve a tentativa de entrega, não altera a medição.
- A API calcula e guarda um hash do conteúdo imutável. O mesmo identificador com conteúdo diferente é conflito de integridade.
- O hash abrange `schema_version` e `measurement`; os metadados de `delivery` são auditados por tentativa e podem mudar em um reenvio.

Respostas:

- `201 Created`: `{"measurement_id":"...","ingestion_status":"STORED","received_at":"..."}`.
- `200 OK`: `{"measurement_id":"...","ingestion_status":"ALREADY_STORED","received_at":"..."}`. Esta confirmação autoriza a remoção da fila.
- `409 Conflict`: identificador já existente com conteúdo diferente; não autoriza remoção.
- `422 Unprocessable Entity`: conteúdo inválido; não autoriza remoção e retorna erros por campo.
- `401/403`: autenticação ausente ou insuficiente; não autoriza remoção.
- `500/503`: falha do servidor; não autoriza remoção.

## Consultar medições

`GET /api/v1/measurements?device_id=&run_id=&from=&to=&cursor=&limit=`

Status: implementado. Requer uma sessão autenticada com perfil de administrador. A autorização do dashboard ocorre no servidor ou por cookie `HttpOnly`; não há chave administrativa compartilhada enviada pelo navegador.

- Uso administrativo e do dashboard.
- Filtros `from` e `to` usam intervalo semiaberto: `from` inclusivo e `to` exclusivo.
- Ordenação padrão: registros sincronizados primeiro e mais recentes primeiro; desempate decrescente por `boot_id`, `sequence_number` e `measurement_id`. Registros não sincronizados aparecem depois dos sincronizados.
- Paginação por cursor opaco; `limit` padrão de 100 e máximo de 1000.
- A resposta informa valores, estados de leitura, sincronização, primeiro recebimento e existência de sinalizações analíticas.

```json
{
  "measurements": [
    {
      "measurement_id": "550e8400-e29b-41d4-a716-446655440000",
      "device_id": "classroom-node-01",
      "boot_id": "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
      "sequence_number": 1234,
      "run_id": null,
      "configuration_version": 1,
      "measured_at": "2026-08-24T22:15:30.125Z",
      "device_uptime_ms": 987654,
      "time_sync_status": "SYNCED",
      "readings": {
        "temperature_c": { "value": 24.31, "status": "VALID" },
        "relative_humidity_pct": { "value": 52.7, "status": "VALID" },
        "illuminance_lx": { "value": 487.2, "status": "VALID" }
      },
      "first_received_at": "2026-08-24T22:15:30.400Z",
      "has_flags": false
    }
  ],
  "pagination": { "limit": 100, "next_cursor": null }
}
```

## Configuração do nó

- `GET /api/v1/devices/{device_id}/configuration`: devolve a última versão válida destinada ao nó.
- `PATCH /api/v1/devices/{device_id}/configuration`: cria uma versão administrativa com `sampling_interval_seconds` inteiro entre 10 e 300.
- `POST /api/v1/devices/{device_id}/configuration-ack`: registra `APPLIED` ou `REJECTED`, versão, instante e motivo.

Status: `GET`, `PATCH` e confirmação do nó implementados.

- `GET` exige `Authorization: Bearer <NODE_API_KEY>` no mecanismo provisório.
- `PATCH` exige sessão autenticada com perfil de administrador, `Content-Type: application/json` e payload de até 4 KiB.
- `POST .../configuration-ack` exige `Authorization: Bearer <NODE_API_KEY>`, `Content-Type: application/json` e payload de até 4 KiB.
- O mecanismo provisório utiliza chaves compartilhadas; vinculação definitiva entre credencial e dispositivo depende da hospedagem e permanece pendente.

Payload de `PATCH`:

```json
{
  "sampling_interval_seconds": 60,
  "requested_by": "operador-identificado"
}
```

Resposta `201 Created`:

```json
{
  "device_id": "classroom-node-01",
  "previous_applied_version": 1,
  "configuration": {
    "version": 2,
    "sampling_interval_seconds": 60,
    "status": "PENDING",
    "requested_by": "operador-identificado",
    "requested_at": "2026-08-24T22:20:00.000Z",
    "acknowledged_at": null,
    "rejection_reason": null
  }
}
```

Uma alteração inválida não substitui a última configuração válida. Durante uma execução experimental ativa, a API rejeita mudança do intervalo com `409 ACTIVE_RUN_LOCK`. Uma nova versão permanece `PENDING`; configurações pendentes anteriores são marcadas como `SUPERSEDED`, e a última `APPLIED` continua efetiva até a confirmação do nó.

Payload de confirmação aplicada:

```json
{
  "version": 2,
  "status": "APPLIED"
}
```

Payload de rejeição pelo nó:

```json
{
  "version": 2,
  "status": "REJECTED",
  "rejection_reason": "Falha ao persistir o intervalo na memória local."
}
```

A API registra `acknowledged_at` no instante do recebimento. Em `REJECTED`, `rejection_reason` é obrigatório e possui até 500 caracteres; em `APPLIED`, ele deve ser omitido ou nulo. A confirmação é idempotente: a repetição exata retorna `200` com `acknowledgement_status: "ALREADY_RECORDED"`. A primeira confirmação retorna `RECORDED`.

Ao confirmar `APPLIED`, a configuração aplicada anterior passa para `SUPERSEDED`. Ao confirmar `REJECTED`, a última versão aplicada permanece efetiva. Confirmação divergente retorna `409 ACK_CONFLICT`, versão já substituída retorna `409 CONFIGURATION_SUPERSEDED` e uma aplicação durante execução experimental ativa retorna `409 ACTIVE_RUN_LOCK`.

## Estado operacional

`POST /api/v1/devices/{device_id}/status`

Status: implementado. Exige `Authorization: Bearer <NODE_API_KEY>`, `Content-Type: application/json` e payload de até 8 KiB.

```json
{
  "observed_at": "2026-08-24T22:40:00.000Z",
  "firmware_version": "0.1.0-dev",
  "connection_status": "ONLINE",
  "queue_depth": 205,
  "queue_capacity": 256,
  "dropped_total": 3,
  "last_confirmed_at": "2026-08-24T22:39:30.000Z",
  "time_sync_status": "SYNCED",
  "details": {
    "reset_reason": "POWER_ON",
    "wifi_rssi_dbm": -61
  }
}
```

`queue_capacity` deve ser 256 e `queue_depth` deve permanecer entre 0 e 256. Quando `time_sync_status` for `SYNCED`, `observed_at` será obrigatório; quando for `UNSYNCED`, deverá ser nulo. `details` é opcional e deve ser um objeto JSON. Um relatório `OFFLINE` representa uma observação preservada pelo nó e enviada posteriormente após o restabelecimento da comunicação.

Resposta `201 Created`:

```json
{
  "device_id": "classroom-node-01",
  "status_report_id": "42",
  "received_at": "2026-08-24T22:40:01.000Z",
  "queue": {
    "depth": 205,
    "capacity": 256,
    "occupancy_pct": 80.08,
    "warning": true
  }
}
```

A ocupação igual ou superior a 205 registros representa advertência de pelo menos 80%. O instante `received_at` é gerado pela API e não depende do relógio do nó.

## Erros

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Payload inválido.",
    "details": [{ "field": "measurement.measured_at", "reason": "required_when_synced" }],
    "request_id": "c5ba5a36-743d-46ed-a15b-f1741c4cba83"
  }
}
```

## Alertas

Não há alerta ambiental normativo neste contrato. A NBR 16401-2:2008 não é aplicável diretamente às três leituras do protótipo para declarar conforto ou conformidade.

Para acompanhamento operacional, `GET` e `PATCH /api/v1/devices/{device_id}/local-monitoring-profile` consultam e criam, respectivamente, uma versão de faixa local. Ambos exigem sessão autenticada com perfil de administrador; `PATCH` exige `Content-Type: application/json` e aceita até 4 KiB. A mudança é bloqueada com `409 ACTIVE_RUN_LOCK` durante execução experimental ativa.

Exemplo de criação de faixa local:

```json
{
  "enabled": true,
  "requested_by": "administrador-local",
  "justification": "Acompanhamento operacional definido pela administração local.",
  "source_reference": "Registro interno da administração local.",
  "rules": [
    { "variable": "TEMPERATURE_C", "lower_limit": 20, "upper_limit": 28 },
    { "variable": "RELATIVE_HUMIDITY_PCT", "lower_limit": 35, "upper_limit": 70 }
  ]
}
```

Os valores do exemplo não são recomendação, parâmetro normativo ou configuração padrão. Um perfil habilitado exige uma ou mais variáveis sem repetição e limite inferior estritamente menor que o superior. Para desabilitar, envie `enabled: false` sem regras, mantendo responsável e justificativa.

Quando uma medição é armazenada pela primeira vez, cada leitura válida, com instante sincronizado, que fique abaixo ou acima de uma faixa local vigente gera um alerta local. O banco guarda horário da leitura, variável, direção, valor observado, limites, versão do perfil e identificador da medição. O histórico aparece em `/alerts`, separado do relatório de medições, e alterações posteriores não reclassificam alertas já registrados. Não há notificação externa, automação ou classificação da sala.
