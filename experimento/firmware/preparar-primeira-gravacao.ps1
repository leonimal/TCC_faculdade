[CmdletBinding()]
param(
    [string]$Port,
    [switch]$Upload,
    [switch]$Monitor
)

$ErrorActionPreference = 'Stop'

function Stop-WithMessage {
    param([string]$Message)
    throw "Configuração do firmware inválida: $Message"
}

function Get-QuotedMacro {
    param(
        [string]$Source,
        [string]$Name
    )

    $escapedName = [regex]::Escape($Name)
    $pattern = '(?m)^\s*#define\s+' + $escapedName + '\s+"([^"]*)"'
    $match = [regex]::Match($Source, $pattern)
    if (-not $match.Success) {
        Stop-WithMessage "a macro $Name não foi encontrada como texto entre aspas em FirmwareConfig.local.h."
    }

    return $match.Groups[1].Value.Trim()
}

function Get-IntegerMacro {
    param(
        [string]$Source,
        [string]$Name
    )

    $escapedName = [regex]::Escape($Name)
    $match = [regex]::Match($Source, "(?m)^\s*#define\s+$escapedName\s+(-?\d+)\b")
    if (-not $match.Success) {
        Stop-WithMessage "a macro $Name não foi encontrada como número inteiro em FirmwareConfig.local.h."
    }

    return [int]$match.Groups[1].Value
}

function Get-AddressMacro {
    param(
        [string]$Source,
        [string]$Name
    )

    $escapedName = [regex]::Escape($Name)
    $match = [regex]::Match($Source, "(?m)^\s*#define\s+$escapedName\s+(0x[0-9a-fA-F]+|\d+)\b")
    if (-not $match.Success) {
        Stop-WithMessage "a macro $Name não foi encontrada em FirmwareConfig.local.h."
    }

    $value = $match.Groups[1].Value
    if ($value.StartsWith('0x', [System.StringComparison]::OrdinalIgnoreCase)) {
        return [Convert]::ToInt32($value.Substring(2), 16)
    }

    return [Convert]::ToInt32($value, 10)
}

if ($Monitor -and -not $Upload) {
    Stop-WithMessage 'use -Monitor junto com -Upload para que o monitor serial abra somente após uma gravação concluída.'
}

if (($Upload -or $Monitor) -and [string]::IsNullOrWhiteSpace($Port)) {
    Stop-WithMessage 'informe a porta serial, por exemplo -Port COM5.'
}

if (-not [string]::IsNullOrWhiteSpace($Port) -and $Port -notmatch '^COM\d+$') {
    Stop-WithMessage 'a porta deve ter o formato COMx, por exemplo COM5.'
}

$configPath = Join-Path $PSScriptRoot 'include\FirmwareConfig.local.h'
if (-not (Test-Path -LiteralPath $configPath -PathType Leaf)) {
    Stop-WithMessage 'crie include/FirmwareConfig.local.h a partir de include/FirmwareConfig.local.h.example antes de continuar.'
}

$config = Get-Content -LiteralPath $configPath -Raw
$ssid = Get-QuotedMacro $config 'TCC_WIFI_SSID'
$password = Get-QuotedMacro $config 'TCC_WIFI_PASSWORD'
$apiBaseUrl = Get-QuotedMacro $config 'TCC_API_BASE_URL'
$nodeApiKey = Get-QuotedMacro $config 'TCC_NODE_API_KEY'
$deviceId = Get-QuotedMacro $config 'TCC_DEVICE_ID'
$sdaPin = Get-IntegerMacro $config 'TCC_I2C_SDA_PIN'
$sclPin = Get-IntegerMacro $config 'TCC_I2C_SCL_PIN'
$sht31Address = Get-AddressMacro $config 'TCC_SHT31_ADDRESS'

$secretLikeValues = @($ssid, $password, $nodeApiKey)
if ($secretLikeValues | Where-Object {
        [string]::IsNullOrWhiteSpace($_) -or $_ -match 'ALTERAR_ANTES_DE_USAR|nome-da-rede|senha-da-rede|NODE_API_KEY'
    }) {
    Stop-WithMessage 'SSID, senha Wi-Fi e chave do nó precisam ser preenchidos no arquivo local. Seus valores não serão exibidos por este script.'
}

try {
    $apiUri = [Uri]$apiBaseUrl
}
catch {
    Stop-WithMessage 'TCC_API_BASE_URL precisa ser uma URL HTTP(S) válida.'
}

if ($apiUri.Scheme -notin @('http', 'https') -or $apiUri.Host -in @('localhost', '127.0.0.1', '::1')) {
    Stop-WithMessage 'TCC_API_BASE_URL deve apontar para o IP LAN ou domínio do servidor; localhost aponta para o próprio ESP32.'
}

if ($deviceId -notmatch '^[A-Za-z0-9_-]{3,64}$') {
    Stop-WithMessage 'TCC_DEVICE_ID deve ter de 3 a 64 caracteres usando apenas letras, números, hífen ou sublinhado.'
}

if ($sdaPin -lt 0 -or $sclPin -lt 0 -or $sdaPin -eq $sclPin) {
    Stop-WithMessage 'os GPIOs I2C SDA e SCL precisam ser números distintos e confirmados pela serigrafia da placa recebida.'
}

if ($sht31Address -notin @(0x44, 0x45)) {
    Stop-WithMessage 'o endereço do SHT31 deve ser 0x44 ou 0x45, conforme a seleção física do módulo.'
}

Write-Host 'Configuração local verificada. Nenhum segredo foi exibido.'
Write-Host 'Compilando o firmware para esp32dev (ESP32-WROOM-32)...'
& python -m platformio run
if ($LASTEXITCODE -ne 0) {
    throw "A compilação falhou (PlatformIO exit code $LASTEXITCODE). Corrija o erro antes de conectar para coleta."
}

if ($Upload) {
    Write-Host "Enviando firmware para $Port..."
    & python -m platformio run --target upload --upload-port $Port
    if ($LASTEXITCODE -ne 0) {
        throw "O upload falhou (PlatformIO exit code $LASTEXITCODE). Verifique cabo de dados, porta e modo de gravação da placa."
    }
}

if ($Monitor) {
    Write-Host "Abrindo monitor serial em $Port a 115200 bps. Use Ctrl+C para encerrar."
    & python -m platformio device monitor --port $Port --baud 115200
    exit $LASTEXITCODE
}

Write-Host 'Pré-verificação concluída. Para gravar, execute novamente com -Upload -Port COMx.'
