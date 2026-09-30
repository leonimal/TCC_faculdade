# Análises

Scripts e instruções para validação, métricas, tabelas e gráficos.

## Responsabilidades dos scripts

1. ler os dados brutos sem modificá-los;
2. validar esquema, unidades, identificadores, timestamps e faixas físicas;
3. classificar registros conforme os estados definidos na `DEC-015`;
4. construir a grade temporal e identificar posições ausentes;
5. deduplicar apenas nos produtos derivados, preservando a contagem operacional;
6. gerar separadamente os subconjuntos operacional e ambiental principal;
7. calcular métricas, lacunas, exclusões e reconciliação das contagens;
8. produzir gráficos com lacunas explícitas, sem imputação na análise principal; e
9. registrar versão, parâmetros, entradas e saídas de cada execução.

## Motor inicial implementado

`quality-analysis.mjs` implementa uma função pura para analisar uma execução formalmente delimitada. Ela usa a janela semiaberta, calcula a quantidade esperada pela fórmula aprovada, classifica cada registro canônico em uma categoria primária, preserva duplicatas no subconjunto operacional, constrói `MISSING_SLOT` sem valores imputados e reconcilia entrada, registros canônicos e classificações.

São calculadas separadamente a completude de posições ocupadas por registros armazenados e a completude de posições ambientalmente válidas. A regularidade usa o erro absoluto entre intervalos observados consecutivos e o intervalo configurado, com P95 pelo método do posto mais próximo. Quando necessário, uma medição sincronizada é associada ao instante esperado mais próximo; colisões de posição permanecem explícitas no produto derivado.

Verificação local:

```text
cd software/web
npm run test:quality-analysis
```

O teste controlado está documentado em [teste-controlado-2026-08-25.md](./teste-controlado-2026-08-25.md). A leitura e escrita dos arquivos reais, os checksums e a geração definitiva dos dois subconjuntos ainda serão acrescentados antes da coleta.
