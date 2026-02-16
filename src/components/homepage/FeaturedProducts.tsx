import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getProducts } from "../../api/products";
import type { Product } from "../../types/Product";
import ProductCard, { ProductCardSkeleton } from "../products/ProductCard";

const FeaturedProducts = ({ title, subtitle, productAmount = 4 }: { title: string, subtitle: string, productAmount: number }) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts(productAmount, 0)
      .then((data) => {
        setProducts(data);
      })
      .catch((requestError) => {
        setError(requestError?.message ?? "Failed to load products.");
      });
  }, [ productAmount ]);

  const isLoading = products === null && error === null;

  return (
    <section className="relative w-full bg-secondary py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className={error ? "text-center w-full" : ""}>
            <h2 className="text-3xl font-bold text-black md:text-4xl">
              {error ? "Bekijk alle planten" : title}
            </h2>
            <p className="mt-2 text-gray-600 md:text-lg">
              {error ? "Ga naar de producten pagina" : subtitle}
            </p>
          </div>
          {!error && (
          <Link
            to="/producten"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-black shadow-sm hover:bg-gray-50"
          >
            Alle planten
              <ArrowRightIcon className="h-5 w-5" aria-hidden />
            </Link>
          )}
        </div>

        {error && (
          <div className="flex flex-col items-center justify-center">
            <Link
              to="/producten"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-black shadow-sm hover:bg-gray-50"
            >
              Bekijk alle planten
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {!error && isLoading &&
            Array.from({ length: productAmount }).map((_, i) => (
              <li key={i}>
                <ProductCardSkeleton />
              </li>
            ))}
          {!error && !isLoading &&
            products &&
            products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProducts;
