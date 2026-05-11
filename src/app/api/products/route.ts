import { NextResponse } from "next/server";

const mockProducts = [
  {
    id: "1",
    name: "Château Kudamas Rouge",
    description: "Cabernet Sauvignon · Vintage 2021 · Napa Valley",
    price: 850000,
    imageUrl: "/kudamas-merah.png",
  },
  {
    id: "2",
    name: "Kudamas Blanc de Blanc",
    description: "Chardonnay · Vintage 2022 · Burgundy Style",
    price: 720000,
    imageUrl: "/kudamas-hero.png",
  },
  {
    id: "3",
    name: "Kudamas Rosé Prestige",
    description: "Grenache Blend · Vintage 2023 · Limited Edition",
    price: 680000,
    imageUrl: "/polaroid-1.png",
  },
];

export async function GET() {
  return NextResponse.json({
    source: "nestjs",
    products: mockProducts,
  });
}
