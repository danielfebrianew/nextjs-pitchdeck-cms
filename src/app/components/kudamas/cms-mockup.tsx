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
    <label className="field">
      <span>{label}</span>
      {multi ? (
        <textarea
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={readOnly}
          rows={2}
          className={`cms-input ${active ? "active" : ""}`}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={readOnly}
          className={`cms-input ${active ? "active" : ""}`}
        />
      )}
    </label>
  );
}

function ListField({ items }: { items: string[] }) {
  return (
    <div className="list-field">
      <div className="list-label">Daftar Kampanye Aktif</div>
      {items.map((item, index) => (
        <div key={item} className="list-item">
          <span>
            {index + 1}. {item}
          </span>
          <span>⋮⋮</span>
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
    <div className="cms-mockup">
      <div className="browser-bar">
        <span />
        <span />
        <span />
        <small>kudamas.co.id/admin/produk</small>
      </div>

      <div className="cms-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={active === tab.id ? "active" : ""}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <div className="production-dot">● Production</div>
      </div>

      <div className="cms-body">
        {active === "produk" && (
          <>
            <Field
              label="Nama Produk"
              value={values.nama}
              active
              onChange={(nama) => setValues({ ...values, nama })}
            />
            <Field
              label="Tagline"
              value={values.tagline}
              multi
              onChange={(tagline) => setValues({ ...values, tagline })}
            />
            <Field
              label="Deskripsi Tasting Notes"
              value={values.deskripsi}
              multi
              onChange={(deskripsi) => setValues({ ...values, deskripsi })}
            />
            <Field
              label="Harga Retail"
              value={values.harga}
              onChange={(harga) => setValues({ ...values, harga })}
            />
          </>
        )}

        {active === "kampanye" && (
          <>
            <Field label="Judul Banner" value="Koleksi Edisi Imlek 2026" active />
            <Field
              label="Sub-headline"
              value="Dapatkan Reserve 2021 dengan kemasan eksklusif"
            />
            <ListField
              items={[
                "Hero Banner - Reserve 2021",
                "Sale Imlek - 15% off",
                "Gift Set Edition",
                "Wine & Dine Pairing Guide",
              ]}
            />
          </>
        )}

        {active === "distributor" && (
          <>
            <Field label="Distributor Utama" value="PT Anggur Nusantara" />
            <Field label="Wilayah" value="Jakarta / Bandung / Bali" />
          </>
        )}

        {active === "seo" && (
          <>
            <Field
              label="Meta Title"
              value="PT Kudamas - Anggur Merah Premium Indonesia"
            />
            <Field
              label="Meta Description"
              value="Koleksi anggur merah premium dari kebun anggur Bukit Gunung Halu."
              multi
            />
          </>
        )}

        <div className="publish-row">
          <span className={saved ? "saved" : ""}>
            {saved ? "Published - semua field tersimpan" : "Draft tidak tersimpan"}
          </span>
          <button type="button" onClick={handlePublish} disabled={publishing}>
            {publishing ? "Publishing..." : "Save & Publish ↗"}
          </button>
        </div>
      </div>

    </div>
  );
}
