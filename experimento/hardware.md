# Hardware do protótipo

## Componentes selecionados

| Função | Componente escolhido | Alternativas principais | Justificativa | Custo | Status |
|---|---|---|---|---:|---|
| Microcontrolador | Placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, 2 unidades | ESP32-C3-DevKitM-1; ESP32-C3 Super Mini | ESP32 com Wi-Fi e I2C, adquirido por menor custo; uma unidade será usada no protótipo e a outra ficará como reserva | R$ 52,48 no pedido das duas unidades | Recebido; serial, flash e boot inicial verificados; ensaios funcionais pendentes |
| Temperatura e umidade | Módulo anunciado como SHT31 em I2C, 1 unidade | DHT22; AHT20; SHT40; BME280 | Seleção baseada nas especificações nominais do SHT31 e na integração I2C; identificação física do módulo e do chip pendente | R$ 17,92 total do pedido | Recebido; inicialização I2C em `0x44` verificada; ensaio de leituras pendente |
| Iluminância | Módulo anunciado como VEML7700 em I2C, 1 unidade | BH1750; OPT3001; TSL2591 | Seleção baseada nas especificações nominais do VEML7700 e na integração I2C; identificação física do módulo e do chip pendente | R$ 10,18 total do pedido | Recebido; inicialização I2C verificada; ensaio de leituras pendente |
| Alimentação | Cabo USB-A para USB-C de dados, 1 m, adquirido; fonte USB 5 V confiável na operação ainda a definir | Fonte 5 V dedicada | Permite programação, depuração e alimentação inicial; o cabo deverá ser testado antes do upload | R$ 14,69 total do pedido | Recebido; upload e monitor serial estáveis; fonte de operação pendente |
| Encapsulamento | A definir |  |  |  | Não adquirido |

Seleção dos sensores formalizada em `DEC-006`; a placa efetivamente comprada, sua quantidade e a composição paga foram formalizadas em `DEC-018`. Especificações nominais pertencem aos chips; a identificação das unidades comerciais, seu desempenho, a implementação elétrica, o posicionamento e a validação experimental permanecem pendentes.

## Acessórios planejados

- Uma protoboard MB102 de 830 pontos, adquirida por R$ 15,19 no pedido.
- Um kit de jumpers Dupont de 20 cm, adquirido por R$ 15,52 no pedido.
- Acesso a ferro de solda e estanho para instalar os pinos dos módulos dos sensores, caso sejam entregues separados.
- Jumpers fêmea-fêmea poderão ser adicionados para afastar os sensores do aquecimento da placa durante a coleta.

Os seis pedidos foram pagos em 28 de agosto de 2026 e totalizam R$ 125,98, conforme capturas em `modules/`. Esse valor inclui frete, tributos e demais custos mostrados nos totais de cada pedido. Ele ainda não é o custo final de um nó: há duas placas no pedido e o encapsulamento, a fonte de operação e a alocação dos acessórios entre unidades permanecem a definir.

Antes da primeira energização, a conferência da placa e a montagem devem seguir a [checklist do firmware](firmware/checklist-primeira-montagem.md) e o [registro da primeira montagem](firmware/registro-primeira-montagem.md). Para a primeira montagem foi escolhida a conexão I2C com GPIO 32 como SDA e GPIO 33 como SCL (`DEC-029`), a ser registrada como efetiva somente depois da conferência da ligação. Nenhum resultado de funcionamento foi inferido dessa escolha.

## Critérios de seleção

- Princípio de medição e saída física
- Faixa e exatidão relevantes
- Desempenho observado em estudos independentes
- Interface elétrica e compatibilidade
- Consumo e estabilidade
- Calibração e possibilidade de comparação
- Posicionamento e interferências
- Custo total, disponibilidade e manutenção
