import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import logoIcon from '../../assets/c4nexus-logo-icon.png';
import logoFull from '../../assets/c4-nexus.png';
import { getCategories, type Category } from '../../api/mockApi';

export function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
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
