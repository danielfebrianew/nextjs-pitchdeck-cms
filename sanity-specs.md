# Sanity CMS Studio — Setup Specification

Dokumen ini adalah panduan setup Sanity Studio untuk project **Kudamas Wine Brand**.
Next.js frontend sudah terhubung ke project Sanity ini dan siap fetch konten begitu schema dibuat.

---

## Credentials Project

| Key | Value |
|-----|-------|
| Project ID | `4g1skif4` |
| Dataset | `production` |
| API Version | `2024-01-01` |
| Studio URL (nanti) | `https://kudamas.sanity.studio` atau subdomain custom |

---

## Stack

| Layer | Pilihan |
|-------|---------|
| Platform | Sanity Cloud (managed) |
| Studio | Sanity Studio v3 |
| Framework embed (opsional) | Next.js App Router (`/studio` route) |
| Image CDN | Sanity CDN built-in (`cdn.sanity.io`) |

---

## Content Models (Schema)

Ada **4 document type** yang harus dibuat.

---

### 1. `product` — Produk Wine

Field utama yang di-fetch oleh Next.js pitch deck saat ini.

```ts
// schemas/product.ts
export default {
  name: 'product',
  title: 'Produk Wine',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Produk',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'string',
      description: 'Contoh: Cabernet Sauvignon · Vintage 2021 · Napa Valley',
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Harga (Rp)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Foto Produk',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'vintage',
      title: 'Tahun Vintage',
      type: 'number',
    },
    {
      name: 'region',
      title: 'Region / Asal',
      type: 'string',
      description: 'Contoh: Napa Valley, Burgundy, Tuscany',
    },
    {
      name: 'varietal',
      title: 'Varietal / Jenis Anggur',
      type: 'string',
      description: 'Contoh: Cabernet Sauvignon, Chardonnay, Grenache',
    },
    {
      name: 'tastingNotes',
      title: 'Tasting Notes',
      type: 'text',
      rows: 3,
    },
    {
      name: 'stock',
      title: 'Stok',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'isAvailable',
      title: 'Tersedia / Aktif',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo', // object type, lihat di bawah
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'image' },
  },
}
```

---

### 2. `campaign` — Kampanye / Promo

Untuk promo musiman (Imlek, Natal, Hari Wine Dunia, dll).

```ts
// schemas/campaign.ts
export default {
  name: 'campaign',
  title: 'Kampanye & Promo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Kampanye',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'banner',
      title: 'Gambar Banner',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    },
    {
      name: 'startDate',
      title: 'Tanggal Mulai',
      type: 'datetime',
    },
    {
      name: 'endDate',
      title: 'Tanggal Selesai',
      type: 'datetime',
    },
    {
      name: 'products',
      title: 'Produk yang Terlibat',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate', media: 'banner' },
  },
}
```

---

### 3. `distributor` — Distributor / Stokis

```ts
// schemas/distributor.ts
export default {
  name: 'distributor',
  title: 'Distributor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Distributor / Toko',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'city',
      title: 'Kota',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Alamat Lengkap',
      type: 'text',
      rows: 2,
    },
    {
      name: 'phone',
      title: 'Nomor Telepon / WhatsApp',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Tanpa @, contoh: kudamas.wine',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'city', media: 'logo' },
  },
}
```

---

### 4. Object type: `seo` — SEO Fields (reusable)

Dipakai di dalam document `product` dan bisa ditambahkan ke document lain nanti.

```ts
// schemas/seo.ts
export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Maks 60 karakter',
      validation: Rule => Rule.max(60),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Maks 160 karakter',
      validation: Rule => Rule.max(160),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Gambar untuk social share, ideal 1200×630px',
    },
  ],
}
```

---

## Registrasi Schema di `sanity.config.ts`

```ts
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import product from './schemas/product'
import campaign from './schemas/campaign'
import distributor from './schemas/distributor'
import seo from './schemas/seo'

export default defineConfig({
  name: 'kudamas',
  title: 'Kudamas CMS',
  projectId: '4g1skif4',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(), // untuk test GROQ query langsung di Studio
  ],
  schema: {
    types: [product, campaign, distributor, seo],
  },
})
```

---

## GROQ Queries yang Dipakai Next.js

Query-query ini sudah digunakan atau akan digunakan oleh frontend. Jangan ubah `_type` name di schema.

```groq
// Fetch produk untuk backend comparison demo
*[_type == "product"][0...3]{
  _id, name, description, price, image
}

// Fetch semua produk aktif
*[_type == "product" && isAvailable == true] | order(name asc) {
  _id, name, slug, description, price, image, vintage, region, varietal
}

// Fetch kampanye aktif
*[_type == "campaign" && isActive == true && startDate <= now() && endDate >= now()] {
  _id, title, banner, description, startDate, endDate,
  products[]-> { _id, name, price, image }
}

// Fetch semua distributor aktif
*[_type == "distributor" && isActive == true] | order(city asc) {
  _id, name, city, address, phone, instagram, logo
}
```

---

## Roles & Permissions di Sanity Cloud

Setup di **manage.sanity.io → Project → Members**.

| Role | Akses | Siapa |
|------|-------|-------|
| Administrator | Full akses, bisa ubah schema | Developer (kamu) |
| Editor | Bisa create/edit/publish semua document | Tim marketing Kudamas |
| Viewer | Read-only | Brand manager / leadership |

Untuk project Kudamas cukup pakai **built-in roles** yang sudah ada di Sanity — tidak perlu custom roles dulu.

---

## Image URL di Next.js

Frontend pakai `@sanity/image-url` untuk transform gambar dari Sanity CDN.
File: `src/sanity/queries.ts`

```ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// Contoh penggunaan
builder.image(product.image).width(400).height(400).fit('crop').url()
// → https://cdn.sanity.io/images/4g1skif4/production/...
```

Gambar di-serve via **Sanity CDN global** — tidak perlu setup S3 atau storage terpisah.

---

## Setup Commands

```bash
# Buat project Studio baru (kalau belum ada)
npm create sanity@latest -- --project 4g1skif4 --dataset production --template clean

# Atau tambahkan Studio ke dalam Next.js project yang sama
npm install next-sanity @sanity/vision

# Install image URL builder (sudah ada di Next.js project)
npm install @sanity/image-url
```

---

## Checklist Sebelum Go Live

- [ ] Semua schema sudah dibuat dan bisa diakses di Studio
- [ ] Minimal 3 produk wine sudah diinput dengan foto
- [ ] Foto produk sudah diupload via Studio (drag & drop di field `image`)
- [ ] `visionTool` digunakan untuk verifikasi GROQ query return data yang benar
- [ ] Role Editor sudah di-assign ke akun tim marketing Kudamas
- [ ] Dataset `production` — pastikan tidak pakai dataset `test` untuk live data
