import { prosesSteps, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Proses() {
  return (
    <section id="proses" className="section proses-section" data-bg="ink">
      <div className="proses-glow" />
      <SectionMeta index={6} total={TOTAL_SECTIONS} label="Process / Timeline" />

      <div className="proses-grid">
        {/* LEFT — sticky title block */}
        <div className="proses-aside">
          <Reveal>
            <div className="proses-eyebrow">↗ Cara Kerja</div>
            <h2 className="proses-title">
              Dari Kickoff<br />
              sampai{" "}
              <span className="proses-title-gold">
                Go Live
                <span className="proses-title-underline" />
              </span>
              <br />
              dalam 1 Bulan.
            </h2>
            <p className="proses-body">
              Lima fase, satu sprint. Setiap fase punya deliverable konkret dan
              checkpoint bersama tim Kudamas.
            </p>
            <div className="proses-badge">
              <span className="proses-badge-dot" />
              <span className="proses-badge-label">Total: 31 Hari Kerja</span>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — timeline */}
        <div className="proses-timeline">
          <div className="proses-timeline-line" />
          {prosesSteps.map((step, index) => (
            <Reveal key={step.n} delay={index * 80}>
              <div className="proses-row">
                <div className={`proses-dot${step.highlight ? " proses-dot--active" : ""}`}>
                  {step.n}
                </div>
                <div className="proses-content">
                  <div className="proses-content-head">
                    <div className="proses-step-title">{step.t}</div>
                    <div className="proses-step-dur">{step.dur}</div>
                  </div>
                  <p className="proses-step-desc">{step.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
