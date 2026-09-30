# Integração inicial do nó físico à API local — 2026-09-17

## Escopo

Verificação exploratória ponta a ponta do ESP32 físico, do hotspot local do Windows, da API Next.js e do MySQL local. Não é coleta experimental nem ensaio formal de completude.

## Evidências observadas

- Placa em `COM3`, identificada durante o upload como ESP32-D0WD-V3.
- Firmware `0.1.0` compilado: RAM 14,5% (47.476 de 327.680 bytes); flash 77,6% (1.017.605 de 1.310.720 bytes).
- SHA-256 do binário: `99618531487C1DC72C4A480E81DF01D3BA91664D22894F68C1F6DD882C551B1B`.
- Sensores inicializados em GPIO 32/33: `SHT31=pronto; VEML7700=pronto`.
- Nó conectado ao hotspot local com endereço `192.168.137.57`.
- Após a configuração-base de 60 s para `classroom-node-physical-01`, o monitor serial registrou `Medição confirmada: efafb21a-f21b-4816-9747-d92246bebc60`.

## Intervenções técnicas durante a preparação

Foram corrigidos: a exclusão do programa de diagnóstico da compilação principal; o excesso de memória de pilha no envio da fila; e a reconstrução do caminho de arquivos no LittleFS. Registros locais de diagnóstico com identificador anterior foram apagados, com autorização dos autores, antes da medição confirmada.

## Limitações e próximos passos

Esta evidência confirma somente uma entrega inicial. Permanecem pendentes T001–T003, a avaliação controlada de T004, estabilidade, recuperação offline, sincronização temporal e a coleta-piloto. Não usar esta confirmação isolada para afirmar exatidão, completude ou resultado ambiental.
