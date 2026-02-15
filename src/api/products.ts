import { apiClient } from "./client";
import type { Product } from "../types/Product.ts";

export const getProducts = async (pageSize: number = 10, pageIndex: number = 0): Promise<Product[]> => {
  const response = await apiClient.get("/products", {
    params: {
      pageSize,
      pageIndex,
    },
  });
  return response.data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
