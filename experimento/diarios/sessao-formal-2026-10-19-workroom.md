# Diário de coleta — sessão formal de 8 h

| Campo | Registro |
| --- | --- |
| Tipo de execução | Sessão formal de 8 h |
| `run_id` | `98d1dd84-49ae-41c5-aa46-28ba98f7fd78` |
| Data | 19/10/2026 |
| Sala/local | workroom |
| Local e conectividade | Nó e servidor na mesma rede do hotspot local (`192.168.137.0/24`); API em `192.168.137.1:3100` |
| Responsável | Leonardo |
| Dispositivo e firmware | `classroom-node-physical-01`, firmware 0.1.2 |
| Intervalo e versão de configuração | 60 s, versão 4 aplicada |
| Início efetivo / término efetivo | 19/10/2026 09:01:06 / 19/10/2026 18:10:16 |
| Posição, altura e orientação dos sensores | A preencher |
| Instrumento de referência | Indisponível; avaliação funcional |

## Eventos

| Horário | Categoria | Descrição objetiva | Ação adotada | Registros possivelmente afetados | Impacto na validade |
| --- | --- | --- | --- | --- | --- |
| Antes do início formal | conectividade | Quick Tunnel não publicou nome resolvível nos DNS públicos. | API configurada diretamente na rede local do hotspot. | Nenhum da sessão formal. | Sem impacto, pois a rota local foi validada antes do `run_id`. |
| Antes do início formal | energia | Reinicializações por brownout observadas na porta USB anterior. | Nó transferido para alimentação estável; boot posterior confirmado. | Nenhum da sessão formal. | Sem impacto, pois ocorreu antes do `run_id`. |
| 08:52:52 | relógio | Primeira aquisição com `run_id` chegou durante a sincronização inicial e foi marcada `UNSYNCED`. | Registro preservado; relógio sincronizado pela API local antes das aquisições seguintes. | 1. | Não invalida isoladamente; acompanhar percentual sincronizado. |
| 08:55 aprox. | intervenção | Abertura do monitor serial reinicializou o nó durante a confirmação inicial. | Monitor serial encerrado; acompanhamento posterior somente pelo banco. | Até 1 aquisição. | Evento preservado; acompanhar completude e sincronização. |
| 09:00 aprox. | energia | Alimentação transferida do PC para tomada; o nó reiniciou e gerou novo `boot_id`. | Reconexão verificada somente pelo banco. | 1 leitura `UNSYNCED` às 09:00:29. | A leitura seguinte, às 09:01:06, foi `SYNCED`, válida e persistida; fila 0/256, sem perda nova. |

## Encerramento

- Janela efetiva: 9 h 09 min, de 09:01:06 a 18:10:16.
- Execução: `COMPLETED`.
- Os seis registros anteriores a 09:01:06 foram preservados e marcados como `OUTSIDE_WINDOW`, por pertencerem à preparação e à transição de alimentação.
