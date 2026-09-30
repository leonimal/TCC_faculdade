# Banco de dados

O esquema inicial `v0.1` para MySQL 8.0 ou superior está em [`schema.sql`](schema.sql). O ambiente local utiliza MySQL 8.4.11 pelo Docker Compose, volume persistente e acesso com `mysql2` (`DEC-017`).

## Ambiente local

1. Copiar `mysql.env.example` para `mysql.env.local` e `.env.example` para `.env.local`, substituindo as credenciais.
2. Executar `docker compose -f software/compose.yaml up -d` na raiz do TCC.
3. Em `software/web/`, executar `npm run db:migrate` e `npm run db:seed`.

O arquivo `mysql.env.local`, as URLs de conexão e os segredos da aplicação são ignorados pelo controle de versão. A porta `3306` é publicada somente em `127.0.0.1`.

## Migrações

O comando `db:migrate` trata `schema.sql` como `001_initial_schema`, calcula seu SHA-256 e registra o resultado em `schema_migrations`. Execuções posteriores ignoram a migração já aplicada e rejeitam alteração de checksum. Novas mudanças devem ser arquivos crescentes em `migrations/`; uma migração aplicada não deve ser editada.

As medições deverão possuir identificador único por dispositivo e restrição de unicidade que torne o reenvio idempotente. O modelo deverá preservar separadamente o instante da leitura e o instante de recebimento pela API, além dos indicadores necessários para distinguir envio imediato de reenvio offline (`DEC-013`).

O modelo também deverá permitir distinguir estado da leitura, sincronização temporal, modo de entrega e motivo de falha ou exclusão. No mínimo, deverão ser representáveis os estados `VALID`, `READ_ERROR`, `CRC_ERROR`, `OUT_OF_RANGE`, `TIME_UNSYNC`, `DUPLICATE`, `QUEUE_OVERFLOW`, `OUTSIDE_WINDOW`, `CONFIG_MISMATCH` e `MANUAL_EXCLUSION`. Eventos operacionais deverão registrar execução, dispositivo, início, término, categoria, impacto, ação e responsável (`DEC-015`).

O banco preservará os registros necessários à auditoria. A seleção do subconjunto ambiental será uma operação de consulta ou tratamento derivado, não uma exclusão física dos registros problemáticos.

A evidência do primeiro teste controlado está em [`teste-integracao-2026-08-24.md`](teste-integracao-2026-08-24.md). A estratégia deverá ser revisada para a hospedagem definitiva; o volume local não é cópia de segurança de dados experimentais.
