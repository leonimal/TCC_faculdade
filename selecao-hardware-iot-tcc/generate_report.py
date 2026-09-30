import json
import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parent
RESULTS = ROOT / "results"
FIELDS = ROOT / "fields.yaml"
OUTPUT = ROOT / "report.md"
SUMMARY_FIELDS = ("brazil_price_range", "stated_accuracy", "recommendation_status")
INTERNAL_FIELDS = {"_source_file", "uncertain"}


def slugify(value):
    value = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return value or "item"


def contains_uncertain(value):
    if isinstance(value, str):
        return "[uncertain]" in value.lower()
    if isinstance(value, dict):
        return any(contains_uncertain(v) for v in value.values())
    if isinstance(value, list):
        return any(contains_uncertain(v) for v in value)
    return False


def usable(item, field):
    value = item.get(field)
    excluded = set(item.get("uncertain", []))
    return field not in excluded and value not in (None, "", [], {}) and not contains_uncertain(value)


def format_value(value):
    if isinstance(value, dict):
        return "<br>".join(f"- **{k}:** {format_value(v)}" for k, v in value.items())
    if isinstance(value, list):
        if all(isinstance(v, dict) for v in value):
            return "<br>".join(" | ".join(f"{k}: {format_value(x)}" for k, x in v.items()) for v in value)
        return ", ".join(str(v) for v in value) if len(value) <= 4 else "<br>".join(f"- {v}" for v in value)
    text = str(value)
    return text.replace("\n", "<br>") if len(text) > 100 else text


def load_items():
    items = []
    for path in sorted(RESULTS.glob("*.json")):
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, list):
            items.extend(data)
        elif isinstance(data, dict) and isinstance(data.get("items"), list):
            items.extend(data["items"])
        else:
            items.append(data)
    return items


def load_categories():
    data = yaml.safe_load(FIELDS.read_text(encoding="utf-8"))
    categories = []
    defined = set()
    for category in data.get("field_categories", []):
        fields = [f["name"] for f in category.get("fields", [])]
        categories.append((category["category"], fields))
        defined.update(fields)
    return categories, defined


def main():
    items = load_items()
    categories, defined = load_categories()
    lines = ["# Hardware Selection Research Report", "", "## Table of contents", ""]
    for index, item in enumerate(items, 1):
        name = item.get("name", item.get("model", f"Item {index}"))
        summary = [f"{field}: {format_value(item[field])}" for field in SUMMARY_FIELDS if usable(item, field)]
        suffix = " — " + " | ".join(summary) if summary else ""
        lines.append(f"{index}. [{name}](#{slugify(name)}){suffix}")

    for item in items:
        name = item.get("name", item.get("model", "Unnamed item"))
        lines.extend(["", f"## {name}", ""])
        for category, fields in categories:
            visible = [(field, item[field]) for field in fields if usable(item, field)]
            if not visible:
                continue
            lines.extend([f"### {category.replace('_', ' ').title()}", ""])
            for field, value in visible:
                lines.append(f"- **{field}:** {format_value(value)}")
            lines.append("")
        extra = [k for k in item if k not in defined and k not in INTERNAL_FIELDS]
        visible_extra = [(k, item[k]) for k in extra if usable(item, k)]
        if visible_extra:
            lines.extend(["### Other Info", ""])
            for field, value in visible_extra:
                lines.append(f"- **{field}:** {format_value(value)}")
            lines.append("")
        uncertain = item.get("uncertain", [])
        if uncertain:
            lines.extend(["### Uncertain fields", ""])
            lines.extend(f"- {field}" for field in uncertain)
            lines.append("")

    OUTPUT.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Generated {OUTPUT} with {len(items)} items")


if __name__ == "__main__":
    main()
