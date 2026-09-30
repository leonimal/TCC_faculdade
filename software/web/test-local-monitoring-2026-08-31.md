# Ensaio integrado de faixas locais — 2026-08-31

## Objetivo

Verificar, em ambiente local controlado, a criação versionada de uma faixa local, a geração de alertas locais pela API, a persistência no MySQL, a apresentação em página exclusiva e os bloqueios de segurança previstos na `DEC-019`, na `DEC-020` e no teste `T008`.

## Ambiente

- MySQL 8.4.11 em Docker Compose local, contêiner `tcc-iot-mysql` saudável;
- aplicação Next.js de produção em `127.0.0.1:3100`;
- migração `002_add_local_monitoring_history` aplicada antes do ensaio;
- dados artificiais identificados por `local-monitoring-integration-test` e UUIDs exclusivos, removidos ao final.

## Casos executados

1. `PATCH` sem credencial administrativa: resposta `401`.
2. Faixa com limites invertidos: resposta `422`.
3. Criação de faixa local de temperatura entre 20 e 28 °C: resposta `201` e versão registrada.
4. Três medições válidas e sincronizadas: 19,5 °C, 20,0 °C e 28,5 °C.
5. Consulta ao MySQL e ao relatório do dia.
6. Desabilitação explícita do perfil seguida de medição de 19,0 °C.
7. Criação controlada de execução experimental ativa e tentativa de alterar o perfil.

## Resultado observado

O script `npm run test:local-monitoring` foi concluído com êxito. Foram registrados exatamente dois alertas locais: um `BELOW` para 19,5 °C e um `ABOVE` para 28,5 °C. A leitura de 20,0 °C, exatamente no limite inferior, não gerou alerta. Cada registro preservou o valor, os limites de 20 e 28 °C, a versão da faixa e o identificador da medição. A página `/alerts` exibiu horário, direção e histórico dos dois alertas com destaque avermelhado suave, sem misturá-los ao relatório de medições.

Com o perfil desabilitado, a medição de 19,0 °C não gerou alerta. A alteração tentada durante execução ativa recebeu `409 ACTIVE_RUN_LOCK`. A rotina de limpeza confirmou a remoção de todas as medições, alertas, perfis, regras, tentativas e execução temporários.

Após a criação da interface administrativa, a página `/admin/local-monitoring` também foi carregada localmente com sucesso. A verificação confirmou a presença dos controles de acesso e configuração e a ausência de token de autorização no HTML entregue. ESLint e build de produção foram aprovados; a execução repetida de `npm run test:local-monitoring` manteve todos os casos aprovados e a limpeza integral.

## Limitações

O ensaio comprova somente o comportamento local controlado de software e banco de dados. As faixas usadas são artificiais, não constituem parâmetros normativos, de conforto ou de conformidade e não são resultados da sala da UNIP. A validação com firmware físico, rede da sala e uso administrativo real permanece futura.
