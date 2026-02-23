// Mock categories and products for e-commerce MVP
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
  category: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bags',
    description: 'Stylish and functional bags for every occasion',
    slug: 'bags',
  },
  {
    id: '2',
    name: 'Shoes',
    description: 'Premium footwear collection',
    slug: 'shoes',
  },
  {
    id: '3',
    name: 'Watches',
    description: 'Luxury watches and timepieces',
    slug: 'watches',
  },
  {
    id: '4',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
    slug: 'accessories',
  },
];

export const products: Product[] = [
  // Bags
  { id: 101, name: 'Leather Tote', price: 250, category: 'bags' },
  { id: 102, name: 'Backpack Pro', price: 180, category: 'bags' },
  { id: 103, name: 'Crossbody Sling', price: 120, category: 'bags' },
  { id: 104, name: 'Weekend Duffel', price: 320, category: 'bags' },
  { id: 105, name: 'Clutch Evening', price: 95, category: 'bags' },
  { id: 106, name: 'Travel Roller', price: 450, category: 'bags' },
  { id: 107, name: 'Shoulder Bag', price: 210, category: 'bags' },
  { id: 108, name: 'Mini Pouch', price: 65, category: 'bags' },

  // Shoes
  { id: 201, name: 'Running Sneakers', price: 130, category: 'shoes' },
  { id: 202, name: 'Leather Oxford', price: 280, category: 'shoes' },
  { id: 203, name: 'Casual Loafers', price: 160, category: 'shoes' },
  { id: 204, name: 'Athletic Boots', price: 220, category: 'shoes' },
  { id: 205, name: 'Elegant Heels', price: 190, category: 'shoes' },
  { id: 206, name: 'Sandal Slides', price: 85, category: 'shoes' },
  { id: 207, name: 'Winter Boots', price: 310, category: 'shoes' },
  { id: 208, name: 'Canvas Sneaker', price: 95, category: 'shoes' },

  // Watches
  { id: 301, name: 'Chronograph Steel', price: 650, category: 'watches' },
  { id: 302, name: 'Dress Watch Gold', price: 750, category: 'watches' },
  { id: 303, name: 'Sports Digital', price: 280, category: 'watches' },
  { id: 304, name: 'Black Dial', price: 520, category: 'watches' },
  { id: 305, name: 'Leather Strap', price: 420, category: 'watches' },
  { id: 306, name: 'Smart Watch', price: 350, category: 'watches' },
  { id: 307, name: 'Minimalist Watch', price: 380, category: 'watches' },
  { id: 308, name: 'Vintage Style', price: 590, category: 'watches' },

  // Accessories
  { id: 401, name: 'Silk Scarf', price: 75, category: 'accessories' },
  { id: 402, name: 'Leather Belt', price: 125, category: 'accessories' },
  { id: 403, name: 'Sunglasses UV', price: 180, category: 'accessories' },
  { id: 404, name: 'Wool Cap', price: 55, category: 'accessories' },
  { id: 405, name: 'Leather Gloves', price: 95, category: 'accessories' },
  { id: 406, name: 'Statement Necklace', price: 140, category: 'accessories' },
  { id: 407, name: 'Phone Chain', price: 35, category: 'accessories' },
  { id: 408, name: 'Wallet Leather', price: 105, category: 'accessories' },
];

// API functions
export function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 100);
  });
}

export function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories.find((c) => c.slug === slug)), 100);
  });
}

export function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(products.filter((p) => p.category === categorySlug)),
      150
    );
  });
}

export function getAllProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 150);
  });
}
