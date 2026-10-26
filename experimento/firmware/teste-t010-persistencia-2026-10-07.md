# T010 — operação offline, persistência e recuperação da fila

## Identificação

- Data: 07/10/2026
- Nó: `classroom-node-physical-01`
- Firmware: `0.1.2`
- Finalidade: verificar, no nó físico, a persistência da fila LittleFS, a recuperação após interrupção de conectividade e alimentação, o reenvio e a deduplicação no servidor.

## Procedimento executado

Conforme relato dos autores, com a aplicação, o túnel HTTPS e o MySQL mantidos ativos no PC doméstico, foi seguido o procedimento abaixo:

1. o nó foi confirmado online;
2. o hotspot foi desligado e o nó permaneceu ativo por período superior ao roteiro inicial, gerando medições sem conectividade;
3. a alimentação do ESP32 foi interrompida e restabelecida enquanto o hotspot permanecia desligado;
4. após nova espera offline, o hotspot foi reativado e a recuperação foi observada.

O ensaio envolveu mais de uma reinicialização, evidenciada pelos `boot_id` persistidos no banco. Os horários manuais exatos de cada intervenção não foram anotados separadamente; as consultas abaixo preservam os instantes observáveis de medição, chegada e telemetria.

## Evidência no MySQL

Consulta somente leitura realizada após o ensaio, limitada ao nó e aos registros recebidos a partir de `2026-10-07 21:52:00`:

| Indicador | Resultado |
|---|---:|
| Medições recebidas | 31 |
| `boot_id` distintos | 8 |
| Leituras com horário sincronizado | 25 |
| Leituras sem horário sincronizado | 6 |
| Tentativas `REPLAYED` confirmadas como `STORED` | 26 |
| Tentativas `REPLAYED` confirmadas como `ALREADY_STORED` | 1 |
| Identificadores duplicados persistidos | 0 |
| Estado final do nó | `ONLINE` |
| Fila final | `0/256` |
| Perdas acumuladas no estado final | 0 |

Foram observadas medições realizadas antes do restabelecimento da conectividade e entregues posteriormente como `REPLAYED`. A confirmação `ALREADY_STORED` ocorreu sem duplicar o identificador no banco, evidenciando o tratamento idempotente quando uma medição já havia sido aceita pelo servidor, mas voltou a ser enviada pelo nó.

## Consolidação complementar — 2026-10-15

Por autorização explícita dos autores, a auditoria considerou os 256 últimos envios `REPLAYED` do nó físico como parte do mesmo ensaio operacional, ainda que sua entrega tenha atravessado dias distintos. A consulta somente leitura ao MySQL apurou 256 tentativas entre `2026-10-10 00:32:33 UTC` e `2026-10-15 03:46:44 UTC`: 254 com resultado `STORED`, duas com `ALREADY_STORED` e nenhuma tentativa sem confirmação de sucesso. Há 254 identificadores de medição distintos e 254 registros persistidos; as duas tentativas adicionais correspondem a reenvios idempotentes, sem duplicação persistida. O estado posterior do nó foi `ONLINE`, fila `0/256`, com `dropped_total=1`; a perda permaneceu explicitamente contabilizada.

A telemetria disponível registrou ocupação máxima de `213/256` e profundidade máxima de `254` imediatamente antes de um envio. Os autores confirmaram que a fila chegou a 256 registros durante o ensaio, mas esse instante não possui relatório de estado persistido no MySQL. Tampouco foi registrado cronômetro contínuo para demonstrar o esvaziamento em até cinco minutos após uma conexão estável. Portanto, o fechamento de T010 é aceito como validação funcional e operacional pelos autores (`DEC-039`), com essas duas limitações de rastreabilidade preservadas; elas não devem ser convertidas em alegação de tempo de esvaziamento medido ou de pico telemetrizado de `256/256`.

## Conclusão do recorte inicial de 07/10/2026

O ensaio confirma a persistência física de registros já enfileirados através de interrupções de conectividade e alimentação, seguida de reenvio, confirmação e limpeza da fila sem perda contabilizada ou duplicidade persistida. As leituras sem sincronização temporal ocorreram durante inicializações e são mantidas como evidência operacional, sem uso em análise temporal ambiental.

O recorte inicial não estressou a fila acima do limiar de advertência de 205 registros, não atingiu sua capacidade de 256 e não mediu o tempo de esvaziamento sob carga. Esses aspectos foram consolidados posteriormente conforme a seção de 15/10/2026, sem reescrever as limitações observáveis do recorte original.
