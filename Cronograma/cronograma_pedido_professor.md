# Cronograma de entrega da implementação do TCC

**Período:** 22/09/2026 a 01/12/2026  
**Dia das aulas:** terças-feiras  
**Quantidade de encontros:** 11 aulas  
**Etapa:** implementação e desenvolvimento do sistema/projeto

| Data | Etapa | Entrega/atividade esperada para o projeto |
| --- | --- | --- |
| 22/09 | Planejamento | Escopo do monitoramento IoT, funcionalidades, arquitetura, tecnologias e divisão das frentes de trabalho documentados. |
| 29/09 | Ambiente | Estrutura Next.js/TypeScript, MySQL em Docker, firmware PlatformIO, scripts e roteiro de execução apresentados. Confirmar repositório Git/GitHub e primeiro commit. |
| 06/10 | Banco de dados | Apresentar esquema, migrações, relações entre medições, nós, salas, usuários e alertas, além de execução local do banco. |
| 13/10 | Estrutura do sistema | Demonstrar navegação, rotas, autenticação, cadastro de salas/nós e conexão com a persistência. |
| 20/10 | Funcionalidade principal I | Demonstrar aquisição e ingestão de temperatura, umidade relativa e iluminância, com persistência e estados de qualidade. |
| 27/10 | Funcionalidade principal II | Demonstrar dashboard por sala, histórico, relatório/CSV, telemetria e configuração versionada. |
| 03/11 | Integração | Demonstrar o fluxo ESP32 → API → MySQL → interface, incluindo cenário controlado de indisponibilidade e reenvio quando possível. |
| 10/11 | Testes | Executar e registrar testes funcionais, de API, banco, dashboard e tratamento de falhas. |
| 17/11 | Refinamento | Corrigir problemas identificados, melhorar interface, segurança de acesso e documentação técnica. |
| 24/11 | Versão final | Apresentar sistema funcional, código organizado, banco, documentação operacional e evidências da implementação. |
| 01/12 | Apresentação/validação | Demonstrar as funcionalidades, as tecnologias utilizadas, os limites da validação e os resultados efetivamente observados. |

## Regra de acompanhamento

Em cada encontro, o grupo apresentará uma evolução executável ou uma evidência verificável: código-fonte, tela em funcionamento, script SQL, migração, teste, registro do firmware, vídeo, captura de tela ou documentação técnica. Resultados de coleta e validação física somente serão apresentados quando efetivamente realizados e registrados.

## Controle das primeiras entregas

| Entrega | Situação | Documento correspondente |
| --- | --- | --- |
| 1 — Planejamento | Preparada | `cronograma_entrega.md` |
| 2 — Ambiente | Preparada, com confirmação pendente do Git/GitHub | `cronograma_entrega2.md` |
