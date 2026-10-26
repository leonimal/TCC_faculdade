# Diário de coleta — sessão formal de 8 h

| Campo | Registro |
| --- | --- |
| Tipo de execução | Sessão formal de 8 h |
| `run_id` | `4719d5b0-9425-4de0-a57c-5f5a39bd80ec` |
| Data | 20/10/2026 |
| Sala/local | workroom |
| Local e conectividade | Nó e servidor na mesma rede do hotspot local; API em `192.168.137.1:3100` |
| Responsável | Leonardo |
| Dispositivo e firmware | `classroom-node-physical-01`, firmware 0.1.2 |
| Intervalo e versão de configuração | 60 s, versão 4 aplicada |
| Início efetivo / término efetivo | 20/10/2026 08:25:44 / 20/10/2026 17:12:30 |
| Posição, altura e orientação dos sensores | A preencher |
| Instrumento de referência | Indisponível; avaliação funcional |

## Eventos

| Horário | Categoria | Descrição objetiva | Ação adotada | Registros possivelmente afetados | Impacto na validade |
| --- | --- | --- | --- | --- | --- |
| Antes do início efetivo | energia | O nó foi conectado a uma nova fonte de energia. | Inicialização e conectividade verificadas antes da ativação da sessão. | Nenhum da janela formal. | Sem impacto, pois a troca ocorreu antes do início efetivo. |
| Antes do início efetivo | preparação | Havia 11 registros associados ao novo `run_id` produzidos antes da primeira medição sincronizada que delimitou a janela formal. | Registros preservados; serão excluídos da apuração temporal da sessão pela janela iniciada às 08:25:44. | 11. | Sem impacto na validade, desde que permaneçam fora da janela analítica. |
| 08:25:44 | início | Primeira medição sincronizada do novo `run_id` foi persistida; nó `ONLINE`, fila `0/256`. | Início efetivo registrado diretamente a partir da medição persistida. | Nenhum. | Início da janela formal. |

## Encerramento

- Janela efetiva: 8 h 46 min 46 s.
- Execução: `COMPLETED`.
- Apuração da janela temporal: 527 registros esperados; 526 armazenados (99,810% de completude); todos sincronizados e plenamente válidos.
- Regularidade: P95 do erro absoluto de intervalo de 0 s; latência até a API com P95 de 2,606 s.
- Fila: maior profundidade telemetrizada de 0/256; o contador de perdas permaneceu em 1, valor já existente antes desta sessão, sem nova perda observada.
- Integridade: não houve identificador duplicado persistido; a chave primária do banco preserva a unicidade das medições.
- A sessão atende aos critérios operacionais definidos no protocolo, condicionada à preservação dos registros e à análise reproduzível posterior.
