import { painItems, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function PainPoints() {
  return (
    <section id="masalah" className="section section-cream">
      <SectionMeta index={2} total={TOTAL_SECTIONS} label="The Problem" />
      <div className="split-grid problem-grid">
        <div>
          <Reveal>
            <div className="eyebrow">Masalah</div>
            <h2 className="section-title">
              Brand Premium, Tapi <em>Website-nya</em> Belum.
            </h2>
            <div className="short-line" />
            <p className="mono muted-text">
              4 friction yang dihadapi brand wine premium
            </p>
          </Reveal>
        </div>

        <div className="pain-grid">
          {painItems.map((item, index) => (
            <Reveal key={item.number} delay={index * 90}>
              <div className="pain-card">
                <div className="pain-number">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
