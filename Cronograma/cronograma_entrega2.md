# Entrega 2 — Preparação do ambiente de desenvolvimento

**Etapa prevista:** 2. Preparação do ambiente  
**Data de referência:** 29/09/2026

## Ambiente configurado

| Item | Configuração do projeto | Evidência disponível |
| --- | --- | --- |
| Aplicação | Next.js com TypeScript, App Router e ESLint | `software/web/package.json` e `software/web/` |
| Banco de dados | MySQL 8.4 em Docker Compose, com volume persistente e porta local | `software/compose.yaml` e `software/database/README.md` |
| Acesso ao banco | Driver `mysql2` e variáveis locais não versionadas | `software/web/package.json` e arquivos `.env.example` |
| Estrutura de banco | Esquema SQL e migrações incrementais com checksum | `software/database/schema.sql` e `software/database/migrations/` |
| Firmware | PlatformIO e framework Arduino para ESP32 | `experimento/firmware/platformio.ini` |
| Execução e operação | Roteiro para subir banco, aplicação e serviços locais | `software/COMO_SUBIR_APLICACAO.md` |

## Estrutura inicial implementada

```text
software/
├── api/          contrato HTTP/JSON
├── database/     esquema, migrações e configuração do MySQL
├── docs/         documentação técnica
└── web/          aplicação Next.js, interface e rotas da API

experimento/
├── firmware/     código do nó ESP32 e configuração PlatformIO
├── dados-brutos/ dados originais da coleta
├── dados-tratados/ dados derivados
└── analises/     scripts reproduzíveis de análise
```

## Entregas funcionais já presentes no ambiente

- rota de saúde e endpoints de ingestão e consulta de medições;
- banco MySQL com migrações e carga de desenvolvimento;
- dashboard, relatórios com exportação CSV, cadastro de salas e nós e alertas locais;
- autenticação de usuários e perfis administrativos;
- firmware com aquisição dos sensores, telemetria, fila persistente e reenvio ordenado;
- scripts de teste, lint, build, migração e seed declarados no projeto web.

## Procedimento de execução local

1. Configurar os arquivos locais de ambiente conforme os exemplos do projeto, sem expor credenciais.
2. Iniciar o MySQL com `docker compose -f software/compose.yaml up -d`.
3. Em `software/web/`, aplicar migrações e seed com `npm run db:migrate` e `npm run db:seed`.
4. Iniciar a aplicação com `npm run dev` e executar os testes pertinentes antes de demonstrar uma funcionalidade.

## Evidências para apresentação

- árvore de diretórios e arquivos citados acima;
- execução local do banco e da aplicação;
- tela do dashboard ou de uma rota administrativa autenticada;
- saída de migração, testes, lint ou build;
- documentação de instalação em `software/COMO_SUBIR_APLICACAO.md`.

## Pendência de controle de versão

O enunciado solicita repositório Git/GitHub e primeiro commit. Não foi localizado metadado `.git` no material disponibilizado neste diretório; portanto, este requisito deve ser confirmado pelos autores antes do envio. Esta observação evita afirmar uma evidência que não está presente na pasta recebida.

## Situação da entrega

O ambiente, a estrutura do projeto e os principais artefatos de software estão documentados e implementados. A validação experimental completa com o nó físico e a coleta em sala permanecem etapas posteriores.
