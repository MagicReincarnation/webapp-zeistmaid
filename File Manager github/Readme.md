# Manajemen File 

Kode ini adalah sistem manajemen file berbasis JavaScript yang memungkinkan untuk:

1. Menavigasi struktur file.

2. Mengunduh file dalam bentuk ZIP.

3. Melacak lokasi menggunakan breadcrumb interaktif.

4. Menampilkan pratinjau (khusus) file HTML secara langsung dalam iframe.
5. 

Struktur data berbasis JSON, dihasilkan melalui GitHub Actions untuk menyinkronkan file dan folder dalam repositori secara otomatis.

---

## Fungsi dan Kegunaan

 Fungsi Utama:

1. Navigasi Folder:
 dapat berpindah antar folder dan melihat daftar file/folder di dalamnya.


2. Breadcrumb Interaktif:
Menampilkan jalur lokasi saat ini dan memungkinkan navigasi langsung ke folder tertentu.


3. Pratinjau File HTML:
(khusus) File HTML dapat dimuat dalam iframe untuk dilihat tanpa mengunduhnya.


4. Unduhan File > ZIP:
Mendukung unduhan file dalam bentuk arsip ZIP.

5. Penyimpanan Cache:
Struktur file disimpan di sessionStorage untuk mengurangi permintaan ke server.

2. Keunggulan Kode:

- Efisiensi: Menggunakan cache dan hanya memuat ulang data jika diperlukan.

- Sinkronisasi Otomatis: Struktur file diperbarui secara otomatis melalui GitHub Actions.
---

## Dokumentasi

 **Struktur Data JSON**

Data struktur file memiliki format:
```json
[
  {
    "name": "file.txt",
    "path": "folder/file.txt",
    "sha": "abc123",
    "size": 1024,
    "download_url": "https://raw.githubusercontent.com/user/repo/main/folder/file.txt",
    "type": "file"
  },
  {
    "name": "folder",
    "path": "folder",
    "sha": "def456",
    "size": 0,
    "download_url": null,
    "type": "dir"
  }
]
```
### Cara Kerja Kode

1. Memuat Data JSON:
Fungsi get_fect_files() memuat struktur file dari sessionStorage atau mengambil data dari URL JSON dan menyimpannya dalam cache.

2. Render File dan Folder:
Fungsi renderFiles() menampilkan file/folder pada UI. Navigasi folder dilakukan dengan mengecek jalur (path) dan type file (type).

3. Navigasi dan Breadcrumb: 
 Breadcrumb: Fungsi updateBreadcrumb() memperbarui breadcrumb berdasarkan lokasi saat ini (currentPath).
 Navigasi: Navigasi folder diperbarui melalui fungsi navigateToFolder().


4. Unduhan File > ZIP:
   File dapat diunduh langsung.
   Beberapa file dapat dipilih menggunakan checkbox untuk diunduh dalam bentuk ZIP melalui fungsi downloadSelectedFiles().

5. Pratinjau File HTML:
Fungsi renderFileInIframe() memuat file HTML dalam iframe.

6. GitHub Actions:
 untuk membaca/membuat struktur file dan folder.

Struktur JSON disimpan ke file file-structure.json.

---

### Cara Penggunaan

1. Ganti JSON Data Source:
Ganti url_fileJSON dengan URL JSON milikmu sendiri:
```javascript
const url_fileJSON = "https://raw.githubusercontent.com/username/repo/branch/file-structure.json";
```

2. pasang HTML & CSS: Tambahkan html dan css ke dalam keblog:
 ```html
 <div id="dd_filemanager" class="hiddeNotIframe">
  <div class="header_filemanager">
   <label for="downloadZip">
    <input type="checkbox" id="downloadZipCheckbox" name="downloadZip" />
    Select
   </label>
   <span class="breadcrumb" id="breadcrumb"></span>
   <button id="downloadSelectedButton">ZIP</button>
  </div>

  <div id="fileList" class="file-list"></div>

  <div class="footer_filemanager">
   <button id="homeButton">Home</button>
   <button id="backButton">Back</button>
  </div>
 </div>
 ```
   CSS ada difile `style.css`.

3. pasang libary dihead:
Tambahkan library yang dibutuhkan:
  ```html
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js" integrity="sha512-3FKAKNDHbfUwAgW45wNAvfgJDDdNoTi5PZWU7ak3Xm0X8u0LbDBWZEyPklRebTZ8r+p0M2KIJWDYZQjDPyYQEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 
 ```

4. Konfigurasi GitHub Actions:
Setting ijin github action terlebih dahulu, pergi ke Setting > Actions > general > scroll paling bawah > cari "Workflow permissions" > pilih "Read and write permissions" > save.
lalu buat folder dengan stuktur seperti ini `.github/workflows/generate-json.yml` dan isi file yml dengan file yang ada difolder `/File Manager Github/script backup/ymal v2/simpel.yaml`.
---

# Kesimpulan

Kode ini adalah solusi ideal untuk menampilkan dan mengelola file dalam struktur repositori. Dengan navigasi yang mudah, unduhan fleksibel, dan pratinjau langsung, dan dapat mengakses dan mendownload file tanpa memerlukan hosting tambahan. Selain itu, sinkronisasi otomatis dengan GitHub memastikan struktur selalu diperbarui.

Kode ini sangat fleksibel, mudah diterapkan, dan dapat disesuaikan untuk berbagai keperluan pengelolaan file berbasis web.

# Credit 
 - Roka