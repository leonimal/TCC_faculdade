# Protocolo experimental

## Objetivo

Validar funcionalmente os sensores disponíveis e verificar o funcionamento ponta a ponta e a estabilidade operacional do sistema.

## Variáveis

- Temperatura do ar
- Umidade relativa
- Iluminância

## Abrangência

A evidência física prévia inclui testes em sala de aula da UNIP em Araçatuba, tratados como estudo de caso. As três sessões formais finais ocorrerão no local de trabalho de um dos autores e avaliarão exclusivamente a estabilidade operacional da cadeia IoT; seus resultados não caracterizarão condições ambientais desse local nem serão generalizados para salas ou instituições.

A coleta em sala foi autorizada pelos responsáveis da UNIP, conforme confirmação dos autores. A ABNT NBR 16401-2:2008 fornecida pela instituição permanece apenas como referência térmica contextual para os testes em sala. Ela não será usada para aprovar ou reprovar a sala: o seu método depende de temperatura operativa, velocidade do ar, temperatura radiante e condições dos ocupantes, enquanto o nó mede somente temperatura do ar, umidade relativa e iluminância. Nas sessões finais, serão registrados posição e altura do nó sem qualquer interpretação ambiental do local de trabalho.

## Duração e período

- Coleta-piloto: um período de aula, antes da coleta principal, para verificar instalação, comunicação, registro temporal e geração dos dados.
- Evidências físicas prévias: testes do nó em sala de aula relatados pelos autores, com 345 medições válidas e sincronizadas preservadas no banco. Esses registros não possuem `run_id` e estão vinculados a `DEV-01`; serão usados apenas como evidência operacional prévia, sem reclassificação retroativa como coleta formal.
- Estabilidade operacional final: três sessões formais e não consecutivas com duração efetiva mínima de oito horas cada, totalizando ao menos 24 horas acumuladas. As datas planejadas são 19, 20 e 21/10/2026, no local de trabalho de um dos autores. A janela operacional prevista é das 08h às 18h, com flexibilidade para início ou encerramento em horário diferente. Uma quarta sessão será realizada apenas para repor eventual sessão inválida. Cada sessão usará o mesmo nó, firmware, intervalo configurado e cadeia de dados; terá `run_id` exclusivo e data, janela operacional, local, conectividade e responsável registrados antes da execução.

Em cada sessão formal deverão ser registrados os horários efetivos de início e fim, o intervalo, o local, a conectividade, os eventos relevantes e qualquer falha que afete sua validade. A variação em relação a 08h–18h não invalida a sessão por si só; ela será válida se alcançar ao menos oito horas efetivas e atender aos demais critérios. A coleta-piloto e as evidências físicas prévias permanecem identificadas separadamente. As sessões integram a avaliação operacional, mas não uma caracterização ambiental de sala.

Na primeira data planejada, o nó será conectado ao hotspot e configurado para aquisição e transmissão antes do início da sessão formal. A confirmação da configuração e a primeira medição persistida com o `run_id` correspondente delimitarão o início efetivo da sessão; a etapa de preparação não será contabilizada nas oito horas mínimas.

## Intervalo de leitura e transmissão

- O nó utilizará um único ciclo: ler os sensores e transmitir imediatamente a medição.
- O intervalo será configurável pelo software entre 10 e 300 segundos.
- O valor padrão inicial será de 60 segundos.
- Durante desenvolvimento e testes, poderão ser avaliados outros valores válidos.
- Antes de cada execução experimental, o intervalo deverá ser registrado e permanecer inalterado até o encerramento.
- Durante as três sessões, será utilizado o valor aprovado após a coleta-piloto, com expectativa inicial de 60 segundos, sem alterações dentro de cada execução.
- Cada medição deverá registrar ou permitir rastrear o intervalo e a versão de configuração aplicados.

Com o intervalo de 60 segundos, serão esperados no mínimo aproximadamente 480 registros por sessão válida e 1.440 registros nas três sessões válidas. A quantidade definitiva de observações será calculada conforme a duração efetiva de cada sessão e será recalculada caso outro intervalo seja aprovado antes da execução.

## Operação offline e recuperação

- A aquisição continuará durante a indisponibilidade de Wi-Fi ou da API.
- As medições não confirmadas serão mantidas em fila local persistente, ordenada e limitada a 256 registros.
- A partir de 80% de ocupação, o sistema registrará estado de advertência.
- Após a reconexão, o reenvio ocorrerá do registro mais antigo para o mais recente, sem interromper as novas leituras.
- Um registro somente será removido localmente após confirmação de armazenamento pela API ou confirmação de que seu identificador único já existe.
- A API e o MySQL deverão impedir duplicações pelo identificador único da medição.
- Ao atingir 256 registros, a fila preservará os itens já pendentes; novas medições não enfileiradas serão contabilizadas como perdidas, sem descarte silencioso.
- A configuração válida do intervalo deverá permanecer disponível durante a indisponibilidade da API e após reinicialização.
- Medições realizadas após reinicialização sem sincronização confiável do relógio deverão ser marcadas como temporalmente não sincronizadas.

Para cada execução serão registrados o maior tamanho da fila, o número de reenvios, confirmações, duplicidades detectadas, perdas por fila cheia e o tempo necessário para esvaziar a fila após a reconexão.

## Avaliação funcional e parcial dos sensores

Cada variável será submetida inicialmente a uma execução funcional mínima de uma hora, com intervalo de 10 segundos e 360 tentativas esperadas. A taxa de leituras válidas deverá ser de pelo menos 99%. Leituras aceitas deverão ser numéricas e estar dentro da faixa física declarada para o componente: de -40 a 125 °C para temperatura, de 0 a 100% UR para umidade relativa e de 0 a 140.000 lx para iluminância. Leituras rejeitadas, erros de comunicação e falhas de CRC, quando aplicável, serão contabilizados.

Quando houver instrumento de referência adequado, as medições serão pareadas temporalmente e serão calculados o erro individual, o viés, o erro absoluto médio (MAE), a raiz do erro quadrático médio (RMSE) e o percentil 95 do erro absoluto. Para iluminância igual ou superior a 50 lx também será calculado o erro percentual absoluto médio (MAPE).

As metas internas condicionais serão:

- temperatura: MAE de até 0,5 °C e módulo do viés de até 0,3 °C;
- umidade relativa: MAE de até 5 pontos percentuais de umidade relativa (p.p. UR) e módulo do viés de até 3 p.p. UR;
- iluminância: MAPE de até 15% para valores de referência iguais ou superiores a 50 lx ou MAE de até 10 lx abaixo desse valor.

Essas metas não substituem especificações de fabricante nem constituem limites normativos. A classificação comparativa somente será realizada se o instrumento de referência tiver identificação, resolução, estado de calibração ou incerteza documentados e desempenho suficientemente melhor, preferencialmente com incerteza não superior a um terço da tolerância avaliada. Caso contrário, as diferenças serão apresentadas apenas de forma descritiva e a validação permanecerá funcional.

## Métricas e critérios da cadeia ponta a ponta

| Métrica | Definição operacional | Critério de aceitação |
|---|---|---|
| Completude | Registros únicos armazenados divididos pelos registros esperados, multiplicado por 100 | Pelo menos 99% em teste controlado e 95% em cada execução válida |
| Perda | Diferença entre registros esperados e registros únicos armazenados | No máximo 1% em teste controlado; toda perda deverá ser identificada |
| Regularidade temporal | Erro absoluto entre o intervalo observado e o intervalo configurado | P95 não superior ao maior valor entre 1 segundo e 5% do intervalo |
| Latência até a API | Instante de recebimento pela API menos instante da leitura | P95 de até 5 segundos durante operação online |
| Latência ponta a ponta | Instante de exibição no dashboard menos instante da leitura | P95 de até 10 segundos durante operação online |
| Disponibilidade | Tempo operacional dividido pelo tempo programado | Pelo menos 95% em cada execução válida |
| Consistência | Registros equivalentes entre firmware, API, banco e interface divididos pelos registros auditados | 100% |
| Duplicidade | Quantidade de identificadores repetidos no banco | Zero |
| Sincronização temporal | Diferença entre o relógio do nó e o relógio de referência | Até 2 segundos quando o registro estiver marcado como sincronizado |

A quantidade esperada será calculada sobre a janela semiaberta entre o início registrado, inclusive, e o encerramento, exclusive: `N_esperado = teto((t_fim - t_início) / intervalo)`. O instante `t_início` será o da primeira aquisição programada. Como a grade inclui essa posição, uma fração restante da janela corresponde a uma posição esperada adicional. Registros fora da janela serão preservados, mas não entrarão no cálculo de completude da execução. Cada identificador único será contado no máximo uma vez.

A latência das medições reenviadas depois de indisponibilidade será analisada separadamente da latência online. A API deverá responder corretamente a 100% dos casos válidos, inválidos e duplicados definidos no contrato, apresentar latência interna P95 de até 500 ms em teste nominal com pelo menos 100 requisições e não produzir erros 5xx. A fila offline completa deverá ser esvaziada em até cinco minutos após o restabelecimento de uma conexão estável, sem duplicatas e com toda perda contabilizada.

## Validade de uma execução de coleta

Uma sessão formal de oito horas será considerada válida quando:

1. alcançar duração efetiva contínua de pelo menos oito horas dentro da janela operacional registrada;
2. apresentar completude mínima de 95%;
3. apresentar disponibilidade mínima de 95%;
4. utilizar um único intervalo previamente registrado;
5. possuir pelo menos 99% dos registros temporalmente sincronizados;
6. não apresentar inconsistência ou duplicação de dados; e
7. possuir registro dos eventos e das falhas relevantes.

Sessões inválidas não serão apagadas. Elas permanecerão preservadas e poderão ser analisadas como evidência de falha. A quarta sessão será realizada somente para substituir uma das três sessões exigidas que tenha sido invalidada; ela não apaga nem substitui os registros originais.

## Dados ausentes, falhas e exclusões

Os arquivos brutos serão preservados sem edição, sobrescrita ou correção manual. Todo tratamento será realizado por scripts versionados, que produzirão arquivos derivados em `experimento/dados-tratados/` e registrarão as regras aplicadas.

Serão produzidos dois subconjuntos analíticos:

1. **Subconjunto operacional:** incluirá medições válidas, tentativas com falha, perdas, duplicidades, reenvios, eventos de fila, registros fora da janela e registros sem sincronização. Será usado para calcular as métricas técnicas e investigar falhas.
2. **Subconjunto de evidências físicas prévias:** caso sejam apresentados registros anteriores, serão mantidos separados das sessões formais e identificados por data, horário e limitação de rastreabilidade. Não haverá caracterização ambiental principal nem comparação entre horários distintos.

As posições esperadas serão determinadas pela grade temporal formada pelo início da execução e pelo intervalo configurado. Uma posição sem medição válida e única será classificada no conjunto tratado como `MISSING_SLOT`. Em cada execução serão informados o total e o percentual de posições ausentes, a quantidade de lacunas, a maior sequência consecutiva de ausências e, quando identificável, sua causa. As ausências durante uma execução programada permanecerão no denominador da completude, ainda que tenham causa documentada.

Os estados mínimos de qualidade serão:

| Código | Significado | Uso analítico |
|---|---|---|
| `VALID` | Medição válida e utilizável | Operacional e, se cumprir os demais critérios, ambiental |
| `READ_ERROR` | Falha na leitura do sensor | Somente operacional; conta como tentativa ausente |
| `CRC_ERROR` | Verificação de integridade da leitura falhou | Somente operacional; conta como leitura inválida |
| `OUT_OF_RANGE` | Valor fora da faixa física aceita | Somente operacional |
| `TIME_UNSYNC` | Instante da leitura sem sincronização confiável | Operacional; excluído de análises temporais e comparações pareadas |
| `DUPLICATE` | Identificador já armazenado | Somente operacional; uma ocorrência canônica poderá ser usada |
| `QUEUE_OVERFLOW` | Medição não armazenada por fila cheia | Somente operacional; conta como perda explícita |
| `OUTSIDE_WINDOW` | Registro fora da janela planejada | Operacional; excluído da caracterização ambiental principal |
| `CONFIG_MISMATCH` | Configuração divergente da aprovada para a execução | Operacional; poderá invalidar a execução |
| `MANUAL_EXCLUSION` | Exclusão analítica excepcional e justificada | Preservado com motivo, autor e data |

O reenvio após período offline não tornará a medição inválida se o instante original estiver sincronizado, os valores forem válidos e o identificador for único. Valores incomuns, mas dentro da faixa física aceita, serão mantidos e apenas sinalizados para inspeção. Eles somente serão excluídos da análise ambiental se houver evidência documentada de falha técnica, deslocamento, obstrução, aquecimento indevido ou outro evento que comprometa a medição.

Não haverá interpolação, preenchimento pela média, carregamento do último valor ou qualquer outra imputação nos resultados principais. Os gráficos exibirão as lacunas, e cada estatística informará o número de observações válidas e o percentual de ausência. Uma eventual imputação exploratória deverá gerar arquivo separado, ser identificada como análise de sensibilidade e não poderá ser usada para aprovar requisitos do sistema.

Cada evento relevante deverá registrar data e hora, execução e dispositivo afetados, categoria, início e término, quantidade estimada de registros afetados, ação realizada, responsável e impacto sobre a validade da execução. Exclusões manuais deverão ser auditáveis; quando puderem alterar materialmente uma conclusão, o resultado será calculado e apresentado também sem a exclusão.

## Definições pendentes

- Identificação da sala e posição exata dos dispositivos
- Data de reserva para eventual quarta sessão. As sessões de 19, 20 e 21/10/2026 usarão hotspot Wi-Fi de celular, com internet móvel; a janela operacional prevista é 08h–18h, com horários efetivos apurados pelos registros do sistema.

## Consolidação das sessões

Cada sessão terá seus resultados apresentados separadamente. A síntese acumulada das três sessões válidas poderá informar o total de horas e de registros, mas não substituirá os critérios por sessão nem ocultará falhas. Os intervalos entre as sessões não integram o tempo programado, a disponibilidade ou a regularidade temporal. Reinicializações, falhas do PC, energia, túnel ou rede e intervenções manuais deverão ser registradas no diário de cada `run_id`.
- Instrumentos de referência: indisponíveis para a coleta real; a avaliação dos sensores será somente funcional, conforme `DEC-040`
- Quantidade definitiva de observações, condicionada ao intervalo aprovado após o piloto

## Princípios obrigatórios

1. Definir métricas e critérios antes da coleta principal.
2. Sincronizar os relógios dos dispositivos.
3. Registrar posição, altura, condições da sala e eventos relevantes.
4. Preservar os dados brutos.
5. Separar validação do sensor de validação do sistema.
6. Não realizar afirmações de causalidade sobre aprendizagem ou conforto percebido.
