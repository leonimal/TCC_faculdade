# Pesquisa para seleção do hardware

## Estado da recomendação

**Recomendação original aceita em `DEC-006` e atualizada pelas `DEC-007` e `DEC-018`.** Os sensores SHT31 e VEML7700 foram mantidos como módulos anunciados, sujeitos à identificação física. A placa anteriormente prevista foi substituída pela placa genérica anunciada como `ESP32-WROOM-32D-38P`, adquirida pelos autores por menor custo. A compra foi paga, mas a entrega e a validação física permanecem pendentes; os valores efetivos estão registrados em `experimento/hardware.md`.

## Recomendação principal

| Função | Componente proposto | Motivo principal | Faixa de preço observada |
|---|---|---|---:|
| Microcontrolador | ESP32-C3-DevKitM-1 | Wi-Fi, memória e periféricos suficientes, plataforma documentada e custo próximo ao ESP8266 e à Super Mini | R$ 49–63 na consulta de 2026-08-14; reconfirmar |
| Temperatura e umidade | Sensirion SHT31 em módulo I2C | Melhor equilíbrio entre documentação, calibração de fábrica, exatidão nominal, disponibilidade e custo | R$ 22–62 para módulos/probes; chip em distribuidor autorizado custa mais com frete |
| Iluminância | Vishay VEML7700 em módulo I2C | Melhor equilíbrio entre custo, faixa dinâmica, resolução, resposta próxima à visão humana e disponibilidade | R$ 18–78, com forte variação por módulo e vendedor |

Faixa indicativa dos três componentes principais: **R$ 65–200**, sem incluir fonte, cabos, placa auxiliar, conectores, encapsulamento e frete. Essa amplitude não é um orçamento final e não permite comparar módulos sem verificar procedência e implementação elétrica.

## Alternativa de maior rigor para iluminância

O Texas Instruments OPT3001 é a alternativa preferível quando a prioridade for resposta espectral e rejeição de infravermelho. O fabricante o descreve como sensor de luz ambiente com resposta de alta precisão compatível com a visão humana, rejeição típica de mais de 99% de infravermelho e faixa automática de 0,01 lx a 83 klx.

O obstáculo é comercial: módulos prontos foram encontrados aproximadamente entre R$ 99 e R$ 147, acima do VEML7700 e do BH1750. Assim, o OPT3001 é tecnicamente atraente, mas pode contrariar o objetivo de baixo custo caso o módulo disponível seja caro.

## Alternativa de orçamento mínimo

O BH1750 permanece viável como alternativa econômica, com módulos observados aproximadamente entre R$ 19 e R$ 22. Sua ampla disponibilidade e bibliotecas maduras facilitam o protótipo, mas a pesquisa não sustenta tratá-lo automaticamente como instrumento preciso ou adequado a avaliação normativa.

Se escolhido, deverá ser comparado com luxímetro disponível sob as fontes luminosas reais da sala, mantendo posição, orientação e geometria constantes. A conclusão deverá ficar limitada ao desempenho observado no módulo adquirido.

## Comparação dos microcontroladores

| Alternativa | Papel na comparação | Síntese |
|---|---|---|
| ESP8266/NodeMCU | Referência histórica | É suficiente para Wi-Fi e poucos sensores, mas oferece menor margem de memória, periféricos e evolução. Não há vantagem decisiva quando o ESP32-C3 tem preço semelhante. |
| ESP32-WROOM-32/DevKit | Alternativa madura | Tem ecossistema amplo e mais recursos que o necessário. É opção segura quando já disponível, mas tende a ser maior e consumir mais que uma solução C3 compacta. |
| ESP32-C3 | Recomendado | Oferece Wi-Fi 2,4 GHz, Bluetooth LE, CPU RISC-V de até 160 MHz, I2C e recursos suficientes para aquisição e HTTP/JSON. Mantém margem para buffer offline, telemetria e atualização do firmware. |

## Comparação de temperatura e umidade

| Alternativa | Papel na comparação | Síntese |
|---|---|---|
| DHT22/AM2302 | Referência econômica | Interface simples e uso difundido, mas resposta lenta, maior incerteza prática entre módulos e menor qualidade documental para uma escolha nova. |
| AHT20 | Alternativa econômica | I2C, custo moderado e especificação nominal melhor que DHT22. A procedência e a implementação dos módulos baratos precisam ser verificadas. |
| SHT31 | Recomendado | Calibração de fábrica, documentação sólida, exatidão típica declarada de 2% UR e boa disponibilidade em módulos. |
| SHT40 | Alternativa de desempenho | Exatidão típica de 1,8% UR e arquitetura mais recente. Módulos observados custam mais; o ganho nominal pode não ser demonstrável com os instrumentos de referência disponíveis. |
| BME280 | Alternativa | Integra pressão, mas pressão não pertence ao núcleo do TCC. A temperatura pode sofrer influência térmica da placa e do microcontrolador. |

## Comparação de iluminância

| Alternativa | Papel na comparação | Síntese |
|---|---|---|
| BH1750 | Orçamento mínimo | Muito barato e difundido; exige validação cuidadosa e delimitação das conclusões. |
| VEML7700 | Recomendado | Boa faixa dinâmica, integração ajustável, bibliotecas maduras e custo geralmente intermediário. |
| OPT3001 | Alternativa de maior rigor | Melhor justificativa espectral e forte rejeição de infravermelho, mas módulos prontos são significativamente mais caros. |
| TSL2591 | Alternativa especializada | Grande faixa dinâmica e canais de luz/IR; complexidade e faixa excedem a necessidade típica de uma sala de aula. |

## Requisitos para aquisição

1. Preferir placa e módulos com identificação do chip e esquema elétrico disponível.
2. Confirmar funcionamento lógico em 3,3 V e verificar regulador, conversores de nível e resistores de pull-up do módulo.
3. Evitar comprar o menor preço sem verificar avaliações, procedência e possibilidade de reposição.
4. Comprar, quando o orçamento permitir, uma unidade reserva de cada sensor para detectar falha individual e comparar dispersão.
5. Não montar o sensor de temperatura/umidade encostado ao ESP32-C3 ou ao regulador.
6. Posicionar o sensor de iluminância com janela óptica desobstruída, orientação documentada e geometria repetível.
7. Reconfirmar preço, frete e prazo imediatamente antes da compra.

## Protocolo mínimo após a compra

- Executar teste de identificação e comunicação I2C.
- Registrar endereço, alimentação, biblioteca e versão do firmware.
- Manter período de estabilização antes da comparação.
- Comparar temperatura e umidade com instrumento disponível em condições estáveis e em mais de um ponto operacional quando possível.
- Comparar iluminância com luxímetro na mesma posição e sob as fontes luminosas usadas na sala.
- Calcular erro médio, erro absoluto médio, RMSE, viés e dispersão quando a quantidade e a qualidade das observações permitirem.
- Separar resultados de validação dos sensores dos testes de perda, latência e consistência ponta a ponta.

## Fontes primárias principais

- Espressif. ESP32-C3 Series Datasheet: https://documentation.espressif.com/esp32-c3_datasheet_en.html
- Sensirion. SHT31-DIS-B: https://sensirion.com/products/catalog/SHT31-DIS-B
- Sensirion. SHT40: https://sensirion.com/products/catalog/SHT40
- Vishay. VEML7700: https://www.vishay.com/en/product/84286/
- Texas Instruments. OPT3001: https://www.ti.com/product/OPT3001
- ROHM. BH1750FVI datasheet/product documentation: https://www.rohm.com/products/sensors-mems/ambient-light-sensors

## Arquivos de pesquisa

- `selecao-hardware-iot-tcc/outline.yaml`: candidatos e configuração.
- `selecao-hardware-iot-tcc/fields.yaml`: critérios de comparação.
- `selecao-hardware-iot-tcc/results/`: resultados estruturados por grupo.
- `selecao-hardware-iot-tcc/report.md`: relatório integral, com valores incertos omitidos das seções consolidadas.
