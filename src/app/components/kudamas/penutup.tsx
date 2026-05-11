import { TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

const contactItems = [
  { label: "WhatsApp", value: "+62 851-6944-0023" },
  { label: "Email", value: "danielfebrian61@gmail.com" },
  { label: "Response", value: "< 24 jam" },
  { label: "Slot", value: "Q1–Q2 2026 · 2 tersisa" },
];

export function Penutup() {
  return (
    <section id="penutup" className="penutup-section" data-bg="ink">
      <div className="penutup-deco-k">K</div>
      <div className="penutup-hairline" />
      <SectionMeta index={8} total={TOTAL_SECTIONS} label="Get In Touch" />

      <div className="penutup-grid">
        {/* LEFT — headline + body */}
        <div>
          <Reveal>
            <div className="penutup-eyebrow">↗ Mari Mulai Percakapan</div>
            <h2 className="penutup-title">
              Mari<br />
              <span className="penutup-title-script">berkenalan</span><br />
              dengan Daniel.
            </h2>
            <div className="penutup-note">
              <p>
                Independent developer Jakarta. Spesialis website &amp; headless CMS
                untuk brand premium yang ingin lepas dari ketergantungan vendor.
              </p>
              <p className="penutup-note-sub">
                30 menit konsultasi gratis — tanpa komitmen, tanpa biaya, tanpa pitch agresif.
              </p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — contact card */}
        <div className="penutup-card-wrap">
          <Reveal delay={100}>
            <div className="penutup-card">
              <div className="penutup-card-corner">N°01</div>
              <div className="penutup-card-by">Disiapkan Oleh</div>
              <div className="penutup-card-name">Daniel</div>
              <div className="penutup-card-role">independent developer</div>

              <div className="penutup-card-divider">
                <span /><span>···</span><span />
              </div>

              <ul className="penutup-contact-list">
                {contactItems.map((item) => (
                  <li key={item.label}>
                    <span className="penutup-contact-label">{item.label}</span>
                    <span className="penutup-contact-value">{item.value}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/6285169440023"
                target="_blank"
                rel="noreferrer"
                className="penutup-cta"
              >
                Mulai via WhatsApp <span>↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="penutup-floating-tag">✦ Tersedia 2026</div>
          </Reveal>
        </div>
      </div>

      {/* Spread row */}
      <Reveal delay={200}>
        <div className="penutup-spread">
          <div className="penutup-spread-block">
            <div className="penutup-spread-sub">Project —</div>
            <div className="penutup-spread-val">2026 / 01</div>
          </div>
          <span className="penutup-spread-line" />
          <div className="penutup-spread-block penutup-spread-block--center">
            <div className="penutup-spread-script">Salud</div>
            <div className="penutup-spread-sub">— Cheers to PT Kudamas —</div>
          </div>
          <span className="penutup-spread-line" />
          <div className="penutup-spread-block penutup-spread-block--right">
            <div className="penutup-spread-sub">Edisi</div>
            <div className="penutup-spread-val">I / MMXXVI</div>
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <div className="penutup-footer">
        <span>© Daniel · Pitch Deck untuk PT Kudamas</span>
        <a href="#hero" className="penutup-footer-back">Kembali ke Atas ↑</a>
        <span>Built with Next.js + Sanity</span>
      </div>
    </section>
  );
}
