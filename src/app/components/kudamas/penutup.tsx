import Image from "next/image";
import { TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Penutup() {
  return (
    <section id="penutup" className="section section-ink closing-section" data-bg="ink">
      <SectionMeta index={7} total={TOTAL_SECTIONS} label="Get In Touch" />

      <div className="closing-grid">
        <Reveal>
          <div className="eyebrow">Mari Mulai</div>
          <h2 className="closing-title">
            Siap Punya Website yang <em>Setara Brand Kudamas?</em>
          </h2>
          <p>
            Saya Daniel, independent developer yang akan menangani proyek ini
            end-to-end. 30 menit konsultasi gratis untuk diskusi kebutuhan tim
            Kudamas, tanpa komitmen.
          </p>
          <div className="closing-actions">
            <a
              href="https://wa.me/6285169440023"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              WhatsApp +62 851-6944-0023 <span className="arrow">↗</span>
            </a>
            <a href="#hero" className="btn btn-dark-ghost">
              Kembali ke atas <span className="arrow">↑</span>
            </a>
          </div>
          <div className="closing-meta">
            <div>
              <span className="mono">Disiapkan oleh</span>
              <strong>Daniel / Independent Dev</strong>
            </div>
            <div>
              <span className="mono">Available</span>
              <strong>Q1-Q2 2026 / 2 slot</strong>
            </div>
            <div>
              <span className="mono">Response</span>
              <strong>&lt; 24 jam</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="closing-mark">
          <Image
            src="/kudamas-merah.png"
            alt="Kudamas Merah wine bottle"
            fill
            style={{ objectFit: "contain", objectPosition: "center bottom" }}
            sizes="(max-width: 880px) 100vw, 40vw"
          />
          <span>
            <i />
            <span className="mono">PT KUDAMAS / 2026</span>
          </span>
        </Reveal>
      </div>

      <div className="footer-line">
        <span className="mono">Daniel / Pitch Deck untuk PT Kudamas - Edisi 01</span>
        <span className="mono">Built with Next.js + Framer Motion + Sanity</span>
      </div>
    </section>
  );
}
