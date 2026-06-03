"use client";

import { useEffect, useState } from "react";

export default function ProductTable() {
  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) =>
        setProducts(data)
      );
  }, []);

  return (
    <table className="mt-6 w-full border">
      <thead>
        <tr>
          <th className="border p-2">
            Name
          </th>

          <th className="border p-2">
            SKU
          </th>

          <th className="border p-2">
            Stock
          </th>

          <th className="border p-2">
            Unit
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border p-2">
              {product.name}
            </td>

            <td className="border p-2">
              {product.sku}
            </td>

            <td className="border p-2">
              {
                product.availableQuantity
              }
            </td>

            <td className="border p-2">
              {product.baseUnit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}