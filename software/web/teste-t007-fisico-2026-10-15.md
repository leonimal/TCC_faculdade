# T007 — dashboard com nó físico e rede real

## Identificação

- Data: 15/10/2026
- Nó: `classroom-node-physical-01`
- Sala exibida: `DEV-01` (Sala de desenvolvimento)
- Firmware: `0.1.2`
- Intervalo de amostragem durante o ensaio: 10 s
- Percurso: ESP32 no hotspot → Quick Tunnel HTTPS → API Next.js/MySQL local → dashboard autenticado
- Amostras: 20 medições novas, `ONLINE`, `STORED`, válidas e temporalmente sincronizadas

## Procedimento

O firmware foi preparado temporariamente para adquirir dados e transmitir pelo túnel HTTPS. Para cada nova medição física recebida pelo MySQL, o ensaio consultou o dashboard autenticado da sala e verificou a presença dos três valores e do instante `measured_at` correspondente no HTML renderizado. Os dados foram preservados no MySQL; não foram geradas medições artificiais.

O relatório detalhado e reproduzível está em `test-results/t007-physical-2026-10-15T20-54-38.548Z.json`, gerado por `scripts/test-t007-physical.mjs`.

## Resultados

| Indicador | Resultado | Critério | Situação |
|---|---:|---:|---|
| Amostras físicas consistentes no dashboard | 20/20 (100%) | 100% | Aprovado |
| P95 leitura → resposta renderizada solicitada do dashboard | 6.173 ms | até 10.000 ms | Aprovado |
| Maior profundidade da fila antes do envio | 1 | sem acúmulo durante operação online | Conforme |
| `dropped_total` durante a janela | 1 → 1 | sem nova perda durante o ensaio | Conforme |
| P95 leitura → API | 5.705 ms | até 5.000 ms | Acima da meta de T004 |

## Conclusão e limites

T007 foi aprovado para o escopo de dashboard: todas as 20 medições físicas foram apresentadas integralmente e o P95 da resposta renderizada solicitada foi inferior a 10 s. O painel preserva o instante da leitura e o instante da consulta, identificando a atualidade do dado.

A atualização visual automática do navegador, configurada para até 5 s, não foi cronometrada separadamente; a métrica apurada é a resposta HTML autenticada solicitada após a persistência da medição, coerente com o método já usado no benchmark de dashboard. A latência até a API ultrapassou a meta de 5 s em 705 ms e deve ser tratada como evidência de T004, não como aprovação dessa métrica.
