# Dokumentasi Anti Inspect Element untuk Kiwi Browser
 
ini adalah JavaScript yang digunakan untuk menutup tab browser secara paksa, menghapus elemen tertentu pada halaman, dan membersihkan aktivitas console browser. Kode ini dirancang untuk menjaga keamanan konten dan mencegah manipulasi atau eksploitasi oleh pengguna yang mencoba mengakses fitur developer tools.

## Deskripsi Fungsi

Fungsi utama dalam skrip ini adalah `Devmode_open()`. Fungsi ini dirancang untuk:

- **Menutup jendela aktif:** Menggunakan metode `window.close()` untuk menutup tab browser secara langsung.
- **Mengganti URL dengan halaman kosong:** Menggunakan `window.location.replace("about:blank")` dan `window.location.href = 'about:blank'` untuk mengarahkan pengguna ke halaman kosong.
- **Navigasi mundur:** Menggunakan `window.history.back()` untuk mengarahkan kembali ke halaman sebelumnya.
- **Menghapus elemen `<script>`:** Mencegah eksekusi ulang skrip dengan menghapus elemen `<script>` dari halaman.
- **Membersihkan console:** Menggunakan `console.clear()` untuk menghapus riwayat log dari console browser.

## Penjelasan Kode

- **Fungsi `Devmode_open()`:** 
  Fungsi ini menangani berbagai tindakan seperti menutup jendela, menghapus elemen `<script>`, dan membersihkan console. Semua proses dilakukan dalam waktu singkat menggunakan `setTimeout()`.

- **Kelas `run_antiInspectElement_hr`:**
  Kelas kustom ini memperluas kelas bawaan `Error`. Ketika properti `message` diakses, fungsi `Devmode_open()` akan dipanggil untuk langsung mengaktifkan tindakan pengamanan.

- **Pembersihan Console:**
  Dengan `console.clear()`, kode memastikan bahwa tidak ada informasi sensitif atau riwayat log yang dapat diakses oleh pengguna melalui console browser.

## Cara Penggunaan

Untuk menggunakan skrip ini, salin dan tempelkan kode lengkapnya dibawah tag `<head>` pada halaman HTML.

## Kesimpulan

Skrip ini berguna untuk:

- Melindungi halaman dari eksploitasi developer tools.
- Menghapus elemen `<script>` agar tidak mudah diakses.
- Menjaga kebersihan console browser.

Namun, penggunaannya perlu dipertimbangkan secara hati-hati untuk memastikan tidak mengganggu pengalaman pengunjung.