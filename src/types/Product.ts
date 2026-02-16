export interface Product {
    id: string;
    name: string;
    height: number;
    diameter: number;
    price: number;
    standingPlace: 'Sun' | 'Partial' | "Shadow";
    photoUrl: string;
    description?: string;
  }
