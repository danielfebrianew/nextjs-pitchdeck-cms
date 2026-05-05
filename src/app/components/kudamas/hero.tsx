"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { heroStats, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

function ScrapbookReveal({
  children,
  className,
  delay,
  rotate = 0,
  x,
  y = 24,
  ariaHidden,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  rotate?: number;
  x?: string;
  y?: number;
  ariaHidden?: boolean;
}) {
  const transformBase = x ? { x } : {};

  return (
    <motion.div
      aria-hidden={ariaHidden}
      className={className}
      initial={{ opacity: 0, y, rotate, ...transformBase }}
      whileInView={{ opacity: 1, y: 0, rotate, ...transformBase }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

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
        <div className="hero-scrapbook">
          {/* dark crimson bg */}
          <motion.div
            className="sb-fabric"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />

          {/* meta label */}
          <ScrapbookReveal ariaHidden className="sb-meta" delay={220} y={12}>
            <span className="mono">Edisi 01 — Proposal</span>
            <span className="mono">by Daniel · 2026</span>
          </ScrapbookReveal>

          {/* polaroid kiri atas — anchored to .hero-scrapbook, overlaps left edge */}
          <ScrapbookReveal className="sb-polaroid sb-polaroid-1" delay={560} rotate={-12}>
            <Image
              src="/polaroid-1.png"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "cover" }}
            />
          </ScrapbookReveal>

          {/* polaroid kanan atas — anchored to .hero-scrapbook, overlaps right edge */}
          <ScrapbookReveal className="sb-polaroid sb-polaroid-2" delay={460} rotate={6}>
            <Image
              src="/polaroid-2.png"
              alt=""
              fill
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "cover" }}
            />
          </ScrapbookReveal>

          {/* paper stage — all content below is anchored to this */}
          <ScrapbookReveal ariaHidden className="sb-paper-wrap" delay={320} y={30}>
            <Image
              src="/jukebox.png"
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 900px) 40vw, 900px"
              style={{ objectFit: "fill" }}
            />

            {/* botol */}
            <ScrapbookReveal className="sb-bottle" delay={660} x="-50%" y={28}>
              <Image
                src="/kudamas-transparent.png"
                alt="Kudamas wine bottle"
                fill
                sizes="(max-width: 768px) 18vw, 320px"
                style={{ objectFit: "contain", objectPosition: "center bottom" }}
                priority
              />
            </ScrapbookReveal>

            {/* sticky note kanan bawah */}
            <ScrapbookReveal className="sb-note" delay={760} rotate={17} y={20}>
              <Image
                src="/note.png"
                alt=""
                fill
                sizes="(max-width: 768px) 40vw, 900px"
                style={{ objectFit: "contain" }}
              />
            </ScrapbookReveal>

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
            <ScrapbookReveal className="sb-handwrite" delay={860} rotate={-2} y={14}>
              Good wine<br />Good night<br />Good story ✦
            </ScrapbookReveal>

            <motion.span
              className="sb-star sb-star-1"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 0.55, scale: 1 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.45, delay: 0.96, ease: [0.22, 0.61, 0.36, 1] }}
            >
              ✦
            </motion.span>
            <motion.span
              className="sb-star sb-star-2"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 0.55, scale: 1 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.45, delay: 1.04, ease: [0.22, 0.61, 0.36, 1] }}
            >
              ✦
            </motion.span>
          </ScrapbookReveal>
        </div>
      </div>
    </section>
  );
}
