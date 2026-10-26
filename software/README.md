# Software

Arquitetura aprovada (`DEC-016`): uma única aplicação Next.js com TypeScript e App Router, contendo a interface web e os Route Handlers da API. O MySQL permanece como persistência externa.

Estrutura prevista:

- `api/`: contrato e documentação da API; não constitui serviço separado;
- `web/`: projeto Next.js com interface, dashboard, rotas da API, relatórios e alertas;
- `database/`: esquema, migrações e dados controlados de teste;
- `docs/`: contratos de API e decisões técnicas.

Artefatos iniciais definidos:

- [`api/contrato.md`](api/contrato.md): contrato HTTP/JSON `v0.1`;
- [`database/schema.sql`](database/schema.sql): esquema MySQL `v0.1`.

O código foi iniciado em `web/`. Já existem a aplicação Next.js, a rota de saúde, a ingestão e consulta de medições, o ciclo versionado de configuração com confirmação pelo nó, o recebimento do estado operacional, o dashboard dinâmico, o relatório descritivo com exportação CSV, as faixas locais versionadas com histórico de alertas em página própria e o ambiente MySQL local com migração versionada. Adaptação à hospedagem e autenticação individual permanecem em desenvolvimento; não há alertas normativos ativos.

A inspeção manual da atualização periódica pode ser preparada pelo comando `npm run demo:dashboard` em `web/`. Ele publica dados artificiais em cadência visível, bloqueia a execução durante coleta ativa e remove seus próprios registros quando encerrado com `Enter`; portanto, não deve ser usado como fonte de resultados experimentais. Para demonstrar também as faixas locais e os alertas locais, use `npm run demo:local-monitoring`: ele alterna leituras abaixo, dentro e acima das faixas administrativas existentes, preserva essa configuração e remove seus próprios dados quando se pressiona `M` no terminal. Sem faixa administrativa, cria uma faixa de demonstração temporária e a remove no fim.

Para o roteiro operacional do Quick Tunnel HTTPS temporário e da gravação do nó físico, consulte [`GUIA_TUNEL_HTTPS_PILOTO.md`](GUIA_TUNEL_HTTPS_PILOTO.md).

As faixas locais efetivas são configuradas em `http://127.0.0.1:3100/admin/local-monitoring` por uma sessão de usuário com perfil de administrador. Salvar uma configuração idêntica mantém a versão atual sem nova escrita; uma alteração real cria uma nova versão com responsável e justificativa, preservando o histórico usado pelos alertas e aplicando os novos limites somente às próximas leituras válidas e sincronizadas. Alertas locais ficam em `http://127.0.0.1:3100/alerts`, separados do relatório descritivo e destacados em vermelho suave. Nenhuma dessas telas constitui interface de conformidade normativa.

## Configuração do nó

O software permitirá configurar administrativamente um intervalo único de leitura e transmissão entre 10 e 300 segundos, com padrão inicial de 60 segundos (`DEC-012`). A configuração deverá ser validada, persistida, exibida e auditada. Durante cada execução experimental válida, o intervalo permanecerá fixo.

## Operação offline

O nó manterá uma fila local persistente limitada a 256 medições não confirmadas. A API fornecerá confirmação idempotente para que o firmware remova somente registros armazenados ou já existentes. O sistema exibirá ocupação da fila, advertência a partir de 80%, perdas contabilizadas e estado da comunicação (`DEC-013`).
