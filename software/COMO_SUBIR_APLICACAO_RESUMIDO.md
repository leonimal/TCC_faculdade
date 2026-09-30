# Subir a aplicação — comandos essenciais

## Primeira vez

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml up -d
cd software\web
npm install
npm run db:migrate
npm run db:seed
npm run dev -- --hostname 127.0.0.1 --port 3100
```

## Próximas vezes

**Terminal 1**

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml up -d
```

**Terminal 2**

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run dev -- --hostname 127.0.0.1 --port 3100
```

## Nova migração

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run db:migrate
```

## Abrir e verificar

```text
http://127.0.0.1:3100/
http://127.0.0.1:3100/reports
http://127.0.0.1:3100/api/v1/health?database=1
```

```powershell
Invoke-RestMethod http://127.0.0.1:3100/api/v1/health?database=1
```

## Testes principais

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm test
npm run lint
npm run build
npm run test:integration
npm run test:configuration
npm run test:device-status
npm run test:dashboard
#junto com os reports
npm run test:local-monitoring
```

## Demonstração ao vivo com faixas locais

```powershell
cd C:\Users\leonardor\Documents\TCC\software\web
npm run demo:local-monitoring
# usa a faixa configurada em /admin/local-monitoring, se houver
# pressione M para parar e limpar os dados temporários
```

## Parar

```powershell
cd C:\Users\leonardor\Documents\TCC
docker compose -f software/compose.yaml stop
```
