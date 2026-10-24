
import PropTypes from 'prop-types';

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <section className="panel empty-state">
        <h2>Daftar Buku</h2>
        <p>Belum ada buku yang cocok. Yuk, tambahkan buku pertamamu!</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Daftar Buku ({books.length})</h2>

      <div className="book-grid">
        {books.map((book) => (
          <article className="book-card" key={book.id}>
            <div className="book-card-header">
              <span className={`status-badge status-${book.status === 'Milik' ? 'owned' : book.status === 'Sedang Dibaca' ? 'reading' : 'wishlist'}`}>
                {book.status}
              </span>
            </div>

            <h3>{book.title}</h3>
            <p className="book-author">Penulis: {book.author}</p>

            {book.notes && (
              <p className="book-notes">{book.notes}</p>
            )}

            <div className="book-actions">
              <button type="button" onClick={() => onEdit(book)}>
                Edit
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => onDelete(book.id)}
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      notes: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};