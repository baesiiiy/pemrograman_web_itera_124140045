
import { NavLink, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './pages/Home';
import Statistics from './pages/Statistics';

function Layout({ children }) {
  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-icon">📚</span>
            <span>BukuKu</span>
          </NavLink>

          <nav className="main-nav" aria-label="Navigasi utama">
            <NavLink to="/" end>
              Beranda
            </NavLink>
            <NavLink to="/statistik">
              Statistik
            </NavLink>
          </nav>
        </div>
      </header>

      {children}

      <footer className="app-footer">
        <p>Manajemen Buku Pribadi · Praktikum React</p>
        <p>Kelola buku, bangun kebiasaan membaca 🌷</p>
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

function NotFound() {
  return (
    <main className="page-container">
      <section className="panel empty-state">
        <h1>404 — Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang kamu cari tidak tersedia.</p>
        <NavLink to="/">Kembali ke Beranda</NavLink>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/statistik"
        element={
          <Layout>
            <Statistics />
          </Layout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}