import { prisma } from "app/src/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();

  return Response.json(products);
}