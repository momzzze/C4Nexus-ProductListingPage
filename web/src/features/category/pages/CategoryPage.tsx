import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import {
  getCategoryBySlug,
  getProductsByCategory,
  type Category,
  type Product,
} from '../../../api/mockApi';
import { useSorting } from '../../../hooks/useSorting';

export function CategoryPage() {
  const priceRanges = [
    { label: 'Under 50 EUR', value: '0-50' },
    { label: '50 - 150 EUR', value: '50-150' },
    { label: '150 - 300 EUR', value: '150-300' },
    { label: '300 - 500 EUR', value: '300-500' },
    { label: 'Above 500 EUR', value: '500-9999' },
  ];

  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<Category | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(20);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const availableBrands = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.brand).filter(Boolean))
    )
      .map((brand) => brand as string)
      .sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand =
        selectedBrands.length === 0 ||
        (product.brand ? selectedBrands.includes(product.brand) : false);

      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });

      return matchesBrand && matchesPrice;
    });
  }, [products, selectedBrands, selectedPriceRanges]);

  const { sortBy, setSortBy, sortedProducts, currentLabel, sortOptions } =
    useSorting(filteredProducts);

  const activeFilterCount = selectedBrands.length + selectedPriceRanges.length;

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setDisplayedCount(20);
  };

  useEffect(() => {
    if (!categorySlug) return;

    Promise.all([
      getCategoryBySlug(categorySlug),
      getProductsByCategory(categorySlug, 100),
    ]).then(([cat, prods]) => {
      setCategory(cat);
      setProducts(prods);
      setSelectedBrands([]);
      setSelectedPriceRanges([]);
      setDisplayedCount(20);
      setFilterDrawerOpen(false);
      setInitialLoad(false);
    });
  }, [categorySlug]);

  useEffect(() => {
    if (!filterDrawerOpen || window.innerWidth >= 1024) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [filterDrawerOpen]);

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
    setDisplayedCount(20);
  };

  const handleTogglePriceRange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range)
        ? prev.filter((item) => item !== range)
        : [...prev, range]
    );
    setDisplayedCount(20);
  };

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 20, sortedProducts.length));
  };

  const hasMore = displayedCount < sortedProducts.length;
  const showSkeletons = initialLoad && !category;
  const displayedProducts = sortedProducts.slice(0, displayedCount);

  return (
    <section className="plp">
      {filterDrawerOpen && (
        <button
          type="button"
          className="plp-filter-backdrop"
          onClick={() => setFilterDrawerOpen(false)}
          aria-label="Close filters"
        />
      )}

      <div className="plp-content-grid">
        <aside
          className={`plp-filter ${filterDrawerOpen ? 'plp-filter--open' : ''}`}
          aria-label="Product filters"
        >
          <div className="plp-filter-header">
            <h2 className="plp-block-title">Filter</h2>
            <button
              type="button"
              className="plp-filter-close"
              onClick={() => setFilterDrawerOpen(false)}
              aria-label="Close filters"
            >
              ×
            </button>
          </div>

          <section
            className="plp-filter-section"
            aria-labelledby="brand-filter"
          >
            <h3 id="brand-filter" className="plp-filter-heading">
              Brand
            </h3>
            {availableBrands.length > 0 ? (
              <ul className="plp-filter-list">
                {availableBrands.map((brand) => (
                  <li key={brand} className="plp-filter-item">
                    <label className="plp-filter-check">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleToggleBrand(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="plp-filter-empty">No brand filters available.</p>
            )}
          </section>

          <section
            className="plp-filter-section"
            aria-labelledby="price-filter"
          >
            <h3 id="price-filter" className="plp-filter-heading">
              Price
            </h3>
            <ul className="plp-filter-list">
              {priceRanges.map((range) => (
                <li key={range.value} className="plp-filter-item">
                  <label className="plp-filter-check">
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handleTogglePriceRange(range.value)}
                    />
                    <span>{range.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          {(selectedBrands.length > 0 || selectedPriceRanges.length > 0) && (
            <button
              type="button"
              className="plp-filter-clear"
              onClick={resetFilters}
            >
              Reset
            </button>
          )}

          <button
            type="button"
            className="plp-filter-apply"
            onClick={() => setFilterDrawerOpen(false)}
          >
            Show results ({sortedProducts.length})
          </button>
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

            <div className="plp-topbar-actions">
              <button
                type="button"
                className="plp-filter-toggle-btn"
                onClick={() => setFilterDrawerOpen(true)}
              >
                Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </button>

              <div className="plp-sort-wrapper">
                <button
                  type="button"
                  className="plp-sort-btn"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                >
                  Sort: {currentLabel}
                </button>
                {sortDropdownOpen && (
                  <ul className="plp-sort-dropdown" aria-label="Sort products">
                    {sortOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          className={`plp-sort-option ${sortBy === option.value ? 'plp-sort-option--active' : ''}`}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
                    <p className="product-price">EUR {product.price}</p>
                  </article>
                ))}
          </div>

          {!showSkeletons && (
            <div className="plp-load-more-wrap">
              <p className="plp-product-counter" aria-live="polite">
                {displayedProducts.length} out of {sortedProducts.length}{' '}
                products displayed.
              </p>

              {hasMore && (
                <button
                  type="button"
                  className="plp-load-more-btn"
                  onClick={handleLoadMore}
                >
                  Load more ({displayedCount} of {sortedProducts.length})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
