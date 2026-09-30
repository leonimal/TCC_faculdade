#!/usr/bin/env python3
"""Generate a Markdown report from the validated deep-research JSON files."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path
from typing import Any

import yaml


ROOT = Path(__file__).resolve().parent
RESULTS_DIR = ROOT / "results"
FIELDS_PATH = ROOT / "fields.yaml"
OUTPUT_PATH = ROOT / "report.md"

CATEGORY_MAPPING = {
    "Basic Info": ["basic_info", "Basic Info"],
    "Technical Features": ["technical_features", "technical_characteristics", "Technical Features"],
    "Performance Metrics": ["performance_metrics", "performance", "Performance Metrics"],
    "Milestone Significance": ["milestone_significance", "milestones", "Milestone Significance"],
    "Business Info": ["business_info", "commercial_info", "Business Info"],
    "Competition & Ecosystem": ["competition_ecosystem", "competition", "Competition & Ecosystem"],
    "History": ["history", "History"],
    "Market Positioning": ["market_positioning", "market", "Market Positioning"],
}

INTERNAL_FIELDS = {"_source_file", "uncertain"}
TOC_FIELDS = ("variable", "unit")


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def contains_uncertain(value: Any) -> bool:
    if isinstance(value, str):
        return "[uncertain]" in value.lower()
    if isinstance(value, dict):
        return any(contains_uncertain(item) for item in value.values())
    if isinstance(value, list):
        return any(contains_uncertain(item) for item in value)
    return False


def find_nested(obj: Any, field_name: str) -> Any:
    if isinstance(obj, dict):
        if field_name in obj:
            return obj[field_name]
        for value in obj.values():
            found = find_nested(value, field_name)
            if found is not None:
                return found
    elif isinstance(obj, list):
        for value in obj:
            found = find_nested(value, field_name)
            if found is not None:
                return found
    return None


def field_value(data: dict[str, Any], category: str, field_name: str) -> Any:
    if field_name in data:
        return data[field_name]

    aliases = [category, category.replace(" ", "_"), category.lower().replace(" ", "_")]
    aliases.extend(CATEGORY_MAPPING.get(category, []))
    for alias in aliases:
        category_data = data.get(alias)
        if isinstance(category_data, dict) and field_name in category_data:
            return category_data[field_name]

    return find_nested(data, field_name)


def format_value(value: Any, depth: int = 0) -> str:
    if isinstance(value, dict):
        parts = [f"{key}: {format_value(item, depth + 1)}" for key, item in value.items()]
        return ("<br>" if depth == 0 else "; ").join(parts)

    if isinstance(value, list):
        if all(isinstance(item, dict) for item in value):
            rows = [" | ".join(f"{key}: {format_value(item)}" for key, item in row.items()) for row in value]
            return "<br>".join(rows)
        rendered = [format_value(item, depth + 1) for item in value]
        return ", ".join(rendered) if len(rendered) <= 4 else "<br>".join(rendered)

    text = str(value).strip()
    if len(text) > 100:
        return text.replace(". ", ".<br>")
    return text


def display_name(path: Path, data: dict[str, Any]) -> str:
    variable = data.get("variable")
    if isinstance(variable, str) and not contains_uncertain(variable):
        return variable
    return path.stem.replace("_", " ")


def load_schema() -> tuple[str, list[dict[str, Any]]]:
    schema = yaml.safe_load(FIELDS_PATH.read_text(encoding="utf-8"))
    return schema.get("topic", "Research report"), schema.get("field_categories", [])


def main() -> None:
    topic, categories = load_schema()
    result_files = sorted(RESULTS_DIR.glob("*.json"))
    records = [(path, json.loads(path.read_text(encoding="utf-8"))) for path in result_files]

    lines = [f"# {topic}", "", "## Table of contents", ""]
    for index, (path, data) in enumerate(records, start=1):
        name = display_name(path, data)
        uncertain = set(data.get("uncertain", []))
        summaries = []
        for field in TOC_FIELDS:
            value = data.get(field)
            if field not in uncertain and value not in (None, "") and not contains_uncertain(value):
                summaries.append(f"{field.replace('_', ' ').title()}: {format_value(value)}")
        suffix = f" — {' | '.join(summaries)}" if summaries else ""
        lines.append(f"{index}. [{name}](#{slugify(name)}){suffix}")

    defined_fields = {
        field["name"]
        for category in categories
        for field in category.get("fields", [])
    }
    nested_category_keys = {
        key
        for category in categories
        for key in [
            category.get("category", ""),
            category.get("category", "").replace(" ", "_"),
            category.get("category", "").lower().replace(" ", "_"),
        ]
        if key
    }
    nested_category_keys.update(key for aliases in CATEGORY_MAPPING.values() for key in aliases)

    for path, data in records:
        name = display_name(path, data)
        uncertain = set(data.get("uncertain", []))
        lines.extend(["", f"## {name}", ""])

        for category in categories:
            category_name = category.get("category", "Other Info")
            category_rows = []
            for field in category.get("fields", []):
                field_name = field["name"]
                value = field_value(data, category_name, field_name)
                if (
                    field_name in uncertain
                    or value in (None, "")
                    or contains_uncertain(value)
                ):
                    continue
                label = field_name.replace("_", " ").title()
                category_rows.append(f"- **{label}:** {format_value(value)}")
            if category_rows:
                lines.extend([f"### {category_name.replace('_', ' ').title()}", "", *category_rows, ""])

        extras = []
        for key, value in data.items():
            if (
                key in INTERNAL_FIELDS
                or key in defined_fields
                or key in nested_category_keys
                or key in uncertain
                or value in (None, "")
                or contains_uncertain(value)
            ):
                continue
            extras.append(f"- **{key.replace('_', ' ').title()}:** {format_value(value)}")
        if extras:
            lines.extend(["### Other Info", "", *extras, ""])

        lines.extend(["### Uncertain fields", ""])
        if uncertain:
            lines.extend(f"- `{field}`" for field in sorted(uncertain))
        else:
            lines.append("- None")
        lines.append("")

    OUTPUT_PATH.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Generated {OUTPUT_PATH} from {len(records)} result files")


if __name__ == "__main__":
    main()
