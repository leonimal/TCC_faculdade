# Matriz de apoio informacional à gestão

Esta matriz organiza informações que o sistema pode apresentar para subsidiar investigação posterior. Ela não diagnostica causas, não prescreve intervenções e não comprova utilidade gerencial.

| Condição observada | Indicador apresentado | Critério técnico/temporal | Possível investigação |
|---|---|---|---|
| Lacunas na série | Completude, `MISSING_SLOT` e maior sequência de ausências | Completude mínima de 99% em teste controlado e 95% em execução válida | Conferir energia, rede, sensores, posição e registros de eventos |
| Indisponibilidade do nó | Estado operacional e disponibilidade | Disponibilidade mínima de 95% em execução válida | Verificar alimentação, Wi-Fi, API e horário da falha |
| Fila em advertência | Ocupação da fila persistente | Advertência a partir de 205 em 256 registros | Investigar conectividade e tempo de recuperação |
| Perda explícita | Contador de perdas e eventos `QUEUE_OVERFLOW` | Toda perda deve ser contabilizada; nenhuma perda silenciosa | Verificar duração da indisponibilidade e capacidade de recuperação |
| Leituras inválidas | Estados `READ_ERROR`, `CRC_ERROR` e `OUT_OF_RANGE` | Taxa funcional mínima de 99% de leituras válidas | Conferir ligação, alimentação, sensor e condições de instalação |
| Divergência de configuração | Versão aplicada e `CONFIG_MISMATCH` | Intervalo registrado deve permanecer fixo na execução válida | Conferir configuração aprovada e confirmação do nó |
| Valores ambientais registrados | Séries, mínimo, média e máximo de temperatura, umidade e iluminância | Sem classificação ambiental enquanto não houver parâmetro técnico original aprovado | Consultar contexto da sala, eventos e fontes técnicas antes de qualquer decisão |
| Leitura fora de faixa local | Histórico de ocorrência com horário, variável, direção, valor, limites e versão da regra | Leitura válida e sincronizada, persistida pela primeira vez, fora da faixa local vigente; não é regra normativa | Conferir a justificativa da faixa local, o contexto da sala e a medição antes de decidir se há algo a investigar |

Os registros devem ser interpretados junto ao diário de coleta, à posição dos sensores e às limitações do estudo de caso.
