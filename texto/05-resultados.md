# 5 Testes, resultados e discussão

Este capítulo reúne somente evidências efetivamente observadas. Até o recebimento e ensaio do hardware, há resultados locais da API, banco, dashboard e tratamento de dados; não há resultados de sensores, coleta ambiental ou validação ponta a ponta com o nó físico.

## 5.1 Caracterização das evidências disponíveis

As evidências atualmente disponíveis provêm de ensaios locais controlados, executados com MySQL, API e aplicação web. Esses ensaios utilizam registros temporários e são removidos ao final, não constituindo coleta ambiental. A integração com a placa anunciada como ESP32-WROOM-32D-38P, SHT31 e VEML7700, a identificação da sala, as datas de coleta e a autorização institucional permanecem pendentes.

Quando os componentes forem recebidos, esta seção registrará: identificação das unidades, versão do firmware, GPIOs e endereços I2C confirmados, posição e altura de instalação, intervalo aprovado, datas e horários efetivos, instrumento de referência e ocorrências relevantes.

## 5.2 Validação parcial dos sensores

Não há resultado físico a apresentar nesta etapa. Após a montagem, serão inseridos separadamente os resultados de T001, T002 e T003: tentativas esperadas e válidas, falhas de leitura, faixas observadas, instrumento de referência, pareamento temporal, viés, MAE, RMSE, erro absoluto P95 e, para iluminância a partir de 50 lx, MAPE.

Uma classificação comparativa somente será apresentada se o instrumento de referência possuir identificação, resolução, estado de calibração ou incerteza documentados e desempenho adequadamente superior. Caso contrário, o resultado permanecerá funcional e descritivo, sem atribuir precisão metrológica ao protótipo.

## 5.3 Resultados da comunicação e disponibilidade

Os resultados de T004, T009, T010 e T011 dependem da execução do firmware na placa física. Após os ensaios, esta seção apresentará completude, perda, regularidade temporal, latência leitura–API, disponibilidade, sincronização temporal, persistência após reinicialização, ocupação máxima da fila, reenvios, duplicidades e tempo de recuperação após interrupção controlada.

O critério de aceitação e os procedimentos já estão definidos no plano de testes. Nenhum valor de desempenho físico é antecipado neste capítulo.

## 5.4 Resultados da API, do banco e do tratamento de dados

Em 25 de agosto de 2026, um benchmark local controlado executou 100 requisições nominais válidas e 11 casos adicionais, incluindo reenvios idênticos, conflito de integridade, conteúdo incompleto, timestamp incompatível, JSON malformado, tipo de conteúdo incorreto e credencial inválida. Todos os casos retornaram o resultado HTTP especificado e não houve resposta 5xx.

A duração interna do Route Handler apresentou mínimo de 11,034 ms, média de 42,308 ms, P95 de 149,558 ms e máximo de 230,156 ms. No ambiente local avaliado, o resultado atende ao critério de P95 de até 500 ms de T005. A medição suplementar de requisição–resposta teve P95 de 152,334 ms e máximo de 325,714 ms; esses valores não representam hospedagem definitiva nem a rede da sala.

A auditoria no MySQL encontrou 100 das 100 linhas esperadas, com correspondência integral de identificadores, sequências, configurações, timestamps, valores, estados técnicos, hashes e payloads brutos, sem identificadores duplicados. Foram reconciliadas 100 tentativas `STORED`, cinco `ALREADY_STORED` e uma `INTEGRITY_CONFLICT`. A limpeza final confirmou a remoção dos registros temporários.

O motor inicial de tratamento foi verificado com um conjunto artificial de cinco posições. Ele reconciliou registro válido, falha de leitura, duplicata, lacuna, exclusão manual, configuração divergente, instante fora da janela e ausência de sincronização sem alterar a entrada nem imputar valores. Essa é evidência parcial de T012, pois a integração com arquivos brutos reais e checksums ainda não foi executada.

## 5.5 Resultados do dashboard, relatórios e alertas

Um teste local controlado validou a cadeia API–MySQL–dashboard com três medições temporárias, incluindo uma lacuna de temperatura preservada após `READ_ERROR`. A página apresentou valores recentes, unidades, histórico com lacuna, estado operacional controlado e ausência de credenciais no HTML. A limpeza confirmou que os dados temporários não permaneceram no banco.

Em benchmark posterior de 100 medições sequenciais, houve correspondência entre as amostras enviadas e os valores apresentados pelo dashboard. A latência leitura–resposta renderizada apresentou média de 40,78 ms, P50 de 38 ms, P95 de 56 ms e máximo de 98 ms, calculado pelo método do posto mais próximo. O ensaio mede somente o caminho local API–MySQL–renderização sob solicitação imediata; não inclui firmware físico, rede da sala nem espera pela atualização periódica no navegador. Por isso, T007 permanece parcialmente atendido.

O relatório descritivo também foi verificado com dados temporários, preservando leituras inválidas, filtros, indicadores e exportação CSV. A implementação unitária das faixas locais verifica campos obrigatórios, limites ordenados, unicidade das variáveis e desabilitação explícita; a integração controlada com MySQL de casos abaixo, no limite e acima da faixa permanece pendente em T008. Não há alerta ambiental normativo ativo, pois seus parâmetros aguardam a conferência das fontes técnicas originais.

## 5.6 Condições ambientais observadas

Esta seção será preenchida após a coleta-piloto e a coleta principal com dados do subconjunto ambiental válido. Serão apresentados os períodos analisados, número de noites válidas, número de observações, lacunas, mínimo, média, máximo, séries temporais e eventos que possam contextualizar as medições. Não serão feitas afirmações sobre conforto, aprendizagem, qualidade ambiental global ou causalidade.

## 5.7 Comparação com trabalhos relacionados

Após a obtenção dos resultados físicos, a comparação será restrita ao escopo técnico: variáveis medidas, arquitetura, duração, integridade dos dados, perdas, limitações e modo de validação. Diferenças de sensores, ambiente, posição de instalação, rede e protocolo impedirão comparação direta de valores ambientais entre estudos.

## 5.8 Discussão da pergunta de pesquisa

A resposta final à pergunta de pesquisa será construída somente após consolidar a evidência do nó físico e da coleta. Ela indicará, requisito a requisito, o que foi atendido, parcialmente atendido ou não atendido, sustentando a conclusão com as métricas e limitações registradas. As evidências locais de software serão distinguidas da validação ponta a ponta.

## 5.9 Custo e reprodutibilidade

Os componentes iniciais foram pagos em 28 de agosto de 2026, com desembolso total de R$ 125,98, incluindo duas placas ESP32, os dois módulos sensores, protoboard, cabo USB de dados e jumpers. Os pedidos ainda aguardavam entrega no registro de 31 de agosto de 2026. O custo final de um nó não pode ser apresentado: há uma placa de reserva no pedido e ainda faltam confirmar recebimento, funcionamento, encapsulamento, fonte de operação e a alocação dos acessórios. A classificação do valor como baixo custo dependerá de um custo-alvo ou referencial de comparação explicitado pelos autores.

Até esta etapa, a reprodutibilidade do software é sustentada pelo firmware versionado, pelo contrato HTTP/JSON, pelas migrações do banco, pelos testes automatizados e pela documentação de inicialização da aplicação. A reprodução integral do sistema ainda depende da confirmação da placa, dos GPIOs, das ligações, da alimentação, do encapsulamento e das versões efetivamente utilizadas na montagem física.

## 5.10 Limitações

As limitações já conhecidas incluem estudo de caso em uma única sala, uma unidade inicial de cada componente, dependência de instrumentos de referência, coleta em período delimitado e ausência de avaliação com usuários. Até a execução física, acrescentam-se a ausência de resultados dos sensores, da operação offline real, da latência ponta a ponta e das condições ambientais da sala.
