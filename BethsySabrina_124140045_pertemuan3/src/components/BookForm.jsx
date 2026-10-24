
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BOOK_STATUSES } from '../context/BookContext';

const emptyForm = {
  title: '',
  author: '',
  status: 'Milik',
  notes: '',
};

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || '',
        author: editingBook.author || '',
        status: editingBook.status || 'Milik',
        notes: editingBook.notes || '',
      });
    } else {
      setForm(emptyForm);
    }

    setError('');
  }, [editingBook]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.author.trim()) {
      setError('Judul dan nama penulis wajib diisi.');
      return;
    }

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
      notes: form.notes.trim(),
    });

    setForm(emptyForm);
    setError('');
  }

  return (
    <section className="panel">
      <h2>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Judul Buku</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Nama Penulis</label>
          <input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status Buku</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {BOOK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Catatan (opsional)</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Catatan singkat tentang buku"
            rows={3}
          />
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="form-actions">
          <button type="submit">
            {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>

          {editingBook && (
            <button type="button" className="secondary-button" onClick={onCancel}>
              Batal
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
    notes: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
};

BookForm.defaultProps = {
  editingBook: null,
};