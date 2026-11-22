from playwright.sync_api import sync_playwright
import sys
FONTS = '<link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600&family=Inter:wght@500;600&display=block" rel="stylesheet">'
CSS = """
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#1C1813;color:#EEDFC4;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.l{position:absolute;left:84px;top:78px;width:560px}
.brand{display:flex;align-items:center;gap:14px;font:600 26px Literata,serif;color:#E3A857}
h1{margin-top:44px;font:600 74px/1.04 Literata,serif;letter-spacing:-.02em;color:#F6EAD3}
p{margin-top:26px;font:500 27px/1.4 Inter,sans-serif;color:#CDBB9C}
.url{position:absolute;left:84px;bottom:66px;font:600 24px Inter,sans-serif;color:#E3A857}
.shelf{position:absolute;right:70px;bottom:0;height:520px;display:flex;align-items:flex-end;gap:10px}
.sp{width:46px;border-radius:6px 6px 0 0;display:flex;align-items:flex-start;justify-content:center;padding-top:16px}
.sp span{writing-mode:vertical-rl;transform:rotate(180deg);font:600 17px Inter,sans-serif;letter-spacing:.02em;white-space:nowrap}
.base{position:absolute;right:40px;bottom:0;width:470px;height:14px;background:#3A3127}
"""
SPINES = [('Global Political Economy',470,'#E3A857','#1C1813'),('Marketing',360,'#3A3127','#CDBB9C'),('Decision Making',420,'#4A3D2E','#E9DBC2'),
('Macroeconomics',380,'#2F4A3E','#DCEBE3'),('Finance & Accounting',455,'#5C3A26','#F3E2CF'),('Leadership',340,'#3A3127','#CDBB9C'),
('Operations',400,'#44382B','#E9DBC2'),('Digital',350,'#2E3A4A','#DDE5EF')]
def page(title, sub, highlight=None, small=False):
    sp=''.join(f'<div class="sp" style="height:{h}px;background:{bg};color:{fg};{"outline:3px solid #F6EAD3;" if highlight==n else ""}"><span>{n}</span></div>' for n,h,bg,fg in SPINES)
    size = 'font-size:64px' if small else ''
    return f"""<!doctype html><html><head><meta charset=utf-8>{FONTS}<style>{CSS}</style></head><body>
<div class=l><div class=brand><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#E3A857" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/></svg>EPBM Library</div>
<h1 style="{size}">{title}</h1><p>{sub}</p></div><div class=url>library.girder.in</div><div class=base></div><div class=shelf>{sp}</div></body></html>"""
jobs = [
 ('default', page('Study notes, made readable.', 'Plain-English notes, diagrams and practice quizzes for EPBM-32. Free to read.')),
 ('global-political-economy', page('Global Political Economy', 'Stakeholders and trust · FDI and PEST · Geopolitical risk · 96 practice MCQs', 'Global Political Economy', small=True)),
 ('financial-reporting-cost-accounting', page('Financial Reporting &amp; Cost Accounting', 'Statements · Depreciation and cash flow · Break-even · Ratios · 315 practice questions', 'Finance & Accounting', small=True)),
 ('leadership-people-skills', page('Leadership and People Skills', 'Motivation · Groups and teams · Structure · Leading change · 350 practice questions', 'Leadership', small=True)),
]
out = sys.argv[1]
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width':1200,'height':630})
    for name, html in jobs:
        pg.set_content(html, wait_until='networkidle'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(400)
        pg.screenshot(path=f'{out}/{name}.png')
    b.close()
print('ok')
