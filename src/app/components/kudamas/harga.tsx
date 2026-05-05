import { hargaData, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

function HargaCard() {
  return (
    <div className="harga-card">
      <span className="harga-badge">{hargaData.badge}</span>
      <div className="mono price-label">{hargaData.label}</div>
      <div className="price-value">{hargaData.value}</div>
      <div className="price-subtext">{hargaData.subtext}</div>
      <ul>
        {hargaData.includes.map((item) => (
          <li key={item}>
            <span>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <a href="#penutup" className="btn">
        {hargaData.cta} <span className="arrow">↗</span>
      </a>
    </div>
  );
}

export function Harga() {
  const [before, after] = hargaData.title.split("Tanpa");

  return (
    <section id="harga" className="section">
      <SectionMeta index={6} total={TOTAL_SECTIONS} label="Investment" />
      <div className="split-grid price-grid">
        <Reveal>
          <div className="eyebrow">{hargaData.tag}</div>
          <h2 className="section-title">
            {before}
            <em>Tanpa</em>
            {after}
          </h2>
          <p className="price-note">{hargaData.noteText}</p>
          <div className="mono muted-text">Apa yang Kudamas dapatkan</div>
          <ul className="value-list">
            {hargaData.valueChecklist.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <strong>✓</strong>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={140}>
          <HargaCard />
        </Reveal>
      </div>
    </section>
  );
}
