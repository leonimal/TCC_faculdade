# Dados brutos

Arquivos originais de coleta. Não editar, sobrescrever ou corrigir manualmente após a aquisição.

## Regras

- Preservar o arquivo exatamente como produzido pela fonte.
- Não remover duplicatas, erros, valores incomuns ou registros fora da janela neste diretório.
- Registrar a origem, a execução, o dispositivo e o instante de obtenção de cada arquivo.
- Calcular e guardar checksum quando o fluxo de coleta for implementado, permitindo demonstrar que o arquivo não foi alterado.
- Realizar toda classificação, exclusão analítica ou correção reproduzível em `experimento/dados-tratados/`, por scripts de `experimento/analises/` (`DEC-015`).
