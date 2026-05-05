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
              Edit Konten<br />
              <span className="hdt-line2">
                Tanpa{" "}
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
              <br />
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

        {/* RIGHT */}
        <Reveal className="hero-panel-col" delay={120}>
          {/* "made for modern brand" handwritten note */}
          <div className="hero-handwritten" aria-hidden>
            <span className="hero-handwritten-made">made for</span>
            <span className="hero-handwritten-brand mono">modern brand</span>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M12 2 L13.5 9 L21 10.5 L15 15.5 L17 22 L12 18 L7 22 L9 15.5 L3 10.5 L10.5 9 Z"
                fill="none"
                stroke="#c9a961"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="hero-panel-meta">
            <span className="mono">Edisi 01 — Proposal</span>
            <span className="mono">by Daniel · 2026</span>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-glow" />

            {/* bottle image */}
            <Image
              src="/kudamas-hero.png"
              alt="Kudamas wine bottle"
              fill
              sizes="(max-width: 880px) 100vw, 45vw"
              style={{ objectFit: "contain", objectPosition: "center bottom" }}
              priority
            />

            {/* giant decorative K */}
            <div className="hero-panel-k" aria-hidden>K</div>

            {/* stamp */}
            <div className="hero-panel-stamp mono">Proposal — 2026</div>

            <div className="hero-panel-footer">
              <span className="mono">Independent Developer</span>
              <span className="hero-arrow-badge">↗</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
