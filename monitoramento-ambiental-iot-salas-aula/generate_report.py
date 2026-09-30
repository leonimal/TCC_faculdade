from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path
from typing import Any

import yaml


TOPIC_DIR = Path(__file__).resolve().parent
PROJECT_DIR = TOPIC_DIR.parent
OUTLINE_PATH = TOPIC_DIR / "outline.yaml"
FIELDS_PATH = TOPIC_DIR / "fields.yaml"
REPORT_PATH = TOPIC_DIR / "report.md"

CATEGORY_MAPPING = {
    "Basic Info": ["basic_info", "Basic Info"],
    "Technical Features": ["technical_features", "technical_characteristics", "Technical Features"],
    "Performance Metrics": ["performance_metrics", "performance", "Performance Metrics"],
    "Milestone Significance": ["milestone_significance", "milestones", "Milestone Significance"],
    "Business Info": ["business_info", "commercial_info", "Business Info"],
    "Competition & Ecosystem": ["competition_ecosystem", "competition", "Competition & Ecosystem"],
    "History": ["history", "History"],
    "Market Positioning": ["market_positioning", "market", "Market Positioning"],
    "identificacao": ["identification", "identificacao"],
    "escopo_e_metodo": ["scope_and_method", "escopo_e_metodo"],
    "ambiente_ocupacao_e_exposicao": ["environment_occupancy_exposure", "ambiente_ocupacao_e_exposicao"],
    "sensores_e_dados": ["sensors_and_data", "sensores_e_dados"],
    "arquitetura_iot": ["iot_architecture", "arquitetura_iot"],
    "analise_e_decisao": ["analysis_and_decision", "analise_e_decisao"],
    "resultados_e_avaliacao": ["results_and_evaluation", "resultados_e_avaliacao"],
}

CATEGORY_TITLES = {
    "identificacao": "Identificação e base bibliográfica",
    "escopo_e_metodo": "Escopo e método",
    "ambiente_ocupacao_e_exposicao": "Ambiente, ocupação e exposição",
    "sensores_e_dados": "Sensores, metrologia e dados",
    "arquitetura_iot": "Arquitetura IoT",
    "analise_e_decisao": "Análise, decisão e automação",
    "resultados_e_avaliacao": "Resultados e avaliação",
}

FIELD_TITLES = {
    "bibliographic_reference": "Referências utilizadas",
    "persistent_identifier": "Identificadores e endereços persistentes",
    "publication_type": "Tipo e composição da evidência",
    "country_and_climate": "Países e condições climáticas",
    "objective_and_research_question": "Objetivo e questão de pesquisa",
    "study_design": "Desenho dos estudos",
    "educational_context": "Contexto educacional",
    "sample_and_duration": "Amostra e duração",
    "environmental_variables": "Variáveis ambientais",
    "outdoor_conditions_and_baseline": "Condições externas e linha de base",
    "occupancy_and_activity": "Ocupação e atividade",
    "ventilation_and_filtration_operation": "Operação da ventilação e filtração",
    "spatial_granularity": "Granularidade espacial",
    "sensor_specification": "Especificações dos sensores",
    "calibration_and_qaqc": "Calibração e garantia da qualidade",
    "acquisition_and_data_quality": "Aquisição e qualidade dos dados",
    "sensor_lifecycle": "Ciclo de vida dos sensores",
    "recommended_sensor_by_variable": "Sensor recomendado por variável",
    "useful_output_and_units": "Saídas úteis e unidades",
    "direct_measurement_or_proxy": "Medição direta ou proxy",
    "measurement_principle_and_selectivity": "Princípio de medição e seletividade",
    "useful_range_and_real_performance": "Faixa útil e desempenho real",
    "operating_regime": "Regime de operação",
    "interferences_and_confounders": "Interferências e confundidores",
    "affordable_validation_protocol": "Protocolo acessível de validação",
    "validation_metrics": "Métricas de validação",
    "installation_and_enclosure": "Instalação e encapsulamento",
    "hardware_integration": "Integração de hardware",
    "total_implementation_cost": "Custo total de implementação",
    "evidence_maturity": "Maturidade da evidência",
    "variable_specific_cautions": "Cuidados específicos por variável",
    "system_architecture": "Arquitetura do sistema",
    "connectivity_and_protocols": "Conectividade e protocolos",
    "interoperability_and_data_model": "Interoperabilidade e modelo de dados",
    "cybersecurity_privacy_and_ethics": "Cibersegurança, privacidade e ética",
    "analytical_methods": "Métodos analíticos",
    "derived_index_or_model": "Índice ou modelo derivado",
    "decision_rules_and_standards": "Regras de decisão e normas",
    "intervention_and_automation": "Intervenção e automação",
    "environmental_outcomes": "Resultados ambientais",
    "health_and_learning_outcomes": "Saúde e aprendizagem",
    "objective_subjective_integration": "Integração objetiva e subjetiva",
    "quantitative_results": "Resultados quantitativos",
    "feasibility_and_acceptance": "Viabilidade e aceitação",
    "validity_and_limitations": "Validade e limitações",
    "contribution_and_research_gaps": "Contribuições e lacunas",
}


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^A-Za-z0-9]+", "_", ascii_value).strip("_")


def anchor(value: str) -> str:
    return slugify(value).replace("_", "-").lower()


def is_empty(value: Any) -> bool:
    return value is None or value == "" or value == [] or value == {}


def contains_uncertain(value: Any) -> bool:
    if isinstance(value, str):
        return "[uncertain]" in value.lower()
    if isinstance(value, list):
        return any(contains_uncertain(item) for item in value)
    if isinstance(value, dict):
        return any(contains_uncertain(item) for item in value.values())
    return False


def nested_lookup(data: dict[str, Any], field_name: str, category: str) -> Any:
    if field_name in data:
        return data[field_name]
    candidates = [category, *CATEGORY_MAPPING.get(category, [])]
    for key in candidates:
        section = data.get(key)
        if isinstance(section, dict) and field_name in section:
            return section[field_name]
    stack = [value for value in data.values() if isinstance(value, dict)]
    while stack:
        current = stack.pop()
        if field_name in current:
            return current[field_name]
        stack.extend(value for value in current.values() if isinstance(value, dict))
    return None


def inline(value: Any) -> str:
    if isinstance(value, dict):
        return " | ".join(f"{FIELD_TITLES.get(str(k), str(k))}: {inline(v)}" for k, v in value.items())
    if isinstance(value, list):
        return "; ".join(inline(item) for item in value)
    return str(value).strip()


def format_value(value: Any) -> list[str]:
    if isinstance(value, list):
        if not value:
            return []
        if all(not isinstance(item, (dict, list)) for item in value) and len(value) <= 3:
            return [", ".join(str(item).strip() for item in value)]
        return [f"- {inline(item)}" for item in value]
    if isinstance(value, dict):
        if len(value) <= 3:
            return [inline(value)]
        return [f"- **{FIELD_TITLES.get(str(key), str(key))}:** {inline(item)}" for key, item in value.items()]
    text = str(value).strip()
    if len(text) > 100:
        return [text.replace("\n", "<br>")]
    return [text]


def extra_fields(data: dict[str, Any], defined: set[str]) -> dict[str, Any]:
    ignored = {"_source_file", "uncertain"}
    ignored.update(alias for aliases in CATEGORY_MAPPING.values() for alias in aliases)
    return {
        key: value
        for key, value in data.items()
        if key not in defined and key not in ignored and not isinstance(value, dict)
    }


def main() -> None:
    outline = yaml.safe_load(OUTLINE_PATH.read_text(encoding="utf-8"))
    field_config = yaml.safe_load(FIELDS_PATH.read_text(encoding="utf-8"))
    configured_output = Path(outline.get("execution", {}).get("output_dir", "./results"))
    results_dir = configured_output if configured_output.is_absolute() else PROJECT_DIR / configured_output

    json_by_stem = {path.stem: path for path in results_dir.glob("*.json")}
    records: list[tuple[dict[str, Any], dict[str, Any], Path]] = []
    for item in outline.get("items", []):
        expected_stem = slugify(item["name"])
        path = json_by_stem.get(expected_stem)
        if path is None:
            raise FileNotFoundError(f"Resultado não encontrado para: {item['name']} ({expected_stem}.json)")
        records.append((item, json.loads(path.read_text(encoding="utf-8")), path))

    lines = [
        f"# {outline['topic']}",
        "",
        "## Relatório acadêmico da pesquisa bibliográfica",
        "",
        "Este relatório consolida a pesquisa aprofundada sobre monitoramento ambiental com Internet das Coisas em salas de aula, com ênfase no projeto e na validação de sensores de baixo custo. A síntese prioriza artigos científicos, normas técnicas, documentos oficiais e outras fontes primárias identificadas em cada eixo temático.",
        "",
        "## Método",
        "",
        f"A revisão considerou o período de **{outline.get('scope', {}).get('time_range', 'não informado')}**, os critérios de inclusão e exclusão definidos no protocolo e os 21 objetos de pesquisa do plano. Cada resultado foi estruturado em 46 campos. Valores marcados como incertos foram omitidos da síntese detalhada, conforme o protocolo, sem que isso implique ausência de pesquisa sobre o tópico.",
        "",
        "### Questão principal",
        "",
        outline.get("scope", {}).get("research_question", ""),
        "",
        "### Subquestão prática",
        "",
        outline.get("scope", {}).get("practical_subquestion", ""),
        "",
        "## Sumário",
        "",
    ]

    for number, (item, _, _) in enumerate(records, 1):
        lines.append(f"{number}. [{item['name']}](#{anchor(item['name'])})")

    all_references: list[str] = []
    all_identifiers: list[str] = []
    defined_fields: set[str] = set()

    for number, (item, data, _) in enumerate(records, 1):
        uncertain = set(data.get("uncertain", []))
        lines.extend(["", "---", "", f"## {number}. {item['name']}", ""])
        if item.get("research_focus"):
            lines.extend(["**Foco:** " + str(item["research_focus"]).strip(), ""])

        for category_entry in field_config.get("field_categories", []):
            category = category_entry["category"]
            rendered: list[str] = []
            for field in category_entry.get("fields", []):
                field_name = field["name"]
                defined_fields.add(field_name)
                value = nested_lookup(data, field_name, category)
                if field_name in uncertain or is_empty(value) or contains_uncertain(value):
                    continue
                rendered.extend([f"#### {FIELD_TITLES.get(field_name, field_name.replace('_', ' ').title())}", ""])
                rendered.extend(format_value(value))
                rendered.append("")
                if field_name == "bibliographic_reference":
                    all_references.extend(value if isinstance(value, list) else [str(value)])
                elif field_name == "persistent_identifier":
                    all_identifiers.extend(value if isinstance(value, list) else [str(value)])
            if rendered:
                lines.extend([f"### {CATEGORY_TITLES.get(category, category.replace('_', ' ').title())}", ""])
                lines.extend(rendered)

        extras = extra_fields(data, defined_fields)
        extras = {k: v for k, v in extras.items() if k not in uncertain and not is_empty(v) and not contains_uncertain(v)}
        if extras:
            lines.extend(["### Outras informações", ""])
            for key, value in extras.items():
                lines.extend([f"#### {FIELD_TITLES.get(key, key.replace('_', ' ').title())}", ""])
                lines.extend(format_value(value))
                lines.append("")

    def unique(values: list[Any]) -> list[str]:
        seen: set[str] = set()
        result: list[str] = []
        for value in values:
            text = inline(value).strip()
            normalized = re.sub(r"\s+", " ", text).lower()
            if text and normalized not in seen:
                seen.add(normalized)
                result.append(text)
        return result

    lines.extend(["", "---", "", "## Referências e fontes consolidadas", ""])
    lines.append("As entradas abaixo preservam as referências e os identificadores informados nos resultados temáticos. Duplicatas textuais exatas foram removidas; variantes da mesma obra foram mantidas para não eliminar informação bibliográfica potencialmente útil.")
    lines.extend(["", "### Referências bibliográficas", ""])
    for reference in unique(all_references):
        lines.append(f"- {reference}")
    lines.extend(["", "### DOI, URLs e identificadores persistentes", ""])
    for identifier in unique(all_identifiers):
        lines.append(f"- {identifier}")

    REPORT_PATH.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Report generated: {REPORT_PATH}")
    print(f"Topics: {len(records)}")
    print(f"References: {len(unique(all_references))}")
    print(f"Identifiers: {len(unique(all_identifiers))}")


if __name__ == "__main__":
    main()
