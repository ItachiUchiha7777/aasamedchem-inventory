import ProductForm from "@/components/forms/ProductForm";
import ProductTable from "@/components/ProductTable";

export default function ProductsPage() {
  return (
    <div className="p-10">

      <h1 className="mb-5 text-3xl font-bold">
        Products
      </h1>

      <ProductForm />

      <ProductTable />

    </div>
  );
}