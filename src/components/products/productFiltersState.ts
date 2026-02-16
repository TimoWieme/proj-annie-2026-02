import type { Product } from "../../types/Product";

export const FALLBACK_DIAMETER = { min: 20, max: 60 };
export const FALLBACK_HEIGHT = { min: 30, max: 200 };

// Product filters state, used for the product filters component
export interface ProductFiltersState {
  search: string;
  standingPlace: Product["standingPlace"] | "";
  diameterMin: number;
  diameterMax: number;
  heightMin: number;
  heightMax: number;
}

// Default filters state, used for the product filters component
export const defaultFiltersState: ProductFiltersState = {
  search: "",
  standingPlace: "",
  diameterMin: FALLBACK_DIAMETER.min,
  diameterMax: FALLBACK_DIAMETER.max,
  heightMin: FALLBACK_HEIGHT.min,
  heightMax: FALLBACK_HEIGHT.max,
};
