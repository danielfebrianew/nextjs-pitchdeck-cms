"use client";

import { useEffect, useRef, useState } from "react";
import { backendOptions, TOTAL_SECTIONS } from "./constants";
import { Reveal } from "./reveal";
import { SectionMeta } from "./section-meta";

const NESTJS_BASE = "http://localhost:3001";

type NestProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  vintage?: number;
  region?: string;
  varietal?: string;
  stock?: number;
  imageUrl?: string;
};

type SanityProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  vintage?: number;
  region?: string;
  varietal?: string;
  imageUrl?: string;
};

type PanelData = {
  products: SanityProduct[];
  loading: boolean;
  isMock: boolean;
};

function formatRupiah(n: number | undefined | null) {
  if (n == null || isNaN(Number(n))) return "Rp —";
  return "Rp " + Number(n).toLocaleString("id-ID");
}

// ─── NestJS CRUD Modal ───────────────────────────────────────────────

type ModalMode = "view" | "edit" | "create";

function NestModal({
  product,
  mode: initialMode,
  onClose,
  onSaved,
  onDeleted,
}: {
  product: NestProduct | null;
  mode: ModalMode;
  onClose: () => void;
  onSaved: (p: NestProduct) => void;
  onDeleted: (id: string) => void;
}) {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    vintage: product?.vintage ?? "",
    region: product?.region ?? "",
    varietal: product?.varietal ?? "",
    stock: product?.stock ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleField(k: string, v: string | number) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(productId: string, file: File): Promise<void> {
    const res = await fetch(`${NESTJS_BASE}/products/${productId}/image-upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type, fileName: file.name }),
    });
    const { uploadUrl, key } = await res.json();
    await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    await fetch(`${NESTJS_BASE}/products/${productId}/image-key`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        ...(form.vintage ? { vintage: Number(form.vintage) } : {}),
        ...(form.region ? { region: form.region } : {}),
        ...(form.varietal ? { varietal: form.varietal } : {}),
        stock: Number(form.stock),
      };

      const isCreate = mode === "create";
      const url = isCreate ? `${NESTJS_BASE}/products` : `${NESTJS_BASE}/products/${product!.id}`;
      const res = await fetch(url, {
        method: isCreate ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const saved: NestProduct = await res.json();

      if (imageFile) await uploadImage(saved.id, imageFile);

      const final = await fetch(`${NESTJS_BASE}/products/${saved.id}`).then((r) => r.json());
      onSaved(final);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    setDeleting(true);
    try {
      await fetch(`${NESTJS_BASE}/products/${product.id}`, { method: "DELETE" });
      onDeleted(product.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  const isView = mode === "view";

  return (
    <div className="nm-overlay" onClick={onClose}>
      <div className="nm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="nm-modal-header">
          <div className="nm-modal-title">
            {mode === "create" ? "Tambah Produk" : mode === "edit" ? "Edit Produk" : product?.name}
          </div>
          <div className="nm-modal-actions">
            {isView && (
              <button className="nm-btn nm-btn--edit" onClick={() => setMode("edit")}>
                Edit
              </button>
            )}
            {isView && product && (
              <button className="nm-btn nm-btn--delete" onClick={handleDelete} disabled={deleting}>
                {deleting ? "..." : "Hapus"}
              </button>
            )}
            <button className="nm-btn nm-btn--close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Image */}
        <div className="nm-img-section">
          {imagePreview ? (
            <img src={imagePreview} alt="preview" className="nm-img-preview" />
          ) : (
            <div className="nm-img-placeholder">No Image</div>
          )}
          {!isView && (
            <>
              <button className="nm-btn nm-btn--upload" onClick={() => fileRef.current?.click()}>
                {imageFile ? "Ganti Foto" : "Upload Foto"}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleFileChange} />
            </>
          )}
        </div>

        {/* Fields */}
        <div className="nm-fields">
          {(["name", "description"] as const).map((k) => (
            <div key={k} className="nm-field">
              <label className="nm-label">{k === "name" ? "Nama" : "Deskripsi"}</label>
              {isView ? (
                <div className="nm-value">{form[k]}</div>
              ) : (
                <input className="nm-input" value={form[k]} onChange={(e) => handleField(k, e.target.value)} />
              )}
            </div>
          ))}

          <div className="nm-field-row">
            <div className="nm-field">
              <label className="nm-label">Harga (Rp)</label>
              {isView ? (
                <div className="nm-value">{formatRupiah(Number(form.price))}</div>
              ) : (
                <input className="nm-input" type="number" value={form.price} onChange={(e) => handleField("price", e.target.value)} />
              )}
            </div>
            <div className="nm-field">
              <label className="nm-label">Stok</label>
              {isView ? (
                <div className="nm-value">{form.stock}</div>
              ) : (
                <input className="nm-input" type="number" value={form.stock} onChange={(e) => handleField("stock", e.target.value)} />
              )}
            </div>
          </div>

          <div className="nm-field-row">
            <div className="nm-field">
              <label className="nm-label">Vintage</label>
              {isView ? (
                <div className="nm-value">{form.vintage || "—"}</div>
              ) : (
                <input className="nm-input" type="number" value={form.vintage} onChange={(e) => handleField("vintage", e.target.value)} />
              )}
            </div>
            <div className="nm-field">
              <label className="nm-label">Region</label>
              {isView ? (
                <div className="nm-value">{form.region || "—"}</div>
              ) : (
                <input className="nm-input" value={form.region} onChange={(e) => handleField("region", e.target.value)} />
              )}
            </div>
          </div>

          <div className="nm-field">
            <label className="nm-label">Varietal</label>
            {isView ? (
              <div className="nm-value">{form.varietal || "—"}</div>
            ) : (
              <input className="nm-input" value={form.varietal} onChange={(e) => handleField("varietal", e.target.value)} />
            )}
          </div>
        </div>

        {/* Footer */}
        {!isView && (
          <div className="nm-modal-footer">
            <button className="nm-btn nm-btn--cancel" onClick={() => mode === "create" ? onClose() : setMode("view")}>
              Batal
            </button>
            <button className="nm-btn nm-btn--save" onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NestJS Product List ─────────────────────────────────────────────

function NestProductList({
  loading,
  isOffline,
  products,
  onView,
}: {
  loading: boolean;
  isOffline: boolean;
  products: NestProduct[];
  onView: (p: NestProduct) => void;
}) {
  if (loading) {
    return (
      <div className="bc-product-list">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bc-product-skeleton bc-product-skeleton--dark" />
        ))}
      </div>
    );
  }
  if (isOffline) {
    return (
      <div className="bc-empty bc-empty--dark">
        <div className="bc-empty-icon">○</div>
        <div className="bc-empty-text">Server tidak tersedia</div>
        <div className="bc-empty-sub">Jalankan NestJS di port 3001</div>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="bc-empty bc-empty--dark">
        <div className="bc-empty-icon">○</div>
        <div className="bc-empty-text">Belum ada produk</div>
        <div className="bc-empty-sub">Klik + Tambah untuk mulai</div>
      </div>
    );
  }
  return (
    <div className="bc-product-list">
      {products.map((p, i) => (
        <div
          key={p.id ?? i}
          className="bc-product-item bc-product-item--dark bc-product-item--clickable"
          onClick={() => onView(p)}
        >
          {p.imageUrl ? (
            <div className="bc-product-img-wrap">
              <img src={p.imageUrl} alt={p.name} className="bc-product-img" />
            </div>
          ) : (
            <div className="bc-product-img-wrap bc-product-img-empty" />
          )}
          <div className="bc-product-info">
            <div className="bc-product-name">{p.name}</div>
            <div className="bc-product-desc">{p.description}</div>
            <div className="bc-product-price">{formatRupiah(p.price)}</div>
          </div>
          <div className="bc-product-arrow">›</div>
        </div>
      ))}
    </div>
  );
}

// ─── NestJS Panel ────────────────────────────────────────────────────

function NestPanel({ option }: { option: (typeof backendOptions)[0] }) {
  const [products, setProducts] = useState<NestProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [selected, setSelected] = useState<NestProduct | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("view");
  const [showModal, setShowModal] = useState(false);

  async function fetchProducts() {
    try {
      const res = await fetch(`${NESTJS_BASE}/products`);
      const data = await res.json();
      setProducts(data.products ?? []);
      setIsOffline(false);
    } catch {
      setIsOffline(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchProducts(); }, []);

  function openCreate() {
    setSelected(null);
    setModalMode("create");
    setShowModal(true);
  }

  function openView(p: NestProduct) {
    setSelected(p);
    setModalMode("view");
    setShowModal(true);
  }

  function handleSaved(p: NestProduct) {
    setProducts((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      return idx >= 0 ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev];
    });
  }

  function handleDeleted(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <>
      <div className="bc-panel bc-panel--dark">
        <div className="bc-panel-badges">
          {option.recommended && <div className="bc-recommended-badge">★ Rekomendasi</div>}
          <div className="bc-panel-tag bc-panel-tag--dark">{option.tag}</div>
        </div>

        <div className="bc-panel-header">
          <h3 className="bc-panel-title">{option.label}</h3>
          <p className="bc-panel-subtitle">{option.subtitle}</p>
        </div>

        <div className="bc-panel-pros">
          {option.pros.map((p) => (
            <div key={p} className="bc-panel-pro"><span className="bc-check">✓</span>{p}</div>
          ))}
        </div>
        <div className="bc-panel-cons">
          {option.cons.map((c) => (
            <div key={c} className="bc-panel-con"><span className="bc-warn">⚠</span>{c}</div>
          ))}
        </div>

        <div className="bc-panel-divider bc-panel-divider--dark" />

        <div className="bc-live-label" style={{ marginBottom: 12 }}>
          <span className={`bc-live-dot${isOffline ? " bc-live-dot--offline" : ""}`} />
          {isOffline ? "NestJS Offline" : "Live dari NestJS API"}
        </div>

        {!isOffline && (
          <button className="bc-add-card" onClick={openCreate}>
            <span className="bc-add-card-icon">+</span>
            <span className="bc-add-card-label">Tambah Produk Baru</span>
          </button>
        )}

        {/* Product list */}
        <NestProductList
          loading={loading}
          isOffline={isOffline}
          products={products}
          onView={openView}
        />

        <div className="bc-best-for bc-best-for--dark">
          <span className="bc-best-for-label">Cocok untuk:</span>
          <span>{option.bestFor}</span>
        </div>
      </div>

      {showModal && (
        <NestModal
          product={selected}
          mode={modalMode}
          onClose={() => setShowModal(false)}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}

// ─── Sanity Panel ─────────────────────────────────────────────────────

function SanityPanel({ option, data }: { option: (typeof backendOptions)[0]; data: PanelData }) {
  return (
    <div className="bc-panel bc-panel--light">
      <div className="bc-panel-badges">
        {option.recommended && <div className="bc-recommended-badge">★ Rekomendasi</div>}
        <div className="bc-panel-tag">{option.tag}</div>
      </div>

      <div className="bc-panel-header">
        <h3 className="bc-panel-title">{option.label}</h3>
        <p className="bc-panel-subtitle">{option.subtitle}</p>
      </div>

      <div className="bc-panel-pros">
        {option.pros.map((p) => (
          <div key={p} className="bc-panel-pro"><span className="bc-check">✓</span>{p}</div>
        ))}
      </div>
      <div className="bc-panel-cons">
        {option.cons.map((c) => (
          <div key={c} className="bc-panel-con"><span className="bc-warn">⚠</span>{c}</div>
        ))}
      </div>

      <div className="bc-panel-divider" />

      <div className="bc-live-label">
        <span className="bc-live-dot" />
        Live dari Sanity CMS
      </div>

      {data.loading ? (
        <div className="bc-product-list">
          {[0, 1, 2].map((i) => <div key={i} className="bc-product-skeleton" />)}
        </div>
      ) : !data.isMock && data.products.length === 0 ? (
        <div className="bc-empty">
          <div className="bc-empty-icon">○</div>
          <div className="bc-empty-text">Belum ada produk</div>
          <div className="bc-empty-sub">Tambahkan produk di Sanity Studio</div>
        </div>
      ) : (
        <div className="bc-product-list">
          {data.isMock && <div className="bc-demo-badge">Demo Mode</div>}
          {data.products.map((p, i) => (
            <div key={p._id ?? i} className="bc-product-item">
              {p.imageUrl ? (
                <div className="bc-product-img-wrap">
                  <img src={p.imageUrl} alt={p.name} className="bc-product-img" />
                </div>
              ) : (
                <div className="bc-product-img-wrap bc-product-img-empty" />
              )}
              <div className="bc-product-info">
                <div className="bc-product-name">{p.name}</div>
                <div className="bc-product-desc">{p.description}</div>
                <div className="bc-product-price">{formatRupiah(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bc-best-for">
        <span className="bc-best-for-label">Cocok untuk:</span>
        <span>{option.bestFor}</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────

export function BackendComparison() {
  const [sanityData, setSanityData] = useState<PanelData>({ products: [], loading: true, isMock: false });

  useEffect(() => {
    fetch("/api/sanity-products")
      .then((r) => r.json())
      .then(({ products, isMock }) => setSanityData({ products, loading: false, isMock }))
      .catch(() => setSanityData({ products: [], loading: false, isMock: true }));
  }, []);

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
        <Reveal className="bc-panel-reveal">
          <NestPanel option={backendOptions[0]} />
        </Reveal>
        <Reveal delay={120} className="bc-panel-reveal">
          <SanityPanel option={backendOptions[1]} data={sanityData} />
        </Reveal>
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
