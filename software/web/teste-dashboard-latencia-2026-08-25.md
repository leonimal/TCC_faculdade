# Benchmark repetido da resposta renderizada do dashboard

- Data: 2026-08-25
- Requisito relacionado: `T007`
- Ambiente: Windows, Node.js 24.11.0, Next.js 16.3.2 em modo de produção e MySQL 8.4.11 local
- Natureza: benchmark controlado de desenvolvimento, sem firmware físico e sem observação do temporizador de atualização no navegador

## Procedimento

O comando `npm run test:dashboard:latency` gerou sequencialmente 100 medições temporárias sincronizadas para o dispositivo de desenvolvimento `classroom-node-01`. Em cada amostra, o instante inicial foi atribuído a `measured_at` imediatamente antes do envio HTTP. Após a confirmação da API, o script solicitou imediatamente uma nova renderização da página e mediu o tempo até o recebimento completo do HTML.

Cada resposta foi conferida por marcadores de teste associados aos três cartões. Temperatura, umidade relativa, iluminância e `measured_at` precisavam corresponder exatamente à medição recém-enviada. O percentil foi calculado pelo método do posto mais próximo. O ensaio recusaria execução durante uma coleta ativa e removeu no bloco `finally` todas as medições e tentativas de ingestão criadas.

## Resultados

| Métrica | Resultado |
|---|---:|
| Amostras solicitadas e concluídas | 100 / 100 |
| Correspondência entre leitura enviada e dashboard | 100% |
| Resposta da API — média | 21,78 ms |
| Resposta da API — P50 | 20 ms |
| Resposta da API — P95 | 30 ms |
| Resposta da API — máximo | 66 ms |
| Leitura até resposta renderizada solicitada — média | 40,78 ms |
| Leitura até resposta renderizada solicitada — P50 | 38 ms |
| Leitura até resposta renderizada solicitada — P95 | 56 ms |
| Leitura até resposta renderizada solicitada — máximo | 98 ms |
| Registros temporários restantes | 0 |
| Tentativas de ingestão temporárias restantes | 0 |

As 100 observações individuais, os metadados do ambiente e a confirmação de limpeza estão preservados em [`test-results/dashboard-latency-2026-08-25T16-19-45.060Z.json`](./test-results/dashboard-latency-2026-08-25T16-19-45.060Z.json).

## Interpretação e limitações

O P95 de 56 ms ficou abaixo do limite de 10 segundos associado a `T007` para o caminho local solicitado imediatamente. O resultado demonstra consistência e baixa latência da cadeia simulada API–MySQL–renderização do servidor nesse ambiente.

Esse valor não representa ainda o P95 completo da leitura até a atualização percebida por um usuário. O ensaio não executou o firmware físico, não reproduziu a rede da sala e não incluiu a espera do temporizador de cinco segundos do componente cliente. A aprovação integral de `T007` permanece condicionada a um teste no navegador que observe a atualização periódica real e, posteriormente, à operação com o nó físico.
