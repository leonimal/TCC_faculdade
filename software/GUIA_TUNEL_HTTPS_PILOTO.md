# Guia curto: túnel HTTPS gratuito para o piloto

Use este roteiro somente para teste e coleta-piloto. Ele publica **apenas** a aplicação local por um Quick Tunnel temporário; MySQL continua local. A URL muda quando o túnel é encerrado, portanto o firmware precisa ser gravado novamente a cada nova sessão.

## Antes da primeira vez

1. Abra o Docker Desktop e aguarde a engine ficar ativa.
2. Instale o cliente do túnel uma única vez:

```powershell
winget install --id Cloudflare.cloudflared --exact --source winget
```

3. Confirme que os arquivos locais já existem. **Não os copie nem publique de novo**, pois contêm segredos:

```text
software\web\.env.local
software\database\.env.local
software\database\mysql.env.local
experimento\firmware\include\FirmwareConfig.local.h
```

## Em toda nova sessão

### Opção automatizada (recomendada)

No PowerShell, execute a partir da raiz do projeto:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\leonardor\Documents\TCC\software\iniciar-piloto-tunel-https.ps1
```

O script inicia o MySQL, aplica as migrações, gera e abre a aplicação local quando necessário, confirma a saúde com o banco, cria o Quick Tunnel e mostra a URL HTTPS. Ele altera somente `TCC_API_BASE_URL` em `FirmwareConfig.local.h`; SSID, senha, chave do nó, identificador e GPIOs permanecem intactos. O processo do túnel fica ativo em segundo plano e o script informa o PID e o caminho do log.

Com o ESP32 conectado, para também compilar, gravar e abrir o monitor serial em `COM3`:

```powershell
powershell -ExecutionPolicy Bypass -File C:\Users\leonardor\Documents\TCC\software\iniciar-piloto-tunel-https.ps1 -Upload -Port COM3
```

Se o túnel já foi criado pelo comando anterior, esse segundo comando reutiliza a mesma URL e apenas grava/monitora o ESP32; ele não cria outro túnel. Assim, é seguro separar a abertura do túnel da conexão física da placa.

Antes de executar novamente, encerre o túnel anterior com o PID informado (por exemplo, `Stop-Process -Id 1234`). O script não encerra processos existentes automaticamente para evitar interromper uma coleta em curso. Depois da gravação, confirme no monitor as mensagens de Wi-Fi, DNS público, relógio sincronizado e medição confirmada. O roteiro manual abaixo continua disponível para diagnóstico.

Para encerrar a sessão criada pelo script, incluindo o túnel e a janela da aplicação que ele abriu:

```powershell
powershell -ExecutionPolicy Bypass -File .\software\iniciar-piloto-tunel-https.ps1 -Encerrar
```

Para encerrar também o MySQL, sem apagar o volume ou os dados:

```powershell
powershell -ExecutionPolicy Bypass -File .\software\iniciar-piloto-tunel-https.ps1 -Encerrar -PararBanco
```

O Monitor Serial permanece uma janela interativa: encerre-o com `Ctrl+C` antes de encerrar a sessão. Execute o inicializador novamente somente depois do encerramento; cada novo Quick Tunnel gera uma URL e exige nova gravação do firmware.

Abra três terminais PowerShell.

### 1. Banco e aplicação local

No **Terminal 1**:

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml up -d
cd software\web
npm run db:migrate
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Deixe esse terminal aberto. Em outro terminal, confirme antes de continuar:

```powershell
Invoke-RestMethod http://127.0.0.1:3100/api/v1/health?database=1
```

O resultado deve conter `status: ok` e `database: reachable`.

### 2. Criar o endereço HTTPS temporário

No **Terminal 2**:

```powershell
& 'C:\Program Files (x86)\cloudflared\cloudflared.exe' tunnel --url http://127.0.0.1:3100
```

Copie a URL mostrada, semelhante a:

```text
https://palavras-aleatorias.trycloudflare.com
```

Deixe esse terminal aberto. Não exponha `3306`, não mude o endereço local para `0.0.0.0` e não faça redirecionamento de porta no roteador.

### 3. Atualizar somente a URL no firmware

Abra `experimento\firmware\include\FirmwareConfig.local.h` e altere **somente** esta linha para a URL recém-gerada:

```cpp
#define TCC_API_BASE_URL "https://palavras-aleatorias.trycloudflare.com/api/v1"
```

Não altere `TCC_NODE_API_KEY`. Ela deve continuar igual ao `NODE_API_KEY` de `software\web\.env.local` e nunca deve aparecer em capturas ou documentos. Também não altere `TCC_DEVICE_ID`, GPIOs ou endereço I2C sem motivo técnico.

Se o nó for usar outro hotspot, atualize somente quando necessário:

```cpp
#define TCC_WIFI_SSID "nome-do-hotspot"
#define TCC_WIFI_PASSWORD "senha-do-hotspot"
```

O firmware atual já inclui validação do certificado HTTPS e DNS público após DHCP. Nunca adicione `setInsecure()` para contornar um erro TLS.

### 4. Gravar e verificar o ESP32

Feche o Monitor Serial do Arduino IDE caso esteja aberto. Com a placa conectada, confirme a porta:

```powershell
cmd /c mode COM3
```

No **Terminal 3**:

```powershell
cd C:\Users\leonardor\Documents\TCC\experimento\firmware
powershell -ExecutionPolicy Bypass -File .\preparar-primeira-gravacao.ps1 -Upload -Port COM3
python -m platformio device monitor --port COM3 --baud 115200
```

O monitor deve mostrar, nesta ordem aproximada:

```text
Wi-Fi conectado: ...
Public DNS configured: 1.1.1.1, 8.8.8.8
Relógio sincronizado ...
Medição confirmada: ...
```

`DNS Failed` indica falha do hotspot na resolução de nomes. Se a resolução funcionar, mas houver erro TLS, não desative a validação: encerre o ensaio e confira se o certificado público do túnel mudou.

## Para a noite-piloto

Antes de iniciar, associe o nó à sala correta no sistema e registre horário de início, fim, hotspot usado, intervalo configurado e falhas. O teste já feito no hotspot do Windows não substitui o piloto com o hotspot do celular na faculdade.

## Encerrar

1. Pressione `Ctrl+C` no monitor serial.
2. Pressione `Ctrl+C` no terminal do túnel; a URL deixa de valer.
3. Pressione `Ctrl+C` no terminal da aplicação.
4. Desconecte o ESP32 para ele não encher a fila local com leituras de teste.
5. Opcionalmente, pare o banco sem apagar dados:

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml stop
```

Não use `docker compose down -v`: isso pode remover o volume persistente do banco.
