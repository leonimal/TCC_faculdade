param(
  [string]$Pasta = $PSScriptRoot
)

function Inline([string]$Text) {
  $safe = [System.Net.WebUtility]::HtmlEncode($Text)
  $safe = [regex]::Replace($safe, '`([^`]+)`', '<code>$1</code>')
  $safe = [regex]::Replace($safe, '\*\*([^*]+)\*\*', '<strong>$1</strong>')
  return $safe
}

function Convert-Markdown([string]$Markdown) {
  $lines = $Markdown -split "`r?`n"
  $html = New-Object System.Collections.Generic.List[string]
  $inCode = $false
  $inList = $false
  $index = 0

  while ($index -lt $lines.Count) {
    $line = $lines[$index]
    if ($line -match '^```') {
      if ($inList) { $html.Add('</ul>'); $inList = $false }
      if ($inCode) { $html.Add('</code></pre>'); $inCode = $false } else { $html.Add('<pre><code>'); $inCode = $true }
      $index++; continue
    }
    if ($inCode) { $html.Add([System.Net.WebUtility]::HtmlEncode($line)); $index++; continue }
    if ($line -match '^\|') {
      if ($inList) { $html.Add('</ul>'); $inList = $false }
      $rows = New-Object System.Collections.Generic.List[string]
      while ($index -lt $lines.Count -and $lines[$index] -match '^\|') { $rows.Add($lines[$index]); $index++ }
      $html.Add('<table>')
      for ($rowIndex = 0; $rowIndex -lt $rows.Count; $rowIndex++) {
        if ($rows[$rowIndex] -match '^\|[\s|:-]+\|$') { continue }
        $cells = $rows[$rowIndex].Trim('|').Split('|')
        $tag = if ($rowIndex -eq 0) { 'th' } else { 'td' }
        $html.Add('<tr>' + (($cells | ForEach-Object { "<$tag>$(Inline $_.Trim())</$tag>" }) -join '') + '</tr>')
      }
      $html.Add('</table>'); continue
    }
    if ($line -match '^(#{1,3})\s+(.+)$') {
      if ($inList) { $html.Add('</ul>'); $inList = $false }
      $level = $matches[1].Length
      $html.Add("<h$level>$(Inline $matches[2])</h$level>"); $index++; continue
    }
    if ($line -match '^[-*]\s+(.+)$') {
      if (-not $inList) { $html.Add('<ul>'); $inList = $true }
      $html.Add("<li>$(Inline $matches[1])</li>"); $index++; continue
    }
    if ($line -match '^\d+\.\s+(.+)$') {
      if ($inList) { $html.Add('</ul>'); $inList = $false }
      $html.Add("<p class='numbered'>$(Inline $matches[1])</p>"); $index++; continue
    }
    if ([string]::IsNullOrWhiteSpace($line)) {
      if ($inList) { $html.Add('</ul>'); $inList = $false }
      $index++; continue
    }
    if ($inList) { $html.Add('</ul>'); $inList = $false }
    $html.Add("<p>$(Inline $line)</p>"); $index++
  }
  if ($inList) { $html.Add('</ul>') }
  return $html -join "`n"
}

$style = @'
<style>
@page { size: A4; margin: 18mm 15mm; }
body { color: #17212b; font: 10.5pt/1.45 Arial, sans-serif; }
h1 { color: #0b4f6c; font-size: 19pt; line-height: 1.2; margin: 0 0 14pt; }
h2 { color: #0b4f6c; font-size: 13pt; margin: 18pt 0 7pt; border-bottom: 1px solid #9fc4d5; padding-bottom: 3pt; }
h3 { font-size: 11.5pt; margin: 14pt 0 5pt; }
p { margin: 5pt 0; } ul { margin: 5pt 0 8pt; padding-left: 18pt; } li { margin: 2pt 0; }
table { width: 100%; border-collapse: collapse; margin: 8pt 0 12pt; font-size: 9pt; page-break-inside: avoid; }
th { background: #0b4f6c; color: white; font-weight: bold; } th, td { border: 1px solid #b9c8d0; text-align: left; vertical-align: top; padding: 5pt; }
tr:nth-child(even) td { background: #f3f8fa; } code { background: #edf2f4; padding: 1pt 2pt; font-size: 8.5pt; } pre { background: #f3f6f7; border-left: 3px solid #0b4f6c; padding: 7pt; white-space: pre-wrap; font-size: 8.5pt; }
.numbered { margin-left: 10pt; }
</style>
'@

$arquivos = @('cronograma_entrega.md', 'cronograma_entrega2.md', 'cronograma_pedido_professor.md')
foreach ($arquivo in $arquivos) {
  $origem = Join-Path $Pasta $arquivo
  $destino = Join-Path $Pasta ([IO.Path]::ChangeExtension($arquivo, 'html'))
  $conteudo = Get-Content -Raw -Encoding utf8 $origem
  $pagina = "<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'><title>$([IO.Path]::GetFileNameWithoutExtension($arquivo))</title>$style</head><body>$(Convert-Markdown $conteudo)</body></html>"
  [IO.File]::WriteAllText($destino, $pagina, [Text.UTF8Encoding]::new($false))
}
