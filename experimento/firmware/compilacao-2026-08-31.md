# Verificação de compilação do firmware para ESP32-WROOM-32 — 2026-08-31

## Objetivo

Verificar que o firmware continua compilável após a adoção da placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P` na `DEC-018`.

## Ambiente e comando

- Ferramenta: PlatformIO Core 6.1.19
- Plataforma: `espressif32` 6.13.0
- Ambiente e placa do PlatformIO: `esp32dev` (`Espressif ESP32 Dev Module`)
- Arquitetura informada pela ferramenta: ESP32 Xtensa, 240 MHz, 320 KB de RAM e 4 MB de flash
- Framework: Arduino / Espressif 3.20017.241212
- Comando: `python -m platformio run`, executado em `experimento/firmware/`

## Resultado observado

A compilação foi concluída com êxito. As bibliotecas resolvidas foram ArduinoJson 6.21.6, Adafruit SHT31 2.2.2, Adafruit VEML7700 2.1.6 e Adafruit BusIO 1.17.4.

| Recurso | Uso | Limite | Ocupação |
|---|---:|---:|---:|
| RAM | 47.468 bytes | 327.680 bytes | 14,5% |
| Flash da partição de programa | 997.349 bytes | 1.310.720 bytes | 76,1% |

## Limitações desta evidência

O resultado comprova a compilação para o perfil genérico `esp32dev`, não a identidade, capacidade de flash ou compatibilidade física da unidade comercial. A placa, os módulos sensores, o cabo e a rede ainda não haviam sido recebidos e inspecionados. Portanto, a evidência não aprova a serigrafia, o chip USB–serial, a porta de gravação, os GPIOs I2C, os endereços dos sensores, a montagem, a leitura, a conexão Wi-Fi ou os testes físicos T001–T004 e T009–T011.
