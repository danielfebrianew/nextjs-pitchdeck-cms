import { fiturItems, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Fitur() {
  return (
    <section id="fitur" className="fitur-section">
      <div className="fitur-hairline-top" />
      <SectionMeta index={4} total={TOTAL_SECTIONS} label="Capabilities" />

      <Reveal>
        <div className="fitur-headline">
          <div className="fitur-eyebrow">Keunggulan</div>
          <h2 className="fitur-title">Brand Premium</h2>
          <div className="fitur-script">Empat Keunggulan Utama</div>
          <p className="fitur-body">
            Dirancang khusus untuk kebutuhan brand wine premium Indonesia — bukan template generic
            <br />
            atau adaptasi dari blog engine. Setiap detail mendukung positioning Kudamas.
          </p>
        </div>
      </Reveal>

      <div className="fitur-grid">
        {fiturItems.map((item, index) => (
          <Reveal key={item.name} delay={index * 100}>
            <div className={`fitur-col${index < fiturItems.length - 1 ? " fitur-col--border" : ""}`}>
              <div className="fitur-col-num">— {String(index + 1).padStart(2, "0")} —</div>
              <div className="fitur-col-title">{item.name}</div>
              <div className="fitur-col-desc">{item.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="fitur-hairline-bottom" />
    </section>
  );
}
