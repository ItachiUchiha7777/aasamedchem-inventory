import Decimal from "decimal.js";

export default function TestPage() {
  const quantity = new Decimal("2.5").mul(1000);

  const price = quantity.mul(
    new Decimal("0.75")
  );

  return (
    <div className="p-10">
      <h1>
        Quantity: {quantity.toString()} g
      </h1>

      <h2>
        Total Price: ₹{price.toString()}
      </h2>
    </div>
  );
}