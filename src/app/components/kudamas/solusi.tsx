import { solusiPoints, TOTAL_SECTIONS } from "./constants";
import { CmsMockup } from "./cms-mockup";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Solusi() {
  return (
    <section id="solusi" className="section">
      <SectionMeta index={3} total={TOTAL_SECTIONS} label="The Solution" />
      <div className="split-grid solution-grid">
        <Reveal>
          <CmsMockup />
        </Reveal>

        <div>
          <Reveal>
            <div className="eyebrow">Solusi</div>
            <h2 className="section-title">
              Satu Dashboard, <em>Seluruh Konten</em> Kudamas.
            </h2>
            <p className="body-copy">
              Coba edit field di sebelah, lalu klik <strong>Save & Publish</strong>.
              Begitulah tim marketing Kudamas akan bekerja setiap hari.
            </p>
          </Reveal>

          <div className="solution-list">
            {solusiPoints.map((point, index) => (
              <Reveal key={point.icon} delay={index * 90}>
                <div className="solution-item">
                  <div>{point.icon}</div>
                  <section>
                    <h3>{point.title}</h3>
                    <p>{point.desc}</p>
                  </section>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
