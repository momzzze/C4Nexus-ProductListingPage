import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Product } from '../../../api/mockApi';
import { ProductCard } from '../../../components/product/ProductCard';

interface CategoryCarouselProps {
  title: string;
  description: string;
  categorySlug: string;
  products: Product[];
}

export function CategoryCarousel({
  title,
  description,
  categorySlug,
  products,
}: CategoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    loop: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="home-carousel"
      aria-label={`${title} featured products`}
    >
      <header className="home-carousel__header">
        <div>
          <h2 className="home-carousel__title">{title}</h2>
          <p className="home-carousel__subtitle">{description}</p>
        </div>

        <div className="home-carousel__actions">
          <Link
            to={`/category/${categorySlug}`}
            className="home-carousel__view-all"
          >
            View all
          </Link>
          <button
            type="button"
            className="home-carousel__nav-btn"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label={`Previous ${title} products`}
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="home-carousel__nav-btn"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label={`Next ${title} products`}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </header>

      <div className="home-carousel__viewport" ref={emblaRef}>
        <div className="home-carousel__container">
          {products.map((product, index) => (
            <ProductCard
              key={`${categorySlug}-${product.id}-${index}`}
              product={product}
              className="home-carousel__slide"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
