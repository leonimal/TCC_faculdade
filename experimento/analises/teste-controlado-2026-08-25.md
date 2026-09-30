# Teste controlado do motor de qualidade — 2026-08-25

O comando `npm run test:quality-analysis`, executado em `software/web/`, aprovou três casos automatizados do motor inicial de `T012`.

O caso principal utilizou uma execução artificial com cinco posições esperadas e incluiu uma medição válida duplicada na entrada, uma falha `READ_ERROR`, uma posição sem registro, uma exclusão manual auditada, um registro fora da janela, uma configuração divergente e um registro sem sincronização temporal. O motor preservou a estrutura de entrada sem alteração e produziu:

- cinco posições esperadas;
- quatro posições ocupadas por registros armazenados;
- duas posições ambientalmente válidas;
- três `MISSING_SLOT`, todas com leituras nulas;
- completude de armazenamento de 80%;
- completude de posições válidas de 40%;
- uma duplicata na entrada e um reenvio idempotente contabilizados separadamente;
- maior sequência de duas ausências;
- erro de regularidade P95 de 60 segundos;
- identidade de reconciliação satisfeita.

Os outros casos confirmaram que `MANUAL_EXCLUSION` exige motivo, autor e data e que a quantidade esperada usa a janela semiaberta aprovada. Não houve imputação. O teste ainda não processa arquivos reais de coleta nem comprova checksums no disco; por isso, `T012` permanece parcial.

