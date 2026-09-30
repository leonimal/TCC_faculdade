$ErrorActionPreference = 'Stop'

$name = 'TCC IoT API Hotspot TCP 3100'
Get-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue | Remove-NetFirewallRule
New-NetFirewallRule -DisplayName $name -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3100 -RemoteAddress '192.168.137.0/24' -Profile Private,Public | Out-Null

$port = Get-NetFirewallPortFilter -AssociatedNetFirewallRule (Get-NetFirewallRule -DisplayName $name)
Write-Host "Regra criada para TCP $($port.LocalPort)."
