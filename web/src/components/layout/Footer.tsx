import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <nav aria-label="Footer links" className="footer-links">
          <a href="#" className="footer-link">
            Terms &amp; Conditions
          </a>
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
          <a
            href="https://github.com/momzzze/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Contact Us
          </a>
        </nav>
        <small className="footer-copy">© 2026 Nikola Ninov</small>
      </div>
    </footer>
  );
}
