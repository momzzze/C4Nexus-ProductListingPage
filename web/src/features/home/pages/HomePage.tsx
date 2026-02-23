export function HomePage() {
  // only for structure
  const products = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
  }));

  return (
    <section className="plp">
      <div className="plp-content-grid">
        <aside className="plp-filter" aria-label="Product filters">
          <h2 className="plp-block-title">Filter</h2>
        </aside>

        <div className="plp-main">
          <div className="plp-topbar">
            <div>
              <h1 className="plp-title">Watches</h1>
              <p className="plp-subtitle">Category description placeholder</p>
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
                <p className="product-price">CHF ---</p>
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
