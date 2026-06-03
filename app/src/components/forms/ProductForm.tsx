"use client";

import { useState } from "react";

export default function ProductForm() {
  const [name, setName] =
    useState("");

  async function createProduct() {
    await fetch(
      "/api/products/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          sku:
            "SKU" +
            Date.now(),

          description:
            "Chemical Product",

          dimensionType:
            "WEIGHT",

          baseUnit: "g",

          availableQuantity:
            "1000",

          pricePerBaseUnit:
            "0.75",
        }),
      }
    );

    alert(
      "Product Created"
    );
  }

  return (
    <div className="space-y-4">

      <input
        className="border p-2"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

      <button
        onClick={createProduct}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Create Product
      </button>

    </div>
  );
}