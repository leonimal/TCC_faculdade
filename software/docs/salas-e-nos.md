# Salas e nós de monitoramento

## Finalidade

Permitir o cadastro de salas e a associação administrativa de cada nó IoT a uma sala, para que dashboard, medições, alertas locais e exportações sejam consultados no recorte da sala selecionada.

O recurso prepara a aplicação para múltiplas salas. A avaliação metodológica vigente do TCC permanece restrita a uma sala física, como estudo de caso. Cadastros adicionais não constituem coleta, validação ou resultado experimental.

## Modelo de rastreabilidade

- O nó mantém seu identificador público imutável (`device_id`) e o envia à API como já ocorre.
- A aplicação registra a sala e a associação ativa entre sala e nó.
- No recebimento, uma medição recebe a referência da sala associada ao nó naquele instante.
- Alertas locais derivados da medição conservam a mesma referência de sala.
- Quando um nó é transferido, a associação anterior é encerrada; medições e alertas anteriores não mudam de sala.

## Requisitos funcionais

- `RF-NO-001`: permitir o cadastro protegido de no com identificador publico unico e nome visivel.
- `RF-NO-002`: listar nos cadastrados e sua sala atualmente associada, quando houver.
- `RF-NO-003`: permitir editar o nome visivel e a disponibilidade de cada no cadastrado, sem alterar seu identificador publico.

- `RF-SAL-008`: permitir consultar alertas locais por uma ou mais salas cadastradas, identificando a sala de origem de cada alerta.
- `RF-SAL-009`: permitir editar os dados de cada sala e sua associacao ativa, sem alterar o codigo da sala ou reclassificar medicoes e alertas historicos.

O mesmo identificador deve ser gravado em `TCC_DEVICE_ID` na configuracao local do firmware. O cadastro de um no nao cria medicoes, nao inicia uma execucao experimental e nao define a sua sala. A associacao a sala e feita administrativamente no momento da instalacao; por isso, uma transferencia de sala nao exige nova gravacao do firmware.

- `RF-SAL-001`: permitir cadastrar sala com código identificador, nome e informações opcionais de bloco e piso.
- `RF-SAL-002`: permitir associar uma sala a um nó ativo, registrando início, posição, altura opcional, responsável e observação.
- `RF-SAL-003`: impedir que um nó tenha duas associações ativas simultâneas.
- `RF-SAL-004`: listar as salas cadastradas e permitir abrir o painel de uma sala específica.
- `RF-SAL-005`: exibir somente medições, estado operacional e configuração do nó associado à sala na página da sala.
- `RF-SAL-006`: filtrar relatórios, CSV e alertas locais pela sala selecionada.
- `RF-SAL-007`: preservar o vínculo histórico da sala em medições e alertas já recebidos, mesmo após transferência do nó.

## Critérios de aceitação

1. Uma medição recebida de um nó com associação ativa fica disponível somente na sala associada.
2. Uma medição de nó sem sala associada permanece preservada, mas não é apresentada como dado de nenhuma sala.
3. Ao transferir um nó, novas medições ficam na nova sala e as anteriores permanecem na sala anterior.
4. Relatório, CSV e alertas de uma sala não contêm dados de outra sala.
5. Cadastros de salas não criam medições artificiais nem alteram dados experimentais existentes.

## Verificação automatizada

- Testes unitários: `npm test` cobre o contrato de cadastro de sala e o filtro `classroom_code` da consulta de medições.
- Ensaio integrado: `npm run test:classrooms` cria um nó e duas salas temporárias, associa o nó à primeira, armazena uma medição e um alerta, transfere o nó para a segunda e repete a coleta. Confere no MySQL os snapshots históricos e, pela interface HTTP, o isolamento em relatórios, CSV e alertas.
- O ensaio também exige credencial administrativa para o cadastro e confirma a remoção integral dos dados temporários. Em 01/09/2026, foi aprovado contra o MySQL local após a migração `003_add_classrooms.sql` e o seed de desenvolvimento.
