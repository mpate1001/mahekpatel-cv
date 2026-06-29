import { experiences } from "@/content/data/experience";
import { education } from "@/content/data/education";
import { skills } from "@/content/data/skills";

export const metadata = {
  title: "Mahek Patel — Resume",
  robots: { index: false, follow: false },
};

const EMAIL = "mppatel12@gmail.com";
const GITHUB = "github.com/mpate1001";
const LINKEDIN = "linkedin.com/in/mahek-patel";

const SKILL_GROUPS: Array<{ key: string; label: string }> = [
  { key: "languages", label: "Languages" },
  { key: "ml-ds", label: "Data & ML" },
  { key: "engineering", label: "Engineering" },
  { key: "tools", label: "Tools & Databases" },
];

function formatRange(start: string, end: string | null): string {
  return end ? `${start} – ${end}` : `${start} – Present`;
}

export default function ResumePage() {
  return (
    <>
      <style>{`
        @page { size: Letter; margin: 0.5in; }
        html, body { background: #ffffff !important; }
        body { font-family: Arial, Helvetica, sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .resume { max-width: 7.5in; margin: 0 auto; padding: 0.4in 0.5in; font-size: 10pt; line-height: 1.35; }
        .resume h1 { font-size: 22pt; font-weight: 800; letter-spacing: 0.02em; margin: 0; text-transform: uppercase; }
        .resume .contact { font-size: 9pt; color: #333; margin-top: 4pt; }
        .resume .contact a { color: #111; text-decoration: none; }
        .resume hr.rule { border: 0; border-top: 1.5pt solid #111; margin: 10pt 0 0; }
        .resume h2 { font-size: 11pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin: 14pt 0 6pt; border-bottom: 0.75pt solid #111; padding-bottom: 2pt; }
        .resume h3 { font-size: 10.5pt; font-weight: 700; margin: 0; }
        .resume .role-line { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
        .resume .role-line .right { font-size: 9.5pt; color: #333; white-space: nowrap; }
        .resume .role-sub { font-size: 10pt; font-style: italic; color: #444; margin: 0 0 3pt; }
        .resume ul { margin: 3pt 0 5pt 14pt; padding: 0; list-style-type: disc; list-style-position: outside; }
        .resume li { margin: 0 0 1.5pt; padding-left: 2pt; }
        .resume .tech { font-size: 9pt; color: #444; margin: 0 0 6pt; }
        .resume .tech strong { color: #111; }
        .resume .summary { margin: 6pt 0 0; }
        .resume .exp-item { margin-bottom: 7pt; }
        .resume .exp-item .role-line, .resume .edu-row .role-line { break-inside: avoid; page-break-inside: avoid; }
        .resume .skill-row { display: grid; grid-template-columns: 1.1in 1fr; gap: 10pt; padding: 2pt 0; }
        .resume .skill-row .label { font-weight: 700; font-size: 9.5pt; }
        .resume .skill-row .items { font-size: 9.5pt; color: #222; }
        .resume .edu-row { margin-bottom: 6pt; }
        .resume .edu-row .right { font-size: 9.5pt; color: #333; }
        .resume .edu-degree { font-size: 10pt; font-style: italic; color: #444; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
      `}</style>

      <main className="resume">
        {/* Header */}
        <header>
          <h1>Mahek Patel</h1>
          <div className="contact">
            Software Engineer &nbsp;·&nbsp; <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            &nbsp;·&nbsp; <a href={`https://${GITHUB}`}>{GITHUB}</a>
            &nbsp;·&nbsp; <a href={`https://${LINKEDIN}`}>{LINKEDIN}</a>
          </div>
          <hr className="rule" />
          <p className="summary">
            Software engineer with 7+ years building data platforms at scale.
            Currently building real-time data pipelines on Kafka, KSQL, and AWS at
            Duke Energy. Background spans streaming infrastructure, ETL/ELT, SQL
            engineering, and applied machine learning.
          </p>
        </header>

        {/* Experience */}
        <section>
          <h2>Experience</h2>
          {experiences.map((exp) => (
            <div key={exp.id} className="exp-item">
              <div className="role-line">
                <h3>
                  {exp.title} <span style={{ fontWeight: 400 }}>— {exp.company}</span>
                </h3>
                <span className="right">{formatRange(exp.startDate, exp.endDate)}</span>
              </div>
              <ul>
                {exp.description.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              {exp.technologies.length > 0 && (
                <p className="tech">
                  <strong>Tech:</strong> {exp.technologies.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="edu-row avoid-break">
              <div className="role-line">
                <h3>{edu.institution}</h3>
                <span className="right">{formatRange(edu.startDate, edu.endDate)}</span>
              </div>
              <p className="edu-degree">
                {edu.degree} in {edu.field}
                {edu.highlights.length > 0 && (
                  <span style={{ color: "#555" }}> — {edu.highlights.join(" · ")}</span>
                )}
              </p>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="avoid-break">
          <h2>Skills</h2>
          {SKILL_GROUPS.map((group) => {
            const items = skills.filter((s) => s.category === group.key);
            if (!items.length) return null;
            return (
              <div key={group.key} className="skill-row">
                <div className="label">{group.label}</div>
                <div className="items">{items.map((s) => s.name).join(" · ")}</div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
