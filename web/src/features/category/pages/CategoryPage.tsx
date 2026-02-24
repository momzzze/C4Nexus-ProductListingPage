import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  getCategoryBySlug,
  getProductsByCategory,
  type Category,
  type Product,
} from '../../../api/mockApi';

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(20);

  useEffect(() => {
    if (!categorySlug) return;

    setDisplayedCount(20);
    setInitialLoad(true);

    Promise.all([
      getCategoryBySlug(categorySlug),
      getProductsByCategory(categorySlug, 100),
    ]).then(([cat, prods]) => {
      setCategory(cat);
      setProducts(prods);
      setInitialLoad(false);
    });
  }, [categorySlug]);

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 20, products.length));
  };

  const hasMore = displayedCount < products.length;
  const showSkeletons = initialLoad && !category;
  const displayedProducts = products.slice(0, displayedCount);

  return (
    <section className="plp">
      <div className="plp-content-grid">
        <aside className="plp-filter" aria-label="Product filters">
          <h2 className="plp-block-title">Filter</h2>
        </aside>

        <div className="plp-main">
          <div className="plp-topbar">
            <div>
              {showSkeletons ? (
                <>
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-subtitle"></div>
                </>
              ) : (
                <>
                  <h1 className="plp-title">{category?.name}</h1>
                  <p className="plp-subtitle">{category?.description}</p>
                </>
              )}
            </div>

            <button type="button" className="plp-sort-btn">
              Sort: Relevance
            </button>
          </div>

          <div className="plp-grid" aria-label="Product grid">
            {showSkeletons
              ? Array.from({ length: 8 }).map((_, i) => (
                  <article key={i} className="product-card">
                    <div className="skeleton skeleton-thumb" />
                    <div className="skeleton skeleton-name"></div>
                    <div className="skeleton skeleton-price"></div>
                  </article>
                ))
              : displayedProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-thumb">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">CHF {product.price}</p>
                  </article>
                ))}
          </div>
        </div>
      </div>

      {!showSkeletons && hasMore && (
        <div className="plp-load-more-wrap">
          <button
            type="button"
            className="plp-load-more-btn"
            onClick={handleLoadMore}
          >
            Load more ({displayedCount} of {products.length})
          </button>
        </div>
      )}
    </section>
  );
}
