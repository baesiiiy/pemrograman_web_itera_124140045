
import { useMemo } from 'react';

export default function useBookStats(books) {
  return useMemo(() => {
    return {
      total: books.length,
      owned: books.filter((book) => book.status === 'Milik').length,
      reading: books.filter(
        (book) => book.status === 'Sedang Dibaca'
      ).length,
      wishlist: books.filter(
        (book) => book.status === 'Ingin Dibeli'
      ).length,
    };
  }, [books]);
}