import { Outlet } from 'react-router';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import './RootLayout.css';

export function RootLayout() {
  return (
    <div className="app-shell">
      <Header />

      <main className="container page-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
