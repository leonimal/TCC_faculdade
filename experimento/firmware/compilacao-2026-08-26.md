# Verificação de compilação do firmware — 2026-08-26

## Objetivo

Verificar, antes da chegada do protótipo, que a estrutura do firmware, suas bibliotecas e o alvo ESP32-C3 selecionado podem ser compilados de forma reproduzível.

## Ambiente e comando

- Ferramenta: PlatformIO Core 6.1.19
- Plataforma: `espressif32` 6.13.0
- Alvo de compilação: `esp32-c3-devkitm-1` (ESP32-C3, 4 MB de flash)
- Framework: Arduino / Espressif 3.20017.241212
- Comando: `python -m platformio run`, executado em `experimento/firmware/`

## Resultado observado

A compilação foi concluída com êxito. As bibliotecas resolvidas foram ArduinoJson 6.21.6, Adafruit SHT31 2.2.2, Adafruit VEML7700 2.1.6 e Adafruit BusIO 1.17.4.

| Recurso | Uso | Limite | Ocupação |
|---|---:|---:|---:|
| RAM | 40.276 bytes | 327.680 bytes | 12,3% |
| Flash da partição de programa | 971.588 bytes | 1.310.720 bytes | 74,1% |

## Limitações desta evidência

Não houve placa, sensores, cabo ou rede física disponíveis. Portanto, esta evidência não aprova a pinagem da placa genérica, a montagem, os endereços I2C, a leitura dos sensores, a persistência após reinicialização, a conexão Wi-Fi ou os testes T001–T004 e T009–T011. Esses itens devem seguir a [checklist de primeira montagem](./checklist-primeira-montagem.md).

