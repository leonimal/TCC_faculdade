# Primeiro boot físico e detecção I2C — 17/09/2026

## Objetivo

Confirmar que o ESP32 recebido inicia, aceita gravação serial e reconhece os dois módulos I2C da primeira montagem. Este teste não mede precisão, estabilidade, transmissão à API ou coleta ambiental.

## Configuração usada

- Porta: `COM3`, identificada pelo Windows como Silicon Labs CP210x USB to UART Bridge.
- Placa identificada pelo carregador: ESP32-D0WD-V3, 4 MB de flash.
- Barramento I2C: GPIO 32 (`SDA`) e GPIO 33 (`SCL`).
- SHT3X configurado em `0x44`.
- Configuração de Wi-Fi/API temporária, sem credenciais reais e destinada somente ao diagnóstico local.
- Binário: `firmware.bin`, SHA-256 `FC82AD61FDEFB741E9F0D3191E75C185691A0B4FAA6588A0D452EB6C0B397BB1`.

## Procedimento e resultado observado

O firmware foi compilado e enviado com `preparar-primeira-gravacao.ps1 -Upload -Port COM3`. O monitor serial a 115200 bps registrou:

```text
TCC IoT firmware 0.1.0 iniciando.
i2cInit(): Initialising I2C Master: sda=32 scl=33 freq=100000
SHT31=pronto; VEML7700=pronto
Tentativa de conexão Wi-Fi iniciada.
```

As mensagens `NO_AP_FOUND` subsequentes são esperadas: o diagnóstico não contém uma rede Wi-Fi real. Elas não representam falha dos sensores ou do barramento I2C.

## Primeiras leituras numéricas

O ambiente isolado `diagnostic-i2c`, sem Wi-Fi e sem API, foi gravado depois da confirmação da inicialização. Em três leituras separadas por 10 segundos, o monitor serial registrou:

```text
LEITURA;uptime_ms=771;temperatura_c=24.54C;umidade_relativa=42.76%;iluminancia=150.68lx
LEITURA;uptime_ms=10816;temperatura_c=24.54C;umidade_relativa=42.80%;iluminancia=150.22lx
LEITURA;uptime_ms=20816;temperatura_c=24.55C;umidade_relativa=42.81%;iluminancia=150.68lx
```

O diagnóstico não foi tratado como dado bruto de experimento. Ele apenas demonstra valores numéricos plausíveis e estabilidade de curto prazo no ponto da bancada.

## Resposta qualitativa provocada

No monitor serial local, os autores relataram que a iluminância variou coerentemente ao cobrir e descobrir o VEML7700. Também relataram resposta coerente de temperatura e umidade ao abafar e soprar o SHT3X. Como valores e série temporal não foram preservados, esta etapa é apenas uma verificação exploratória da resposta aos estímulos; ela não compõe T001, T002 ou T003.

## Limites e próximo passo

O resultado comprova a inicialização I2C dos dois módulos na pinagem escolhida. Permanecem pendentes a verificação de valores de temperatura, umidade e iluminância, a execução de uma hora a cada 10 segundos, a configuração real de Wi-Fi/API e os testes ponta a ponta do protocolo.
