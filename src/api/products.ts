import { apiClient } from "./client";
import type { Product } from "../types/Product.ts";

export interface ProductFiltersParams {
  search?: string;
  standingPlace?: string;
  diameterMin?: number;
  diameterMax?: number;
  heightMin?: number;
  heightMax?: number;
}

export const getProducts = async (
  pageSize: number = 24,
  pageIndex: number = 0,
  filters?: ProductFiltersParams
): Promise<Product[]> => {
  const params: Record<string, string | number> = {
    pageSize,
    pageIndex,
  };
  // Add filters to the request params if they are not null
  if (filters?.search?.trim()) {
    params.nameFilter = filters.search.trim() as string;
  }
  if (filters?.standingPlace) {
    params.standingPlaceFilters = filters.standingPlace as string;
  }
  if (filters?.diameterMin != null) {
    params.diameterMinimumFilter = filters.diameterMin as number;
  }
  if (filters?.diameterMax != null) {
    params.diameterMaximumFilter = filters.diameterMax as number;
  }
  if (filters?.heightMin != null) {
    params.heightMinimumFilter = filters.heightMin as number;
  }
  if (filters?.heightMax != null) {
    params.heightMaximumFilter = filters.heightMax as number;
  }
  const response = await apiClient.get("/products", { params });
  return response.data.products;
};

export interface ProductBounds {
  diameterMin: number;
  diameterMax: number;
  heightMin: number;
  heightMax: number;
}

// Get the min / max bounds from a list of products, used for the product filters range slider
export const getBoundsFromProducts = (products: Product[]): ProductBounds | null => {
  if (products.length === 0) {
    return null;
  }
  const diameters = products.map((product) => product.diameter);
  const heights = products.map((product) => product.height);
  return {
    diameterMin: Math.min(...diameters),
    diameterMax: Math.max(...diameters),
    heightMin: Math.min(...heights),
    heightMax: Math.max(...heights),
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
