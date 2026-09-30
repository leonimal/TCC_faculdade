# Dados tratados

Dados derivados dos arquivos brutos por procedimentos reproduzíveis.

## Produtos previstos

- subconjunto operacional com registros, tentativas, falhas, perdas, duplicidades, reenvios e estados de qualidade;
- subconjunto ambiental principal com medições válidas, únicas, sincronizadas, dentro da janela e pertencentes a noites válidas;
- tabela de posições ausentes e sequências de lacunas;
- tabela de eventos e exclusões com justificativas;
- relatórios de reconciliação entre registros esperados, observados, válidos, inválidos e perdidos.

Os arquivos deverão registrar a versão do script e os dados brutos de origem. A análise principal não utilizará imputação. Qualquer análise de sensibilidade com dados imputados deverá ser armazenada separadamente e claramente identificada (`DEC-015`).
