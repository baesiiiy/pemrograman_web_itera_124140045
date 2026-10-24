
import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

export const BOOK_STATUSES = [
  'Milik',
  'Sedang Dibaca',
  'Ingin Dibeli',
];

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('bukuPribadi', []);
  const [notice, setNotice] = useState('');

  function addBook(bookData) {
    const newBook = {
      id: crypto.randomUUID(),
      ...bookData,
      createdAt: new Date().toISOString(),
    };

    setBooks((currentBooks) => [...currentBooks, newBook]);
    setNotice('Buku berhasil ditambahkan!');
  }

  function updateBook(id, bookData) {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );
    setNotice('Data buku berhasil diperbarui!');
  }

  function deleteBook(id) {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id)
    );
    setNotice('Buku berhasil dihapus!');
  }

  function clearNotice() {
    setNotice('');
  }

  const value = useMemo(
    () => ({
      books,
      notice,
      addBook,
      updateBook,
      deleteBook,
      clearNotice,
    }),
    [books, notice]
  );

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }

  return context;
}