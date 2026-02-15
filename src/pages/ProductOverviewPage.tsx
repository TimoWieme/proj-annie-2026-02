import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import type { Product } from "../types/Product";

const ProductOverviewPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product Overview</h1>
      <ul className="list-none p-0 space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100"
          >
            <span className="font-medium">{product.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductOverviewPage;
