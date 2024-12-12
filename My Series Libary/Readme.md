# project Manga & Novel Chapter

Project ini adalah solusi lengkap untuk menampilkan daftar chapter manga atau novel. Dengan fitur-fitur fleksibel seperti sorting, filtering, dan pengelompokan volume, kode ini sangat cocok digunakan di blogger Manga/Novel yang membutuhkan pengelolaan chapter secara efisien. Terutama optimal untuk novel, tapi juga dapat digunakan untuk manga kok.

---

# Cara posting yang benar.

1. pasang label `Series` pada series Novel/Manga. 
2. setelah itu masuk ke postingan series Tersebut, dan pasang tag dibawah ini didalam postingan.
   ```javascript
   <div chapters="Label utama Novel/Manga">
     </div> 
   ```
3. kalau sudah pasang tag tersebut, tinggal ganti saja `Label utama Novel/Manga` dengan label series Novel/Manga. 
  **contoh:**
 ```javascript
<div chapters="Overlord">
  </div> 
  ```
4. done, tinggal cek saja sudah muncul belum chapternya, kalau belum muncul silahkan pasang label series novel/manga dichapternya juga, ya.. cara postnya mirip seperti dizeistmanga, walau ada sedikit perbedaan kecil.
6. harap laporkan kalau ada bug.


# Demo code 
 [My series](https://zeistmaid.blogspot.com/p/request.html?m=1)
---
## Fitur Utama

### 1. **Latest Chapters**
Menampilkan beberapa chapter terbaru langsung di halaman utama. Fitur ini memudahkan pembaca untuk mengakses chapter terkini tanpa harus menggulir daftar yang panjang.

### 2. **All Chapters & Volume**
- **All Chapters**: Menampilkan seluruh chapter dalam satu daftar tanpa filter atau pengelompokan.
- **Volume**: Chapter dikelompokkan berdasarkan volume.

### 3. **Sorting & Filter**
Chapter dapat diurutkan dengan beberapa opsi:
- Berdasarkan **tanggal** (terbaru ke terlama).
- Berdasarkan **judul** secara alfabetis (A-Z atau Z-A).
- Berdasarkan **nomor chapter** atau **volume**.

### 4. **Batch Berdasarkan Volume**
Jika judul chapter memiliki angka volume, kode ini akan secara otomatis mengelompokkan chapter ke dalam volume yang sesuai. Jika tidak ada angka volume, chapter akan masuk ke kategori *Tanpa Volume*.

### 5. **Optimasi untuk Novel**
Fitur-fitur seperti pengelompokan volume dan sorting judul dirancang khusus untuk novel yang memiliki struktur chapter berklompok di volume.

### 6. **Tombol Dinamis**
Tombol interaktif untuk mengontrol tampilan chapter:
- Tombol "Lihat Chapter" untuk memuat Latest Chapters.
- Tombol "All Chapters" dan "Volume" berfungsi ganda. Klik pertama untuk list lengkap chapter, klik kedua untuk list berdasarkan volume.

### 7. **Callback Dinamis**
Callback dibuat unik berdasarkan ID series sehingga data dari berbagai series tidak saling tumpang tindih.

### 8. **Badge New**
Badge new yang otomatis menghilang setelah 7 hari.

---

## Penjelasan Boolean

Kode ini memanfaatkan **boolean** untuk fleksibilitas dan kontrol logika. 

**beberapa fitur boolean penting:**

### **`maxChapters`**
Angka maksimum chapter yang akan ditampilkan di Latest Chapters. Misalnya, `maxChapters: 4` berarti 3 chapter terbaru (karena 1 digunakan untuk pengecualian series yang tidak perlu).

### **`maxChapters_batch`**
Angka maksimum chapter yang dimuat dalam mode All Chapters atau Volume, max hanya `150` fitur ini belum dibikin unlimited.

### **`sortBy`**
pilihan sorting chapter:
- `"date"`: Urutkan berdasarkan tanggal terbaru.
- `"titleAZ"`: Urutkan judul secara alfabetis (A-Z).
- `"titleZA"`: Urutkan judul secara alfabetis terbalik (Z-A).
- `"title_chapter"`: Urutkan berdasarkan nomor chapter.
- `"title_volume"`: Urutkan berdasarkan nomor volume.

### **`default_showChapter`**
- **`true`**: Chapter akan langsung terlihat saat halaman dimuat.
- **`false`**: Chapter tidak langsung terlihat dan hanya muncul setelah tombol diklik.

### **`consolActive`**
Aktifkan mode debugging. Berguna untuk melihat log di console saat mengembangkan atau memeriksa bug.

### **`modemax_infinitySeries`**
Mode untuk menggunakan loop, jika `true` pakai loop sedangkan `false` tidak memakai loop.

### **newBadgeThreshold**
jumlah berapa hari badge new yang otomatis akan menghilang,

---

## config

```javascript
const SeriesLibrary = {
    domain: "https://zeistmaid.blogspot.com",
    labelSeries: "Series",
    maxChapters: 4,
    maxChapters_batch: 150,
    sortBy: "date",
    default_showChapter: true,
    config: {
        modeFormat: 'timeago_id', 
        auto12hourv1_dalam: 14,
        timeago_auto12hourv1: true,
        statusLabel: ["Coming Soon", "Ongoing", "Completed", "Cancelled", "Hiatus", "Dropped", "Delay", "Drop"],
        typeLabel: ["Manga", "Novel", "Doujin", "WN", "LN", "Raw Novel", "Light Novel (JP)", "Web Novel (CN)", "Web Novel (JP)", "Web Novel (KR)", "Manhua", "Manhwa", "Doujinshi", "Long Strip", "Full Color", "One Shot", "Web Comic", "Official Colored", "Color", "Webtoon"],
        scoreRegex: /Score\s*([\d\.]+)/,
        durationRegex: /(\d{2}:\d{2}:\d{2})/,
        newBadgeThreshold: 7,
        image_default: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8o8jlwaO1aAXDzVCsLhkMLIwRzAzuoMO3235-3NJ2wfejkM5elc6WzFoeHxUsrHhpbNb5U4QOyW-4MmkDPLsMrd7GxcTbNU6q4yMLraOF0Kp97Z4F4RHsshFp6iW3TjKPAnjhIcCpTR9nQHpFNKu-8pFej7qxHPwKDyVzYlJt9SEa6VyKCO0fot_O0Q/s449/No-Image-Placeholder.svg.png",
    },
    seriesData: {},
    feedIndex: 1,
    maxFeedResults: 150,
    consolActive: false,
    modemax_infinitySeries: false,
};
```

---

# Optimal untuk Novel

Kode ini dirancang untuk website novel:

1. Volume Terstruktur: Membantu mencari chapter jauh lebih mudah saat jumlah chapter banyak.


2. Sorting Judul: Judul chapter novel yang sering panjang jadi lebih mudah ditemukan.

3. Latest Chapters: nah ini yang kusuka Bagus untuk novel yang rutin menambahkan chapter baru, terlebih ini otomatis gak perlu menambahkan label, cukup dengan upload chapter terbaru maka itu langsung muncul.

hmm..kalau ditanya apa bagus untuk manga..
kode ini tetap bagus untuk digunakan manga.

---

# Changelog

**Initial Release (v1.0.0)**

### Ringkasan Fitur:

- Menampilkan Latest Chapters, All Chapters, dan Volume.

- Sorting berdasarkan tanggal, judul, dan nomor chapter/volume.

- Badge new yang otomatis menghilang.

- Callback dinamis untuk mencegah konflik data.

- Tombol dinamis untuk lihat chapter.

- Optimasi untuk novel.

# Credit 

 - **Hirutshuji**
