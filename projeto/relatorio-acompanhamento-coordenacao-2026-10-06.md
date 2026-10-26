# Relatório de acompanhamento do TCC

**Data de referência:** 6 de outubro de 2026<br>
**Curso:** Ciência da Computação — UNIP Araçatuba<br>
**Autores:** Enrico Garcia Silva Costa (RA N295694) e Leonardo Pedrozo Elias Rodrigues (RA G78GGE-0)<br>
**Orientador:** Prof. Me. Rafael Marcelino de Jesus<br>
**Previsão de entrega final informada:** 30 de novembro de 2026

## 1. Síntese executiva

O TCC está na fase final de implementação e de preparação da validação experimental. O sistema proposto — um nó IoT de baixo custo para monitorar temperatura do ar, umidade relativa e iluminância em uma sala de aula — já possui hardware montado e reconhecido, firmware gravado no ESP32, transmissão real de medições, API, banco de dados MySQL e aplicação web integrados.

O percurso técnico do nó físico até a API já foi demonstrado tanto na rede local quanto por uma URL HTTPS pública temporária. A aplicação também possui autenticação por usuário, cadastro de salas e nós, monitoramento em tempo real por sala, histórico, exportação CSV, alertas locais versionados e telemetria operacional.

Ainda não foram iniciadas a coleta ambiental válida nem a validação quantitativa dos sensores com instrumentos de referência. Portanto, resultados sobre as condições da sala, precisão metrológica, completude em campo, disponibilidade e latência ponta a ponta continuam pendentes. Essa separação é deliberada: o trabalho não antecipa resultados que ainda precisam ser medidos.

## 2. Projeto e delimitação

**Título aprovado pelos autores:** *Desenvolvimento e avaliação técnica de um sistema IoT de baixo custo para monitoramento ambiental em salas de aula.*

**Pergunta de pesquisa:** em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?

**Objetivo geral:** desenvolver e avaliar tecnicamente o sistema por meio de avaliação parcial dos sensores e de testes ponta a ponta.

O estudo de caso prevê uma sala de aula. O núcleo medido é formado por temperatura do ar, umidade relativa e iluminância. O sistema não mede ruído, CO₂, partículas, ocupação, áudio ou imagem; também não pretende demonstrar conforto percebido, aprendizagem, qualidade ambiental global ou impacto gerencial.

## 3. Arquitetura implementada

| Camada | Implementação atual | Situação |
| --- | --- | --- |
| Nó IoT | ESP32-D0WD-V3, SHT3X e VEML7700; firmware PlatformIO/Arduino | Montado, inicializado e com leitura/transmissão real demonstradas |
| Aquisição | Temperatura, umidade relativa e iluminância; identificação temporal e estados de qualidade | Implementada |
| Confiabilidade do nó | Fila persistente LittleFS para até 256 registros, reenvio ordenado e contabilização de perdas | Implementada no firmware; ensaio físico de recuperação pendente |
| Comunicação | API HTTP/JSON; operação remota prevista via HTTPS por túnel seguro | Local e túnel HTTPS comprovados; piloto com hotspot do celular pendente |
| API e banco | Next.js/TypeScript, Route Handlers, MySQL, migrações versionadas e idempotência | Implementados e testados localmente |
| Aplicação web | Dashboard por sala, Caderno de observação, CSV, Central de alertas e telemetria | Implementados |
| Segurança | Login obrigatório, perfis ADMIN e VIEWER, sessões por cookie `HttpOnly` e senhas derivadas com `scrypt` | Implementada no ambiente local |

## 4. Evidências obtidas até o momento

### 4.1 Hardware e firmware

- Em 17/09/2026, a placa física foi reconhecida em `COM3` como ESP32-D0WD-V3, com 4 MB de flash e interface USB–serial CP210x.
- Os sensores SHT3X e VEML7700 foram inicializados no barramento I²C, usando GPIO 32 (SDA) e GPIO 33 (SCL).
- O diagnóstico local registrou leituras numéricas dos três parâmetros. Também foi observada resposta qualitativa esperada ao variar luz, temperatura e umidade; esse ensaio não é uma validação de exatidão.
- O firmware completo foi gravado no nó físico e, em 17/09/2026, uma medição foi confirmada pela API local.
- Em 18/09/2026, foi comprovada a sincronização temporal pelo mecanismo alternativo que usa o cabeçalho `Date` da API quando o NTP não está disponível na rede local.
- Em 21/09/2026, o nó físico confirmou múltiplas medições para a API por um Quick Tunnel HTTPS, conectado ao hotspot do Windows. A configuração preserva a validação de certificado TLS; não utiliza modo inseguro.

### 4.2 API, banco de dados e aplicação

| Teste/evidência | Resultado observado | Limite da evidência |
| --- | --- | --- |
| T005 — API local | 111 casos controlados, sem resposta HTTP 5xx; P95 interno de 149,558 ms, abaixo do critério local de 500 ms | Não mede hospedagem definitiva ou rede da sala |
| T006 — persistência MySQL | 100 de 100 registros esperados reconciliados, sem identificadores duplicados | Ensaio local controlado |
| T007 — dashboard | Cadeia API–MySQL–dashboard validada; 100% de correspondência no benchmark local; P95 de 56 ms para API–MySQL–renderização | Não inclui firmware físico, rede do ambiente ou atualização periódica; status parcial |
| T008 — faixas locais | Casos abaixo, no limite e acima das faixas testados; histórico e bloqueio durante execução ativa verificados | Faixas são administrativas e informativas, não normativas |
| T012 — tratamento de dados | Motor controlado classificou lacunas, duplicatas, falhas e exclusões sem imputar valores | Falta integrar dados brutos reais, checksums e coleta efetiva |

Além dessas evidências, foram concluídos os fluxos de cadastro e edição de salas e nós, associação histórica entre nó e sala, controle de acesso por perfil, relatórios por sala, exportação CSV e consulta multissala da Central de alertas. A base de software passou por testes unitários, lint, build de produção e ensaios integrados locais registrados no projeto.

## 5. Protocolo já definido para a etapa experimental

O plano experimental está documentado antes da coleta, com critérios de aceitação e tratamento previsto para falhas. A coleta principal será realizada em uma sala de aula, durante duas semanas letivas noturnas, com meta de 10 noites e mínimo de 8 noites válidas. A janela diária prevista é das 18h45 às 22h00.

O intervalo inicial esperado é de 60 segundos, equivalente a aproximadamente 195 registros por noite. Uma noite será considerada válida somente se cobrir a janela planejada, apresentar pelo menos 95% de completude e disponibilidade, manter o intervalo registrado, possuir ao menos 99% de registros temporalmente sincronizados e não apresentar inconsistência ou duplicidade não explicada.

Os dados brutos serão preservados sem edição. O tratamento será produzido em arquivos derivados e scripts versionados, distinguindo dados operacionais de dados ambientais válidos para análise.

## 6. Situação por frente de trabalho

| Frente | Situação | Observação para acompanhamento |
| --- | --- | --- |
| Escopo, problema e objetivos | Concluída pelos autores | Falta submissão formal ao orientador |
| Fundamentação e capítulos iniciais | Em desenvolvimento avançado | Capítulos 1 a 5 possuem primeiras versões; conclusão depende dos resultados físicos |
| Hardware | Parcialmente validado | Boot, I²C, leituras e integração inicial confirmados; falta estabilidade e comparação com referência |
| Firmware e integração | Parcialmente validado | Transmissão local e HTTPS comprovadas; faltam testes de fila offline, reinicialização e operação em campo |
| Banco, API e interface | Implementados e testados localmente | Próxima demonstração pode apresentar esquema, migrações, relações e execução do MySQL |
| Segurança e administração | Implementadas localmente | Resta definir credenciais definitivas dos dispositivos conforme o ambiente operacional |
| Coleta e análise de dados reais | Não iniciadas | Dependem do piloto, das datas e dos instrumentos de referência |

## 7. Pendências críticas da reta final

1. Executar uma noite-piloto usando o hotspot do celular no ambiente de estudo, registrando disponibilidade, conectividade, latência e recuperação após falhas.
2. Definir as datas de calendário, a identificação da sala e a posição/altura final de instalação do nó.
3. Obter instrumento de referência adequado ou registrar formalmente quais variáveis terão somente validação funcional.
4. Executar T001 a T004 e T009 a T011 no nó físico: estabilidade das leituras, comparação parcial, transmissão, regularidade temporal, fila offline, reinicialização e sincronização.
5. Realizar a coleta principal, processar os dados brutos com o pipeline versionado e consolidar tabelas, gráficos, resultados e discussão.
6. Completar a revisão bibliográfica e normativa, concluir o texto final e aplicar o template/manual institucional da UNIP quando confirmado.

## 8. Próximos marcos de apresentação da implementação

| Data prevista | Entrega/demonstração | Situação atual |
| --- | --- | --- |
| 06/10/2026 | Banco de dados: esquema, migrações, relações e execução local | Pronto para demonstração |
| 13/10/2026 | Estrutura do sistema: navegação, autenticação, salas, nós e persistência | Pronto para demonstração local |
| 20/10/2026 | Aquisição e ingestão das três variáveis | Implementado; evidência física inicial já disponível |
| 27/10/2026 | Dashboard, histórico, relatório/CSV, telemetria e configuração | Implementado; falta consolidar ensaio físico ponta a ponta |
| 03/11/2026 | Integração ESP32 → API → MySQL → interface, incluindo indisponibilidade | Parcial; ainda depende do teste físico de fila e recuperação |
| 10/11 a 24/11/2026 | Testes, refinamento, documentação e versão final | Dependente do piloto e da coleta |
| 30/11/2026 | Entrega final do TCC | Prevista |

## 9. Solicitações objetivas de orientação

Para reduzir riscos na etapa final, os autores solicitam orientação sobre:

1. a adequação do título, da pergunta e dos objetivos já definidos;
2. o manual/template institucional a ser utilizado na normalização e na entrega;
3. a confirmação dos marcos e critérios das entregas intermediárias;
4. a disponibilidade de instrumentos de referência, ou a aceitação formal da validação funcional quando eles não estiverem disponíveis;
5. os requisitos para documentar a instalação e a coleta na sala autorizada.

## 10. Conclusão de acompanhamento

O projeto possui uma base implementada e demonstrável: hardware inicializado, firmware em execução, transmissão física comprovada, banco e API funcionais e interface web completa para operação e consulta. A principal etapa restante não é mais a construção da solução, mas sua validação experimental controlada e a transformação dessas evidências em resultados acadêmicos rastreáveis.

O risco central do cronograma está concentrado na realização imediata do piloto, na definição das condições de coleta e na obtenção — ou delimitação explícita da ausência — de instrumentos de referência. A antecipação dessas ações permitirá concluir os testes físicos, a coleta e a redação final sem antecipar conclusões além da evidência disponível.

---

### Documentos técnicos de apoio

- `projeto/contexto.md`, `projeto/decisoes.md` e `projeto/pendencias.md`;
- `projeto/cronograma.md` e `cronograma/cronograma_pedido_professor.md`;
- `experimento/protocolo.md` e `experimento/testes.md`;
- `texto/01-introducao.md` e `texto/05-resultados.md`;
- `software/README.md` e a documentação de `software/web/`.
