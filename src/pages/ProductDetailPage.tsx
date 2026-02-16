import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowUpIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { getProductById } from "../api/products";
import type { Product } from "../types/Product";
import { categoryFromStandingPlace } from "../utils/productUtils";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<{ message: string; id: string } | null>(
    null
  );

  const productMatchesId =
    product != null && String(product.id) === String(id);

  const loading =
    id != null &&
    !productMatchesId &&
    (error == null || error.id !== id);

  useEffect(() => {
    if (!id) {
      return;
    }
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError({ message: "Product niet gevonden", id }));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="h-6 w-24 animate-pulse rounded bg-secondary" />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-secondary" />
          <div className="flex flex-col gap-4">
            <div className="h-6 w-20 animate-pulse rounded-full bg-secondary" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="h-4 w-full animate-pulse rounded bg-secondary" />
          </div>
        </div>
      </div>
    );
  }

  if (id == null || (error != null && error.id === id)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <button
          type="button"
          onClick={() => navigate("/producten")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeftIcon className="h-5 w-5" aria-hidden />
          Terug naar catalogus
        </button>
        <p className="text-gray-600">
          {error != null && error.id === id ? error.message : "Product niet gevonden"}
        </p>
      </div>
    );
  }

  if (product == null || !productMatchesId) {
    return null;
  }

  const category = categoryFromStandingPlace(product.standingPlace);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <button
        type="button"
        onClick={() => navigate("/producten")}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <ArrowLeftIcon className="h-5 w-5" aria-hidden />
        Terug naar alle planten
      </button>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Image column */}
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
            {product.photoUrl ? (
              <img
                src={product.photoUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <span className="text-sm">Geen afbeelding beschikbaar</span>
              </div>
            )}
          </div>
        </div>

        {/* Info column */}
        <div className="flex flex-col gap-6">
          <span
            className="inline-flex w-fit rounded-full bg-greenAccent px-3 py-1 text-sm text-primary"
            aria-hidden
          >
            {category}
          </span>

          <h1 className="text-3xl font-bold text-black md:text-4xl">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-base leading-relaxed text-gray-600">
              {product.description}
            </p>
          )}

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center text-primary"
                  aria-hidden
                >
                  Ø
                </span>
                Diameter
              </span>
              <span className="font-medium text-black">{product.diameter} cm</span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl bg-secondary p-4">
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowUpIcon className="h-4 w-4 text-primary" aria-hidden />
                Hoogte
              </span>
              <span className="font-medium text-black">{product.height} cm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
