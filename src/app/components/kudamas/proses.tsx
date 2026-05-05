import { prosesSteps, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Proses() {
  return (
    <section id="proses" className="section section-cream">
      <SectionMeta index={5} total={TOTAL_SECTIONS} label="Process / Timeline" />
      <div className="split-grid process-grid">
        <div className="process-aside">
          <Reveal>
            <div className="eyebrow">Cara Kerja</div>
            <h2 className="section-title">
              Dari Kickoff sampai <em>Go Live</em>
              <br />
              dalam 2 Minggu.
            </h2>
            <p className="body-copy">
              Lima fase, satu sprint. Setiap fase punya deliverable konkret dan
              checkpoint dengan tim Kudamas.
            </p>
            <div className="timeline-badge">
              <span />
              <span className="mono">Total: 14 hari kerja</span>
            </div>
          </Reveal>
        </div>

        <div className="timeline">
          {prosesSteps.map((step, index) => (
            <Reveal key={step.n} delay={index * 80}>
              <div className="timeline-row">
                <div className={step.highlight ? "timeline-dot active" : "timeline-dot"}>
                  {step.n}
                </div>
                <div>
                  <div className="timeline-title">
                    <h3>{step.t}</h3>
                    <span className="mono">{step.dur}</span>
                  </div>
                  <p>{step.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
