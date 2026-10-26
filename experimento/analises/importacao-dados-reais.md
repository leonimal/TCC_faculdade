# Especificação para importação de dados reais

O arquivo original exportado pela API deve ser copiado sem edição para `experimento/dados-brutos/`. O pipeline derivado deverá receber o arquivo, calcular SHA-256, registrar data de processamento e produzir resultados em diretório novo sob `experimento/dados-tratados/`.

Antes de implementar o adaptador final, confirmar no CSV/JSON real os campos: identificador da medição, dispositivo, inicialização, sequência, instante, sincronização temporal, versão de configuração, três leituras e seus estados. O adaptador não poderá corrigir, descartar ou sobrescrever registros do arquivo bruto.

Produtos obrigatórios: manifesto com checksum; subconjunto operacional; `MISSING_SLOT`; reconciliação; e relatório de parâmetros. Todos devem identificar o arquivo bruto de origem e a versão do script. Medições físicas prévias, se apresentadas, permanecerão em produto separado e identificado por sua limitação de rastreabilidade.
