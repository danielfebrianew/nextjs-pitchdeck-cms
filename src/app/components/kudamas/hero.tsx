"use client";

import Image from "next/image";
import { heroStats, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      data-bg="ink"
    >
      {/* radial glow */}
      <div className="hero-bg-glow" />

      <SectionMeta index={1} total={TOTAL_SECTIONS} label="Proposal Website + Headless CMS" />

      <div className="hero-main-grid">
        {/* LEFT */}
        <div className="hero-copy-col">
          <Reveal>
            <div className="hero-eyebrow mono">★ Proposal untuk PT Kudamas</div>

            <h1 className="hero-display-title">
              <span className="hdt-line1">Edit Konten</span>
              <span className="hdt-line2">
                <span className="hdt-tanpa">
                  Tanpa
                  <svg viewBox="0 0 180 14" className="hdt-strike" preserveAspectRatio="none" aria-hidden>
                    <path
                      d="M 4 7 Q 40 4 90 7 Q 140 10 176 6"
                      fill="none"
                      stroke="#f4ead4"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    <path
                      d="M 8 9 Q 50 6 100 9 Q 148 12 174 8"
                      fill="none"
                      stroke="#f4ead4"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      opacity="0.45"
                    />
                  </svg>
                </span>{" "}
                <span className="hdt-coding">
                  Coding
                  {/* red scribble circle */}
                  <svg
                    viewBox="0 0 240 110"
                    className="hdt-scribble"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <defs>
                      <filter id="roughInk">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
                        <feDisplacementMap in="SourceGraphic" scale="2.5" />
                      </filter>
                    </defs>
                    <path
                      d="M 24 58 Q 18 30 60 18 Q 110 8 170 14 Q 218 22 224 52 Q 230 84 178 96 Q 110 104 56 96 Q 14 88 22 60 Q 28 36 70 26"
                      fill="none"
                      stroke="#e85a5a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: "url(#roughInk)" }}
                    />
                    <path
                      d="M 28 64 Q 24 38 70 24 Q 130 14 184 22 Q 220 30 218 58"
                      fill="none"
                      stroke="#e85a5a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </span>
              </span>
              <span className="hdt-gold">
                Sama Sekali.
                {/* gold underline scribble */}
                <svg
                  viewBox="0 0 320 14"
                  className="hdt-underline"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M 4 8 Q 60 2 130 7 Q 220 12 316 5"
                    fill="none"
                    stroke="#c9a961"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
            </h1>

            <p className="hero-body">
              Proposal website &amp; headless CMS untuk PT Kudamas. Tampilkan
              koleksi anggur merah dengan elegan — tim Anda kelola konten secara
              mandiri, tanpa pernah membuka kode.
            </p>

            <div className="hero-actions">
              <a href="#masalah" className="btn hero-btn-primary">
                Lihat Penjelasan <span className="arrow">↗</span>
              </a>
              <a href="#harga" className="btn hero-btn-ghost">
                Lihat Investasi
              </a>
            </div>

            <div className="hero-stats">
              {heroStats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="hero-stat-value">{s.value}</div>
                  <div className="hero-stat-label mono">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — Scrapbook Panel */}
        <Reveal className="hero-scrapbook" delay={120}>
          {/* dark crimson bg */}
          <div className="sb-fabric" />

          {/* meta label */}
          <div className="sb-meta" aria-hidden>
            <span className="mono">Edisi 01 — Proposal</span>
            <span className="mono">by Daniel · 2026</span>
          </div>

          {/* polaroid kiri atas — anchored to .hero-scrapbook, overlaps left edge */}
          <div className="sb-polaroid sb-polaroid-1">
            <Image
              src="/polaroid-1.png"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* polaroid kanan atas — anchored to .hero-scrapbook, overlaps right edge */}
          <div className="sb-polaroid sb-polaroid-2">
            <Image
              src="/polaroid-2.png"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* paper stage — all content below is anchored to this */}
          <div className="sb-paper-wrap" aria-hidden>
            <Image
              src="/torn-paper.png"
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "fill" }}
            />

            {/* botol */}
            <div className="sb-bottle">
              <Image
                src="/kudamas-transparent.png"
                alt="Kudamas wine bottle"
                fill
                sizes="(max-width: 768px) 18vw, 320px"
                style={{ objectFit: "contain", objectPosition: "center bottom" }}
                priority
              />
            </div>

            {/* sticky note kanan bawah */}
            <div className="sb-note">
              <Image
                src="/note.png"
                alt=""
                fill
                sizes="(max-width: 768px) 40vw, 900px"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* grape polaroid bawah kiri */}
            {/* <div className="sb-polaroid sb-polaroid-3">
              <Image
                src="/grape-polaroid.png"
                alt=""
                fill
                sizes="(max-width: 768px) 40vw, 900px"
                style={{ objectFit: "cover" }}
              />
            </div> */}

            {/* handwriting */}
            <div className="sb-handwrite">
              Good wine<br />Good night<br />Good story ✦
            </div>

            <span className="sb-star sb-star-1">✦</span>
            <span className="sb-star sb-star-2">✦</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
