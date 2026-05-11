import { NextResponse } from "next/server";
import { getProducts } from "@/sanity/queries";

export async function GET() {
  const { products, isMock } = await getProducts();
  return NextResponse.json({ products, isMock });
}
