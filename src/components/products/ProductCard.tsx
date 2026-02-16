import { ArrowUpIcon } from "@heroicons/react/24/outline";
import type { Product } from "../../types/Product";

const categoryFromStandingPlace = (
  place: Product["standingPlace"]
): string => {
  switch (place) {
    case "Sun":
      return "Voor in de zon";
    case "Partial":
      return "Voor in de halfschaduw";
    case "Shadow":
      return "Voor in de schaduw";
    default:
      return "Onbekend";
  }
};

export const ProductCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
    <div className="aspect-[4/3] w-full animate-pulse bg-secondary" />
    <div className="flex flex-col gap-3 p-5">
      <div className="h-5 w-20 animate-pulse rounded-full bg-secondary" />
      <div className="h-6 w-3/4 animate-pulse rounded bg-secondary" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-secondary" />
        <div className="h-4 w-14 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  </div>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const category = categoryFromStandingPlace(product.standingPlace);

  return (
    <a href={`/producten/${product.id}`} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        {(product.photoUrl) ? (
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
        <span
          className="absolute bottom-3 left-3 rounded-full bg-greenAccent px-3 py-1 text-sm text-primary"
          aria-hidden
        >
          {category}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-xl font-bold text-black">{product.name}</h3>
        <div className="flex flex-col gap-1 text-base text-gray-500">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-4 w-4 items-center justify-center text-primary" aria-hidden>
              Ø
            </span>
            {product.diameter}cm
          </span>
          <span className="flex items-center gap-2">
            <ArrowUpIcon className="h-4 w-4 text-primary" aria-hidden />
            {product.height}cm
          </span>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
