import { prisma } from "app/src/lib/prisma";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const product =
    await prisma.product.create({
      data: {
        name: body.name,
        sku: body.sku,
        description:
          body.description,

        dimensionType:
          body.dimensionType,

        baseUnit:
          body.baseUnit,

        availableQuantity:
          body.availableQuantity,

        pricePerBaseUnit:
          body.pricePerBaseUnit,
      },
    });

  return Response.json(product);
}