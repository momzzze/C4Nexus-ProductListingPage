import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import logoIcon from '../../assets/c4nexus-logo-icon.png';
import logoFull from '../../assets/c4-nexus.png';
import { getCategories, type Category } from '../../api/mockApi';
import './Header.css';

const CART_STORAGE_KEY = 'c4nexus-cart';

interface CartStorageItem {
  id: number;
  quantity: number;
}

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const cart: CartStorageItem[] = raw ? JSON.parse(raw) : [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  });

  const updateCartCount = () => {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const cart: CartStorageItem[] = raw ? JSON.parse(raw) : [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    localStorage.removeItem(CART_STORAGE_KEY);

    getCategories().then(setCategories);

    const handleCartUpdated = () => updateCartCount();

    window.addEventListener('c4nexus-cart-updated', handleCartUpdated);
    window.addEventListener('storage', handleCartUpdated);

    return () => {
      window.removeEventListener('c4nexus-cart-updated', handleCartUpdated);
      window.removeEventListener('storage', handleCartUpdated);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container header-content">
        <button
          className="header-hamburger"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link to="/" className="brand" aria-label="Go to home">
          <img
            className="brand-logo brand-logo--icon"
            src={logoIcon}
            alt=""
            aria-hidden="true"
          />
          <img
            className="brand-logo brand-logo--full"
            src={logoFull}
            alt="C4Nexus"
          />
        </Link>
        <nav aria-label="Product Categories" className="main-nav">
          <ul className="nav-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/category/${cat.slug}`}
                  end
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="header-icon" aria-label="Shopping Cart">
          <FiShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="header-cart-count">{cartCount}</span>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        // Mobile Navigation (slides in on hamburger click)
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/category/${cat.slug}`}
                  end
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
