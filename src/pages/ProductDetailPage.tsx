import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import type { Product } from "../types/Product";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then((product) => setProduct(product));
    }
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
      <p className="text-gray-700 leading-relaxed">{product?.description}</p>
    </div>
  );
};

export default ProductDetailPage;
