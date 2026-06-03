export function calculatePrice(
  quantityInBaseUnit: number,
  pricePerBaseUnit: number
) {
  return (
    quantityInBaseUnit *
    pricePerBaseUnit
  );
}