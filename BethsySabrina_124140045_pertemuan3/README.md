# BukuKu — Manajemen Buku Pribadi

## Deskripsi

BukuKu adalah aplikasi web sederhana yang dibuat menggunakan React untuk membantu pengguna mengelola koleksi buku pribadi. Pengguna dapat menambahkan buku, menentukan status buku, dan melihat statistik koleksi buku.

## Fitur

- Menambahkan buku baru.
- Mengisi judul buku dan nama penulis.
- Menentukan status buku:
- Milik
- Sedang Dibaca
- Ingin Dibeli
- Menambahkan catatan opsional pada buku.
- Menampilkan daftar buku.
- Melihat statistik koleksi buku.
- Menyimpan data buku menggunakan Local Storage agar data tetap tersedia setelah halaman dimuat ulang.
- Navigasi halaman Beranda dan Statistik.

## Teknologi yang Digunakan

- React
- JavaScript
- Vite
- React Router DOM
- CSS
- Local Storage

## Cara Menjalankan Aplikasi

- Pastikan Node.js dan npm sudah terpasang.
- Buka terminal pada folder proyek.
- Instal dependensi dengan perintah:
- npm install
- Jalankan aplikasi dengan perintah:
- npm run dev
- Buka alamat lokal yang ditampilkan di terminal pada browser.

## Struktur Folder

src/
├── context/
│   └── BookContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── pages/
│   ├── Home.jsx
│   └── Statistics.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx

## Tujuan

Aplikasi ini dibuat sebagai latihan praktikum React untuk memahami penggunaan komponen, props, React Router, Context API, custom hooks, serta penyimpanan data menggunakan Local Storage.

### 1. Tampilan Beranda
![Beranda](./screenshots/1_Bernada.png)

### 2. Tampilan Statistik
![Statistik](./screenshots/2_Statistik.png)

### 3. Tampilan Daftar Buku
![Daftar Buku](./screenshots/3_Daftar_Buku.png)

### 4. Tampilan Tambah Buku
![Tambah Buku](./screenshots/4_Tambah_Buku.png)

### 5. Tampilan Hapus Buku
![Hapus Buku](./screenshots/5_Hapus_Buku.png)

### 6. Tampilan Hasil Hapus
![Hasil Hapus](./screenshots/6_Hasil_Hapus.png)

### 4. Tampilan Hasil Akhir
![Hasil Akhir](./screenshots/7_Hasil_Akhir.png)

## Identitas

Nama: Bethsy Sabrina
NIM: 124140045
Mata Kuliah: Praktikum Pemrograman Aplikasi Web
Proyek: Pertemuan 3 — Manajemen Buku Pribadi