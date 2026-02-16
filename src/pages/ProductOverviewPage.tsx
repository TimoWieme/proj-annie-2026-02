import { useCallback, useEffect, useRef, useState } from "react";
import {
  getProducts,
  getBoundsFromProducts,
  type ProductFiltersParams,
} from "../api/products";
import type { Product } from "../types/Product";
import ProductCard, { ProductCardSkeleton } from "../components/products/ProductCard";
import ProductFilters from "../components/products/ProductFilters";
import {
  defaultFiltersState,
  type ProductFiltersState,
} from "../components/products/productFiltersState";


const filtersToParams = (filters: ProductFiltersState): ProductFiltersParams => ({
  ...(filters.search.trim() && { search: filters.search.trim() }),
  ...(filters.standingPlace && { standingPlace: filters.standingPlace }),
  diameterMin: filters.diameterMin,
  diameterMax: filters.diameterMax,
  heightMin: filters.heightMin,
  heightMax: filters.heightMax,
});

const ProductOverviewPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFiltersState>(defaultFiltersState);
  const [bounds, setBounds] = useState<{
    diameterMin: number;
    diameterMax: number;
    heightMin: number;
    heightMax: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const skipNextFilterFetchRef = useRef(false);

  const fetchProducts = useCallback(
    (filterParams: ProductFiltersParams | undefined) => {
      setIsLoading(true);
      getProducts(20, 0, filterParams)
        .then((data) => {
          setProducts(data);
          if (filterParams == null) {
            const calculatedBounds = getBoundsFromProducts(data);
            if (calculatedBounds) {
              setBounds(calculatedBounds);
              setFilters((prev) => ({
                ...prev,
                diameterMin: calculatedBounds.diameterMin,
                diameterMax: calculatedBounds.diameterMax,
                heightMin: calculatedBounds.heightMin,
                heightMax: calculatedBounds.heightMax,
              }));
              skipNextFilterFetchRef.current = true;
            }
          }
        })
        .finally(() => setIsLoading(false));
    },
    []
  );

  // Initial load: only start the request, all setState happens in promise callbacks (no sync setState in effect)
  useEffect(() => {
    getProducts(20, 0, undefined)
      .then((data) => {
        setProducts(data);
        const calculatedBounds = getBoundsFromProducts(data);
        if (calculatedBounds) {
          setBounds(calculatedBounds);
          setFilters((prev) => ({ ...prev, ...calculatedBounds }));
          skipNextFilterFetchRef.current = true;
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (bounds == null) {
      return;
    }
    // Add a guard to prevent a duplicate fetch when the bounds are set (initial load)
    if (skipNextFilterFetchRef.current) {
      skipNextFilterFetchRef.current = false;
      return;
    }
    const params = filtersToParams(filters);
    // Debounce fetch to prevent excessive requests, wait 400ms before fetching again after filters change
    const fetchDebounce = setTimeout(() => fetchProducts(params), 400);
    return () => clearTimeout(fetchDebounce);
  }, [bounds, filters, fetchProducts]);

  // Loading state for initial load: no bounds yet
  const isLoadingInitial = bounds == null;

  return (
    <section className="relative w-full bg-secondary">
      <div className="mx-auto w-full max-w-6xl px-6 py-8 md:px-12">
        <h1 className="mb-6 text-2xl font-bold text-black md:text-3xl">
          Alle planten
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="w-full shrink-0 lg:w-72">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              bounds={bounds}
              boundsLoading={isLoadingInitial}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="mb-4 text-lg font-bold text-black">{products.length > 0 ? `${products.length} planten gevonden` : "Resultaten"}</h2>
            {/* While loading, show 6 skeleton cards */}
            {isLoading ? (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i}>
                    <ProductCardSkeleton />
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
                {products.length === 0 && (
                  <p className="text-gray-500">
                    Geen planten gevonden met deze filters.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverviewPage;
