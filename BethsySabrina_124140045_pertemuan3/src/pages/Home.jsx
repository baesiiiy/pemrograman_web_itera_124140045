
import { useMemo, useState } from 'react';
import { useBooks } from '../context/BookContext';
import useBookStats from '../hooks/useBookStats';
import BookForm from '../components/BookForm';
import BookFilter from '../components/BookFilter';
import BookList from '../components/BookList';

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const stats = useBookStats(books);

  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filteredBooks = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === 'Semua' || book.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [books, search, statusFilter]);

  function handleSubmit(bookData) {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  }

  function handleDelete(id) {
    const confirmed = window.confirm('Yakin ingin menghapus buku ini?');

    if (confirmed) {
      deleteBook(id);

      if (editingBook?.id === id) {
        setEditingBook(null);
      }
    }
  }

  return (
    <main className="page-container">
      <section className="welcome-section">
        <p className="eyebrow">RUANG BACA PRIBADIMU</p>
        <h1>Manajemen Buku Pribadi 📚</h1>
        <p>
          Catat koleksi buku, pantau bacaanmu, dan simpan daftar
          buku yang ingin kamu miliki.
        </p>
      </section>

      <section className="stats-grid" aria-label="Ringkasan buku">
        <article className="stat-card">
          <span>Total Buku</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat-card">
          <span>Buku Milik</span>
          <strong>{stats.owned}</strong>
        </article>
        <article className="stat-card">
          <span>Sedang Dibaca</span>
          <strong>{stats.reading}</strong>
        </article>
        <article className="stat-card">
          <span>Ingin Dibeli</span>
          <strong>{stats.wishlist}</strong>
        </article>
      </section>

      <BookForm
        onSubmit={handleSubmit}
        editingBook={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <BookFilter
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </main>
  );
}