import { useEffect, useState } from 'react';
import {
  getCategories,
  getProductsByCategory,
  type Category,
  type Product,
} from '../../../api/mockApi';
import { CategoryCarousel } from '../components/CategoryCarousel';
import './HomePage.css';

interface CarouselSection {
  category: Category;
  products: Product[];
}

export function HomePage() {
  const [sections, setSections] = useState<CarouselSection[]>([]);
  const [loading, setLoading] = useState(true);

  const skeletonSections = ['Bags', 'Shoes', 'Watches'];

  useEffect(() => {
    async function loadSections() {
      try {
        const categories = await getCategories();
        const sectionData = await Promise.all(
          categories.map(async (category) => ({
            category,
            products: await getProductsByCategory(category.slug, 12),
          }))
        );

        setSections(
          sectionData.filter((section) => section.products.length > 0)
        );
      } finally {
        setLoading(false);
      }
    }

    loadSections();
  }, []);

  if (loading) {
    return (
      <section className="home-page">
        <h1 className="home-page__title">Featured Products</h1>
        <div className="home-page__sections" aria-label="Loading carousels">
          {skeletonSections.map((section) => (
            <section
              key={section}
              className="home-carousel home-carousel--skeleton"
            >
              <header className="home-carousel__header">
                <div className="home-carousel__header-main">
                  <div className="skeleton home-carousel__skeleton-title" />
                  <div className="skeleton home-carousel__skeleton-subtitle" />
                </div>

                <div className="home-carousel__actions">
                  <div className="skeleton home-carousel__skeleton-action" />
                  <div className="skeleton home-carousel__skeleton-nav" />
                  <div className="skeleton home-carousel__skeleton-nav" />
                </div>
              </header>

              <div className="home-carousel__container">
                {Array.from({ length: 4 }).map((_, index) => (
                  <article key={index} className="home-carousel__slide">
                    <div className="skeleton home-carousel__thumb home-carousel__skeleton-thumb" />
                    <div className="skeleton home-carousel__skeleton-product-name" />
                    <div className="skeleton home-carousel__skeleton-product-price" />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="home-page">
      <h1 className="home-page__title">Featured Products</h1>
      <div className="home-page__sections">
        {sections.map(({ category, products }) => (
          <CategoryCarousel
            key={category.id}
            title={category.name}
            description={category.description}
            categorySlug={category.slug}
            products={products}
          />
        ))}
      </div>
    </section>
  );
}
