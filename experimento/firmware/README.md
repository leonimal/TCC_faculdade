# Firmware do nó IoT

Implementação inicial para a placa genérica anunciada como `ESP32-WROOM-32D-38P`, SHT31 e VEML7700, compatível com o contrato HTTP/JSON `v0.1` em [`../../software/api/contrato.md`](../../software/api/contrato.md). O projeto usa PlatformIO com Arduino Framework e o ambiente genérico `esp32dev`; a compatibilidade física continua condicionada à inspeção da unidade recebida.

## O que já está preparado

- leitura de temperatura, umidade relativa e iluminância, com os estados `VALID`, `READ_ERROR` e `OUT_OF_RANGE` exigidos pela API;
- identificadores UUID de inicialização e medição, sequência persistida e timestamps UTC quando o NTP estiver sincronizado;
- fila LittleFS persistente, ordenada e limitada a 256 medições; registros só são removidos após `STORED` ou `ALREADY_STORED`;
- reenvio em ordem após queda de Wi-Fi/API, com mudança de `ONLINE` para `REPLAYED` e contador persistente de perdas quando a fila está cheia;
- consulta e confirmação da configuração remota de intervalo entre 10 e 300 segundos;
- telemetria operacional (conexão, ocupação da fila, perdas, sincronização temporal, RSSI e estado dos sensores).

O firmware não afirma que os sensores foram validados: os testes T001–T004 e T009–T011 permanecem dependentes da montagem e dos instrumentos de referência.

## Preparação local

1. Instale o PlatformIO: `python -m pip install --user platformio`.
2. Copie `include/FirmwareConfig.local.h.example` para `include/FirmwareConfig.local.h`.
3. Informe Wi-Fi, URL da API, `NODE_API_KEY`, `device_id` e os GPIOs I2C confirmados fisicamente.
4. Execute a pré-verificação e compilação: `powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1`.

`FirmwareConfig.local.h` é ignorado pelo Git. Para a API local, use o IP LAN do computador na URL — `localhost` aponta para o próprio ESP32 e não para o servidor Next.js.

A [verificação de compilação para ESP32-WROOM-32 de 2026-08-31](./compilacao-2026-08-31.md) registra versões, memória e limitações da evidência pré-hardware. A [compilação de 2026-08-26](./compilacao-2026-08-26.md), feita para ESP32-C3, permanece apenas como registro histórico anterior à substituição da placa.

## Depois que os componentes chegarem

Antes de energizar os módulos, siga a [checklist de primeira montagem](./checklist-primeira-montagem.md). Em especial, confira a serigrafia da placa, a tensão de 3,3 V dos módulos e a pinagem real antes de preencher `TCC_I2C_SDA_PIN` e `TCC_I2C_SCL_PIN`. Nenhum GPIO foi presumido no código.

Com a placa conectada por USB, identifique a porta serial e execute:

```text
powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1 -Upload -Monitor -Port COMx
```

O script confere a existência da configuração local, valores ainda exemplificativos, URL que aponta para `localhost`, formato do `device_id`, GPIOs I2C distintos e endereço do SHT31 antes de compilar. Ele não imprime SSID, senha nem chave da API. A porta `COMx` deve ser substituída pela porta identificada no sistema operacional. Preencha também o [registro da primeira montagem](./registro-primeira-montagem.md), que preserva a rastreabilidade da unidade física e dos primeiros ensaios.

O primeiro ensaio deve ser o funcional de uma hora a cada 10 segundos. Só depois devem ser executados os testes de configuração, offline, sincronização e a coleta-piloto descritos em `../testes.md` e `../protocolo.md`.

## Diagnostico local de leituras

O ambiente `diagnostic-i2c` verifica a montagem antes dos ensaios formais. Ele usa os GPIOs e o endereco definidos em `FirmwareConfig.local.h`, nao inicializa Wi-Fi nem API e imprime temperatura, umidade relativa e iluminancia a cada 10 segundos:

```text
python -m platformio run -e diagnostic-i2c -t upload --upload-port COM3
python -m platformio device monitor --port COM3 --baud 115200
```

Ele confirma somente a aquisicao basica; nao valida exatidao, estabilidade ou os criterios T001 a T003. Depois do diagnostico, o firmware completo deve ser restaurado pelo roteiro regular.

## Limites conhecidos antes da hospedagem

A URL de desenvolvimento pode usar HTTP apenas na rede local controlada. Para o ensaio temporário pelo Quick Tunnel, o firmware valida o certificado TLS público apresentado por `trycloudflare.com` e usa DNS público após obter IP por DHCP; não usa modo TLS inseguro. Como a URL e o emissor do certificado podem mudar quando o túnel for reiniciado, essa configuração deve ser conferida e regravada antes de cada nova sessão. A autenticação definitiva do dispositivo e a hospedagem definitiva permanecem pendentes; o ensaio não deve ser apresentado como coleta válida.
