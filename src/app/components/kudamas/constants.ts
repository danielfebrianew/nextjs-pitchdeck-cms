export const TOTAL_SECTIONS = 8;

export const navLinks = [
  { label: "Masalah", href: "#masalah" },
  { label: "Solusi", href: "#solusi" },
  { label: "Backend", href: "#backend" },
  { label: "Fitur", href: "#fitur" },
  { label: "Proses", href: "#proses" },
  { label: "Investasi", href: "#harga" },
];

export const backendOptions = [
  {
    id: "custom",
    label: "Custom Back Office",
    subtitle: "via NestJS REST API",
    tag: "Full Ownership",
    pros: [
      "Logika bisnis 100% custom",
      "Tidak ada biaya langganan",
      "Integrasi sistem lain bebas",
      "Source code sepenuhnya milik Anda",
    ],
    cons: ["Dev time lebih panjang", "Butuh maintenance berkala"],
    bestFor:
      "Bisnis dengan alur kompleks, banyak integrasi sistem, atau skala enterprise",
    theme: "dark" as const,
    recommended: true,
  },
  {
    id: "sanity",
    label: "Sanity CMS",
    subtitle: "Headless SaaS Platform",
    tag: "Cepat Launch",
    pros: [
      "Studio UI siap pakai & intuitif",
      "Free tier untuk project kecil",
      "Real-time collaboration",
      "CDN global built-in",
    ],
    cons: ["Biaya bulanan setelah free tier", "Tergantung vendor Sanity"],
    bestFor: "Bisnis yang butuh cepat live, konten-heavy, tim non-teknis",
    theme: "light" as const,
    recommended: false,
  },
];

export const heroStats = [
  { value: "14", label: "hari deploy" },
  { value: "1x", label: "bayar, tanpa langganan" },
  { value: "100%", label: "kode milik Anda" },
];

export const painItems = [
  {
    number: "01",
    title: "Update label baru harus tunggu vendor",
    desc: "Setiap rilis varian anggur baru, tim marketing harus antre minta tolong vendor untuk upload foto dan deskripsi.",
  },
  {
    number: "02",
    title: "Konten kampanye lambat tayang",
    desc: "Promo Imlek atau Natal sering telat naik karena workflow update konten masih bottleneck di tim teknis.",
  },
  {
    number: "03",
    title: "Tidak ada kontrol brand visual",
    desc: "Tampilan produk inkonsisten antara foto, copy, harga, katalog, website, dan distributor.",
  },
  {
    number: "04",
    title: "Bayar bulanan ke vendor tidak berhenti",
    desc: "Biaya maintenance berjalan terus padahal update konten jarang dilakukan dan value-nya tidak sebanding.",
  },
];

export const solusiPoints = [
  {
    icon: "01",
    title: "Schema khusus produk wine",
    desc: "Field siap pakai untuk varian, vintage, region, dan tasting notes.",
  },
  {
    icon: "02",
    title: "Real-time preview & publish",
    desc: "Edit di kiri, lihat hasil di kanan. Naik tayang satu klik tanpa tunggu deploy.",
  },
  {
    icon: "03",
    title: "Headless API ke website Next.js",
    desc: "Konten di Sanity, tampilan di Next.js. Performa cepat dan SEO-ready.",
  },
  {
    icon: "04",
    title: "Multi-user dengan permission",
    desc: "Editor untuk marketing, reviewer untuk brand manager, semua perubahan ter-audit.",
  },
];

export const fiturItems = [
  {
    icon: "↗",
    name: "Edit Mandiri",
    desc: "Tim marketing Kudamas update produk, kampanye, dan banner sendiri tanpa bayar developer setiap kali ada perubahan.",
    tag: "Independence",
  },
  {
    icon: "◊",
    name: "SEO-Ready",
    desc: "Setiap halaman produk auto-generate meta tags, sitemap, dan structured data untuk pencarian Google.",
    tag: "Discoverability",
  },
  {
    icon: "✦",
    name: "Multi-User",
    desc: "Editor untuk marketing, reviewer untuk brand manager, admin untuk leadership, dengan audit perubahan.",
    tag: "Workflow",
  },
  {
    icon: "▲",
    name: "Desain Custom",
    desc: "Bukan template. Layout dirancang khusus untuk menampilkan produk wine premium sesuai brand Kudamas.",
    tag: "Identity",
  },
];

export const prosesSteps = [
  {
    n: "01",
    t: "Discovery & Brand Audit",
    d: "Pelajari brand Kudamas, koleksi produk, dan target audience. Map struktur konten yang dibutuhkan.",
    dur: "Hari 1-4",
  },
  {
    n: "02",
    t: "Schema & Wireframe",
    d: "Rancang content model di Sanity untuk produk, kampanye, distributor, plus wireframe layout website.",
    dur: "Hari 5-10",
  },
  {
    n: "03",
    t: "Desain & Build",
    d: "UI design custom dan development Next.js. Iterasi desain bersama tim Kudamas sampai approve.",
    dur: "Hari 10-26",
    highlight: true,
  },
  {
    n: "04",
    t: "Migrasi Konten & QA",
    d: "Pindahkan data produk Kudamas ke CMS baru, lakukan QA lintas device dan browser.",
    dur: "Hari 26-29",
  },
  {
    n: "05",
    t: "Training & Go Live",
    d: "Walkthrough 1 jam dengan tim marketing Kudamas dan dokumentasi tertulis lengkap.",
    dur: "Hari 29-31",
  },
];

export const hargaData = {
  tag: "Investasi",
  title: "Bayar Sekali. Tanpa Langganan Bulanan.",
  noteText:
    "Berbeda dengan vendor website pada umumnya, KUDAMAS membayar Daniel sekali di awal. Website beserta CMS sepenuhnya jadi milik Kudamas tanpa recurring fee dan tanpa vendor lock-in.",
  badge: "Paket Lengkap",
  label: "One-time Project",
  value: "Rp 7.500.000",
  subtext: "Jual putus / termasuk training & 30 hari support",
  cta: "Diskusi Lebih Lanjut",
  includes: [
    "Desain UI custom untuk brand Kudamas",
    "Development website Next.js + Sanity CMS",
    "Setup schema produk, kampanye, distributor",
    "Migrasi konten dari website / katalog lama",
    "Training 1 jam untuk tim marketing",
    "Dokumentasi tertulis lengkap",
    "30 hari support pasca-deploy",
  ],
  valueChecklist: [
    "Hemat 80+ jam developer / tahun",
    "Skalabel untuk 100+ varian produk",
    "Bebas vendor lock-in selamanya",
    "Source code milik Kudamas",
  ],
};
