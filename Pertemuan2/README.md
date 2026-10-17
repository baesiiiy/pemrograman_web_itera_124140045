# Dashboard Jadwal Kuliah

## Deskripsi
Dashboard Jadwal Kuliah adalah website sederhana untuk menampilkan jadwal perkuliahan mingguan agar lebih mudah dilihat dan diatur. Proyek ini dibuat untuk memenuhi tugas praktikum Pemrograman Aplikasi Web (PAW).

## Fitur
- Menampilkan jadwal kuliah berdasarkan hari.
- Menampilkan nama mata kuliah, kelas, waktu, dan lokasi.
- Membedakan jadwal kuliah online dan offline.
- Menampilkan ringkasan jadwal kuliah.
- Menyediakan filter jadwal berdasarkan hari.
- Memiliki tampilan bernuansa pink yang sederhana dan elegan.

## Teknologi
- HTML
- CSS
- JavaScript
- localStorage

## Struktur File
- `index.html`: Mengatur struktur halaman website.
- `style.css`: Mengatur tampilan dan desain website.
- `javaScript.js`: Mengatur fungsi interaktif dan data jadwal.
- `README.md`: Berisi informasi tentang proyek.
- `screenshot_Pertemuan2/`: Menyimpan gambar dokumentasi aplikasi.

## Dokumentasi Screenshot

### 1. Tampilan Dashboard Jadwal Kuliah
![Dashboard Jadwal Kuliah](./screenshot_jadwal/1_JadwalUtama.png)

### 2. Tampilan Daftar Jadwal Kuliah
![Daftar Jadwal Kuliah](./screenshot_jadwal/2_JadwalUtama2.png)

### 3. Tampilan Daftar Jadwal Kuliah
![Daftar Jadwal Kuliah](./screenshot_jadwal/3_JadwalUtama3.png)

### 4. Tampilan Form Tambah Jadwal
![Form Jadwal Kuliah](./screenshot_jadwal/4_TambahJadwal.png)

### 5. Tampilan Form Tambah Jadwal
![Form Jadwal Kuliah](./screenshot_jadwal/5_HasilTambah.png)

### 6. Tampilan Filter Jadwal
![Filter Jadwal Kuliah](./screenshot_jadwal/6_FilterHari.png)

### 7. Tampilan Edit Jadwal
![Filter Jadwal Kuliah](./screenshot_jadwal/7_EditJadwal.png)

### 8. Tampilan Hapus Jadwal
![Filter Jadwal Kuliah](./screenshot_jadwal/8_HapusJadwal.png)

### 9. Tampilan Hapus Jadwal
![Filter Jadwal Kuliah](./screenshot_jadwal/9_HasilHapus.png)

## Penjelasan Teknis Singkat

### 1. Struktur Halaman dengan HTML
HTML digunakan untuk membangun struktur dashboard, termasuk bagian ringkasan jadwal, daftar mata kuliah, filter hari, serta formulir untuk mengelola jadwal perkuliahan.

### 2. Desain Antarmuka dengan CSS
CSS digunakan untuk mengatur tata letak, warna, ukuran teks, tombol, formulir, dan komponen dashboard. Pemilihan warna bernuansa pink memberikan tampilan yang sederhana dan konsisten.

### 3. Pengelolaan Jadwal dengan JavaScript
JavaScript digunakan untuk menampilkan data jadwal kuliah, memfilter jadwal berdasarkan hari, serta menangani penambahan, pengubahan, dan penghapusan jadwal.

### 4. Penyimpanan Data dengan localStorage
Data jadwal dapat disimpan menggunakan `localStorage` pada browser. Data JavaScript dikonversi menjadi JSON menggunakan `JSON.stringify()` dan dibaca kembali menggunakan `JSON.parse()` sehingga data dapat dipertahankan setelah halaman dimuat ulang.

## Cara Menjalankan
1. Buka folder proyek di Visual Studio Code.
2. Pastikan file HTML, CSS, dan JavaScript berada di lokasi yang sesuai.
3. Jalankan `index.html` menggunakan browser atau ekstensi Live Server.

## Tujuan
Menerapkan HTML, CSS, dan JavaScript untuk membuat dashboard jadwal kuliah yang informatif, menarik, dan mudah digunakan.

---

Dibuat untuk tugas praktikum Pemrograman Aplikasi Web (PAW).