# Documentação técnica

Contratos da API, diagramas, decisões arquiteturais e instruções de execução.

## Requisito de configuração temporal

`RF-CONF-001` — O sistema deverá permitir que um usuário administrativo configure pelo software o intervalo único de leitura e transmissão do nó entre 10 e 300 segundos. O valor padrão inicial será de 60 segundos. O valor deverá ser validado, persistido, exibido e auditado, e permanecerá inalterado durante cada execução experimental válida (`DEC-012`).

## Requisitos de operação offline

`RF-OFF-001` — O nó deverá continuar adquirindo medições durante indisponibilidade de comunicação e armazenar até 256 registros não confirmados em uma fila local persistente.

`RF-OFF-002` — O nó deverá remover um registro da fila somente após confirmação da API de que ele foi armazenado ou já existia.

`RF-OFF-003` — Após a reconexão, o nó deverá reenviar os registros do mais antigo para o mais recente, mantendo identificadores únicos e sem gerar duplicatas no banco.

`RNF-OFF-001` — O sistema deverá sinalizar ocupação igual ou superior a 80% e contabilizar explicitamente toda medição que não puder ser enfileirada após o limite de 256 registros (`DEC-013`).

`RF-OFF-004` — O nó deverá informar à API o estado da conexão, a versão do firmware, a ocupação e capacidade da fila, o total acumulado de perdas, o último envio confirmado e o estado de sincronização temporal.

## Requisitos de desempenho, integridade e tempo

`RNF-DES-001` — Em teste nominal com pelo menos 100 requisições, a API deverá apresentar latência interna P95 de até 500 ms e não produzir erros 5xx.

`RNF-LAT-001` — Durante operação online, a latência P95 entre leitura e recebimento pela API deverá ser de até 5 segundos, e a latência P95 entre leitura e exibição no dashboard deverá ser de até 10 segundos.

`RF-DAD-001` — Cada identificador único deverá corresponder a exatamente um registro no banco, e os valores, unidades, timestamps e versão de configuração auditados deverão permanecer integralmente consistentes entre API, banco e aplicação.

`RF-TEM-001` — Todo registro deverá indicar o estado de sincronização temporal. Quando marcado como sincronizado, o instante do nó deverá diferir no máximo 2 segundos do relógio de referência; registros sem sincronização confiável deverão permanecer identificados como tal (`DEC-014`).

## Requisitos de qualidade e rastreabilidade dos dados

`RF-QUAL-001` — O sistema deverá preservar os estados de qualidade e os eventos necessários para distinguir medições válidas, falhas de leitura, falhas de CRC, valores fora da faixa, registros sem sincronização, duplicatas, perdas por fila cheia, registros fora da janela, divergências de configuração e exclusões manuais.

`RF-QUAL-002` — Uma medição reenviada após indisponibilidade continuará elegível para análise quando conservar o instante original sincronizado, possuir valores válidos e identificador único.

`RNF-REP-001` — O tratamento deverá ser reproduzível a partir dos dados brutos imutáveis, por scripts versionados, sem imputação de ausências na análise principal.

`RF-AUD-001` — Toda exclusão manual deverá registrar motivo, autor e data, sem remover fisicamente o registro original (`DEC-015`).
