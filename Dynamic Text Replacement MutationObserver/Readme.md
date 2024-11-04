# Kegunaan Script Dynamic Text Replacement MutationObserver

Skrip ini mengganti teks di halaman web secara otomatis dan sesuai kebutuhan. Berikut ini beberapa kegunaannya:

1. Ganti Teks dengan Mudah: 
Tinggal atur teks mana yang mau diubah—nggak perlu repot-repot coding ulang!.

BAHKAN Script ini mampu merubah text pada element yang dibuat oleh javascript, ini memudahkan bagi kamu yang javascript diencrypt sehingga sulit merubah text.

2. Config Sederhana: bisa edit array Config dengan mudah, Tambah, ubah, atau hapus Replace Text jauh lebih gampang.


3. Bisa berbagai selector: Kamu bisa pilih elemen mana saja yang mau diubah, dari class hingga ID—semua bisa!


4. Responsif terhadap Perubahan: Skrip ini cerdas! Ia memantau perubahan di halaman, jadi teks baru yang muncul juga akan langsung diganti.


5. Meningkatkan informatif website: Ganti pesan yang membingungkan jadi lebih informatif.


Dengan skrip ini, kamu bisa mudah menyesuaikan konten halaman web kamu dan bisa bikin pengunjung web jadi lebih nyaman!

## Menambah atau Mengubah Replace Text

## 1. Cari Bagian Config:

Temukan bagian kode yang dimulai dengan `const config_tag_replace_text = {....}`. Di sinilah kita mengatur replace text.

## Apa Itu Struktur `config_tag_replace_text`?

`tag_replace_text`: Ini adalah daftar (array) yang berisi objek-objek yang kita gunakan untuk menentukan elemen yang ingin kita ubah dan teks yang akan diganti.

### Penjelasan `tag_replace_text`:

- **`tagclass_or_id`**: Selector CSS yang kamu gunakan untuk memilih elemen. Misalnya, `.live-search-item` atau `#searchButton`.
- **`search`**: Teks yang ingin kamu cari, seperti `"Tidak di temukan"`.
- **`replace`**: Teks baru yang akan menggantikan yang lama, seperti `"Not Found"`.

## Contoh Pakai

### 1. Menambah Replace Text:

Jika kamu ingin menambahkan replace text baru, cukup tambahkan objek baru ke dalam array `tag_replace_text`. Misalnya, kamu ingin mengganti teks "Teks Lama" menjadi "Teks Baru" pada elemen dengan kelas `.new-class`. Berikut contohnya:

```javascript
{ tagclass_or_id: ".new-class", search: "Teks Lama", replace: "Teks Baru" }
```

2. Mengubah Replace Text yang Sudah Ada:

Untuk mengubah teks yang sudah ada, cukup edit nilai dari search atau replace pada objek yang sesuai. Misalnya, jika kamu ingin mengubah teks yang muncul di tombol pencarian dari "Search Comment" menjadi "Find Comment", kamu cukup ubah nilai replace seperti ini:
```javascript
{ tagclass_or_id: "#searchButton", search: "Search Comment", replace: "Find Comment" }
```

3. Menghapus Replace Text:

Mau hapus replace? Cukup hilangkan baris objek tersebut dari array.

Contoh Config

Berikut adalah contoh pengaturan yang bisa kamu pakai:
```javascript
const config_tag_replace_text = {
    tag_replace_text: [
        { tagclass_or_id: ".live-search-item", search: "Tidak di temukan", replace: "Not Found" },
        { tagclass_or_id: "#searchButton", search: "Search Comment", replace: "Hello Isekai" },
        // Tambah atau ubah sesuai yang kamu butuhkan
    ]
};
```
Intinya

Dengan cara ini, kamu bisa gampang banget menyesuaikan skrip ini sesuai keinginanmu. Main-mainlah dengan config, ubah teks sesuai kebutuhan, dan lihat hasilnya!

Selamat berkreasi!

