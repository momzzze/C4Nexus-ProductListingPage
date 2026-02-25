export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  description?: string;
  category: string;
  image?: string;
  thumbnail?: string;
  brand?: string;
  collection?: string;
  dialColor?: string;
  shape?: string;
  targetGroup?: string;
  material?: string;
  strapMaterial?: string;
  diameter?: string;
  movement?: string;
  special?: boolean;
  rating?: number;
  stock?: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

const categoryMapping: Record<string, string[]> = {
  bags: ['womens-bags'],
  shoes: ['mens-shoes', 'womens-shoes'],
  watches: ['mens-watches', 'womens-watches'],
  accessories: [
    'womens-jewellery',
    'sunglasses',
    'fragrances',
    'beauty',
    'skin-care',
    'mobile-accessories',
    'home-decoration',
    'furniture',
    'groceries',
    'kitchen-accessories',
    'laptops',
    'motorcycle',
    'smartphones',
    'sports-accessories',
    'tablets',
    'vehicle',
  ],
  clothing: ['tops', 'womens-dresses', 'mens-shirts'],
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Clothing',
    description: 'Fashion clothing for men and women',
    slug: 'clothing',
  },
  {
    id: '2',
    name: 'Bags',
    description: 'Stylish and functional bags for every occasion',
    slug: 'bags',
  },
  {
    id: '3',
    name: 'Shoes',
    description: 'Premium footwear collection',
    slug: 'shoes',
  },
  {
    id: '4',
    name: 'Watches',
    description: 'Luxury watches and timepieces',
    slug: 'watches',
  },
  {
    id: '5',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
    slug: 'accessories',
  },
];

interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  thumbnail: string;
}

function transformProduct(
  dummyProduct: DummyJSONProduct,
  ourCategory: string
): Product {
  const shouldHaveDiscount =
    !!dummyProduct.discountPercentage && dummyProduct.id % 3 === 0;
  const discountedPrice = shouldHaveDiscount
    ? Number(
        (
          dummyProduct.price *
          (1 - dummyProduct.discountPercentage / 100)
        ).toFixed(2)
      )
    : undefined;

  return {
    id: dummyProduct.id,
    name: dummyProduct.title,
    price: dummyProduct.price,
    discountedPrice,
    description: dummyProduct.description,
    category: ourCategory,
    image: dummyProduct.thumbnail,
    brand: dummyProduct.brand,
    rating: dummyProduct.rating,
    stock: dummyProduct.stock,
    special: dummyProduct.rating >= 4.5,
  };
}

const DUMMYJSON_API = 'https://dummyjson.com';

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProductsByCategory(
  categorySlug: string,
  limit: number = 20,
  skip: number = 0
): Promise<Product[]> {
  const dummyCategories = categoryMapping[categorySlug];
  if (!dummyCategories) return [];

  try {
    const allProducts: Product[] = [];

    for (const dummyCategory of dummyCategories) {
      const response = await fetch(
        `${DUMMYJSON_API}/products/category/${dummyCategory}?limit=100`
      );
      const data = await response.json();

      const products = data.products.map((p: DummyJSONProduct) =>
        transformProduct(p, categorySlug)
      );
      allProducts.push(...products);
    }

    return allProducts.slice(skip, skip + limit);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const allProducts: Product[] = [];

  try {
    for (const categorySlug of Object.keys(categoryMapping)) {
      const products = await getProductsByCategory(categorySlug, 100);
      allProducts.push(...products);
    }
    return allProducts;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

export async function getFilterOptions(
  categorySlug: string
): Promise<Record<string, FilterOption[]>> {
  try {
    const categoryProducts = await getProductsByCategory(categorySlug, 200);

    const filterOptions: Record<string, FilterOption[]> = {
      brand: [],
      collection: [],
      price: [],
      material: [],
      targetGroup: [],
      dialColor: [],
      shape: [],
      strapMaterial: [],
      diameter: [],
      movement: [],
    };

    const brands = new Set(
      categoryProducts.map((p) => p.brand).filter(Boolean) as string[]
    );
    filterOptions.brand = Array.from(brands).map((b) => ({
      label: b,
      value: b,
    }));

    const collections = new Set(
      categoryProducts.map((p) => p.collection).filter(Boolean) as string[]
    );
    filterOptions.collection = Array.from(collections).map((c) => ({
      label: c,
      value: c,
    }));

    // Price ranges
    filterOptions.price = [
      { label: 'Under 50 EUR', value: '0-50' },
      { label: '50 - 150 EUR', value: '50-150' },
      { label: '150 - 300 EUR', value: '150-300' },
      { label: '300 - 500 EUR', value: '300-500' },
      { label: 'Above 500 EUR', value: '500-9999' },
    ];

    const materials = new Set(
      categoryProducts.map((p) => p.material).filter(Boolean) as string[]
    );
    filterOptions.material = Array.from(materials).map((m) => ({
      label: m,
      value: m,
    }));

    const targetGroups = new Set(
      categoryProducts.map((p) => p.targetGroup).filter(Boolean) as string[]
    );
    filterOptions.targetGroup = Array.from(targetGroups).map((t) => ({
      label: t,
      value: t,
    }));

    const dialColors = new Set(
      categoryProducts.map((p) => p.dialColor).filter(Boolean) as string[]
    );
    filterOptions.dialColor = Array.from(dialColors).map((d) => ({
      label: d,
      value: d,
    }));

    const shapes = new Set(
      categoryProducts.map((p) => p.shape).filter(Boolean) as string[]
    );
    filterOptions.shape = Array.from(shapes).map((s) => ({
      label: s,
      value: s,
    }));

    const strapMaterials = new Set(
      categoryProducts.map((p) => p.strapMaterial).filter(Boolean) as string[]
    );
    filterOptions.strapMaterial = Array.from(strapMaterials).map((s) => ({
      label: s,
      value: s,
    }));

    const diameters = new Set(
      categoryProducts.map((p) => p.diameter).filter(Boolean) as string[]
    );
    filterOptions.diameter = Array.from(diameters).map((d) => ({
      label: d,
      value: d,
    }));

    const movements = new Set(
      categoryProducts.map((p) => p.movement).filter(Boolean) as string[]
    );
    filterOptions.movement = Array.from(movements).map((m) => ({
      label: m,
      value: m,
    }));

    return filterOptions;
  } catch (error) {
    console.error('Error getting filter options:', error);
    return {};
  }
}

export interface FilterCriteria {
  category: string;
  brand?: string;
  collection?: string;
  priceRange?: string;
  material?: string;
  targetGroup?: string;
  dialColor?: string;
  shape?: string;
  strapMaterial?: string;
  diameter?: string;
  movement?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'relevance';
}

export async function filterProducts(
  criteria: FilterCriteria
): Promise<Product[]> {
  try {
    let filtered = await getProductsByCategory(criteria.category, 200);

    if (criteria.brand) {
      filtered = filtered.filter((p) => p.brand === criteria.brand);
    }
    if (criteria.collection) {
      filtered = filtered.filter((p) => p.collection === criteria.collection);
    }
    if (criteria.priceRange) {
      const [min, max] = criteria.priceRange.split('-').map(Number);
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }
    if (criteria.material) {
      filtered = filtered.filter((p) => p.material === criteria.material);
    }
    if (criteria.targetGroup) {
      filtered = filtered.filter((p) => p.targetGroup === criteria.targetGroup);
    }
    if (criteria.dialColor) {
      filtered = filtered.filter((p) => p.dialColor === criteria.dialColor);
    }
    if (criteria.shape) {
      filtered = filtered.filter((p) => p.shape === criteria.shape);
    }
    if (criteria.strapMaterial) {
      filtered = filtered.filter(
        (p) => p.strapMaterial === criteria.strapMaterial
      );
    }
    if (criteria.diameter) {
      filtered = filtered.filter((p) => p.diameter === criteria.diameter);
    }
    if (criteria.movement) {
      filtered = filtered.filter((p) => p.movement === criteria.movement);
    }
    if (criteria.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (criteria.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (criteria.sort === 'newest') {
      filtered.reverse();
    }

    return filtered;
  } catch (error) {
    console.error('Error filtering products:', error);
    return [];
  }
}
