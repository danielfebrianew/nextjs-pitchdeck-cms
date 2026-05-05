import { fiturItems, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Fitur() {
  return (
    <section id="fitur" className="section section-ink" data-bg="ink">
      <SectionMeta index={4} total={TOTAL_SECTIONS} label="Capabilities" />
      <div className="feature-heading">
        <div>
          <Reveal>
            <div className="eyebrow">Keunggulan</div>
            <h2 className="section-title">
              Empat <em>Keunggulan</em>
              <br />
              untuk Brand Premium.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <p>
            Dirancang khusus untuk kebutuhan brand wine premium, bukan template
            generic atau adaptasi dari blog engine.
          </p>
        </Reveal>
      </div>

      <div className="feature-grid">
        {fiturItems.map((item, index) => (
          <Reveal key={item.name} delay={index * 90}>
            <article className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="mono">{item.tag}</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
