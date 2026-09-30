# API

Implementação iniciada. O contrato inicial `v0.1` está documentado em [`contrato.md`](contrato.md) e orienta o código e os testes automatizados.

Conforme `DEC-016`, este diretório armazena a especificação; a implementação está integrada ao projeto Next.js por Route Handlers em `software/web/app/api/v1/**/route.ts`, com runtime Node.js. As rotas deverão delegar validação, regras de negócio e acesso ao MySQL a módulos testáveis.

O contrato deverá incluir uma operação administrativa autenticada para consultar e alterar o intervalo único de leitura e transmissão do nó. Serão aceitos valores inteiros entre 10 e 300 segundos, com padrão inicial de 60 segundos. A API deverá rejeitar valores inválidos, preservar a última configuração válida e registrar valor anterior, novo valor, instante, origem e dispositivo afetado (`DEC-012`).

A recepção de medições deverá ser idempotente. Para cada identificador único, a API confirmará se o registro foi criado ou se já existia, permitindo que o nó remova o item correspondente da fila local nos dois casos. Respostas de erro ou ausência de confirmação não autorizam a remoção. O contrato deverá aceitar reenvios ordenados e expor os dados operacionais necessários para auditar a recuperação (`DEC-013`).

Estado da implementação:

- `GET /api/v1/health`: implementado;
- `POST /api/v1/measurements`: implementado com Zod, hash SHA-256, transação MySQL, auditoria das tentativas e autenticação Bearer por segredo de ambiente;
- `GET /api/v1/measurements`: implementado com filtros, limite de 1 a 1.000, ordenação determinística, cursor opaco e autenticação administrativa provisória;
- `GET` e `PATCH /api/v1/devices/{device_id}/configuration`: implementados com versionamento, limites de 10 a 300 segundos e bloqueio durante execução ativa;
- `POST /api/v1/devices/{device_id}/configuration-ack`: implementado com estados `APPLIED`/`REJECTED`, idempotência, detecção de conflito e bloqueio de aplicação durante execução ativa;
- `POST /api/v1/devices/{device_id}/status`: implementado com estado da conexão, firmware, sincronização temporal, fila de 256 registros, perdas acumuladas e advertência a partir de 80%;
- teste integrado inicial com MySQL migrado: concluído para criação, reenvio idêntico, conflito, validação e auditoria; o T005 completo de desempenho e pelo menos 100 requisições permanece pendente.
