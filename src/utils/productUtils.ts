import type { Product } from "../types/Product";

export const categoryFromStandingPlace = (
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
