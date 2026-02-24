import { useState, useMemo } from 'react';
import type { Product } from '../api/mockApi';

export type SortOption =
  | 'relevance'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc';

export interface SortConfig {
  value: SortOption;
  label: string;
}

export const sortOptions: SortConfig[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'name-asc', label: 'Alphabetical (A–Z)' },
  { value: 'name-desc', label: 'Alphabetical (Z–A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
];

export function useSorting(
  products: Product[],
  initialSort: SortOption = 'relevance'
) {
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));

      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));

      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);

      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);

      case 'relevance':
      default:
        return sorted.sort((a, b) => {
          if (a.rating && b.rating) {
            return b.rating - a.rating;
          }
          return 0;
        });
    }
  }, [products, sortBy]);

  const currentLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'Relevance';

  return {
    sortBy,
    setSortBy,
    sortedProducts,
    currentLabel,
    sortOptions,
  };
}
