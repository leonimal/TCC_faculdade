# Benchmark controlado da API e do MySQL — 2026-08-25

## Escopo

Ensaio local controlado destinado a `T005` e `T006`. A execução utilizou a aplicação Next.js em modo de produção e o MySQL 8.4.11 local. Não foram utilizados o firmware físico nem a rede da sala.

## Procedimento

O comando `npm run test:api:quality` realizou 100 requisições nominais válidas e 11 casos adicionais: cinco reenvios idênticos, um conflito de integridade, um payload incompleto, um timestamp incompatível com o estado de sincronização, um JSON malformado, um tipo de conteúdo incorreto e uma credencial inválida.

O tempo interno foi medido no Route Handler e informado pelo cabeçalho HTTP `Server-Timing`. O percentil 95 utilizou o método do posto mais próximo. Após a ingestão, o script consultou diretamente o MySQL e comparou os identificadores, sequências, configuração, timestamps, valores, estados técnicos, hash e payload bruto das 100 medições.

## Resultados observados

- 111 casos executados sem resposta 5xx;
- latência interna: mínimo de 11,034 ms, média de 42,308 ms, P95 de 149,558 ms e máximo de 230,156 ms;
- latência suplementar requisição–resposta: P95 de 152,334 ms e máximo de 325,714 ms;
- 100 de 100 registros únicos integralmente correspondentes ao conjunto enviado;
- zero identificador duplicado no banco;
- tentativas reconciliadas: 100 `STORED`, cinco `ALREADY_STORED` e uma `INTEGRITY_CONFLICT`;
- confirmação final de que nenhum dado temporário do benchmark permaneceu no MySQL.

O critério local de `T005` para latência interna P95 de até 500 ms foi atendido. Os critérios controlados de `T006` para unicidade e correspondência integral também foram atendidos. O arquivo reproduzível da execução está em `test-results/api-quality-2026-08-25T21-00-06.045Z.json`.

## Limitações

Os resultados caracterizam a API e o banco no computador de desenvolvimento. Eles não representam o desempenho da hospedagem definitiva, a conectividade da sala ou a latência de transmissão do firmware.

