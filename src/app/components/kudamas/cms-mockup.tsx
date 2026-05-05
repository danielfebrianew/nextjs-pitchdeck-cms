"use client";

import { useState } from "react";

type FieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  active?: boolean;
  multi?: boolean;
};

function Field({ label, value, onChange, active = false, multi = false }: FieldProps) {
  const readOnly = !onChange;

  return (
    <label className="wine-field">
      <span className={`wine-field-label${active ? " wine-field-label--active" : ""}`}>
        {label}{active && <span className="wine-field-active-dot">●</span>}
      </span>
      {multi ? (
        <textarea
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={readOnly}
          rows={2}
          className={`wine-input${active ? " wine-input--active" : ""}`}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={readOnly}
          className={`wine-input${active ? " wine-input--active" : ""}`}
        />
      )}
    </label>
  );
}

function ListField({ items }: { items: string[] }) {
  return (
    <div className="wine-list-field">
      <div className="wine-list-label">Daftar Kampanye Aktif</div>
      {items.map((item, index) => (
        <div key={item} className="wine-list-item">
          <span>
            <span className="wine-list-num">{String(index + 1).padStart(2, "0")}</span>
            {item}
          </span>
          <span className="wine-list-drag">⋮⋮</span>
        </div>
      ))}
    </div>
  );
}

export function CmsMockup() {
  const [active, setActive] = useState("produk");
  const [values, setValues] = useState({
    nama: "Kudamas Reserve 2021",
    tagline: "Anggur Merah Premium dari Bukit Gunung Halu",
    deskripsi:
      "Cabernet Sauvignon dengan karakter buah merah matang, tanin halus, dan finish yang berkelas.",
    harga: "Rp 850.000",
  });
  const [saved, setSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const tabs = [
    { id: "produk", label: "Produk" },
    { id: "kampanye", label: "Kampanye" },
    { id: "distributor", label: "Distributor" },
    { id: "seo", label: "SEO" },
  ];

  function handlePublish() {
    setPublishing(true);
    window.setTimeout(() => {
      setPublishing(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    }, 700);
  }

  return (
    <div className="wine-cms-mockup">
      <div className="wine-cms-corner-glow" />

      {/* Window chrome */}
      <div className="wine-cms-chrome">
        <span className="wine-cms-dot wine-cms-dot--red" />
        <span className="wine-cms-dot wine-cms-dot--gold" />
        <span className="wine-cms-dot wine-cms-dot--dim" />
        <span className="wine-cms-url">kudamas.co.id / admin</span>
        <span className="wine-cms-live">● Live</span>
      </div>

      {/* Tabs */}
      <div className="wine-cms-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`wine-cms-tab${active === tab.id ? " wine-cms-tab--active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="wine-cms-body">
        {active === "produk" && (
          <>
            <Field label="Nama Produk" value={values.nama} active onChange={(nama) => setValues({ ...values, nama })} />
            <Field label="Tagline" value={values.tagline} multi onChange={(tagline) => setValues({ ...values, tagline })} />
            <Field label="Deskripsi Tasting Notes" value={values.deskripsi} multi onChange={(deskripsi) => setValues({ ...values, deskripsi })} />
            <Field label="Harga Retail" value={values.harga} onChange={(harga) => setValues({ ...values, harga })} />
          </>
        )}

        {active === "kampanye" && (
          <>
            <Field label="Judul Banner" value="Koleksi Edisi Imlek 2026" active />
            <Field label="Sub-headline" value="Dapatkan Reserve 2021 dengan kemasan eksklusif" />
            <ListField items={["Hero Banner — Reserve 2021", "Sale Imlek — 15% off", "Gift Set Edition", "Wine & Dine Pairing Guide"]} />
          </>
        )}

        {active === "distributor" && (
          <>
            <Field label="Distributor Utama" value="PT Anggur Nusantara" />
            <Field label="Wilayah" value="Jakarta · Bandung · Bali" />
          </>
        )}

        {active === "seo" && (
          <>
            <Field label="Meta Title" value="PT Kudamas — Anggur Merah Premium Indonesia" />
            <Field label="Meta Description" value="Koleksi anggur merah premium dari kebun anggur Bukit Gunung Halu." multi />
          </>
        )}

        <div className="wine-cms-publish-row">
          <span className={`wine-cms-status${saved ? " wine-cms-status--saved" : ""}`}>
            {saved ? "✓ Published — semua field tersimpan" : "○ Draft tidak tersimpan"}
          </span>
          <button type="button" className="wine-cms-publish-btn" onClick={handlePublish} disabled={publishing}>
            {publishing ? "Publishing…" : "Save & Publish ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
