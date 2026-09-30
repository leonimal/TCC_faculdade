# Roteiro de fala e preparação para banca

Este material acompanha `apresentacao-tcc-iot.html`. Ele foi elaborado a partir do escopo, das decisões e das evidências atualmente registradas; portanto, não substitui os resultados físicos que ainda serão produzidos.

## Uso antes do ensaio

- Confirmar com a disciplina o tempo reservado à apresentação. O roteiro foi escrito para fala concisa e pode ser encurtado ou expandido sem alterar a apresentação.
- Não decorar palavra por palavra. Memorizar a mensagem principal de cada slide e as transições.
- Distinguir sempre **implementado**, **validado localmente**, **planejado** e **pendente de hardware**.
- Não afirmar precisão metrológica, conforto, aprendizagem, qualidade ambiental global ou utilidade gerencial comprovada.

## Mensagem central

O trabalho desenvolve uma cadeia IoT de baixo custo para registrar temperatura do ar, umidade relativa e iluminância em uma sala de aula. A contribuição avaliada é técnica: preservar uma leitura desde a aquisição até a visualização, com rastreabilidade, tratamento explícito de falhas e critérios definidos antes da coleta. A evidência física ainda será produzida quando o protótipo for montado e ensaiado.

## Roteiro por slide

### 1. Capa

“Boa noite. Somos Enrico Garcia Silva Costa e Leonardo Pedrozo Elias Rodrigues. Apresentaremos o desenvolvimento e a avaliação técnica de um sistema IoT de baixo custo para monitoramento ambiental em salas de aula. O núcleo do trabalho é temperatura, umidade relativa e iluminância.”

Transição: “Antes de explicar a solução, situamos o problema que ela busca organizar.”

### 2. Contexto

“Observações isoladas não formam um histórico que permita examinar o comportamento das condições medidas. A proposta é tratar o monitoramento como uma cadeia técnica de aquisição, transmissão, armazenamento e visualização, e não apenas como uma leitura de sensor.”

“Também é importante separar uma condição ambiental observada de uma falha de leitura, comunicação ou armazenamento.”

### 3. Pergunta de pesquisa

“A pergunta que orienta o trabalho é: em que medida um sistema IoT de baixo custo atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?”

“Portanto, nossa avaliação não parte de uma promessa de conforto ou de melhoria de aprendizagem; ela parte de requisitos mensuráveis da cadeia de dados.”

### 4. Objetivos

“O objetivo geral é desenvolver e avaliar tecnicamente essa cadeia IoT em uma sala de aula. Para isso, definimos critérios antes dos testes, desenvolvemos firmware, API, banco e interface web, e planejamos a avaliação parcial dos sensores quando houver instrumentos de referência adequados.”

### 5. Delimitação

“O sistema mede exclusivamente três grandezas: temperatura do ar, umidade relativa e iluminância. Ruído, CO₂, imagens, áudio, ocupação e controle automático não fazem parte do escopo.”

“Também não pretendemos concluir sobre conforto percebido, aprendizagem ou qualidade ambiental global, porque isso exigiria outro desenho de pesquisa e outras evidências.”

### 6. Arquitetura

“A leitura inicia nos sensores SHT31 e VEML7700 e segue para o ESP32-C3. O nó gera identificadores e metadados, transmite por HTTP/JSON para a API integrada ao Next.js, que valida e persiste no MySQL. O dashboard e os relatórios consultam esse banco.”

“Cada medição deve carregar o instante da leitura, a configuração e estados de qualidade para permitir auditoria ao longo do fluxo.”

### 7. Firmware e estado atual do nó

“O firmware já foi implementado e compilado para um alvo compatível com ESP32-C3. Ele inclui leituras, fila persistente de até 256 registros, reenvio ordenado, identificação, sincronização temporal e telemetria.”

“A compilação local confirmou dependências e ocupação de memória. Ela não valida a montagem, os GPIOs, os endereços I²C, o Wi-Fi ou as leituras reais. Esses itens continuam pendentes do recebimento do hardware.”

### 8. Protocolo experimental

“O protocolo prevê primeiro uma coleta-piloto de uma aula, usada para verificar montagem, conectividade e registro temporal. Só depois ocorre a coleta principal.”

“A coleta principal está planejada para duas semanas letivas noturnas, com meta de dez noites e mínimo de oito noites válidas. Datas, sala final e autorização formal ainda serão registrados antes da execução.”

### 9. Qualidade e tratamento dos dados

“O trabalho preserva duas perspectivas. A operacional registra falhas, duplicatas, lacunas e eventos de fila. A ambiental principal recebe apenas medições válidas, únicas, sincronizadas e de noites válidas.”

“Não há interpolação ou preenchimento artificial de ausências. Uma posição esperada sem medição válida é registrada como `MISSING_SLOT`.”

### 10. Critérios técnicos

“Os critérios são internos de engenharia e foram definidos antes da coleta. Entre eles estão completude, latência, disponibilidade, consistência, ausência de duplicatas e sincronização temporal.”

“Como exemplo, o critério é completude de ao menos 99% em teste controlado, P95 de até cinco segundos até a API e dez segundos até o dashboard em operação online. Eles não são limites ambientais normativos.”

### 11. Evidências locais da API e do banco

“A camada de software já possui evidências locais controladas. No benchmark da API foram 111 casos, sem resposta 5xx. O P95 interno do Route Handler foi 149,558 milissegundos, abaixo do critério local de 500 milissegundos.”

“A auditoria no MySQL reconciliou 100 de 100 registros esperados, sem identificadores duplicados. São resultados do ambiente local; não representam ainda a rede da sala nem o firmware físico.”

### 12. Dashboard, relatórios e alertas

“O dashboard foi testado localmente preservando valores, uma lacuna após erro de leitura e o estado operacional. Em 100 medições sequenciais, os valores enviados corresponderam aos apresentados; o P95 local de leitura–resposta renderizada foi 56 milissegundos.”

“Esse ensaio não inclui firmware, rede da sala nem a espera pela atualização periódica, então T007 permanece parcial. Alertas ambientais não estão ativos porque seus parâmetros dependem da conferência de fontes técnicas originais.”

### 13. Próxima etapa

“Quando o hardware chegar, seguiremos uma sequência controlada: inspeção física e montagem, preenchimento da configuração local, upload e logs seriais, depois testes dos sensores, comunicação, fila offline, reinicialização e sincronização.”

“Após o piloto, os dados reais alimentarão a análise e permitirão avaliar requisito por requisito.”

### 14. Encerramento

“Em síntese, o projeto já possui a cadeia de software implementada e ensaiada localmente, além de firmware compilável e protocolo definido. A conclusão sobre o atendimento total da pergunta será sustentada somente após a evidência física e a coleta planejada. Obrigado; ficamos à disposição para perguntas.”

## Perguntas prováveis da banca

### Por que apenas temperatura, umidade e iluminância?

Porque são as três variáveis explicitamente delimitadas para um protótipo de baixo custo e para a avaliação técnica proposta. Outras grandezas exigiriam sensores, requisitos, validações e escopo adicionais.

### Por que utilizar ESP32-C3, SHT31 e VEML7700?

A seleção considerou integração em 3,3 V por I²C, conectividade Wi‑Fi, documentação técnica, disponibilidade e viabilidade para o protótipo. A adequação das unidades físicas só será confirmada após inspeção e ensaios.

### Como você garante que o sistema não perde dados sem perceber?

O nó mantém fila local persistente de até 256 registros, reenvia em ordem e remove o registro apenas após a confirmação da API. Se a fila encher, a perda é contabilizada; além disso, a análise usa uma grade temporal para identificar lacunas.

### Como evitam medições duplicadas?

Cada medição possui identificador único. A API persiste de modo idempotente e separa a medição canônica das tentativas de entrega. O ensaio local auditou 100 registros sem identificadores duplicados.

### Qual é a precisão dos sensores?

Ainda não afirmamos precisão metrológica. A validação será parcial e dependerá de instrumentos de referência com identificação e condição de calibração ou incerteza documentadas. Sem referência adequada, a evidência será funcional e descritiva.

### Por que não há alertas ambientais ativos?

Os parâmetros de alerta exigem consulta e conferência das fontes técnicas originais aplicáveis. Até essa etapa, ativar valores candidatos seria metodologicamente inadequado. O sistema já foi estruturado para receber configuração e apresentar dados, mas alertas ambientais não foram declarados avaliados.

### O dashboard já é em tempo real?

Ele realiza atualização periódica e foi testado no ambiente local. A latência ponta a ponta com firmware e rede da sala ainda não foi medida; por isso, a classificação atual é parcial, não uma validação final de tempo real.

### Como os dados ausentes são tratados?

Ausências são preservadas e classificadas como `MISSING_SLOT` quando houver uma posição temporal esperada sem registro válido. Não há interpolação, média ou repetição do último valor na análise principal.

### Como o projeto contribui para a gestão escolar?

O sistema tem finalidade informacional: organiza medições, históricos e indicadores que podem subsidiar investigação posterior. O trabalho não avalia usuários nem comprova utilidade gerencial ou impacto nas decisões.

### Qual a principal limitação atual?

A ausência de hardware ensaiado e de coleta real. Portanto, as evidências atuais validam a implementação local de software e a compilação do firmware, mas não substituem os testes físicos, a avaliação parcial dos sensores ou a coleta em sala.

## Perguntas que devem receber resposta prudente

- “A sala está adequada?” — Não há coleta ambiental real nem parâmetros de alerta aprovados; não é possível afirmar.
- “O sistema melhora o conforto ou a aprendizagem?” — Não foi avaliado e está fora do escopo demonstrado.
- “Qual é o custo final?” — O custo entregue e o encapsulamento final ainda serão registrados após a compra e a montagem.
- “Qual norma foi usada como limite?” — Nenhuma deve ser citada como parâmetro operacional até a conferência da fonte técnica original aplicável.

## Ensaio recomendado

1. Fazer uma passagem completa em voz alta, sem leitura integral, registrando o tempo real.
2. Cortar repetições antes de reduzir explicações sobre escopo, evidências ou limitações.
3. Treinar as perguntas acima em dupla: uma pessoa responde, a outra confere se houve promessa além da evidência.
4. No ensaio final, usar a apresentação no modo tela cheia e testar os controles de navegação.
