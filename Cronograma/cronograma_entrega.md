# Entrega 1 — Planejamento da implementação do TCC

**Etapa prevista:** 1. Planejamento da implementação  
**Data de referência:** 22/09/2026

## Escopo final do projeto

Desenvolver e validar tecnicamente um sistema IoT de baixo custo para monitorar, em uma sala de aula, **temperatura do ar, umidade relativa e iluminância**. O estudo de caso prevê uma sala, com coleta em duas semanas letivas consecutivas no período noturno. O sistema tem finalidade de monitoramento e apoio informacional; não avalia conforto, aprendizagem ou conformidade ambiental normativa.

## Funcionalidades priorizadas

| Prioridade | Funcionalidade | Situação documental |
| --- | --- | --- |
| Alta | Leitura de temperatura, umidade relativa e iluminância pelo nó IoT | Definida |
| Alta | Envio das medições à API, com identificação e estados de qualidade | Definida |
| Alta | Armazenamento das medições e da telemetria operacional | Definida |
| Alta | Dashboard por sala, histórico e exportação CSV | Definida |
| Alta | Recuperação após falha de conectividade por fila persistente | Definida |
| Média | Faixas locais versionadas e histórico de alertas locais | Definida; não normativa |
| Média | Cadastro de salas, associação de nós e controle de acesso | Definida |

## Tecnologias escolhidas

| Camada | Tecnologia definida |
| --- | --- |
| Nó de coleta | ESP32, PlatformIO e framework Arduino |
| Sensores | SHT31/SHT3X para temperatura e umidade relativa; VEML7700 para iluminância |
| Comunicação | API HTTP/JSON; uso de HTTPS no cenário remoto de teste |
| Aplicação web e API | Next.js, TypeScript, App Router e Route Handlers |
| Persistência | MySQL em Docker Compose, acessado com `mysql2` |
| Dados e qualidade | Migrações SQL versionadas, identificadores únicos, confirmação idempotente e registros de estado |

## Banco de dados e arquitetura

O projeto foi organizado como uma aplicação Next.js única, contendo a interface web e os endpoints da API, com MySQL como persistência externa. O modelo prevê medições canônicas, tentativas de entrega, configurações versionadas, telemetria operacional, salas, nós IoT, usuários e alertas locais. As migrações são versionadas e verificadas por checksum.

## Organização das tarefas da equipe

| Frente de trabalho | Responsabilidade prevista |
| --- | --- |
| Hardware e firmware | Montagem, leitura dos sensores, sincronização temporal, fila offline e transmissão pelo ESP32 |
| Backend e banco de dados | API, modelo MySQL, migrações, autenticação e persistência das medições |
| Interface web | Dashboard, cadastro de salas e nós, relatórios, CSV e alertas locais |
| Experimento e documentação | Protocolo, testes, diário de coleta, tratamento dos dados e redação do TCC |
| Integração e validação | Testes ponta a ponta, registro de evidências e correção de falhas |

Os autores devem registrar, em cada encontro, quem executou cada atividade e a evidência correspondente.

## Cronograma interno resumido

| Marco | Período previsto |
| --- | --- |
| Planejamento, arquitetura e ambiente | 22/09 a 29/09/2026 |
| Consolidação do banco, API e estrutura da aplicação | 06/10 a 13/10/2026 |
| Funções prioritárias e integração do nó | 20/10 a 03/11/2026 |
| Testes, ajustes e documentação | 10/11 a 24/11/2026 |
| Demonstração e validação final | 01/12/2026 |

## Evidências anexáveis

- `projeto/contexto.md`, `projeto/decisoes.md` e `projeto/pendencias.md`;
- `software/README.md` e `software/api/contrato.md`;
- `software/database/schema.sql` e `software/database/migrations/`;
- `experimento/protocolo.md`, `experimento/testes.md` e `experimento/firmware/`.

## Situação da entrega

Planejamento documentado. A definição das datas da coleta-piloto e da coleta principal, a disponibilidade de instrumentos de referência e a validação experimental com o nó físico continuam pendentes e não são declaradas como concluídas neste documento.
