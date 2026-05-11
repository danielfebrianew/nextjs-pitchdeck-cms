import { client } from "./client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source).width(120).height(120).fit("crop").url();
}

export type SanityProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  vintage?: number;
  region?: string;
  varietal?: string;
  imageUrl?: string;
};

type RawSanityProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  vintage?: number;
  region?: string;
  varietal?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

const PRODUCTS_QUERY = `*[_type == "product" && isAvailable == true][0...3]{
  _id, name, description, price, image, vintage, region, varietal
}`;

const mockSanityProducts: SanityProduct[] = [
  {
    _id: "s1",
    name: "Château Kudamas Rouge",
    description: "Cabernet Sauvignon · Vintage 2021 · Napa Valley",
    price: 850000,
    vintage: 2021,
    region: "Napa Valley",
    varietal: "Cabernet Sauvignon",
    imageUrl: "/kudamas-merah.png",
  },
  {
    _id: "s2",
    name: "Kudamas Blanc de Blanc",
    description: "Chardonnay · Vintage 2022 · Burgundy Style",
    price: 720000,
    vintage: 2022,
    region: "Burgundy",
    varietal: "Chardonnay",
    imageUrl: "/kudamas-hero.png",
  },
  {
    _id: "s3",
    name: "Kudamas Rosé Prestige",
    description: "Grenache Blend · Vintage 2023 · Limited Edition",
    price: 680000,
    vintage: 2023,
    region: "Provence",
    varietal: "Grenache",
    imageUrl: "/polaroid-1.png",
  },
];

export async function getProducts(): Promise<{
  products: SanityProduct[];
  isMock: boolean;
}> {
  try {
    const raw = await client.fetch<RawSanityProduct[]>(PRODUCTS_QUERY);
    const products: SanityProduct[] = (raw ?? []).map((p) => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      vintage: p.vintage,
      region: p.region,
      varietal: p.varietal,
      imageUrl: p.image ? urlFor(p.image) : undefined,
    }));
    return { products, isMock: false };
  } catch {
    return { products: mockSanityProducts, isMock: true };
  }
}
