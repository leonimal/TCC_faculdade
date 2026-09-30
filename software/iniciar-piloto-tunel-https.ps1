[CmdletBinding()]
param(
    [ValidatePattern('^COM\d+$')]
    [string]$Port = 'COM3',
    [switch]$Upload,
    [switch]$Encerrar,
    [switch]$PararBanco,
    [int]$StartupTimeoutSeconds = 120,
    [int]$TunnelTimeoutSeconds = 45
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$webRoot = Join-Path $PSScriptRoot 'web'
$firmwareRoot = Join-Path $projectRoot 'experimento\firmware'
$firmwareConfig = Join-Path $firmwareRoot 'include\FirmwareConfig.local.h'
$firmwarePreparation = Join-Path $firmwareRoot 'preparar-primeira-gravacao.ps1'
$sessionRoot = Join-Path $env:TEMP ('tcc-iot-piloto-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
$activeStatePath = Join-Path $env:TEMP 'tcc-iot-piloto-active.json'
$healthUri = 'http://127.0.0.1:3100/api/v1/health?database=1'

function Stop-WithMessage {
    param([string]$Message)
    throw "Piloto HTTPS não iniciado: $Message"
}

function Stop-RegisteredPilot {
    $state = $null
    if (Test-Path -LiteralPath $activeStatePath -PathType Leaf) {
        try { $state = Get-Content -LiteralPath $activeStatePath -Raw | ConvertFrom-Json }
        catch { Write-Warning 'O registro da sessão estava inválido; será ignorado.' }
    }

    $processIds = @()
    if ($state) {
        $processIds += $state.tunnelProcessId
        if ($state.applicationProcessId) { $processIds += $state.applicationProcessId }
    }
    else {
        # Compatibilidade com sessões criadas por versões anteriores do script.
        $processIds += @(Get-Process cloudflared -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Id)
    }

    foreach ($processId in ($processIds | Where-Object { $_ } | Select-Object -Unique)) {
        $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
        if ($process) {
            # /T encerra também os filhos da janela PowerShell, incluindo o
            # processo Node iniciado por npm run start.
            & taskkill.exe /PID $processId /T /F | Out-Null
            if ($LASTEXITCODE -ne 0) { throw "Não foi possível encerrar o processo $processId." }
            Write-Host "Processo encerrado: $($process.ProcessName) (PID $processId)."
        }
    }

    if (Test-Path -LiteralPath $activeStatePath -PathType Leaf) {
        Remove-Item -LiteralPath $activeStatePath -Force
    }

    if ($PararBanco) {
        & docker compose -f (Join-Path $PSScriptRoot 'compose.yaml') stop
        if ($LASTEXITCODE -ne 0) { throw 'O MySQL não pôde ser parado pelo Docker Compose.' }
        Write-Host 'MySQL parado sem remover dados ou volume persistente.'
    }
}

if ($Encerrar) {
    Stop-RegisteredPilot
    Write-Host 'Sessão encerrada. Para iniciar uma nova, execute o script sem -Encerrar.' -ForegroundColor Green
    exit 0
}

function Find-Cloudflared {
    $command = Get-Command cloudflared.exe -ErrorAction SilentlyContinue
    if ($command) { return $command.Source }

    foreach ($candidate in @(
            'C:\Program Files (x86)\cloudflared\cloudflared.exe',
            'C:\Program Files\cloudflared\cloudflared.exe'
        )) {
        if (Test-Path -LiteralPath $candidate -PathType Leaf) { return $candidate }
    }

    Stop-WithMessage 'cloudflared não foi encontrado. Instale-o uma vez com: winget install --id Cloudflare.cloudflared --exact --source winget'
}

function Test-ApplicationHealth {
    try {
        $health = Invoke-RestMethod -Uri $healthUri -TimeoutSec 5
        $databaseStatus = if ($health.PSObject.Properties.Name -contains 'checks') {
            $health.checks.database
        }
        else {
            # Compatibilidade com o formato inicial da rota de saúde.
            $health.database
        }
        return $health.status -eq 'ok' -and $databaseStatus -eq 'reachable'
    }
    catch {
        return $false
    }
}

function Wait-ForApplicationHealth {
    $deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        if (Test-ApplicationHealth) { return }
        Start-Sleep -Seconds 2
    }
    Stop-WithMessage "a aplicação não respondeu com banco acessível em $healthUri em $StartupTimeoutSeconds segundos. Consulte a janela 'TCC - Aplicacao local'."
}

function Wait-ForDatabase {
    $deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        $health = (& docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' 'tcc-iot-mysql' 2>$null).Trim()
        if ($health -eq 'healthy') { return }
        if ($health -eq 'unhealthy' -or $health -eq 'exited') {
            Stop-WithMessage "o contêiner MySQL está $health. Execute 'docker compose -f software/compose.yaml logs mysql' para diagnosticar."
        }
        Start-Sleep -Seconds 2
    }
    Stop-WithMessage "o MySQL não ficou saudável em $StartupTimeoutSeconds segundos. Verifique o Docker Desktop."
}

function Set-FirmwareTunnelUrl {
    param([string]$TunnelUrl)

    if (-not (Test-Path -LiteralPath $firmwareConfig -PathType Leaf)) {
        Stop-WithMessage 'FirmwareConfig.local.h não foi encontrado. Crie-o a partir do arquivo de exemplo antes de iniciar.'
    }

    $apiUrl = $TunnelUrl.TrimEnd('/') + '/api/v1'
    $source = [System.IO.File]::ReadAllText($firmwareConfig)
    $pattern = '(?m)^\s*#define\s+TCC_API_BASE_URL\s+"[^"]*"\s*$'
    $replacement = '#define TCC_API_BASE_URL "' + $apiUrl + '"'
    $matches = [regex]::Matches($source, $pattern)
    if ($matches.Count -ne 1) {
        Stop-WithMessage 'TCC_API_BASE_URL deve aparecer exatamente uma vez em FirmwareConfig.local.h; o arquivo não foi alterado.'
    }

    $updated = [regex]::Replace($source, $pattern, $replacement)
    [System.IO.File]::WriteAllText($firmwareConfig, $updated, [System.Text.UTF8Encoding]::new($false))
    return $apiUrl
}

foreach ($requiredFile in @(
        (Join-Path $PSScriptRoot 'compose.yaml'),
        (Join-Path $webRoot '.env.local'),
        (Join-Path $PSScriptRoot 'database\.env.local'),
        (Join-Path $PSScriptRoot 'database\mysql.env.local'),
        $firmwareConfig
    )) {
    if (-not (Test-Path -LiteralPath $requiredFile -PathType Leaf)) {
        Stop-WithMessage "arquivo local obrigatório ausente: $requiredFile"
    }
}

$activePilotState = $null
if (Test-Path -LiteralPath $activeStatePath -PathType Leaf) {
    try { $activePilotState = Get-Content -LiteralPath $activeStatePath -Raw | ConvertFrom-Json }
    catch { Stop-WithMessage 'o registro da sessão ativa está inválido. Encerre a sessão com -Encerrar e inicie uma nova.' }
}

# Permite fazer o upload como uma segunda etapa sem criar outro Quick Tunnel.
if ($Upload -and $activePilotState) {
    $activeTunnel = Get-Process -Id $activePilotState.tunnelProcessId -ErrorAction SilentlyContinue
    $activeTunnelUrl = [string]$activePilotState.tunnelUrl
    if (-not $activeTunnel -or $activeTunnel.ProcessName -ne 'cloudflared' -or $activeTunnelUrl -notmatch '^https://[a-z0-9-]+\.trycloudflare\.com$') {
        Stop-WithMessage 'a sessão registrada não possui um túnel ativo válido. Encerre-a com -Encerrar e inicie uma nova.'
    }
    if (-not (Test-ApplicationHealth)) {
        Stop-WithMessage 'a aplicação local não está saudável. Não grave o ESP32 até restaurar a API e o banco.'
    }

    $firmwareApiUrl = Set-FirmwareTunnelUrl -TunnelUrl $activeTunnelUrl
    Write-Host 'Reutilizando o túnel HTTPS já ativo.' -ForegroundColor Green
    Write-Host "URL no firmware: $firmwareApiUrl"
    Write-Host "Compilando e gravando o ESP32 em $Port..."
    Push-Location $firmwareRoot
    try {
        & powershell.exe -ExecutionPolicy Bypass -File $firmwarePreparation -Upload -Port $Port
        if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'a compilação ou a gravação do ESP32 falhou.' }
    }
    finally {
        Pop-Location
    }

    $monitorCommand = "`$host.UI.RawUI.WindowTitle = 'TCC - Monitor serial $Port'; Set-Location -LiteralPath '$firmwareRoot'; python -m platformio device monitor --port $Port --baud 115200"
    Start-Process -FilePath 'powershell.exe' -ArgumentList '-NoExit', '-Command', $monitorCommand | Out-Null
    Write-Host "Monitor serial aberto em uma nova janela ($Port, 115200 bps)."
    exit 0
}

if (Get-Process cloudflared -ErrorAction SilentlyContinue) {
    Stop-WithMessage 'já existe um cloudflared em execução. Encerre o túnel anterior antes de criar uma nova URL temporária.'
}

$cloudflared = Find-Cloudflared
New-Item -ItemType Directory -Path $sessionRoot -Force | Out-Null

Write-Host 'Iniciando MySQL local...'
& docker compose -f (Join-Path $PSScriptRoot 'compose.yaml') up -d
if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'Docker Compose falhou. Abra o Docker Desktop e aguarde a engine ficar ativa.' }
Write-Host 'Aguardando o MySQL ficar saudável...'
Wait-ForDatabase

if (-not (Test-ApplicationHealth)) {
    Write-Host 'Aplicando migrações e gerando a versão de produção...'
    Push-Location $webRoot
    try {
        & npm.cmd run db:migrate
        if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'as migrações falharam.' }
        & npm.cmd run build
        if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'o build da aplicação falhou.' }
    }
    finally {
        Pop-Location
    }

    $applicationCommand = "`$host.UI.RawUI.WindowTitle = 'TCC - Aplicacao local'; Set-Location -LiteralPath '$webRoot'; npm.cmd run start -- --hostname 127.0.0.1 --port 3100"
    $applicationProcess = Start-Process -FilePath 'powershell.exe' -ArgumentList '-NoExit', '-Command', $applicationCommand -PassThru
    Write-Host 'Aguardando a API local responder...'
    Wait-ForApplicationHealth
}
else {
    Write-Host 'A aplicação local já está saudável; ela será reutilizada.'
}

$tunnelLog = Join-Path $sessionRoot 'cloudflared.log'
$tunnelErrorLog = Join-Path $sessionRoot 'cloudflared-error.log'
Write-Host 'Criando o Quick Tunnel HTTPS...'
$tunnelProcess = Start-Process -FilePath $cloudflared -ArgumentList 'tunnel', '--url', 'http://127.0.0.1:3100', '--no-autoupdate' -RedirectStandardOutput $tunnelLog -RedirectStandardError $tunnelErrorLog -PassThru

$deadline = (Get-Date).AddSeconds($TunnelTimeoutSeconds)
$tunnelUrl = $null
while ((Get-Date) -lt $deadline -and -not $tunnelUrl) {
    if ($tunnelProcess.HasExited) {
        Stop-WithMessage "cloudflared foi encerrado ao iniciar. Consulte: $tunnelErrorLog"
    }
    # Get-Content -Raw retorna $null enquanto o arquivo acabou de ser criado e
    # ainda está vazio; Regex.Match exige uma string não nula.
    $standardOutput = if (Test-Path -LiteralPath $tunnelLog) { [string](Get-Content -LiteralPath $tunnelLog -Raw) } else { '' }
    $standardError = if (Test-Path -LiteralPath $tunnelErrorLog) { [string](Get-Content -LiteralPath $tunnelErrorLog -Raw) } else { '' }
    $logText = $standardOutput + [Environment]::NewLine + $standardError
    $match = [regex]::Match($logText, 'https://[a-z0-9-]+\.trycloudflare\.com', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    if ($match.Success) { $tunnelUrl = $match.Value }
    if (-not $tunnelUrl) { Start-Sleep -Milliseconds 500 }
}

if (-not $tunnelUrl) {
    Stop-WithMessage "a URL do túnel não apareceu em $TunnelTimeoutSeconds segundos. Consulte: $tunnelErrorLog"
}

$firmwareApiUrl = Set-FirmwareTunnelUrl -TunnelUrl $tunnelUrl

[pscustomobject]@{
    tunnelProcessId = $tunnelProcess.Id
    applicationProcessId = if ($applicationProcess) { $applicationProcess.Id } else { $null }
    tunnelUrl = $tunnelUrl
    sessionRoot = $sessionRoot
    startedAt = (Get-Date).ToString('o')
} | ConvertTo-Json | Set-Content -LiteralPath $activeStatePath -Encoding utf8

Write-Host ''
Write-Host 'Piloto HTTPS preparado.' -ForegroundColor Green
Write-Host "URL pública:     $tunnelUrl"
Write-Host "URL no firmware:  $firmwareApiUrl"
Write-Host "PID do túnel:      $($tunnelProcess.Id)"
Write-Host "Log do túnel:     $tunnelErrorLog"
Write-Host 'Apenas TCC_API_BASE_URL foi atualizada; Wi-Fi, chave do nó, identificador e GPIOs foram preservados.'

if ($Upload) {
    Write-Host "Compilando e gravando o ESP32 em $Port..."
    Push-Location $firmwareRoot
    try {
        & powershell.exe -ExecutionPolicy Bypass -File $firmwarePreparation -Upload -Port $Port
        if ($LASTEXITCODE -ne 0) { Stop-WithMessage 'a compilação ou a gravação do ESP32 falhou.' }
    }
    finally {
        Pop-Location
    }

    $monitorCommand = "`$host.UI.RawUI.WindowTitle = 'TCC - Monitor serial $Port'; Set-Location -LiteralPath '$firmwareRoot'; python -m platformio device monitor --port $Port --baud 115200"
    Start-Process -FilePath 'powershell.exe' -ArgumentList '-NoExit', '-Command', $monitorCommand | Out-Null
    Write-Host "Monitor serial aberto em uma nova janela ($Port, 115200 bps)."
}
else {
    Write-Host "Para gravar e abrir o monitor serial nesta mesma sessão, execute novamente com -Upload -Port $Port."
}

Write-Host 'Para encerrar esta sessão: execute este script com -Encerrar (use também -PararBanco para parar o MySQL).'
