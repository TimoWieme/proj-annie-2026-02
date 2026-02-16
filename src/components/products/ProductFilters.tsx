import RangeSlider from "react-range-slider-input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { Product } from "../../types/Product";
import type { ProductBounds } from "../../api/products";
import {
  type ProductFiltersState,
  FALLBACK_DIAMETER,
  FALLBACK_HEIGHT,
} from "./productFiltersState";

const STANDING_PLACE_OPTIONS: { value: Product["standingPlace"] | ""; label: string }[] = [
  { value: "", label: "Alle" },
  { value: "Sun", label: "Zon" },
  { value: "Partial", label: "Halfschaduw" },
  { value: "Shadow", label: "Schaduw" },
];

interface ProductFiltersProps {
  filters: ProductFiltersState;
  onFiltersChange: (filters: ProductFiltersState) => void;
  bounds: ProductBounds | null;
  boundsLoading?: boolean;
}

const ProductFilters = ({
  filters,
  onFiltersChange,
  bounds,
  boundsLoading = false,
}: ProductFiltersProps) => {
  // Update the filters state with a partial patch (only the changed fields are updated, so you don't need to pass all the fields)
  const update = (patch: Partial<ProductFiltersState>) => {
    // Start with the current filters state, and apply the patch to override the changed fields
    onFiltersChange({ ...filters, ...patch });
  };

  const diameterMin = bounds?.diameterMin ?? FALLBACK_DIAMETER.min;
  const diameterMax = bounds?.diameterMax ?? FALLBACK_DIAMETER.max;
  const heightMin = bounds?.heightMin ?? FALLBACK_HEIGHT.min;
  const heightMax = bounds?.heightMax ?? FALLBACK_HEIGHT.max;

  return (
    <aside
      className="rounded-2xl bg-white p-6 border border-gray-200"
      aria-label="Filters"
    >
      <div className="flex flex-col gap-6">
        {/* Search filter for product name*/}
        <div>
          <label htmlFor="filter-search" className="mb-2 block text-sm font-bold text-black">
            Zoek
          </label>
          <div className="relative">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              id="filter-search"
              type="search"
              placeholder="Zoek planten op naam..."
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              className="w-full rounded-xl border border-gray-200 bg-secondary py-2 pl-10 pr-4 text-black placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Zoek planten op naam"
            />
          </div>
        </div>

        {/* Standing place filter */}
        <div>
          <span className="mb-2 block text-sm font-bold text-black">
            Staandplaats
          </span>
          <div className="flex flex-col gap-2">
            {STANDING_PLACE_OPTIONS.map(({ value, label }) => (
              <label
                key={value || "all"}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="standingPlace"
                  value={value}
                  checked={filters.standingPlace === value}
                  onChange={() => update({ standingPlace: value })}
                  className="h-4 w-4 border-2 border-gray-200 text-primary accent-primary focus:ring-primary"
                />
                <span className="text-sm text-black">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Diameter and Height range, use react-range-slider-input to get easy dual range slider */}
        <div className="product-filters-range">
          <label className="mb-2 block text-sm font-bold text-black">
            Diameter: {filters.diameterMin}–{filters.diameterMax} cm
            {boundsLoading && (
              <span className="ml-2 text-xs font-normal text-gray-500">
                (laden...)
              </span>
            )}
          </label>
          <RangeSlider
            min={diameterMin}
            max={diameterMax}
            value={[filters.diameterMin, filters.diameterMax]}
            onInput={(value: [number, number]) =>
              update({ diameterMin: value[0], diameterMax: value[1] })
            }
            disabled={boundsLoading}
            ariaLabel={["Diameter minimum", "Diameter maximum"]}
          />
        </div>

        <div className="product-filters-range">
          <label className="mb-2 block text-sm font-bold text-black">
            Hoogte: {filters.heightMin}–{filters.heightMax} cm
            {boundsLoading && (
              <span className="ml-2 text-xs font-normal text-gray-500">
                (laden...)
              </span>
            )}
          </label>
          <RangeSlider
            min={heightMin}
            max={heightMax}
            value={[filters.heightMin, filters.heightMax]}
            onInput={(value: [number, number]) =>
              update({ heightMin: value[0], heightMax: value[1] })
            }
            disabled={boundsLoading}
            ariaLabel={["Hoogte minimum", "Hoogte maximum"]}
          />
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;
