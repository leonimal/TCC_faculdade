# Auditoria acadêmica e ABNT da redação do TCC — 2026-08-26

## 1 Parecer executivo

A redação ativa, formada pelos capítulos em `texto/`, está coerente com o escopo aprovado e apresenta qualidade superior ao documento Word histórico. O título, a pergunta de pesquisa, o objetivo geral, os nove objetivos específicos, o método e as limitações convergem para a avaliação técnica de uma cadeia IoT de baixo custo. O texto distingue corretamente implementação de software, validação parcial dos sensores, avaliação ponta a ponta e aplicação potencial à gestão escolar.

O trabalho ainda não deve ser tratado como versão final para entrega. Permanecem ausentes os resultados físicos, a coleta ambiental, a resposta consolidada à pergunta de pesquisa, a conclusão, o resumo, o abstract e parte das ilustrações e elementos formais. Essas ausências não podem ser supridas por redação automática porque dependem de evidências reais, autorização, instrumentos, hardware e orientação institucional.

## 2 Pontos fortes

- O recorte está explícito: temperatura do ar, umidade relativa e iluminância em uma sala, sem reintroduzir ruído ou outras variáveis.
- A pergunta é mensurável e pode ser respondida requisito a requisito por completude, perda, latência, disponibilidade, consistência, duplicidade e sincronização.
- A validação funcional e técnica da cadeia está separada da avaliação parcial dos sensores, evitando alegações metrológicas indevidas.
- O Capítulo 4 distingue funcionalidades implementadas de montagem e ensaios físicos pendentes.
- O Capítulo 5 contém somente resultados observados em ambiente local e declara os limites desses ensaios.
- A conclusão permanece bloqueada enquanto faltam resultados, o que protege a integridade acadêmica.
- As limitações sobre uma única sala, uma unidade de cada componente, instrumentos de referência e ausência de avaliação com usuários aparecem de forma consistente.
- Dados ausentes, reenvios, duplicatas e exclusões possuem tratamento reproduzível e não são ocultados por imputação.

## 3 Achados por severidade

### 3.1 Críticos para uma entrega final

| Localização | Achado | Impacto | Correção |
|---|---|---|---|
| Capítulos 5 e 6 | Não existem resultados do nó físico, dos sensores nem da coleta principal; o Capítulo 6 ainda é um roteiro. | Impede responder integralmente à pergunta de pesquisa e concluir o trabalho. | Executar e analisar os testes físicos e preencher a conclusão somente com resultados observados. |
| Elementos pré-textuais | Resumo e abstract vigentes ainda não foram redigidos. | Uma versão final ficaria incompleta e poderia repetir alegações desatualizadas do Word histórico. | Redigir ambos após a conclusão, com objetivo, método, resultados e conclusão reais. |
| `TCC_adequado_modelo_UNIP.docx` | O Word mais recente é histórico e ainda contém título com “inteligente”, ESP8266, ruído, alertas supostamente implementados, placeholders e conclusão sem resultados. | Se enviado como versão final, contradiz decisões aceitas e apresenta como concluídas etapas não executadas. | Não reutilizar o texto automaticamente; consolidar futuramente os capítulos ativos de `texto/` em um novo DOCX. |

### 3.2 Altos

| Localização | Achado | Impacto | Correção |
|---|---|---|---|
| Normalização institucional | O manual ou template formal vigente da UNIP ainda não foi confirmado. | Não é possível assegurar margens, fonte, folha de aprovação, paginação e demais escolhas locais. | Obter o documento institucional e elaborar uma tabela de conflitos entre UNIP e ABNT antes da consolidação em DOCX. |
| Capítulo 2 | A primeira versão se apoiava em apenas um trabalho diretamente relacionado. | Reduzia a comparação crítica e a sustentação da estratégia de monitoramento e validação. | Corrigido nesta revisão com Botana Martinez et al. (2025), Guillán Lorenzo et al. (2022) e Rus et al. (2025). |
| Metodologia e análise | A fórmula com piso omitia a última posição da grade quando a duração não era múltipla exata do intervalo, apesar de incluir o instante inicial. | Poderia subestimar registros esperados e superestimar completude. | Corrigido para teto no Capítulo 3, protocolo, script e teste automatizado. |
| Título e objetivo específico 9 | O qualificativo “baixo custo” ainda não possui custo final observado nem custo-alvo do nó completo. | Sem apuração, uma característica central do título permanece apenas como intenção de projeto. | O procedimento de apuração foi incluído na Seção 3.12 e a Seção 5.9 foi reservada ao resultado; compra, frete e lista final de materiais continuam pendentes. |

### 3.3 Médios

| Localização | Achado | Impacto | Correção |
|---|---|---|---|
| Capítulo 2 | Chamadas parentéticas usavam sobrenomes em caixa alta integral, padrão anterior à NBR 10520:2023. | Inconsistência com a norma de citações vigente adotada pela revisão. | Corrigido para grafia em maiúsculas e minúsculas. |
| Metodologia e testes | Os limites de erro da umidade relativa eram escritos apenas como “5%” e “3%”. | Poderiam ser confundidos com erro relativo, embora expressem diferença absoluta na escala de UR. | Corrigido para 5 e 3 pontos percentuais de umidade relativa. |
| Elementos pós-textuais | Os capítulos ativos não possuíam uma seção de referências pronta para consolidação. | Dificultava conferir a correspondência entre chamadas e obras. | Criado `texto/07-referencias.md` somente com obras citadas e verificadas. |
| Ilustrações e rastreabilidade visual | Ainda não há no texto ativo o diagrama final da arquitetura, o modelo de dados, a montagem física e capturas definitivas da interface. | Prejudica a compreensão visual e a auditabilidade do desenvolvimento. | Inserir figuras numeradas, citadas no texto e acompanhadas de título e fonte após sua preparação e conferência. |

### 3.4 Baixos

| Localização | Achado | Impacto | Correção |
|---|---|---|---|
| Capítulos 1 a 5 | Há alternância deliberada entre futuro metodológico e passado para resultados já obtidos. | Pode parecer inconsistência se a versão for consolidada sem revisão final. | Uniformizar os tempos verbais após a coleta, preservando passado para procedimentos executados e presente para propriedades estáveis do sistema. |
| Capítulo 2 | O Quadro 1 está em Markdown e ainda dependerá do estilo final do editor de texto. | Risco apenas visual na versão consolidada. | Aplicar identificação, título, fonte, largura e repetição de cabeçalho conforme o template institucional. |

## 4 Conformidade formal atual

| Item | Situação | Observação |
|---|---|---|
| Título, problema e objetivos | Conforme quanto ao conteúdo | Formulações aprovadas em `DEC-008` e `DEC-010`. |
| Numeração progressiva | Conforme no texto-fonte | Deve ser conferida no DOCX e no sumário automático. |
| Sistema de chamada | Autor-data, agora uniforme | Chamadas ajustadas à NBR 10520:2023. |
| Referências | Parcialmente conforme | Lista ativa criada segundo os metadados verificados; novas obras somente poderão entrar após conferência. |
| Resumo e abstract | Pendente | Redigir depois dos resultados e da conclusão. |
| Figuras, quadros e tabelas | Parcial | Quadro de trabalhos relacionados e tabela de métricas existem; diagramas e evidências visuais ainda faltam. |
| Paginação, margens, fonte e espaçamento | Não verificável no Markdown | Depende do manual/template da UNIP e da inspeção visual do DOCX. |
| Folha de aprovação | Não finalizável | Não preencher data nem banca antes da defesa. |

## 5 Matriz objetivo–seção–evidência

| Objetivo específico | Seção principal | Evidência atual ou necessária |
|---|---|---|
| Revisar literatura e referências | Capítulo 2 | Fontes verificadas e matriz de evidências; normas de alertas ainda pendentes. |
| Definir requisitos e critérios | Capítulo 3 | Protocolo, testes e decisões 012 a 015. |
| Projetar e montar o nó | Capítulos 3 e 4 | Projeto documentado; montagem, fotos e inspeção física pendentes. |
| Desenvolver firmware | Capítulo 4 | Código compilado; upload, logs e ensaio físico pendentes. |
| Implementar API e MySQL | Capítulos 4 e 5 | Rotas, migrações e ensaios locais T005/T006. |
| Desenvolver aplicação web | Capítulos 4 e 5 | Dashboard e relatórios implementados; alertas normativos pendentes. |
| Avaliar sensores | Capítulos 3 e 5 | Método definido; instrumentos e medições físicas pendentes. |
| Avaliar a cadeia ponta a ponta | Capítulos 3 e 5 | Evidência local parcial; firmware físico e rede da sala pendentes. |
| Analisar custo, limitações e expansão | Seções 3.12, 5.9 e Capítulo 6 | Método de apuração definido; custo entregue e síntese final pendentes. |

## 6 Pendências que não podem ser preenchidas automaticamente

1. Manual ou template formal vigente da UNIP.
2. Autorização escrita para a coleta.
3. Compra efetiva, custo entregue, identificação e montagem dos componentes.
4. GPIOs, endereços I2C, registros fotográficos e logs da primeira energização.
5. Instrumentos de referência e seu estado de calibração ou desempenho documentado.
6. Datas da coleta-piloto e da coleta principal.
7. Fontes técnicas originais e vigentes para os alertas.
8. Resultados físicos, dados ambientais, discussão final, resumo, abstract e conclusão.
9. Consolidação em DOCX e inspeção visual de margens, estilos, paginação, sumário, figuras, tabelas e referências.

## 7 Perguntas prováveis da banca

- Por que o trabalho avalia somente uma sala e até onde seus resultados podem ser generalizados?
- Como os autores distinguem funcionamento do sistema de exatidão dos sensores?
- Por que ruído e dióxido de carbono foram excluídos do núcleo?
- Como são calculadas completude, perda, latência e disponibilidade, e por que os limites foram escolhidos?
- O que os ensaios locais de software demonstram e o que ainda depende do hardware físico?
- Como a fila offline evita perda silenciosa e duplicação de medições?
- Em que sentido o sistema pode apoiar a gestão escolar sem comprovar utilidade gerencial?
- Quais limitações impedem afirmar conforto, qualidade ambiental ou impacto na aprendizagem?
