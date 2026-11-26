"""
Generates public/cv/Abdullah-Al-Muhaimin-CV.pdf from verified facts only.
Usage: python3 scripts/make-cv.py   (needs: pip install reportlab)
Edit the DATA block below (add email, degree, dates, ...) and re-run; then commit the PDF.
Nothing here is invented: every line comes from the portfolio's own data files.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

OUT = "public/cv/Abdullah-Al-Muhaimin-CV.pdf"
INK, MUTED, ACCENT = HexColor("#16181B"), HexColor("#5B6168"), HexColor("#C1121F")

DATA = dict(
    name="Abdullah Al Muhaimin",
    headline="AI / Machine Learning Engineer",
    sub="Undergraduate Researcher · United International University (UIU)",
    contact=[  # (label, shown text, url). Add ("Email", "you@example.com", "mailto:you@example.com") when available.
        ("Portfolio", "muhaimin-mashrafi.github.io/Portfolio", "https://muhaimin-mashrafi.github.io/Portfolio/"),
        ("GitHub", "github.com/Muhaimin-Mashrafi", "https://github.com/Muhaimin-Mashrafi"),
        ("LinkedIn", "linkedin.com/in/abdullah-al-muhaimin", "https://www.linkedin.com/in/abdullah-al-muhaimin-a3ba37292/"),
    ],
    summary=("AI and Machine Learning enthusiast at United International University with an advanced foundation in Python "
             "and hands-on experience developing projects, training machine learning models and evaluating their performance. "
             "Actively involved in collaborative research on data poisoning attacks against external knowledge bases of "
             "Large Language Models. I learn by building and by questioning how AI systems can fail."),
    education=[("United International University (UIU)", "Undergraduate student")],
    research=dict(
        title="Data Poisoning in External Knowledge Bases of Large Language Models Through Cross-Lingual Queries",
        status="Ongoing · Collaborative research · United International University",
        text=("Member of a research team investigating data poisoning vulnerabilities in external knowledge bases used by "
              "Large Language Models, with particular attention to cross-lingual query-based attacks."),
        areas="Large Language Models · Retrieval-Augmented Generation · Knowledge Base Security · Data Poisoning · "
              "Cross-Lingual Query Processing · AI Security and Robustness",
    ),
    projects=[dict(
        name="CropVerse", meta="Crop marketplace web application · DBMS Lab project",
        link=("github.com/Muhaimin-Mashrafi/Corpverse", "https://github.com/Muhaimin-Mashrafi/Corpverse"),
        tech="HTML, CSS, JavaScript, Node.js, Express, MySQL, JWT, bcryptjs, Nodemailer",
        bullets=[
            "Three-role application (farmer, buyer, administrator) connecting farmers and buyers, with crop listings, price-trend charts and crop disease reports.",
            "Email-verified signup followed by administrator approval; passwords hashed with bcryptjs, sessions via JSON Web Tokens, role-checking middleware on API routes.",
            "Node.js and Express REST API over an eight-table MySQL schema.",
        ])],
    skills=[
        ("Programming", "Python (advanced)"),
        ("Machine learning", "Model training, model evaluation"),
        ("Tools", "Git, GitHub, Visual Studio Code"),
        ("Interests", "Machine Learning, Deep Learning, Generative AI, Natural Language Processing, Computer Vision, AI Security"),
    ],
)

def S(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.4, leading=13, textColor=INK)
    base.update(kw); return ParagraphStyle(name, **base)

body, small = S("b"), S("s", fontSize=8.6, textColor=MUTED, leading=12)
h_name = S("n", fontName="Helvetica-Bold", fontSize=25, leading=28)
h_role = S("r", fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=ACCENT)
h_sec = S("h", fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=ACCENT)
h_item = S("i", fontName="Helvetica-Bold", fontSize=10, leading=13)
bullet = S("bl", leftIndent=10, bulletIndent=0, spaceAfter=1.5)

def section(title):
    return [Spacer(1, 7), Paragraph(title.upper().replace("", " ")[1:-1] if False else title.upper(), h_sec),
            HRFlowable(width="100%", thickness=0.6, color=ACCENT, spaceBefore=2, spaceAfter=5)]

def link(text, url): return f'<link href="{url}" color="#16181B">{text}</link>'

d = DATA
story = [Paragraph(d["name"], h_name), Paragraph(d["headline"], h_role), Paragraph(d["sub"], small), Spacer(1, 5),
         Paragraph("  ·  ".join(f'{l}: {link(t,u)}' for l, t, u in d["contact"]), small)]
story += section("Profile") + [Paragraph(d["summary"], body)]
story += section("Education")
for inst, deg in d["education"]:
    story.append(Paragraph(f"<b>{inst}</b> — {deg}", body))
r = d["research"]
story += section("Research") + [Paragraph(r["title"], h_item), Paragraph(r["status"], small), Spacer(1, 3),
                                Paragraph(r["text"], body), Spacer(1, 2), Paragraph(f"<b>Areas:</b> {r['areas']}", body)]
story += section("Projects")
for p in d["projects"]:
    block = [Paragraph(f'{p["name"]}  <font name="Helvetica" size="8.6" color="#5B6168">— {p["meta"]} · {link(*p["link"])}</font>', h_item),
             Paragraph(f'<b>Technologies:</b> {p["tech"]}', body), Spacer(1, 2)]
    block += [Paragraph(b, bullet, bulletText="•") for b in p["bullets"]]
    story.append(KeepTogether(block))
story += section("Skills")
t = Table([[Paragraph(f"<b>{k}</b>", body), Paragraph(v, body)] for k, v in d["skills"]], colWidths=[32*mm, None])
t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1.5), ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5)]))
story.append(t)

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=16*mm, bottomMargin=14*mm,
                        title="Abdullah Al Muhaimin — CV", author="Abdullah Al Muhaimin")
doc.build(story)
print("wrote", OUT)
