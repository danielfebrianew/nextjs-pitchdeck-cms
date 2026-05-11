"use client";

import { useEffect, useState } from "react";
import { backendOptions, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

type Product = {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

type PanelData = {
  products: Product[];
  loading: boolean;
  isMock: boolean;
};

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function ProductList({ products, loading, isMock, theme }: PanelData & { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  if (loading) {
    return (
      <div className="bc-product-list">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`bc-product-skeleton${isDark ? " bc-product-skeleton--dark" : ""}`} />
        ))}
      </div>
    );
  }

  if (!isMock && products.length === 0) {
    return (
      <div className={`bc-empty${isDark ? " bc-empty--dark" : ""}`}>
        <div className="bc-empty-icon">○</div>
        <div className="bc-empty-text">Belum ada produk</div>
        <div className="bc-empty-sub">Tambahkan produk di Sanity Studio</div>
      </div>
    );
  }

  return (
    <div className="bc-product-list">
      {isMock && (
        <div className={`bc-demo-badge${isDark ? " bc-demo-badge--dark" : ""}`}>Demo Mode</div>
      )}
      {products.map((p, i) => (
        <div key={p._id ?? p.id ?? i} className={`bc-product-item${isDark ? " bc-product-item--dark" : ""}`}>
          {p.imageUrl && (
            <div className="bc-product-img-wrap">
              <img src={p.imageUrl} alt={p.name} className="bc-product-img" />
            </div>
          )}
          <div className="bc-product-info">
            <div className="bc-product-name">{p.name}</div>
            <div className="bc-product-desc">{p.description}</div>
            <div className="bc-product-price">{formatRupiah(p.price)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Panel({ option, data }: { option: (typeof backendOptions)[0]; data: PanelData }) {
  const isDark = option.theme === "dark";

  return (
    <div className={`bc-panel${isDark ? " bc-panel--dark" : " bc-panel--light"}`}>
      <div className="bc-panel-badges">
        {option.recommended && (
          <div className="bc-recommended-badge">★ Rekomendasi</div>
        )}
        <div className={`bc-panel-tag${isDark ? " bc-panel-tag--dark" : ""}`}>{option.tag}</div>
      </div>

      <div className="bc-panel-header">
          <h3 className="bc-panel-title">{option.label}</h3>
        <p className="bc-panel-subtitle">{option.subtitle}</p>
      </div>

      <div className="bc-panel-pros">
        {option.pros.map((p) => (
          <div key={p} className="bc-panel-pro">
            <span className="bc-check">✓</span>
            {p}
          </div>
        ))}
      </div>

      <div className="bc-panel-cons">
        {option.cons.map((c) => (
          <div key={c} className="bc-panel-con">
            <span className="bc-warn">⚠</span>
            {c}
          </div>
        ))}
      </div>

      <div className={`bc-panel-divider${isDark ? " bc-panel-divider--dark" : ""}`} />

      <div className="bc-live-label">
        <span className="bc-live-dot" />
        Live dari {isDark ? "NestJS API" : "Sanity CMS"}
      </div>
      <ProductList {...data} theme={option.theme} />

      <div className={`bc-best-for${isDark ? " bc-best-for--dark" : ""}`}>
        <span className="bc-best-for-label">Cocok untuk:</span>
        <span>{option.bestFor}</span>
      </div>
    </div>
  );
}

export function BackendComparison() {
  const [customData, setCustomData] = useState<PanelData>({ products: [], loading: true, isMock: false });
  const [sanityData, setSanityData] = useState<PanelData>({ products: [], loading: true, isMock: false });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setCustomData({ products: data.products, loading: false, isMock: false });
      })
      .catch(() => {
        setCustomData({ products: [], loading: false, isMock: true });
      });

    fetch("/api/sanity-products")
      .then((r) => r.json())
      .then(({ products, isMock }) => {
        setSanityData({ products, loading: false, isMock });
      })
      .catch(() => {
        setSanityData({ products: [], loading: false, isMock: true });
      });
  }, []);

  const panelData = [customData, sanityData];

  return (
    <section id="backend" className="bc-section">
      <div className="bc-header">
        <SectionMeta index={4} total={TOTAL_SECTIONS} label="Backend Options" />
        <Reveal>
          <div className="bc-eyebrow">↗ Pilih Solusi Backend Anda</div>
          <h2 className="bc-headline">
            <span className="bc-headline-dark">Custom API</span>
            <span className="bc-headline-sep"> vs </span>
            <span className="bc-headline-light">Sanity CMS</span>
          </h2>
          <p className="bc-subheadline">
            Dua pendekatan berbeda, keduanya headless — pilih sesuai kebutuhan bisnis Anda.
          </p>
        </Reveal>
      </div>

      <div className="bc-panels">
        {backendOptions.map((option, i) => (
          <Reveal key={option.id} delay={i * 120} className="bc-panel-reveal">
            <Panel option={option} data={panelData[i]} />
          </Reveal>
        ))}
      </div>

      <div className="bc-cta-wrap">
        <Reveal delay={200}>
          <div className="bc-cta-row">
            <a href="#penutup" className="bc-cta-btn">
              <span className="bc-cta-half bc-cta-half--dark">Konsultasi Pilihan Backend →</span>
              <span className="bc-cta-half bc-cta-half--light" aria-hidden>Konsultasi Pilihan Backend →</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
