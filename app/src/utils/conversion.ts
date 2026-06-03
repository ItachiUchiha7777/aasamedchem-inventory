export const weightFactors = {
  g: 1,
  kg: 1000,
};

export const volumeFactors = {
  ml: 1,
  l: 1000,
};

export function convertToBaseUnit(
  quantity: number,
  unit: string
) {
  if (unit in weightFactors) {
    return (
      quantity *
      weightFactors[
        unit as keyof typeof weightFactors
      ]
    );
  }

  if (unit in volumeFactors) {
    return (
      quantity *
      volumeFactors[
        unit as keyof typeof volumeFactors
      ]
    );
  }

  return quantity;
}