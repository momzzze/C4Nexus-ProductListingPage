import type { Product } from '../../api/mockApi';

const CART_STORAGE_KEY = 'c4nexus-cart';

interface CartStorageItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const handleAddToCart = () => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    const cart: CartStorageItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.discountedPrice ?? product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('c4nexus-cart-updated'));
    alert('Product added to cart');
  };

  return (
    <article className={`product-card ${className}`.trim()}>
      <div className="product-thumb">
        {product.image && (
          <img src={product.image} alt={product.name} loading="lazy" />
        )}
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">
        {product.description ??
          `Premium ${product.category} item from ${product.brand ?? 'C4Nexus'}`}
      </p>
      <p
        className="product-rating"
        aria-label={`Rating ${product.rating ?? 0} out of 5`}
      >
        {'★'.repeat(Math.round(product.rating ?? 0))}
        {'☆'.repeat(5 - Math.round(product.rating ?? 0))}
        <span> {Number(product.rating ?? 0).toFixed(1)}</span>
      </p>
      <div className="product-pricing">
        {product.discountedPrice ? (
          <>
            <p className="product-price product-price--old">
              EUR {product.price.toFixed(2)}
            </p>
            <p className="product-price product-price--discounted">
              EUR {product.discountedPrice.toFixed(2)}
            </p>
          </>
        ) : (
          <p className="product-price">EUR {product.price.toFixed(2)}</p>
        )}
      </div>
      <button
        type="button"
        className="product-add-btn"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </article>
  );
}
