"use client";

import { useState, type FormEvent } from "react";

type Variable = "TEMPERATURE_C" | "RELATIVE_HUMIDITY_PCT" | "ILLUMINANCE_LX";
type EditableRule = { enabled: boolean; lower: string; upper: string };
type Profile = { version: number; enabled: boolean; status: "ENABLED" | "DISABLED"; requested_by: string; justification: string; source_reference: string | null; effective_at: string; rules: Array<{ variable: Variable; lower_limit: number; upper_limit: number }> };
type ApiResponse = { profile?: Profile | null; error?: { code?: string; message?: string; details?: Array<{ field: string; reason: string }> } };

const variables: Array<{ id: Variable; label: string; unit: string; tone: string }> = [
  { id: "TEMPERATURE_C", label: "Temperatura do ar", unit: "°C", tone: "thermal" },
  { id: "RELATIVE_HUMIDITY_PCT", label: "Umidade relativa", unit: "% UR", tone: "moisture" },
  { id: "ILLUMINANCE_LX", label: "Iluminância", unit: "lx", tone: "light" },
];

function emptyRules(): Record<Variable, EditableRule> {
  return {
    TEMPERATURE_C: { enabled: false, lower: "", upper: "" },
    RELATIVE_HUMIDITY_PCT: { enabled: false, lower: "", upper: "" },
    ILLUMINANCE_LX: { enabled: false, lower: "", upper: "" },
  };
}

function messageFromResponse(response: ApiResponse, fallback: string): string {
  if (response.error?.code === "ACTIVE_RUN_LOCK") return "Não é possível alterar as faixas enquanto houver uma execução experimental ativa.";
  if (response.error?.code === "UNAUTHORIZED" || response.error?.code === "FORBIDDEN") return "Sua sessão de administrador não permite esta ação.";
  if (response.error?.details?.length) return "Revise os campos: cada mínimo deve ser menor que seu máximo.";
  return response.error?.message ?? fallback;
}

async function requestProfile(deviceId: string, method: "GET" | "PATCH", body?: unknown) {
  const response = await fetch(`/api/v1/devices/${deviceId}/local-monitoring-profile`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => ({})) as ApiResponse;
  return { response, payload };
}

export function LocalMonitoringAdminForm({ deviceId, deviceName }: { deviceId: string | null; deviceName: string | null }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [requestedBy, setRequestedBy] = useState("");
  const [justification, setJustification] = useState("");
  const [sourceReference, setSourceReference] = useState("");
  const [rules, setRules] = useState<Record<Variable, EditableRule>>(emptyRules);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function applyProfile(nextProfile: Profile | null) {
    setProfile(nextProfile);
    setEnabled(nextProfile?.enabled ?? false);
    setRequestedBy(nextProfile?.requested_by ?? "");
    setJustification(nextProfile?.justification ?? "");
    setSourceReference(nextProfile?.source_reference ?? "");
    const nextRules = emptyRules();
    for (const rule of nextProfile?.rules ?? []) nextRules[rule.variable] = { enabled: true, lower: String(rule.lower_limit), upper: String(rule.upper_limit) };
    setRules(nextRules);
  }

  async function loadConfiguration() {
    setNotice(""); setError(""); setIsLoading(true);
    try {
      if (!deviceId) { setError("Nenhum nó ativo está disponível para configurar."); return; }
      const { response, payload } = await requestProfile(deviceId, "GET");
      if (!response.ok) { setError(messageFromResponse(payload, "Não foi possível abrir a configuração agora.")); return; }
      applyProfile(payload.profile ?? null);
      setIsLoaded(true);
      setNotice(payload.profile ? `Versão ${payload.profile.version} carregada.` : "Nenhuma faixa local foi configurada ainda.");
    } catch { setError("Não foi possível alcançar a aplicação. Verifique se ela está em execução."); }
    finally { setIsLoading(false); }
  }

  function updateRule(variable: Variable, patch: Partial<EditableRule>) {
    setRules((current) => ({ ...current, [variable]: { ...current[variable], ...patch } }));
  }

  async function saveConfiguration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice(""); setError("");
    const activeRules = variables.filter((variable) => rules[variable.id].enabled);
    if (!requestedBy.trim() || !justification.trim()) { setError("Informe o responsável e a justificativa da configuração."); return; }
    if (enabled && activeRules.length === 0) { setError("Ative pelo menos uma variável para habilitar o acompanhamento."); return; }
    const parsedRules = activeRules.map((variable) => ({ variable: variable.id, lower_limit: Number(rules[variable.id].lower), upper_limit: Number(rules[variable.id].upper) }));
    if (enabled && parsedRules.some((rule) => !Number.isFinite(rule.lower_limit) || !Number.isFinite(rule.upper_limit) || rule.lower_limit >= rule.upper_limit)) { setError("Cada faixa ativa precisa ter números válidos, com mínimo menor que máximo."); return; }
    setIsLoading(true);
    try {
      if (!deviceId) { setError("Nenhum nó ativo está disponível para configurar."); return; }
      const { response, payload } = await requestProfile(deviceId, "PATCH", { enabled, requested_by: requestedBy.trim(), justification: justification.trim(), source_reference: sourceReference.trim() || null, rules: enabled ? parsedRules : [] });
      if (!response.ok || !payload.profile) { setError(messageFromResponse(payload, "Não foi possível salvar as faixas locais.")); return; }
      applyProfile(payload.profile);
      setNotice(`Versão ${payload.profile.version} salva. As próximas leituras já usarão esta configuração.`);
    } catch { setError("Não foi possível alcançar a aplicação. Nenhuma alteração foi confirmada."); }
    finally { setIsLoading(false); }
  }

  return <div className="admin-form-layout">
    <section className="admin-access-panel" aria-labelledby="admin-access-title">
      <p className="eyebrow">Administração autenticada</p><h2 id="admin-access-title">Abra a configuração</h2><p>{deviceId ? <>Nó selecionado: <strong className="font-mono">{deviceId}</strong>{deviceName ? ` · ${deviceName}` : ""}.</> : "Nenhum nó ativo está disponível."}</p>
      <div className="admin-access-form"><button type="button" onClick={loadConfiguration} disabled={isLoading || !deviceId}>{isLoading ? "Consultando…" : "Carregar configuração"}</button></div>
    </section>
    <section className="admin-config-panel" aria-labelledby="admin-config-title">
      <div className="admin-config-heading"><div><p className="eyebrow">Faixas ativas</p><h2 id="admin-config-title">Defina o que será acompanhado</h2></div><span className={`admin-status ${profile?.enabled ? "admin-status--enabled" : ""}`}>{profile?.enabled ? `Ativa · v${profile.version}` : "Ainda não configurada"}</span></div>
      {!isLoaded ? <p className="admin-locked">Carregue a configuração para consultar ou criar as faixas locais.</p> : <form onSubmit={saveConfiguration} className="admin-config-form">
        <label className="admin-switch"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} disabled={isLoading} /><span aria-hidden="true" /><span><strong>Ativar acompanhamento local</strong><small>Quando desativado, novos alertas locais não são registrados.</small></span></label>
        <div className="admin-meta-grid"><label>Responsável informado<input value={requestedBy} onChange={(event) => setRequestedBy(event.target.value)} maxLength={120} required disabled={isLoading} placeholder="Nome ou identificação" /></label><label>Referência de origem <span>opcional</span><input value={sourceReference} onChange={(event) => setSourceReference(event.target.value)} maxLength={500} disabled={isLoading} placeholder="Ex.: definição administrativa interna" /></label><label className="admin-meta-grid__wide">Justificativa<textarea value={justification} onChange={(event) => setJustification(event.target.value)} maxLength={500} required disabled={isLoading} placeholder="Por que esta faixa será acompanhada?" rows={3} /></label></div>
        <fieldset disabled={isLoading || !enabled} className="admin-range-fieldset"><legend>Variáveis e limites</legend><p>Selecione as variáveis que deseja acompanhar. Os limites são locais, não normativos.</p><div className="admin-range-grid">{variables.map((variable) => { const rule = rules[variable.id]; return <article key={variable.id} className={`admin-range-card admin-range-card--${variable.tone} ${rule.enabled ? "is-selected" : ""}`}><label className="admin-range-toggle"><input type="checkbox" checked={rule.enabled} onChange={(event) => updateRule(variable.id, { enabled: event.target.checked })} /><span>{variable.label}</span><small>{variable.unit}</small></label><div className="admin-range-inputs"><label>Mínimo<input type="number" inputMode="decimal" step="any" value={rule.lower} onChange={(event) => updateRule(variable.id, { lower: event.target.value })} disabled={!rule.enabled} aria-label={`Mínimo de ${variable.label}`} /></label><span aria-hidden="true">até</span><label>Máximo<input type="number" inputMode="decimal" step="any" value={rule.upper} onChange={(event) => updateRule(variable.id, { upper: event.target.value })} disabled={!rule.enabled} aria-label={`Máximo de ${variable.label}`} /></label></div></article>; })}</div></fieldset>
        {error ? <p className="admin-message admin-message--error" role="alert">{error}</p> : null}{notice ? <p className="admin-message admin-message--success" role="status">{notice}</p> : null}
        <div className="admin-save-row"><p>A alteração cria uma nova versão. Alertas já registrados preservam a faixa vigente no momento da leitura.</p><button type="submit" disabled={isLoading}>{isLoading ? "Salvando…" : enabled ? "Salvar faixas locais" : "Desativar acompanhamento"}</button></div>
      </form>}
      {!isLoaded && (error || notice) ? <div className="mt-5">{error ? <p className="admin-message admin-message--error" role="alert">{error}</p> : null}{notice ? <p className="admin-message admin-message--success" role="status">{notice}</p> : null}</div> : null}
    </section>
  </div>;
}
