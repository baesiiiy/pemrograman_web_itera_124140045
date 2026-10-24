
import { useBooks } from '../context/BookContext';
import useBookStats from '../hooks/useBookStats';

export default function Statistics() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const categories = [
    {
      title: 'Total Buku',
      count: stats.total,
      description: 'Semua buku dalam koleksimu.',
    },
    {
      title: 'Buku Milik',
      count: stats.owned,
      description: 'Buku yang sudah kamu miliki.',
    },
    {
      title: 'Sedang Dibaca',
      count: stats.reading,
      description: 'Buku yang sedang kamu baca.',
    },
    {
      title: 'Ingin Dibeli',
      count: stats.wishlist,
      description: 'Buku yang ingin kamu beli nanti.',
    },
  ];

  return (
    <main className="page-container">
      <section className="welcome-section">
        <p className="eyebrow">RINGKASAN KOLEKSI</p>
        <h1>Statistik Buku 📊</h1>
        <p>Lihat perkembangan koleksi dan kebiasaan membacamu.</p>
      </section>

      <section className="stats-grid">
        {categories.map((category) => (
          <article className="stat-card" key={category.title}>
            <span>{category.title}</span>
            <strong>{category.count}</strong>
            <p>{category.description}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <h2>Ringkasan Koleksi</h2>
        {books.length === 0 ? (
          <p>Belum ada buku. Tambahkan buku melalui halaman utama, ya!</p>
        ) : (
          <ul className="statistics-list">
            {books.map((book) => (
              <li key={book.id}>
                <span>
                  <strong>{book.title}</strong>
                  <small> — {book.author}</small>
                </span>
                <span className="status-badge">{book.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}