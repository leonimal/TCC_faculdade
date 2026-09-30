# Registro de decisões

## DEC-001 — Foco da contribuição

- Data: 2026-08-11
- Status: aceita
- Contexto: não haverá interação estruturada com gestores, professores ou alunos.
- Alternativas: demonstrar sistema validado; avaliar utilidade gerencial; comprovar melhoria ambiental.
- Decisão: demonstrar o desenvolvimento e a validação do sistema.
- Consequência: apoio à gestão será apresentado como aplicação potencial, não como efeito comprovado.

## DEC-002 — Retirada do monitoramento sonoro

- Data: 2026-08-11
- Status: aceita
- Contexto: módulos sonoros baratos geralmente produzem amplitude relativa, não nível calibrado em dB(A). A interpretação também varia com a atividade pedagógica.
- Alternativas: medir dB(A); criar índice relativo; remover do núcleo.
- Decisão: remover som e ruído do sistema avaliado.
- Justificativa: três variáveis bem caracterizadas são mais defensáveis do que uma quarta variável sem rastreabilidade e interpretação clara.
- Consequência: som será citado apenas como possível trabalho futuro, com necessidade de cadeia acústica calibrada e protocolo específico.

## DEC-003 — Variáveis ambientais do núcleo

- Data: 2026-08-11
- Status: aceita
- Decisão: monitorar temperatura, umidade relativa e iluminância.
- Consequência: objetivos, requisitos, banco de dados, dashboard, relatórios, alertas e testes deverão usar somente essas três variáveis.

## DEC-004 — Nível de validação metrológica

- Data: 2026-08-11
- Status: aceita
- Decisão: realizar validação parcial, conforme os instrumentos de referência que puderem ser obtidos.
- Consequência: cada variável deverá declarar claramente o nível de evidência, o instrumento usado, as métricas calculadas e as limitações.

## DEC-005 — Orientador oficial

- Data: 2026-08-11
- Status: aceita
- Decisão: Prof. Me. Aldriano José da Silva.
- Consequência: remover referências conflitantes a outro orientador na versão final.

## DEC-006 — Seleção da placa e dos sensores

- Data: 2026-08-14
- Status: parcialmente substituída pela `DEC-007` quanto à placa; sensores mantidos
- Contexto: o projeto precisava selecionar uma plataforma de baixo custo para medir temperatura do ar, umidade relativa e iluminância, com integração Wi-Fi, documentação suficiente e possibilidade de validação parcial. O custo foi tratado como critério prioritário, sem abrir mão de resultados tecnicamente adequados.
- Alternativas: ESP8266/NodeMCU, ESP32-WROOM-32, ESP32-C3 Super Mini e ESP32-C3-DevKitM-1; DHT22, AHT20, SHT31, SHT40 e BME280; BH1750, VEML7700, OPT3001 e TSL2591.
- Decisão: utilizar ESP32-C3-DevKitM-1 como placa do nó, Sensirion SHT31 para temperatura e umidade relativa e Vishay VEML7700 para iluminância.
- Evidências: comparação registrada em `experimento/pesquisa-selecao-hardware.md` e pesquisa estruturada em `selecao-hardware-iot-tcc/`.
- Justificativa: a combinação apresenta melhor equilíbrio entre custo total, documentação, integração I2C em 3,3 V, disponibilidade, margem de processamento e capacidade de produzir resultados adequados ao escopo. A diferença de preço em relação às alternativas de menor custo foi considerada insuficiente para justificar menor padronização ou desempenho nominal inferior.
- Consequências: firmware, pinagem, alimentação, encapsulamento, modelo de dados, protocolo de validação e lista de compra deverão considerar esses componentes. A escolha não demonstra a exatidão do sistema; os módulos adquiridos ainda deverão ser caracterizados e comparados com os instrumentos de referência disponíveis.

## DEC-007 — Substituição da placa e composição inicial da compra

- Data: 2026-08-18
- Status: aceita
- Contexto: não foi localizado um anúncio disponível e inequívoco da ESP32-C3-DevKitM-1 original nas condições de compra dos autores. Uma placa genérica baseada no mesmo ESP32-C3 foi encontrada por custo menor e com disponibilidade imediata.
- Alternativas: continuar procurando a ESP32-C3-DevKitM-1; adquirir outra placa ESP32-C3; utilizar a `ESP32C3 Classic Weld` anunciada pela Your Cee.
- Decisão: substituir a ESP32-C3-DevKitM-1 pela placa genérica `ESP32C3 Classic Weld`, com USB-C, pinos soldados e circuito USB–serial aparente. Comprar inicialmente uma unidade da placa, uma unidade do módulo SHT31 e uma unidade do módulo VEML7700. Utilizar o computador pela USB-C durante desenvolvimento e testes; para operação posterior, utilizar fonte USB de 5 V de procedência confiável.
- Evidências: inspeção do anúncio e das imagens da variante selecionada; compatibilidade funcional do ESP32-C3 com Wi-Fi e barramento I2C de 3,3 V; documentação oficial dos chips mantida como referência técnica.
- Justificativa: a substituição preserva processamento, conectividade Wi-Fi e integração I2C necessários ao sistema, evita atraso por indisponibilidade da placa originalmente escolhida e reduz o custo inicial. A compra de uma unidade de cada componente foi aceita pelos autores como risco consciente de não haver peça reserva.
- Consequências: firmware, pinagem, alimentação e documentação deverão usar a placa efetivamente recebida. O protótipo não deverá ser descrito como ESP32-C3-DevKitM-1 oficial. Marcações do chip, pinagem, circuito USB, funcionamento e tensão de saída em 3,3 V deverão ser conferidos após a entrega. Os sensores comerciais ainda deverão ser caracterizados e submetidos à validação parcial prevista.

## DEC-008 — Título, pergunta de pesquisa e objetivo geral

- Data: 2026-08-18
- Status: aceita
- Contexto: as formulações preliminares descreviam adequadamente o sistema, mas o título utilizava o termo não demonstrado “inteligente”, a pergunta tinha caráter predominantemente procedural e o uso amplo de “validação” poderia sugerir validação metrológica completa. A enumeração das variáveis nas formulações principais também foi considerada desnecessária pelos autores.
- Alternativas: manter as formulações preliminares; enumerar temperatura, umidade relativa e iluminância no título, na pergunta e no objetivo geral; adotar “monitoramento ambiental” nas formulações principais e delimitar as variáveis nos objetivos específicos e na metodologia.
- Decisão: adotar o título **“Desenvolvimento e avaliação técnica de um sistema IoT de baixo custo para monitoramento ambiental em salas de aula”**; a pergunta **“Em que medida um sistema IoT de baixo custo, desenvolvido para o monitoramento ambiental de uma sala de aula, atende aos requisitos técnicos de aquisição, transmissão, armazenamento e visualização dos dados?”**; e o objetivo geral **“Desenvolver e avaliar tecnicamente um sistema IoT de baixo custo para monitoramento ambiental em uma sala de aula, por meio da avaliação parcial dos sensores e de testes ponta a ponta da aquisição, transmissão, armazenamento e visualização dos dados.”**
- Justificativa: o conjunto identifica o artefato, o contexto, o caráter de baixo custo e a avaliação técnica; transforma a pergunta em algo respondível por requisitos e métricas; separa a avaliação parcial dos sensores dos testes ponta a ponta; e evita alegações sobre inteligência, precisão metrológica completa, aprendizagem, conforto ou melhoria ambiental.
- Consequências: as variáveis temperatura do ar, umidade relativa e iluminância permanecem obrigatoriamente delimitadas nos objetivos específicos, requisitos, método e resultados. Os requisitos técnicos e seus critérios de aceitação deverão ser definidos antes dos testes. Os objetivos específicos ainda deverão passar por aprovação final dos autores.

## DEC-009 — Apoio informacional à gestão escolar

- Data: 2026-08-18
- Status: aceita
- Contexto: a motivação original do projeto era auxiliar líderes escolares na análise de possíveis melhorias na infraestrutura das salas de aula. O método vigente, entretanto, não inclui avaliação estruturada com gestores, acompanhamento de decisões administrativas ou medição dos efeitos de intervenções.
- Alternativas: excluir a finalidade gerencial; afirmar apoio à tomada de decisão como contribuição comprovada; incorporar a finalidade gerencial sem alegar utilidade ou impacto comprovados.
- Decisão: incorporar o apoio informacional à gestão como finalidade projetada do sistema. O trabalho demonstrará tecnicamente a organização das medições em visualizações, históricos, indicadores, relatórios e alertas. Esses recursos serão apresentados como informações que podem subsidiar a identificação de condições que demandem investigação pela gestão escolar. A utilidade efetiva, o uso pelos gestores, a qualidade das decisões e os efeitos sobre a infraestrutura permanecerão como aplicações potenciais não avaliadas.
- Evidências: consulta ao grafo do projeto e análise por LLM Council; `DEC-001`; requisitos R001, R005 e R007 da matriz de evidências.
- Justificativa: a posição preserva a finalidade prática do projeto sem extrapolar o desenho metodológico. O sistema poderá demonstrar condições observadas e sua recorrência, mas não diagnosticar causas, prescrever obras ou comprovar melhoria das decisões.
- Consequências: introdução, justificativa, objetivos específicos, requisitos e dashboard deverão distinguir condição observada, possível investigação e decisão humana. Parâmetros e alertas deverão ter fundamento técnico, duração e contexto explícitos. Uma sala será tratada como estudo de caso, sem generalização automática para outras salas ou escolas. O título, a pergunta de pesquisa e o objetivo geral da `DEC-008` permanecem inalterados.

## DEC-010 — Objetivos específicos

- Data: 2026-08-18
- Status: aceita
- Contexto: após a aprovação do título, da pergunta de pesquisa e do objetivo geral, os objetivos específicos precisavam representar uma sequência executável, produzir evidências verificáveis e incorporar o apoio informacional à gestão definido na `DEC-009`.
- Alternativas: manter a lista preliminar; ampliar a pesquisa para avaliar decisões com gestores; adotar nove objetivos alinhados aos requisitos, à implementação e às avaliações técnica e parcial.
- Decisão: aprovar os nove objetivos específicos registrados em `projeto/contexto.md` e em `texto/01-introducao.md`, abrangendo revisão bibliográfica, requisitos, nó IoT, firmware, API e MySQL, aplicação web orientada ao apoio informacional, avaliação parcial dos sensores, avaliação ponta a ponta e análise de custos e limitações.
- Justificativa: cada objetivo corresponde a um entregável ou conjunto de evidências que poderá ser apresentado nos capítulos de método, desenvolvimento, resultados e conclusão. A avaliação parcial dos sensores permanece separada da avaliação ponta a ponta, e o apoio à gestão não é tratado como utilidade comprovada.
- Consequências: requisitos, cronograma, testes, resultados e conclusão deverão manter rastreabilidade com os nove objetivos. A formulação aprovada pelos autores deverá ser submetida ao orientador e somente será alterada mediante nova decisão registrada.

## DEC-011 — Duração e período da coleta principal

- Data: 2026-08-20
- Status: aceita
- Contexto: os autores frequentam aulas exclusivamente no período noturno, de segunda a sexta-feira, e precisam conciliar repetição entre dias, avaliação da estabilidade do sistema e prazo para análise dos dados.
- Alternativas: coleta curta de três a cinco dias; coleta intermediária de duas semanas letivas; coleta longa de quatro semanas ou mais.
- Decisão: realizar a coleta principal durante duas semanas letivas consecutivas, de segunda a sexta-feira, no período noturno, abrangendo todo o período de aula. A meta será de 10 noites de coleta, com mínimo de 8 noites válidas. As aulas ocorrem das 19h15 às 22h00; o monitoramento diário deverá ocorrer das 18h45 às 22h00, começando 30 minutos antes da primeira aula e terminando no encerramento da última. Antes da coleta principal, será realizada uma coleta-piloto correspondente a um período de aula.
- Evidências: disponibilidade informada pelos autores; estudos primários de monitoramento em ambientes educacionais registram campanhas desde sessões isoladas até semanas ou meses, incluindo campanha universitária de duas semanas e avaliações contínuas de 30 dias ou mais.
- Justificativa: duas semanas permitem observar repetição entre dias úteis e produzir evidências de disponibilidade, perdas e estabilidade da cadeia IoT, sem comprometer o prazo de correção de falhas e análise. O mínimo de 8 noites preserva a viabilidade diante de feriados, indisponibilidade da sala ou falhas justificadas.
- Consequências: deverão ser registradas as datas efetivas, os horários de início e fim, os intervalos, os eventos relevantes e os motivos de invalidação de qualquer noite. As datas do calendário permanecem a definir. A duração não autoriza generalização dos resultados para outras salas, períodos ou épocas do ano.

## DEC-012 — Intervalo configurável de leitura e transmissão

- Data: 2026-08-20
- Status: aceita
- Contexto: o sistema deve permitir que o intervalo seja ajustado dentro do software, mas os testes e a coleta precisam manter cadência conhecida para possibilitar o cálculo dos registros esperados, da completude, das perdas e da latência.
- Alternativas: intervalo fixo no firmware; intervalo configurável manualmente pelo software; intervalos independentes para leitura e transmissão; ajuste dinâmico automático durante a operação.
- Decisão: utilizar um único intervalo configurável para realizar a leitura dos sensores e a transmissão imediata da medição. O parâmetro aceitará valores inteiros de 10 a 300 segundos e terá valor padrão inicial de 60 segundos. A configuração poderá ser alterada por função administrativa do software durante desenvolvimento e testes. Em cada execução experimental válida, o valor deverá ser definido antes do início e permanecer inalterado; na coleta principal, será usado o valor aprovado após a coleta-piloto, com expectativa inicial de 60 segundos.
- Evidências: análise técnica e LLM Council; cadência de 60 segundos produz aproximadamente 195 registros por noite de 3 horas e 15 minutos e 1.950 registros em 10 noites, volume adequado ao escopo inicial da API, do MySQL e do dashboard.
- Justificativa: a configurabilidade preserva flexibilidade operacional e capacidade de teste, enquanto o congelamento experimental mantém comparabilidade e rastreabilidade. Um único ciclo evita a complexidade inicial de buffer, agregação e cadências independentes sem benefício demonstrado para o escopo atual.
- Consequências: firmware, API, banco e aplicação web deverão validar, persistir, exibir e auditar a configuração. O timestamp deverá representar o instante da leitura, e cada medição deverá permitir identificar a configuração aplicada. Valores inválidos deverão ser rejeitados sem substituir a última configuração válida. Mecanismos de autenticação, sincronização temporal, reenvio e deduplicação serão detalhados junto ao comportamento offline e aos contratos da API.

## DEC-013 — Operação offline, fila local e confirmação de entrega

- Data: 2026-08-20
- Status: aceita
- Contexto: interrupções de Wi-Fi ou indisponibilidade da API não devem interromper a aquisição nem causar crescimento ilimitado do uso de memória. A remoção prematura de registros também poderia produzir perda silenciosa antes da confirmação do armazenamento no servidor.
- Alternativas: descartar medições quando offline; manter fila apenas em RAM; manter fila local persistente sem limite; utilizar fila persistente limitada com confirmação e deduplicação.
- Decisão: continuar adquirindo medições durante falhas de comunicação e armazená-las em uma fila local persistente, ordenada e limitada a 256 registros. Após a reconexão, os registros pendentes serão reenviados do mais antigo para o mais recente. Cada registro somente será removido da fila depois que a API confirmar seu armazenamento ou informar que o mesmo identificador único já está armazenado. A ocupação de 80% da fila deverá gerar estado de advertência. Quando a capacidade máxima for atingida, os registros já enfileirados serão preservados, novas medições não poderão entrar na fila e cada perda será explicitamente contabilizada.
- Justificativa: a capacidade de 256 registros cobre uma noite completa de aproximadamente 195 medições no intervalo padrão de 60 segundos e mantém margem sem permitir crescimento indefinido. A confirmação antes da remoção evita perda silenciosa, enquanto identificadores únicos e deduplicação tornam o reenvio idempotente.
- Consequências: firmware, API, MySQL e dashboard deverão expor registros pendentes, confirmados e descartados, ocupação da fila, estado online ou offline e instante do último envio confirmado. A última configuração válida deverá continuar disponível sem conexão. A tecnologia de persistência e o espaço efetivamente reservado serão confirmados após a verificação da memória flash da placa recebida, sem reduzir a capacidade funcional aceita. Reinicialização, fila cheia, reconexão, reenvio, confirmação, duplicidade e limpeza deverão ter testes específicos. Medições feitas após reinicialização sem relógio sincronizado deverão ser identificadas como temporalmente não sincronizadas.

## DEC-014 — Métricas e critérios de aceitação

- Data: 2026-08-24
- Status: aceita
- Contexto: a pergunta de pesquisa e os objetivos aprovados exigem critérios mensuráveis definidos antes da implementação, dos testes e da coleta principal. Também é necessário separar a avaliação parcial dos sensores da validação funcional e técnica da cadeia IoT.
- Alternativas: avaliar o sistema apenas de forma descritiva; usar exclusivamente especificações nominais dos fabricantes; adotar métricas e metas internas de engenharia, com limites explícitos e avaliação metrológica condicionada aos instrumentos de referência.
- Decisão: avaliar funcionalmente cada variável por uma execução mínima de uma hora no intervalo de 10 segundos, com pelo menos 99% de leituras válidas. Quando houver referência adequada, calcular viés, MAE, RMSE e erro absoluto no percentil 95; para iluminância igual ou superior a 50 lx, calcular também MAPE. Adotar como metas internas condicionais MAE de até 0,5 °C e módulo do viés de até 0,3 °C para temperatura; MAE de até 5% UR e módulo do viés de até 3% UR para umidade relativa; e MAPE de até 15% para iluminância igual ou superior a 50 lx ou MAE de até 10 lx abaixo desse valor. Na cadeia ponta a ponta, adotar completude mínima de 99% em teste controlado e 95% em cada noite válida, perda máxima de 1% em teste controlado, latência online no percentil 95 de até 5 segundos entre leitura e API e de até 10 segundos entre leitura e dashboard, disponibilidade mínima de 95% por noite válida, consistência de 100% entre os registros auditados, ausência de duplicatas no banco e erro de sincronização temporal de até 2 segundos quando o relógio estiver marcado como sincronizado. A API deverá apresentar latência interna no percentil 95 de até 500 ms em teste nominal com pelo menos 100 requisições e nenhum erro 5xx. A fila offline completa deverá ser recuperada em até cinco minutos após conexão estável, sem duplicatas e com toda perda contabilizada.
- Evidências: requisitos e objetivos aprovados; `DEC-004`, `DEC-008`, `DEC-010`, `DEC-012` e `DEC-013`; protocolo e plano de testes; documentação primária dos sensores; orientação metrológica sobre comparação com referência e estimação de viés.
- Justificativa: os critérios permitem responder à pergunta de pesquisa por resultados reproduzíveis e verificáveis, distinguem funcionamento da cadeia e comportamento dos sensores e são compatíveis com o porte e a finalidade acadêmica do protótipo. As metas comparativas dos sensores são critérios internos, não garantias dos fabricantes nem limites normativos.
- Consequências: a classificação comparativa de cada sensor somente será aplicada se o instrumento de referência for identificado e tiver desempenho suficientemente melhor, preferencialmente com incerteza não superior a um terço da tolerância avaliada; caso contrário, as diferenças serão apresentadas apenas de forma descritiva. Uma noite somente será válida se cobrir a janela planejada, alcançar pelo menos 95% de completude e de disponibilidade, mantiver o intervalo registrado, possuir pelo menos 99% dos registros temporalmente sincronizados, não apresentar inconsistência ou duplicação e tiver eventos e falhas documentados. Noites inválidas serão preservadas para análise de falhas, mas não integrarão a caracterização ambiental principal. Os parâmetros ambientais dos alertas permanecem pendentes de referências técnicas específicas.

## DEC-015 — Tratamento de dados ausentes, falhas e exclusões

- Data: 2026-08-24
- Status: aceita
- Contexto: a coleta poderá conter leituras inválidas, lacunas, duplicatas, reenvios, registros fora da janela, falhas de sincronização e valores incomuns. O tratamento precisa preservar a evidência técnica sem distorcer a caracterização ambiental nem esconder falhas do sistema.
- Alternativas: corrigir ou preencher manualmente os dados; descartar definitivamente registros problemáticos; manter os dados brutos imutáveis e gerar subconjuntos tratados por regras reproduzíveis.
- Decisão: preservar integralmente os dados brutos e produzir por scripts dois subconjuntos analíticos derivados: um operacional, que incluirá tentativas, falhas, perdas, duplicidades, reenvios e registros sem sincronização para avaliar o sistema; e um ambiental principal, limitado a medições válidas, únicas, temporalmente sincronizadas, dentro da janela prevista e provenientes de noites válidas. Lacunas não serão preenchidas ou interpoladas na análise principal. Leituras ausentes serão identificadas a partir da grade temporal da execução e contabilizadas na completude. Dados da coleta-piloto não integrarão a caracterização ambiental principal.
- Evidências: política de dados do projeto; `DEC-011` a `DEC-014`; protocolo experimental; necessidade de reprodutibilidade do objetivo específico 9.
- Justificativa: a separação permite usar as falhas como evidência da avaliação técnica, evita que valores inválidos ou temporalmente incertos alterem os resultados ambientais e conserva uma trilha de auditoria entre os dados originais e os resultados apresentados.
- Consequências: registros válidos, erros de leitura, falhas de CRC, valores fora da faixa física, timestamps não sincronizados, duplicatas, perdas por fila cheia, registros fora da janela e mudanças indevidas de configuração deverão ser distinguíveis. Reenvio offline não será motivo de exclusão quando o instante da leitura estiver sincronizado e os valores forem válidos. Valores incomuns dentro da faixa física não serão removidos automaticamente; a exclusão exigirá evidência de falha técnica. Toda exclusão manual deverá registrar motivo, autor e data. Se uma exclusão manual puder alterar materialmente uma conclusão, o resultado será apresentado também sem essa exclusão como análise de sensibilidade. Noites inválidas serão mantidas para análise das falhas, mas não integrarão a caracterização ambiental principal.

## DEC-016 — API integrada ao Next.js

- Data: 2026-08-24
- Status: aceita
- Contexto: a API e a aplicação web precisam compartilhar o mesmo sistema, reduzir a quantidade de serviços implantados e preservar o contrato HTTP/JSON definido para o nó IoT. O código da aplicação ainda não está presente neste workspace e será construído do zero.
- Alternativas: API independente em outro framework; API integrada ao projeto Next.js existente, respeitando o roteador já utilizado.
- Decisão: implementar a interface web e a API no mesmo projeto Next.js com TypeScript. Como o projeto seria criado do zero, foi adotado o App Router com Route Handlers em `app/api/v1/**/route.ts`. As rotas que acessarem o MySQL utilizarão o runtime Node.js. O diretório `software/api/` permanecerá como documentação do contrato, enquanto o código das rotas integrará a aplicação em `software/web/`. Regras de negócio, validação e acesso a dados ficarão em módulos separados dos arquivos de rota para permitir testes unitários.
- Evidências: decisão dos autores; contrato inicial `v0.1`; arquitetura aprovada do sistema; documentação oficial do Next.js sobre Route Handlers e App Router.
- Justificativa: a solução mantém API e dashboard integrados, reduz a complexidade operacional para o porte do TCC, preserva endpoints HTTP acessíveis ao ESP32 e permite testar as regras fora da camada HTTP. O runtime Node.js é necessário para compatibilidade previsível com o cliente MySQL que ainda será escolhido.
- Consequências: não haverá um serviço de API separado no escopo inicial. A aplicação foi iniciada em `software/web/` com App Router; o acesso ao MySQL utilizará `mysql2` e validação de entrada poderá utilizar `zod`. O ambiente de hospedagem deverá executar Next.js com funções de servidor e permitir conexão segura ao MySQL. Estratégia de migrações, autenticação e gerenciamento de segredos permanecem pendentes. A API continuará sujeita aos critérios de latência, idempotência, consistência e ausência de erros 5xx definidos anteriormente.

## DEC-017 — Ambiente MySQL local e migrações versionadas

- Data: 2026-08-24
- Status: aceita
- Contexto: a ingestão precisava ser testada contra um MySQL real antes da implementação dos demais endpoints. O computador possui Docker Desktop com engine Linux/WSL 2, mas não possui servidor MySQL instalado diretamente.
- Alternativas: instalar MySQL diretamente no Windows; utilizar uma instância hospedada desde o desenvolvimento; executar MySQL local por Docker Compose.
- Decisão: utilizar no desenvolvimento MySQL 8.4.11 em Docker Compose, publicado somente em `127.0.0.1`, com volume nomeado persistente. O esquema `v0.1` será a migração inicial e será aplicado por script Node.js com histórico e checksum SHA-256; migrações aplicadas serão imutáveis e alterações futuras usarão arquivos SQL numerados. Um seed idempotente criará somente o nó e a configuração necessários aos testes locais.
- Evidências: Docker Engine 29.1.2 e Compose 2.40.3 detectados; contêiner saudável; migração e seed reaplicados com segurança; teste integrado documentado em `software/database/teste-integracao-2026-08-24.md`.
- Consequências: o ambiente local tornou-se reproduzível e permitiu validar a cadeia API–MySQL. Credenciais locais permanecem em arquivos ignorados e não poderão ser reutilizadas em produção. A hospedagem, os segredos definitivos, backups e a adaptação operacional das migrações continuam pendentes. O volume Docker não deverá ser apagado quando contiver dados experimentais sem cópia e autorização explícita.

## DEC-018 — Placa efetivamente adquirida e composição da compra inicial

- Data: 2026-08-31
- Status: aceita
- Contexto: a placa `ESP32C3 Classic Weld` prevista na DEC-007 não foi adquirida. No pedido fechado pelos autores em 28 de agosto de 2026, foram compradas duas placas de desenvolvimento anunciadas como `ESP32-WROOM-32D-38P`, por custo mais baixo. As capturas dos pedidos, com itens e valores, estão preservadas em `modules/`.
- Alternativas: manter a placa ESP32-C3 prevista e adquirir uma unidade adicional; utilizar a placa `ESP32-WROOM-32D-38P` efetivamente adquirida; cancelar ou devolver o pedido.
- Decisão: adotar para o protótipo a placa de desenvolvimento genérica anunciada como `ESP32-WROOM-32D-38P`, utilizando uma unidade e mantendo a segunda como reserva. Manter os módulos anunciados como SHT31 e VEML7700. A configuração-base do firmware passa a utilizar o ambiente genérico `esp32dev` do PlatformIO, compatível com ESP32-WROOM-32; GPIOs, chip USB–serial, capacidade de flash e demais características da placa continuam condicionados à inspeção da unidade recebida.
- Evidências: confirmação explícita dos autores em 31 de agosto de 2026; seis capturas dos pedidos em `modules/`; pagamento em 28 de agosto de 2026, com status de entrega pendente nas capturas. O dispêndio total registrado é de R$ 125,98, incluindo duas placas ESP32, SHT31, VEML7700, protoboard, cabo USB de dados e kit de jumpers; ele não constitui ainda o custo final de um nó montado.
- Consequências: a DEC-007 é substituída somente quanto ao modelo e à quantidade da placa. A compilação anterior para ESP32-C3 permanece uma evidência histórica pré-hardware, mas não comprova compatibilidade com a placa agora adotada. Após o recebimento, será obrigatória a conferência da serigrafia, chip USB–serial, porta, tensão de 3,3 V, capacidade de flash, pinagem, endereços I2C e leitura dos sensores antes do upload e dos testes físicos.

## DEC-019 — Faixas locais de acompanhamento e histórico de ocorrências

- Data: 2026-08-31
- Status: aceita
- Contexto: a UNIP informou adotar a ABNT NBR 16401-2:2008 como referência para as salas, mas o protótipo mede temperatura do ar, umidade relativa e iluminância, sem temperatura operativa, velocidade do ar, temperatura radiante, vestimenta ou atividade. Portanto, ele não pode emitir alerta de conforto ou de conformidade normativa. Ainda assim, a administração local precisa acompanhar desvios em relação a parâmetros operacionais que ela própria estabeleça e consultar o que ocorreu ao longo do dia.
- Alternativas: manter todos os alertas ambientais inativos; aplicar diretamente limites da NBR 16401-2:2008; permitir faixas locais versionadas e registrar ocorrências informativas rastreáveis.
- Decisão: implementar faixas locais de acompanhamento, inicialmente desabilitadas e sem valores padrão. A administração informará responsável, justificativa, referência de origem opcional e limites mínimo e máximo para cada variável escolhida. Cada alteração cria uma nova versão e é bloqueada durante execução experimental ativa. Uma leitura somente gera ocorrência quando possui valor válido e instante sincronizado, está fora da faixa local vigente naquele instante e é persistida pela primeira vez. A ocorrência conservará horário, variável, direção (abaixo/acima), valor observado, limites aplicados, identificador da leitura e versão da faixa; mudanças posteriores não reclassificarão o histórico.
- Evidências: confirmação explícita dos autores em 31 de agosto de 2026; análise da ABNT NBR 16401-2:2008 fornecida pela UNIP; estrutura de dados, API e relatório implementados em `software/`.
- Consequências: a interface e a documentação deverão usar “faixa local” e “ocorrência informativa”, nunca “conforme”, “adequada”, “confortável” ou “alerta normativo”. Não haverá notificação externa, automação de equipamentos, diagnóstico de causas ou certificação da sala. O responsável informado não substitui autenticação individual definitiva, que continua pendente antes de hospedagem externa.

## DEC-020 — Alertas locais em página própria

- Data: 2026-08-31
- Status: aceita
- Contexto: os autores solicitaram que os registros gerados por faixas locais sejam denominados “alertas locais”, ganhem destaque visual discreto em vermelho e não permaneçam misturados ao histórico de medições, que pode conter grande volume de registros.
- Alternativas: manter a terminologia de ocorrências e a tabela no relatório descritivo; exibir alertas no relatório com outro estilo; criar uma página exclusiva de alertas locais com filtro temporal e destaque visual.
- Decisão: adotar o termo “alerta local” em toda a interface e documentação dirigida ao usuário. Disponibilizar o histórico em `/alerts`, separado de `/reports`, com filtro temporal, horário, variável, direção, valor observado, faixa aplicada, versão e identificador da leitura. Todas as linhas de alerta receberão tonalidade avermelhada suave para facilitar a inspeção; o relatório descritivo manterá somente as medições e seus estados técnicos.
- Evidências: confirmação explícita dos autores em 31 de agosto de 2026; implementação, teste integrado e build local da aplicação.
- Consequências: alertas locais continuam derivados exclusivamente de leituras válidas e sincronizadas fora de faixas definidas pela administração. A alteração é terminológica e de apresentação: não cria parâmetro normativo, notificação externa, diagnóstico, automação, classificação de conforto ou certificação de conformidade.

## DEC-021 — Menu global de navegação da aplicação web

- Data: 2026-09-01
- Status: aceita
- Contexto: o crescimento da aplicação tornou inviável manter atalhos de navegação específicos e repetidos no cabeçalho de cada página.
- Alternativas: manter os atalhos distribuídos por página; usar uma barra horizontal fixa; centralizar as rotas em um painel lateral acionado por menu.
- Decisão: substituir os atalhos de navegação entre páginas por um menu global, aberto pelo ícone de menu no canto superior direito. O painel desliza da direita para a esquerda e apresenta estação de observação, caderno de observação, central de alertas e faixas de acompanhamento, com indicação da rota atual.
- Evidências: solicitação explícita dos autores em 01 de setembro de 2026; implementação no layout raiz da aplicação; ESLint, testes unitários e build local executados.
- Consequências: novas páginas de interface deverão ser incluídas no menu global, evitando a multiplicação de atalhos em cabeçalhos individuais. A atualização manual do dashboard permanece como ação da própria página, não como destino de navegação.

## DEC-022 — Cadastro de salas e vínculo histórico com nós IoT

- Data: 2026-09-01
- Status: aceita
- Contexto: a aplicação precisa permitir a preparação de múltiplas salas, atribuir cada nó a uma sala e consultar separadamente suas medições, alertas e relatórios, sem perder o histórico caso um nó seja transferido.
- Alternativas: identificar a sala no firmware; armazenar somente a sala atual no nó; cadastrar salas no servidor e registrar associações temporais entre sala e nó.
- Decisão: manter o `device_id` como identidade imutável do nó e cadastrar salas no servidor. A associação administrativa sala–nó registrará início, encerramento e informações de instalação. Cada medição e alerta local conservará a sala atribuída no instante de seu recebimento. Dashboard, alertas, relatórios e CSV serão acessados pelo recorte de uma sala.
- Evidências: confirmação explícita dos autores em 01 de setembro de 2026; requisitos e critérios em `software/docs/salas-e-nos.md`; migração `003_add_classrooms.sql` aplicada ao MySQL local, seed de desenvolvimento executado, TypeScript, ESLint, 56 testes unitários e build de produção aprovados. O ensaio integrado `npm run test:classrooms` confirmou cadastro protegido, transferência do nó, preservação histórica e isolamento entre salas, removendo seus dados temporários ao final.
- Consequências: a aplicação poderá conter várias salas cadastradas, mas a avaliação metodológica atual permanece uma sala física como estudo de caso. Cadastros e dados de desenvolvimento adicionais não constituem evidência experimental. A expansão da coleta física exigirá decisão metodológica, nós completos adicionais e atualização do protocolo.

## Modelo para novas decisões

```markdown
## DEC-023 — Cadastro administrativo e identificacao dos nos IoT

- Data: 08/09/2026
- Status: aceita
- Contexto: a associacao historica entre salas e nos exigia que um novo ESP32 ja estivesse presente no banco como no ativo. Era necessario tornar esse preparo acessivel pela interface e explicitar como ele corresponde ao firmware.
- Alternativas: cadastrar o no automaticamente na primeira medicao; manter o cadastro apenas por seed ou banco; disponibilizar cadastro administrativo previo.
- Decisao: cada no sera cadastrado administrativamente com identificador publico unico e nome visivel antes da gravacao. O mesmo identificador sera definido em `TCC_DEVICE_ID` no firmware. A associacao a sala continuara no software e nao sera armazenada no firmware.
- Evidencias: rota administrativa `/admin/devices`, API protegida `GET`/`POST /api/v1/devices`, validacao do identificador, listagem com sala associada, ensaio integrado `npm run test:devices`, 58 testes unitarios, ESLint e build de producao aprovados em 08/09/2026.
- Consequencias: um no novo pode permanecer cadastrado sem sala ate a instalacao; sua transferencia de sala nao exige reprogramacao e preserva o historico. A autenticacao individual definitiva por dispositivo permanece pendente e nao e substituida por esta decisao.

## DEC-024 — Consulta multissala de alertas locais

- Data: 08/09/2026
- Status: aceita
- Contexto: a Central de alertas permitia apenas o recorte de uma sala por vez, dificultando a investigacao conjunta de salas cadastradas.
- Alternativas: manter uma sala por consulta; mostrar todas as salas sem identificacao individual; oferecer seletor de salas com selecao multipla.
- Decisao: a Central de alertas usara um seletor compacto de salas, com resumo da selecao, busca, checkboxes, acoes de selecionar todas ou limpar e lista rolavel. O usuario podera consultar uma ou mais salas; a tabela e o contexto identificarao a sala de cada alerta. Sem selecao, a consulta mostrara todas as salas cadastradas de forma explicita.
- Evidencias: consulta SQL filtrada por lista de codigos de salas, coluna de sala na tabela, ensaio integrado `npm run test:classrooms` com duas salas selecionadas e limpeza confirmada, 58 testes unitarios, ESLint e build de producao aprovados em 08/09/2026; seletor compacto validado com ESLint, 60 testes unitarios e build em 09/09/2026.
- Consequencias: o filtro e apenas de consulta e nao altera o registro imutavel dos alertas. Alertas locais continuam sem representar classificacao normativa, conforto ou conformidade ambiental.

## DEC-025 — Edicao administrativa de salas e nos

- Data: 08/09/2026
- Status: aceita
- Contexto: apos centralizar os cadastros nas consultas, era necessario permitir corrigir e atualizar os dados de cada sala e no cadastrado, sem comprometer a rastreabilidade das medicoes, alertas ou identificadores gravados no firmware.
- Alternativas: permitir editar todos os campos, inclusive identificadores; permitir somente a consulta; manter os identificadores imutaveis e editar os demais dados administrativos.
- Decisao: cada cartao das consultas de salas e nos oferecera uma tela de edicao protegida por chave administrativa. A sala podera ter nome, bloco, piso, no associado e dados de instalacao atualizados; o no podera ter nome e disponibilidade atualizados. O codigo da sala e o identificador publico do no nao serao alterados. As telas de cadastro e edicao terao o atalho `Retornar a consulta` no cabecalho.
- Evidencias: APIs protegidas `PATCH /api/v1/classrooms/{classroom_code}` e `PATCH /api/v1/devices/{device_id}`, testes unitarios, ensaios integrados `npm run test:classrooms` e `npm run test:devices`, ESLint e build de producao aprovados em 08/09/2026.
- Consequencias: mudar ou remover uma associacao encerra apenas o vinculo ativo e preserva os snapshots ja armazenados. Desativar um no bloqueia novas medicoes, sem apagar seu historico. A troca do Device ID continua exigindo novo cadastro e nova configuracao do firmware, evitando divergencia entre sistema e ESP32.

## DEC-026 — Autenticação por usuário e controle de acesso

- Data: 09/09/2026
- Status: aceita
- Contexto: a chave administrativa compartilhada não distinguia pessoas, e consultas e exportações poderiam ser acessadas sem login.
- Decisão: login obrigatório para consultas e exportação; perfis `VIEWER` para consulta e `ADMIN` para administração de salas, nós, faixas locais e usuários. A consulta/cadastro de usuários é exclusiva de administradores. Senhas usam `scrypt`, sessões usam cookie `HttpOnly` e os nós IoT mantêm credencial separada.
- Evidências: migração `004_add_application_users.sql` aplicada no MySQL local; rotas de login, sessão e usuários, proteção de páginas/APIs, edição de usuário, ativação/inativação, ESLint, 60 testes unitários e build aprovados em 09/09/2026. O ensaio MySQL confirmou cadastro, edição, inativação, bloqueio de login inativo, reativação e negação da administração a `VIEWER`, com limpeza das contas temporárias.
- Consequências: o primeiro administrador é criado explicitamente por variáveis locais e `npm run users:bootstrap-admin`; nenhum usuário ou segredo real é versionado. Formulários e documentação operacional não solicitam nem enviam chave administrativa compartilhada: a sessão `ADMIN` autoriza as ações administrativas. A desativação ou a remoção do perfil do último administrador ativo é recusada para preservar o acesso administrativo.

## DEC-027 — Seletor unitário de sala no Caderno de observação

- Data: 10/09/2026
- Status: aceita
- Contexto: o Caderno de observação (`/reports`) apresentava uma única sala por vez, mas, quando aberto pelo menu, a escolha dessa sala era implícita e não podia ser alterada no próprio filtro.
- Alternativas: manter a seleção implícita; permitir várias salas sem modificar os agregados; expor um seletor explícito de uma única sala.
- Decisão: o filtro de `/reports` terá um seletor de uma sala cadastrada. A sala escolhida será mantida ao alterar o período, e estatísticas, tabela e exportação CSV continuarão limitadas a essa única sala. A consulta multissala permanece exclusiva da Central de alertas até que relatórios e CSV sejam redesenhados para identificar a origem de cada registro.
- Evidências: implementação em `app/reports/page.tsx`, teste integrado ampliado em `scripts/test-classrooms.mjs`, 60 testes unitários, ESLint e build de produção aprovados em 10/09/2026. O ensaio integrado contra MySQL confirmou o seletor e o isolamento por sala, com limpeza dos dados temporários ao final.
- Consequências: o usuário passa a controlar explicitamente o recorte do Caderno, sem alteração de medições, associações históricas, alertas ou interpretação ambiental.

## DEC-028 — Acesso direto ao monitoramento em tempo real

- Data: 11/09/2026
- Status: aceita
- Contexto: o dashboard já atualizava periodicamente as leituras e os sinais operacionais, mas seu recorte por sala era alcançado somente pela Consulta de salas. O menu global não apresentava um destino direto para a atividade de monitoramento contínuo.
- Alternativas: manter o dashboard acessível somente pela Consulta de salas; criar uma nova tela com dados duplicados; expor o dashboard existente no menu global com seletor unitário de sala.
- Decisão: disponibilizar a rota `/monitoring` no menu global como `Monitoramento em tempo real`. A página reutiliza o dashboard, apresenta uma sala por vez e fornece seletor com todas as salas cadastradas. A sala ativa aparece no parâmetro `room` da URL. Salas sem nó associado permanecem selecionáveis, com estado seguro até que exista dispositivo ativo.
- Evidências: implementação em `app/monitoring/page.tsx`, `app/page.tsx`, `components/live-monitoring-room-selector.tsx` e `components/navigation-drawer.tsx`; 60 testes unitários, ESLint e build de produção aprovados; ensaio integrado `npm run test:classrooms` ampliado e aprovado em 11/09/2026, com limpeza dos dados temporários.
- Consequências: o dashboard torna-se uma entrada operacional direta, sem duplicar consultas ou alterar medições, vínculos históricos, alertas, regras locais ou interpretações ambientais. O Caderno de observação mantém o recorte unitário por período (`DEC-027`) e a Central de alertas mantém a consulta multissala (`DEC-024`).

## DEC-029 — Pinagem I2C da primeira montagem

- Data: 17/09/2026
- Status: aceita
- Contexto: após a inspeção visual da placa ESP32 de 38 pinos recebida, era necessário definir os dois GPIOs do barramento I2C para a montagem inicial dos módulos SHT3X e VEML7700.
- Alternativas: utilizar GPIO 21 e GPIO 22, adotar GPIO 32 e GPIO 33, ou manter a pinagem indefinida.
- Decisão: usar GPIO 32 como SDA e GPIO 33 como SCL. Os módulos SHT3X e VEML7700 compartilharão essas duas linhas I2C e a alimentação de 3,3 V com GND comum.
- Evidências: serigrafia visível da placa recebida nas fotos em `experimento/fotos/`; o firmware inicial permite informar SDA e SCL no arquivo local por `Wire.begin(sda, scl)`.
- Consequências: `TCC_I2C_SDA_PIN` deverá receber `32` e `TCC_I2C_SCL_PIN` deverá receber `33` em `FirmwareConfig.local.h` depois de a montagem ser conferida. A decisão não confirma alimentação, endereço I2C, leitura, comunicação serial nem validação dos sensores.

## DEC-030 — Monitoramento em tempo real unificado por sala

- Data: 18/09/2026
- Status: aceita
- Contexto: a página inicial “Estação de observação ambiental” e a rota `/monitoring` reutilizavam o mesmo dashboard com atualização periódica, mas a primeira selecionava implicitamente o nó mais recente e a segunda permitia escolher uma sala. A duplicidade confundia a operação e podia apresentar um nó ainda não associado a uma sala.
- Alternativas: manter as duas entradas; remover a seleção por sala; unificar o monitoramento na página inicial com recorte obrigatório por sala.
- Decisão: a página inicial passa a ser “Monitoramento em tempo real”, com seletor de uma sala e parâmetro `?room={codigo}`. Ela apresenta somente as medições e a telemetria do nó atualmente vinculado à sala selecionada. A rota `/monitoring` permanece apenas como redirecionamento de compatibilidade para a página inicial, preservando o parâmetro `room` quando informado.
- Evidências: implementação em `software/web/app/page.tsx`, `software/web/app/monitoring/page.tsx`, `software/web/lib/dashboard/data.ts` e `software/web/components/navigation-drawer.tsx`.
- Consequências: um nó sem associação ativa não será exibido como monitoramento de sala. A associação administrativa deve ser feita antes da coleta para que as novas medições recebam o recorte correto; o histórico recebido antes dessa associação não será reclassificado. O Caderno de observação e a Central de alertas mantêm seus papéis definidos nas DEC-027 e DEC-024.

## DEC-031 — Sincronização temporal com alternativa pela API local

- Data: 18/09/2026
- Status: aceita
- Contexto: o nó físico enviava medições e telemetria pela rede local, mas não obtinha horário NTP pelo hotspot, mantendo `measured_at` nulo e impedindo o uso temporal dos registros no Caderno de observação.
- Alternativas: depender exclusivamente do NTP externo; gravar horário estimado no servidor como se fosse instante de leitura; repetir NTP e usar o cabeçalho `Date` da API local como alternativa de sincronização.
- Decisão: o firmware repete a solicitação NTP a cada minuto enquanto o relógio estiver inválido e, após uma resposta HTTP bem-sucedida, usa o cabeçalho `Date` da API local para ajustar o relógio UTC quando ainda não houver hora confiável.
- Evidências: a API local retorna `Date` em UTC; o firmware atualizado foi compilado e gravado em `COM3`. A leitura recebida em 18/09/2026 às 21:05:17 apresentou `measured_at` igual a `2026-09-18 21:05:16` e estado `SYNCED`.
- Consequências: a primeira leitura imediatamente após reinicialização ainda pode ser `UNSYNCED`, pois a resposta dela fornece a referência temporal; as seguintes passam a carregar horário de leitura. Registros anteriores sem horário permanecem identificados como não sincronizados e não são reinterpretados como série temporal válida.

## DEC-032 — Filtro de integridade temporal no Caderno de observação

- Data: 18/09/2026
- Status: aceita
- Contexto: medições sem horário confiável precisam permanecer distinguíveis das medições temporalmente sincronizadas, mas a consulta administrativa também deve permitir inspecionar ambas quando necessário.
- Alternativas: ocultar definitivamente as leituras sem horário; exibi-las sempre misturadas às sincronizadas; permitir selecionar sincronizadas, não sincronizadas ou todas as leituras.
- Decisão: o Caderno e sua exportação CSV passam a oferecer o filtro “Horário da leitura”, com as opções “Somente com data e hora” (padrão), “Somente sem data e hora” e “Todas as leituras”.
- Evidências: implementação nos filtros, repositórios, tela e exportação de relatórios em `software/web/`; 60 testes unitários, ESLint e build de produção aprovados.
- Consequências: o filtro padrão preserva o recorte temporal confiável. Ao consultar registros sem horário, a janela selecionada é aplicada ao instante de recebimento pelo servidor, que é identificado como tal e não substitui o instante de leitura do nó. Estatísticas, tabela e CSV usam o mesmo recorte escolhido.

## DEC-036 — Operação remota temporária pelo PC doméstico

**Decisão.** Para os testes e a coleta próxima, a aplicação Next.js e o MySQL serão executados no PC doméstico dos autores, sem contratação de hospedagem em nuvem. O nó será conectado ao hotspot do celular na faculdade e acessará a API por um túnel HTTPS seguro.

**Justificativa.** A solução reduz custo e permite iniciar a validação na próxima semana, preservando a arquitetura já comprovada localmente. Uma hospedagem em nuvem gratuita exigiria também banco MySQL compatível, configuração adicional, HTTPS e validação de conexões antes do início da coleta.

**Consequências.** O PC precisa permanecer ligado, conectado à internet e sem suspensão durante cada sessão. Antes da coleta válida, deve-se configurar o túnel, atualizar e gravar o firmware com a URL HTTPS pública, testar a transmissão por rede móvel e registrar a conectividade como evento operacional. A fila local de 256 medições continua sendo o mecanismo de recuperação diante de interrupções. Esta é uma decisão operacional para a coleta; a hospedagem definitiva continua em aberto.

## DEC-035 — Atalhos contextuais ao monitoramento em tempo real

**Decisão.** O Caderno de observação e a Central de alertas devem disponibilizar, além do menu global, um atalho contextual para o Monitoramento em tempo real.

**Consequências.** O Caderno preserva sua única sala consultada. A Central preserva o recorte apenas quando exatamente uma sala está selecionada; quando a consulta abrange várias ou todas, o atalho abre o monitoramento sem sala pré-selecionada, pois essa tela apresenta uma sala por vez.

## DEC-034 — Notificações persistentes de alertas locais

**Decisão.** O sistema deve mostrar, em todas as páginas autenticadas, um botão de notificações ao lado do menu global. Ele informa novas ocorrências de faixas locais com sala, variável e direção, e permite a cada usuário limpar sua própria lista de notificações.

**Justificativa.** A Central de alertas mantém o histórico para consulta, mas exige navegação deliberada. Um indicador global reduz o risco de uma nova ocorrência local passar despercebida durante o uso de outras telas.

**Consequências.** O estado de limpeza é persistido por usuário e se aplica apenas às notificações, nunca ao histórico de ocorrências. A atualização é periódica a cada 20 segundos; portanto, constitui aviso operacional no sistema web, não canal de emergência, automação ou diagnóstico. As mensagens continuam descrevendo excedentes de faixas locais, sem declarar conformidade normativa do ambiente.

## DEC-033 — Precisão consistente e opcional na exportação CSV do Caderno

**Decisão.** A exportação CSV do Caderno de observação deve, por padrão, usar a mesma apresentação numérica da tabela: temperatura do ar e umidade relativa com até uma casa decimal e iluminância sem casas decimais. O filtro de consulta disponibiliza a escolha explícita de valores brutos do sensor para exportação técnica.

**Justificativa.** Um CSV que apresenta precisão diferente da tela consultada pode induzir a interpretações divergentes do mesmo registro. A opção técnica preserva a rastreabilidade dos valores persistidos sem substituir a visão de leitura usual.

**Consequências.** A opção selecionada é transportada somente à URL de exportação. Ela não altera as medições armazenadas, estados técnicos, totais nem estatísticas. Para os valores exibidos, o CSV usa vírgula como separador decimal e ponto e vírgula como separador de colunas, compatível com a abertura usual no Excel em português do Brasil.

## DEC-XXX — Título

- Data:
- Status: proposta | aceita | substituída
- Contexto:
- Alternativas:
- Decisão:
- Evidências:
- Consequências:
```
