// Data keranjang
let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

// Mengambil elemen dari HTML
const formBarang = document.getElementById("formBarang");
const namaBarang = document.getElementById("namaBarang");
const hargaBarang = document.getElementById("hargaBarang");
const qtyBarang = document.getElementById("qtyBarang");

const tabelKeranjang = document.getElementById("tabelKeranjang");
const keranjangKosong = document.getElementById("keranjangKosong");

const subtotal = document.getElementById("subtotal");
const diskon = document.getElementById("diskon");
const total = document.getElementById("total");

const uangBayar = document.getElementById("uangBayar");
const kembalian = document.getElementById("kembalian");

const btnHitung = document.getElementById("btnHitung");
const btnReset = document.getElementById("btnReset");

const errorNama = document.getElementById("errorNama");
const errorHarga = document.getElementById("errorHarga");
const errorQty = document.getElementById("errorQty");
const errorBayar = document.getElementById("errorBayar");

const pesan = document.getElementById("pesan");

// Menampilkan isi keranjang
function tampilkanKeranjang() {
    tabelKeranjang.innerHTML = "";

    if (keranjang.length === 0) {
        keranjangKosong.style.display = "block";
    } else {
        keranjangKosong.style.display = "none";

        keranjang.forEach(function (barang, index) {
            const baris = document.createElement("tr");

            baris.innerHTML = `
                <td>${index + 1}</td>
                <td>${barang.nama}</td>
                <td>${formatRupiah(barang.harga)}</td>
                <td>${barang.qty}</td>
                <td>${formatRupiah(barang.subtotal)}</td>
                <td>
                    <button class="btn-hapus" onclick="hapusBarang(${index})">
                        Hapus
                    </button>
                </td>
            `;

            tabelKeranjang.appendChild(baris);
        });
    }

    hitungTotal();
}

// Mengubah angka menjadi format Rupiah
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// Menambahkan barang ke keranjang
formBarang.addEventListener("submit", function (event) {
    event.preventDefault();

    // Mengambil nilai input
    const nama = namaBarang.value.trim();
    const harga = Number(hargaBarang.value);
    const qty = Number(qtyBarang.value);

    // Menghapus pesan error sebelumnya
    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";

    let valid = true;

    // Validasi nama
    if (nama.length < 3) {
        errorNama.textContent = "Nama barang minimal 3 karakter.";
        valid = false;
    }

    // Validasi harga
    if (harga < 500 || isNaN(harga)) {
        errorHarga.textContent = "Harga minimal Rp500.";
        valid = false;
    }

    // Validasi qty
    if (qty < 1 || isNaN(qty)) {
        errorQty.textContent = "Jumlah barang minimal 1.";
        valid = false;
    }

    // Jika ada data yang tidak valid, hentikan proses
    if (!valid) {
        return;
    }

    // Menghitung subtotal
    const subtotalBarang = harga * qty;

    // Membuat data barang
    const barang = {
        nama: nama,
        harga: harga,
        qty: qty,
        subtotal: subtotalBarang
    };

    // Memasukkan barang ke keranjang
    keranjang.push(barang);

    // Menyimpan keranjang ke LocalStorage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // Menampilkan kembali keranjang
    tampilkanKeranjang();

    // Mengosongkan form
    formBarang.reset();
    qtyBarang.value = 1;

    // Memberikan pesan
    pesan.textContent = "Barang berhasil ditambahkan.";
});

// Menghitung subtotal, diskon, dan total
function hitungTotal() {
    let totalSubtotal = 0;

    // Menjumlahkan semua subtotal barang
    keranjang.forEach(function (barang) {
        totalSubtotal += barang.subtotal;
    });

    // Diskon 10% jika subtotal minimal Rp50.000
    let totalDiskon = 0;

    if (totalSubtotal >= 50000) {
        totalDiskon = totalSubtotal * 0.10;
    }

    // Menghitung total setelah diskon
    const totalBayar = totalSubtotal - totalDiskon;

    // Menampilkan hasil ke halaman
    subtotal.textContent = formatRupiah(totalSubtotal);
    diskon.textContent = formatRupiah(totalDiskon);
    total.textContent = formatRupiah(totalBayar);

    return totalBayar;
}

// Menghapus barang dari keranjang
function hapusBarang(index) {
    keranjang.splice(index, 1);

    // Memperbarui LocalStorage
    localStorage.setItem("keranjang", JSON.stringify(keranjang));

    // Menampilkan kembali keranjang
    tampilkanKeranjang();

    pesan.textContent = "Barang berhasil dihapus.";
}

// Menampilkan keranjang saat halaman pertama kali dibuka
tampilkanKeranjang();

// Menghitung pembayaran dan kembalian
btnHitung.addEventListener("click", function () {
    const uang = Number(uangBayar.value);
    const totalBayar = hitungTotal();

    errorBayar.textContent = "";
    pesan.textContent = "";

    // Validasi uang bayar
    if (isNaN(uang) || uang <= 0) {
        errorBayar.textContent = "Masukkan jumlah uang yang valid.";
        kembalian.textContent = "Rp0";
        return;
    }

    // Mengecek apakah uang cukup
    if (uang < totalBayar) {
        errorBayar.textContent = "Uang pembayaran kurang.";
        kembalian.textContent = "Rp0";
        return;
    }

    // Menghitung kembalian
    const hasilKembalian = uang - totalBayar;

    kembalian.textContent = formatRupiah(hasilKembalian);
    pesan.textContent = "Pembayaran berhasil.";
});

// Mereset transaksi
btnReset.addEventListener("click", function () {
    keranjang = [];

    // Menghapus data dari LocalStorage
    localStorage.removeItem("keranjang");

    // Mengosongkan form
    formBarang.reset();
    qtyBarang.value = 1;
    uangBayar.value = "";

    // Menghapus pesan
    errorNama.textContent = "";
    errorHarga.textContent = "";
    errorQty.textContent = "";
    errorBayar.textContent = "";
    pesan.textContent = "";

    // Mengatur kembali kembalian
    kembalian.textContent = "Rp0";

    // Menampilkan keranjang kosong
    tampilkanKeranjang();
});