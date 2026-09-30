# Evidência inicial do dashboard dinâmico

- Data: 2026-08-25
- Ambiente: Windows, Next.js 16.3.2 em modo de produção, MySQL 8.4.11 no Docker Desktop
- Natureza: teste controlado de desenvolvimento; não constitui resultado da coleta experimental nem avaliação completa do requisito `T007`

## Procedimento

O script `scripts/test-dashboard.mjs` verificou previamente que não havia execução experimental ativa. Em seguida, enviou pela API três medições temporárias e um relatório operacional para o dispositivo de desenvolvimento `classroom-node-01`:

1. uma medição válida de referência histórica;
2. uma medição com `READ_ERROR` apenas para temperatura, mantendo as outras variáveis válidas;
3. uma medição válida mais recente, usada para conferir os valores atuais;
4. um relatório `ONLINE`, `SYNCED`, com fila de 12 em 256 registros e duas perdas contabilizadas.

Após confirmar a persistência no MySQL, o script solicitou a página principal renderizada pelo servidor e comparou o HTML com os valores conhecidos. A latência da amostra foi medida desde o instante da terceira leitura até o recebimento completo da página. Todos os registros temporários foram removidos no bloco `finally`, inclusive em caso de falha, e a ausência de resíduos foi conferida por consultas ao banco.

## Resultados observados

| Verificação | Resultado observado |
|---|---|
| Três medições recebidas pela API | Aprovado |
| Valores da medição mais recente no MySQL | Aprovado |
| Temperatura, umidade relativa, iluminância e unidades no dashboard | Aprovado |
| Lacuna correspondente ao `READ_ERROR` de temperatura | Aprovado |
| Estado operacional, firmware e fila de 12/256 | Aprovado |
| Ausência de `NODE_API_KEY` e `ADMIN_API_KEY` no HTML | Aprovado |
| Latência leitura–dashboard | 588 ms na primeira execução final e 125 ms na repetição após o reforço da verificação de limpeza |
| Remoção das medições, tentativas e estado temporários | Aprovado; zero registro residual identificado |

## Limitações

Os valores de 588 ms e 125 ms representam duas amostras controladas em ambiente local e servidor previamente iniciado. Eles demonstram o funcionamento da cadeia nessas execuções, mas não estimam o percentil 95 nem aprovam isoladamente o critério de até 10 segundos de `T007`. A avaliação completa ainda exigirá repetição suficiente, registro da distribuição de latência e execução com o firmware físico durante operação online.

Uma repetição posterior com 100 amostras está registrada em [teste-dashboard-latencia-2026-08-25.md](./teste-dashboard-latencia-2026-08-25.md). Ela caracteriza a resposta renderizada solicitada imediatamente, mas ainda não inclui o temporizador real do navegador nem o firmware físico.
