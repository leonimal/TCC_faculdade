# Checklist de primeira montagem do nó

Esta checklist deve ser preenchida quando a placa e os módulos chegarem. Ela não substitui a validação parcial dos sensores nem a coleta-piloto. Use-a junto ao [registro da primeira montagem](registro-primeira-montagem.md), que conserva as evidências e os valores efetivamente observados.

## Conferência antes da energização

- [ ] Registrar foto, anúncio, etiqueta e marcação visível da placa recebida.
- [ ] Confirmar que a placa recebida corresponde ao anúncio `ESP32-WROOM-32D-38P`, identificar a marcação do chip, o chip USB–serial, a capacidade de flash, a porta USB de dados e a porta serial reconhecida pelo sistema operacional.
- [ ] Confirmar a tensão de saída de 3,3 V disponível na placa e a tensão aceita pelos módulos SHT31 e VEML7700 recebidos.
- [ ] Registrar a serigrafia de SDA, SCL, 3V3 e GND dos módulos e consultar o diagrama do fabricante/vendedor para confirmar os GPIOs seguros da placa.
- [ ] Identificar a seleção de endereço do SHT31 (`0x44` ou `0x45`); atualizar `TCC_SHT31_ADDRESS` se necessário.
- [ ] Não alimentar módulos I2C em 5 V sem confirmação explícita de regulador e conversão de nível lógico no módulo adquirido.

## Montagem inicial

- [ ] Com a alimentação desligada, ligar GND comum, 3V3, SDA e SCL entre placa e os dois módulos.
- [ ] Manter os sensores afastados da placa por jumpers; evitar proximidade com regulador USB, computador, sol direto e fonte de calor.
- [ ] Preencher `FirmwareConfig.local.h` com credenciais, endereço IP do servidor na rede local e GPIOs confirmados.
- [ ] Executar `powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1` para validar a configuração local e compilar.
- [ ] Enviar o firmware pela porta serial identificada com `powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1 -Upload -Monitor -Port COMx` e registrar versão, data e porta usada.
- [ ] Confirmar no monitor serial: inicialização LittleFS, conexão Wi-Fi, estado dos dois sensores e sincronização NTP.

## Primeiro ensaio técnico

- [ ] Executar 60 minutos a cada 10 segundos para T001–T003; preservar os logs e a identificação do instrumento de referência, se houver.
- [ ] Interromper Wi-Fi/API e testar T010: persistência após reinicialização, fila acima de 205 registros, fila cheia e reenvio em ordem.
- [ ] Aplicar 10, 60 e 300 segundos para T009, sempre fora de execução experimental ativa.
- [ ] Comparar o relógio do nó com uma referência no início e no fim para T011.
- [ ] Somente após esses ensaios, marcar datas para a coleta-piloto e depois para a coleta principal.

## Evidências a registrar

- versão do firmware e checksum/binário enviado;
- fotos da montagem e posição relativa dos sensores;
- endereço I2C confirmado, GPIOs, alimentação e cabo usados;
- logs de inicialização, reinicialização e recuperação offline;
- instrumento de referência, resolução, identificação e condição de calibração, quando disponível.
