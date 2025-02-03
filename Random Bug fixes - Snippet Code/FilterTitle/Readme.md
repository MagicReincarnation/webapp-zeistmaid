# Format Judul yang Didukung  

Kode ini secara otomatis menyesuaikan format judul manga, novel, atau episode agar lebih ringkas.  

## **Format yang akan diproses**  

Kode akan mengonversi kata kunci tertentu seperti `Volume`, `Chapter`, `Season`, dll., menjadi bentuk singkatan.  

---

### **Format Standar**  

| **Judul Asli**                 | **Judul Setelah Diproses** |
|---------------------------------|---------------------------|
| `Overlord Volume 12 Chapter 5`          | `Vol 12 Ch 5`             |
| `Overlord Volume 3 Extra Chapter`       | `Vol 3 Etc`               |
| `Overlord Season 2 Episode 4`           | `S 2 Ep 4`                |
| `Overlord Short Story 1`                | `SS 1`                    |

---

### **Format dengan Variasi Huruf Besar/Kecil**  

Kode tetap bekerja dengan berbagai kombinasi huruf besar/kecil.  

| **Judul Asli**                  | **Judul Setelah Diproses** |
|----------------------------------|---------------------------|
| `Overlord VOLUME 12 CHAPTER 5`           | `Vol 12 Ch 5`             |
| `Overlord volume 3 extra chapter`        | `Vol 3 Etc`               |
| `Overlord sEaSoN 2 ePisode 4`            | `S 2 Ep 4`                |

---

### **Format Singkatan yang Didukung**  

Kode mengenali format singkatan umum seperti `Vol`, `Ch`, `Ep`, dll.  

| **Judul Asli**                 | **Judul Setelah Diproses** |
|---------------------------------|---------------------------|
| `Overlord Vol 5 Ch 3`                 | `Vol 5 Ch 3`              |
| `Overlord S 4 Ep 8`                   | `S 4 Ep 8`                |
| `Overlord Volume 10 Prologue`           | `Vol 10 Prologue`         |

---

### **Format dengan Karakter Tambahan**  

Kode tetap berfungsi jika judul memiliki karakter tambahan seperti tanda baca atau simbol.  

| **Judul Asli**                          | **Judul Setelah Diproses** |
|------------------------------------------|---------------------------|
| `Overlord Volume 2 - Chapter 1: The Beginning`   | `Vol 2 - Ch 1: The Beginning` |
| `Overlord Season 5: Episode 3 (Finale)`          | `S 5: Ep 3 (Finale)`          |
| `Overlord Volume 7 (Special Edition) Chapter 9`  | `Vol 7 (Special Edition) Ch 9` |

---

### **Format Khusus yang Ditangani**  

| **Judul Asli**                    | **Judul Setelah Diproses** |
|------------------------------------|---------------------------|
| `Overlord Volume 1 Chapter 5.5 part 1`            | `Vol 1 Ch 5.5 part 1`
| `Overlord Volume 1 Chapter 5.5`            | `Vol 1 Ch 5.5`            |
| `Overlord Season 3 Ep 10 - OVA`            | `S 3 Ep 10 - OVA`         |
| `Overlord Chapter 0 (Episode Tambahan)`       | `Ch 0 (Episode Tambahan)`    |

---

### **Format yang Tidak Akan Berubah**  

Kode **tidak akan mengubah** judul jika tidak mengandung pola yang ditargetkan.  

| **Judul Asli**                | **Judul Setelah Diproses** |
|--------------------------------|---------------------------|
| `Overlord `                   | `Overlord `
| `My Hero Academia`            | `My Hero Academia`        |
| `Attack on Titan - The Final` | `Attack on Titan - The Final` |
| `Jujutsu Kaisen`              | `Jujutsu Kaisen`          |

---

## **Fitur Utama**  

- **Mendukung berbagai format judul** untuk ch manga, novel, dan series.  
- **Dapat mengenali berbagai variasi huruf besar/kecil & singkatan umum.**  
- **Menghindari perubahan pada judul yang tidak mengandung pola yang ditargetkan.**.



## Demo Cara Pakai

- **Pakai Kode `Filter_title.js` ke dalam kode kamu**  
  - Pastikan kode yang ada difile `Filter_title.js` yang berisi function `mangaPost_settingTitle(title)` sudah diletakan discript kamu.

- **Contoh Cara Pakai scriptnya**  

  - **Ubah judul sebelum ditampilkan:**  
    ```js
    let rawTitle = "Volume 12 Chapter 5 Extra Chapter";
    
    let formattedTitle = mangaPost_settingTitle(rawTitle);// ini mangaPost_settingTitle
    
    console.log(formattedTitle); // Output: "Vol 12 Ch 5 Etc"
    ```

  - **Pakai di event button:**  
    ```js
    document.getElementById("titleButton").addEventListener("click", function() {
        let inputTitle = document.getElementById("titleInput").value;
        
        let formatted = mangaPost_settingTitle(inputTitle);// ini mangaPost_settingTitle
        
        alert("Judul Setelah Diformat: " + formatted);
    });
    ```

  - **Ubah data array judul:**  
    ```js
    let mangaList = [
        "Season 2 Episode 3",
        "Volume 5 Chapter 20",
        "Extra Chapter 7"
    ];
    
    let formattedList = mangaList.map(title => mangaPost_settingTitle(title)); // ini mangaPost_settingTitle
    
    console.log(formattedList);
    // Output: ["S 2 Ep 3", "Vol 5 Ch 20", "Etc 7"]
    ```