# Registro da primeira montagem do nó

Preencher este registro quando os componentes forem recebidos. Ele documenta a unidade efetivamente testada e complementa a [checklist de primeira montagem](checklist-primeira-montagem.md). Não preencher previamente nem registrar senhas, chaves de API ou outros segredos.

## Identificação

| Campo | Registro |
|---|---|
| Data e horário da montagem | 17/09/2026; horário detalhado não registrado |
| Responsável | A confirmar pelos autores |
| Identificador do nó (`device_id`) | `classroom-node-physical-01` (cadastrado na API local em 17/09/2026; ainda não gravado no ESP32) |
| Versão/commit do firmware | `0.1.0`; binário da integração online SHA-256 `99618531487C1DC72C4A480E81DF01D3BA91664D22894F68C1F6DD882C551B1B` |
| Computador e sistema operacional usados | Windows |
| Porta serial identificada | `COM3` — Silicon Labs CP210x USB to UART Bridge |

## Conferência dos componentes recebidos

| Item | Marcações/versão observadas | Conferência realizada | Resultado |
|---|---|---|---|
| Placa anunciada como ESP32-WROOM-32D-38P | Módulo marcado `ESP-32D`; chip identificado no upload como ESP32-D0WD-V3; 4 MB de flash; CP210x em `COM3` | Serigrafia, USB de dados, porta serial e upload | Boot e upload verificados; tensão 3,3 V por multímetro pendente |
| Módulo SHT31 | Breakout marcado `SHT3X`; endereço I2C `0x44` aceito | Inicialização I2C em GPIO 32/33 e resposta qualitativa a abafamento/sopro | `SHT31=pronto`; ensaio contínuo pendente |
| Módulo VEML7700 | Breakout marcado `VEML 7700` | Inicialização I2C em GPIO 32/33 e resposta qualitativa a cobertura/luz | `VEML7700=pronto`; ensaio contínuo pendente |
| Cabo USB | USB de dados usado em `COM3` | Upload e monitor serial | Verificado para a primeira gravação |

Fotos ou capturas associadas: `experimento/fotos/`; log e escopo em `teste-inicial-i2c-2026-09-17.md`.

## Ligações efetivamente utilizadas

Preencher somente depois de conferir a serigrafia e o diagrama da placa. Não assumir que um GPIO da placa genérica anunciada como ESP32-WROOM-32D-38P corresponde ao de outro modelo de ESP32.

| Sinal | ESP32-WROOM-32D-38P (serigrafia/GPIO) | SHT31 | VEML7700 | Conferido por |
|---|---|---|---|---|
| 3V3 | `3V3` | `VIN` | `VCC` | Inicialização I2C dos dois módulos em 17/09/2026 |
| GND | `GND` | `GND` | `GND` | Inicialização I2C dos dois módulos em 17/09/2026 |
| SDA | GPIO `32` | `SDA/RH` | `SDA` | Inicialização I2C dos dois módulos em 17/09/2026 |
| SCL | GPIO `33` | `SCL/T` | `SCL` | Inicialização I2C dos dois módulos em 17/09/2026 |

- Endereço I2C confirmado do SHT31: `0x44`.
- GPIO SDA definido em `FirmwareConfig.local.h`: `32`.
- GPIO SCL definido em `FirmwareConfig.local.h`: `33`.
- Sensores afastados da placa e de fontes de aquecimento: `A preencher`.

## Pré-verificação, gravação e inicialização

1. Preencher `FirmwareConfig.local.h` sem copiar o conteúdo deste arquivo para registros públicos.
2. Executar `powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1`.
3. Registrar somente o resultado da pré-verificação: `A preencher`.
4. Executar `powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1 -Upload -Monitor -Port COMx`.

| Evidência | Registro |
|---|---|
| Data/hora do upload | A preencher |
| Arquivo binário e SHA-256 | A preencher |
| Inicialização do LittleFS | A preencher |
| Conexão Wi-Fi | A preencher |
| Sincronização NTP | A preencher |
| Estado do SHT31 | A preencher |
| Estado do VEML7700 | A preencher |
| URL da API alcançada (sem chave) | A preencher |
| Caminho do log serial preservado | A preencher |

Para obter o checksum do binário depois da compilação, usar:

```text
Get-FileHash .pio\build\esp32dev\firmware.bin -Algorithm SHA256
```

## Resultado e próximos ensaios

| Verificação | Situação | Observação/evidência |
|---|---|---|
| T001/T002/T003: ensaio funcional de 60 min a 10 s | Pendente | A preencher |
| T004: transmissão online e completude | Parcial | Uma medição foi confirmada pela API local em 17/09/2026; completude, duração e perdas ainda não foram avaliadas. |
| T009: intervalos de 10, 60 e 300 s | Pendente | A preencher |
| T010: persistência, fila e recuperação offline | Pendente | A preencher |
| T011: sincronização temporal | Pendente | A preencher |
| Autorizado para coleta-piloto | Não | Preencher somente após os ensaios |

Falhas, alterações ou decisões tomadas durante a montagem: `A preencher`.
