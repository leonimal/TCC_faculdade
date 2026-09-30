# Auditoria documental dos materiais ativos — 2026-08-26

## Objetivo

Verificar se os materiais ativos de texto e preparação para banca preservam o escopo vigente do TCC e se contêm resquícios do modelo anterior que possam induzir conclusões não demonstradas.

## Materiais examinados

- `texto/01-introducao.md` a `texto/06-conclusao.md`;
- `apresentacao-tcc-iot.html`;
- `apresentacao-roteiro-de-fala.md`;
- `bibliografia/matriz-de-evidencias.md` e `bibliografia/referencias.bib` para indícios de placeholders.

Os documentos em `TCC ajustado.md`, `historico/` e demais fontes de diagnóstico não foram reescritos, pois são registros históricos e não constituem a redação vigente.

## Critérios de busca

Foram revisadas ocorrências de termos ligados a escopo removido ou a alegações que exigiriam evidência adicional: ESP8266, ruído, CO₂, material particulado, conforto, aprendizagem, desempenho acadêmico, qualidade ambiental global, utilidade gerencial, alertas, normas e placeholders bibliográficos.

## Resultado

- Não foi identificada nos materiais ativos nenhuma alegação de melhoria de aprendizagem, conforto percebido, qualidade ambiental global ou utilidade gerencial como resultado demonstrado.
- Ruído, CO₂, material particulado, imagem, áudio e ocupação aparecem como exclusões de escopo ou na descrição de trabalho relacionado, não como variáveis avaliadas.
- A apresentação e o roteiro mantêm a separação entre firmware compilado, ensaios locais de software e validação física pendente.
- Os alertas ambientais continuam explicitamente inativos até a conferência das fontes técnicas originais aplicáveis.
- Não foram encontrados nomes de instituições, componentes, autores ou elementos de modelo anterior no material ativo que exijam substituição.
- Permanecem válidas as menções a datas de coleta, instrumentos de referência, autorização e hospedagem como itens a definir; elas não foram preenchidas artificialmente.

## Pendências preservadas

Esta auditoria não resolve a conferência das normas originais para parâmetros de alertas, a validação de sensores, a coleta real, a normalização formal da UNIP nem a conclusão final. Esses itens dependem de fontes externas, orientação institucional ou dados experimentais e permanecem registrados em `projeto/pendencias.md`.
