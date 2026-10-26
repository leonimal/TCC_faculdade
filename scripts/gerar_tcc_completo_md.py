"""Consolida os arquivos acadêmicos editáveis em uma única leitura de trabalho."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEXT = ROOT / "texto"
OUTPUT = TEXT / "TCC-completo.md"
SOURCES = [
    "00-resumo.md",
    "00-abstract.md",
    "01-introducao.md",
    "02-fundamentacao.md",
    "03-metodologia.md",
    "04-desenvolvimento.md",
    "05-resultados.md",
    "06-conclusao.md",
    "07-referencias.md",
]


def main() -> None:
    sections = [
        "<!-- Arquivo consolidado gerado. Edite os capítulos individuais em texto/. -->",
        "",
    ]
    for source in SOURCES:
        sections.append((TEXT / source).read_text(encoding="utf-8").strip())
        sections.append("")
    OUTPUT.write_text("\n\n".join(sections).rstrip() + "\n", encoding="utf-8")
    print(OUTPUT)


if __name__ == "__main__":
    main()
