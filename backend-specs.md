# NestJS Back Office — API Specification

Backend ini adalah implementasi nyata dari panel **Custom Back Office** di pitch deck.
Next.js (`/api/products`) saat ini menjadi mock-nya. Ganti base URL di komponen setelah NestJS ready.

---

## Stack

| Layer | Pilihan |
|-------|---------|
| Framework | NestJS (TypeScript) |
| Database | PostgreSQL |
| ORM | Prisma |
| Storage gambar | AWS S3 |
| Upload helper | `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` |
| Auth | JWT Bearer Token (`@nestjs/jwt`, `@nestjs/passport`) |
| Validasi | `class-validator` + `class-transformer` |
| CORS | Allow origin `localhost:3000` (dev) + domain production |

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Int
  vintage     Int?
  region      String?
  varietal    String?
  stock       Int      @default(0)
  imageKey    String?  // S3 object key, bukan full URL
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(EDITOR)
  createdAt    DateTime @default(now())
}

enum Role {
  ADMIN
  EDITOR
}
```

> `imageKey` menyimpan S3 key (misal `products/uuid.jpg`), bukan full URL.
> Full URL di-generate on-the-fly: `https://<bucket>.s3.<region>.amazonaws.com/<key>`

---

## Endpoints

### Products

| Method | Path | Auth | Deskripsi |
|--------|------|------|-----------|
| `GET` | `/products` | — | List semua produk |
| `GET` | `/products/:id` | — | Detail satu produk |
| `POST` | `/products` | ✓ Bearer | Tambah produk baru (JSON, tanpa gambar) |
| `PUT` | `/products/:id` | ✓ Bearer | Update produk |
| `DELETE` | `/products/:id` | ✓ Bearer | Hapus produk |

### Upload Gambar (S3 Presigned URL flow)

| Method | Path | Auth | Deskripsi |
|--------|------|------|-----------|
| `POST` | `/products/:id/image-upload-url` | ✓ Bearer | Generate presigned PUT URL ke S3 |
| `PUT` | `/products/:id/image-key` | ✓ Bearer | Simpan S3 key setelah upload selesai |

**Flow upload gambar:**
1. Client `POST /products/:id/image-upload-url` → dapat `{ uploadUrl, key }`
2. Client `PUT <uploadUrl>` langsung ke S3 dengan file binary (tidak lewat NestJS)
3. Client `PUT /products/:id/image-key` dengan `{ key }` → simpan key ke database

### Auth

| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/auth/login` | Login, return `accessToken` + `refreshToken` |
| `POST` | `/auth/refresh` | Tukar refresh token, return `accessToken` baru |

---

## Response Shape

### `GET /products`

```json
{
  "source": "nestjs",
  "products": [
    {
      "id": "uuid",
      "name": "Château Kudamas Rouge",
      "description": "Cabernet Sauvignon · Vintage 2021 · Napa Valley",
      "price": 850000,
      "vintage": 2021,
      "region": "Napa Valley",
      "varietal": "Cabernet Sauvignon",
      "stock": 48,
      "imageUrl": "https://<bucket>.s3.<region>.amazonaws.com/products/uuid.jpg",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 3
}
```

> `imageUrl` di-generate dari `imageKey` di service layer sebelum return response.
> Kalau `imageKey` null, `imageUrl` juga null.

### `POST /products` (body)

```json
{
  "name": "string",
  "description": "string",
  "price": 850000,
  "vintage": 2021,
  "region": "string",
  "varietal": "string",
  "stock": 48
}
```

### `POST /products/:id/image-upload-url` — response

```json
{
  "uploadUrl": "https://s3.amazonaws.com/...?X-Amz-Signature=...",
  "key": "products/uuid-timestamp.jpg",
  "expiresIn": 300
}
```

### Error shape (standar NestJS)

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found"
}
```

---

## AWS S3 Setup

### Bucket policy (public read untuk gambar produk)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<bucket-name>/products/*"
    }
  ]
}
```

### CORS config bucket (agar browser bisa PUT langsung)

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["http://localhost:3000", "https://<domain-production>"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### IAM Policy untuk NestJS server

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::<bucket-name>/*"
    }
  ]
}
```

---

## Connect ke Next.js Pitch Deck

Setelah NestJS server running, ganti endpoint di:

**`src/app/api/products/route.ts`** — ubah dari mock data ke:

```ts
const res = await fetch("http://localhost:3001/products");
const data = await res.json();
return NextResponse.json(data);
```

`imageUrl` dari NestJS sudah berupa full S3 URL — tidak perlu transformasi di sisi Next.js.

---

## Environment Variables (NestJS)

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/kudamas

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# AWS S3
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=kudamas-products

# Server
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

---

## Setup Commands

```bash
# Init project
nest new kudamas-backoffice
cd kudamas-backoffice

# Prisma
npm install prisma @prisma/client
npx prisma init
# → edit prisma/schema.prisma sesuai di atas
npx prisma migrate dev --name init
npx prisma generate

# AWS SDK
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

# Auth
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt

# Validasi
npm install class-validator class-transformer
```
