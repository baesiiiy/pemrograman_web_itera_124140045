
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Gagal membaca localStorage:', error);
      return initialValue;
    }
  });

  function setValue(value) {
    setStoredValue((currentValue) => {
      const nextValue =
        typeof value === 'function' ? value(currentValue) : value;

      try {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        console.error('Gagal menyimpan localStorage:', error);
      }

      return nextValue;
    });
  }

  return [storedValue, setValue];
}