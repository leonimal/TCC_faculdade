# Registro da inspeção visual do dashboard — 2026-08-25

## Escopo

Inspeção manual da atualização automática do dashboard em ambiente local, utilizando dados artificiais produzidos pelo comando `npm run demo:dashboard`. O procedimento não utilizou o nó físico e não constitui coleta experimental das condições de uma sala de aula.

## Procedimento

1. O MySQL local e a aplicação Next.js de produção foram iniciados.
2. A página `http://127.0.0.1:3100/` foi aberta no navegador.
3. Em outro terminal, `npm run demo:dashboard` passou a publicar medições e relatórios operacionais artificiais em cadência visível.
4. A página solicitou uma nova renderização a cada cinco segundos.
5. O encerramento foi solicitado com `Enter`; o script confirmou que nenhum dado da demonstração permaneceu no MySQL.

## Observação registrada

Durante a verificação ao vivo, o autor informou que o dashboard realizou alterações conforme esperado. Foram observadas mudanças automáticas na visualização enquanto novas amostras artificiais eram enviadas, confirmando funcionalmente o mecanismo periódico no navegador no cenário local controlado.

Não foi incorporada uma captura de tela ao workspace nesta sessão. O registro textual preserva a observação comunicada pelo autor, mas a evidência visual poderá ser complementada posteriormente por capturas ou gravação.

## Resultado e limitação

A parcela de `T007` referente à atualização periódica real no navegador foi observada no ambiente local. `T007` permanece parcial porque ainda faltam o nó físico, a rede da sala e a medição ponta a ponta com o firmware, incluindo o P95 do ciclo completo leitura–dashboard.

