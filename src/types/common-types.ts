// types.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption =
  | "price-low-to-high"
  | "price-high-to-low"
  | "rating-high-to-low";

export interface FilterOptions {
  category: string | null;
  priceRange: {
    min: number;
    max: number;
  };
}
