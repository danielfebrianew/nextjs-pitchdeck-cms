import { hargaData, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Harga() {
  return (
    <section id="harga" className="harga-section">
      <div className="harga-deco-num">5</div>
      <div className="harga-hairline" />
      <SectionMeta index={6} total={TOTAL_SECTIONS} label="Investment" />

      <div className="harga-grid">
        {/* LEFT — investment card */}
        <div className="harga-card-wrap">
          <Reveal>
            <div className="harga-card-new">
              <div className="harga-card-corner">N°01</div>
              <div className="harga-card-tag-label">Paket Lengkap</div>
              <div className="harga-card-price">{hargaData.value}</div>
              <div className="harga-card-subprice">jual putus, satu kali</div>

              <div className="harga-card-divider">
                <span />
                <span>···</span>
                <span />
              </div>

              <div className="harga-card-includes-label">Termasuk</div>
              <ul className="harga-card-includes">
                {hargaData.includes.map((item) => (
                  <li key={item}>
                    <span className="harga-card-check">✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#penutup" className="harga-card-cta">
                {hargaData.cta} <span>↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="harga-floating-tag">✦ One-Time Payment</div>
          </Reveal>
        </div>

        {/* RIGHT — headline + benefit list */}
        <div>
          <Reveal>
            <div className="harga-eyebrow">↗ Investasi</div>
            <h2 className="harga-title">
              Bayar Sekali,<br />
              <span className="harga-title-script">miliki selamanya.</span>
            </h2>
            <div className="harga-note">
              <p>
                Bukan sekadar website — ini investasi jangka panjang untuk kemandirian
                digital Kudamas. Tim Anda mendapat kontrol penuh, tanpa biaya bulanan,
                tanpa ketergantungan vendor.
              </p>
            </div>

            <div className="harga-benefit-header">Apa Yang Kudamas Dapatkan</div>
            <div className="harga-benefit-list">
              {hargaData.valueChecklist.map((item, index) => (
                <Reveal key={item} delay={index * 80}>
                  <div className="harga-benefit-row">
                    <div>
                      <div className="harga-benefit-title">{item}</div>
                    </div>
                    <span className="harga-benefit-check">✦</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
