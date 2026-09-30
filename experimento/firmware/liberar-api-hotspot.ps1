[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$displayName = 'TCC IoT API Hotspot TCP 3100'
Get-NetFirewallRule -DisplayName $displayName -ErrorAction SilentlyContinue |
    Remove-NetFirewallRule

New-NetFirewallRule `
    -DisplayName $displayName `
    -Direction Inbound `
    -Action Allow `
    -Protocol TCP `
    -LocalPort 3100 `
    -RemoteAddress '192.168.137.0/24' `
    -Profile Private,Public |
    Out-Null

$rule = Get-NetFirewallRule -DisplayName $displayName
$scope = Get-NetFirewallAddressFilter -AssociatedNetFirewallRule $rule
Write-Host "Regra ativa para TCP 3100; origem permitida: $($scope.RemoteAddress)"
