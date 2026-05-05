import { solusiPoints, TOTAL_SECTIONS } from "./constants";
import { CmsMockup } from "./cms-mockup";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Solusi() {
  return (
    <section id="solusi" className="section solusi-section" data-bg="ink">
      <div className="solusi-glow" />
      <SectionMeta index={3} total={TOTAL_SECTIONS} label="The Solution" />

      <div className="solusi-grid">
        {/* LEFT — copy */}
        <div>
          <div className="solusi-eyebrow">↗ Solusi yang Diusulkan</div>

          <h2 className="solusi-title">
            Satu Dashboard,<br />
            <span className="solusi-title-gold">
              Seluruh Konten
              <span className="solusi-title-underline" />
            </span>
            <br />
            Kudamas.
          </h2>

          <p className="solusi-body">
            Coba edit field di sebelah — lalu klik{" "}
            <strong className="solusi-body-strong">Save &amp; Publish</strong>.
            Begitulah tim marketing Kudamas akan bekerja, setiap hari — tanpa
            coding, tanpa menunggu developer.
          </p>

          <div className="solusi-list">
            {solusiPoints.map((point, index) => (
              <Reveal key={point.icon} delay={index * 100}>
                <div className="solusi-item">
                  <div className="solusi-item-icon">{point.icon}</div>
                  <div>
                    <div className="solusi-item-title">{point.title}</div>
                    <div className="solusi-item-desc">{point.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — CMS mockup */}
        <Reveal>
          <CmsMockup />
        </Reveal>
      </div>
    </section>
  );
}
