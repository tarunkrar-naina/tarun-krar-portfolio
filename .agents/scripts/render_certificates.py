import fitz
from pathlib import Path

pdf = Path('attached_assets/Scanned_23_Jul_2026_at_9_34_04_AM_(3)_1788103276002.pdf')
out = Path('.agents/outputs/certificates')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(0.35, 0.35), alpha=False)
    pix.save(out / f'page-{i+1:02d}.png')
print(f'Rendered {len(doc)} pages to {out}')
