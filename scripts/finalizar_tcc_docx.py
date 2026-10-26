"""Atualiza o sumário no Word e exporta uma cópia PDF para conferência visual."""

from pathlib import Path

import pythoncom
import win32com.client


ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "entrega" / "TCC-IoT-UNIP-2026-revisado.docx"
PDF = DOCX.with_suffix(".pdf")


def main() -> None:
    pythoncom.CoInitialize()
    word = None
    document = None
    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = 0
        document = word.Documents.Open(str(DOCX.resolve()), ReadOnly=False)
        document.Repaginate()
        document.TablesOfContents(1).Update()
        document.Repaginate()
        document.TablesOfContents(1).UpdatePageNumbers()
        document.Save()
        document.ExportAsFixedFormat(str(PDF.resolve()), 17)
    finally:
        if document is not None:
            document.Close(SaveChanges=False)
        if word is not None:
            word.Quit()
        pythoncom.CoUninitialize()
    print(DOCX)
    print(PDF)


if __name__ == "__main__":
    main()
