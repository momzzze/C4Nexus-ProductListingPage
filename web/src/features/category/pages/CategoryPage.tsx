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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categorySlug) return;

    setLoading(true);
    Promise.all([
      getCategoryBySlug(categorySlug),
      getProductsByCategory(categorySlug),
    ]).then(([cat, prods]) => {
      setCategory(cat);
      setProducts(prods);
      setLoading(false);
    });
  }, [categorySlug]);

  if (loading) {
    return <div className="plp">Loading...</div>;
  }

  if (!category) {
    return <div className="plp">Category not found</div>;
  }

  return (
    <section className="plp">
      <div className="plp-content-grid">
        <aside className="plp-filter" aria-label="Product filters">
          <h2 className="plp-block-title">Filter</h2>
        </aside>

        <div className="plp-main">
          <div className="plp-topbar">
            <div>
              <h1 className="plp-title">{category.name}</h1>
              <p className="plp-subtitle">{category.description}</p>
            </div>

            <button type="button" className="plp-sort-btn">
              Sort: Relevance
            </button>
          </div>

          <div className="plp-grid" aria-label="Product grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-thumb" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">CHF {product.price}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="plp-load-more-wrap">
        <button type="button" className="plp-load-more-btn">
          Load more
        </button>
      </div>
    </section>
  );
}
