import {
  convertToBaseUnit,
} from "@/utils/conversion";

import {
  calculatePrice,
} from "@/utils/pricing";

export default function ConversionPage() {
  const grams =
    convertToBaseUnit(
      2.5,
      "kg"
    );

  const total =
    calculatePrice(
      grams,
      0.75
    );

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Conversion Test
      </h1>

      <p>
        2.5 kg =
        {grams} g
      </p>

      <p>
        Total Price =
        ₹{total}
      </p>

    </div>
  );
}