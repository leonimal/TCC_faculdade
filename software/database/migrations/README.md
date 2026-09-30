# Migrações MySQL

O arquivo `../schema.sql` é a migração inicial `001_initial_schema`. Novas alterações estruturais deverão ser adicionadas neste diretório com nomes crescentes, por exemplo `002_add_example.sql`.

O comando `npm run db:migrate`, executado em `software/web/`, calcula o SHA-256 de cada migração e registra sua aplicação em `schema_migrations`. Uma migração aplicada não deve ser editada; uma alteração posterior exige um novo arquivo.

As instruções DDL do MySQL realizam confirmação implícita. Em desenvolvimento, se a primeira migração for interrompida antes do registro no histórico, o ambiente local deverá ser recriado antes de tentar novamente. Volumes nunca deverão ser removidos quando contiverem dados experimentais sem cópia e autorização explícita.
