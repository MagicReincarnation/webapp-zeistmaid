# Change Log

## [1.0.1] R2 - 2024-12-16
### Changed
- **Penghapusan Volume Batch dan All Chapters**: Menghapus fitur All Chapters dan Volume Batch, hanya menampilkan Latest Chapter.
- **Filter Title**: Menambahkan Fitur Memodifikasi judul chapter (misal.. "Volume" menjadi "Vol", "Season" menjadi "S", "Chapter" menjadi "Ch").
- **Fungsi `fetchFeedByLabel` dan `runLoadChapterNow`**: Diubah untuk hanya memuat Latest Chapter, tanpa batch atau volume.

### Fixed
- **Tampilan dan UX**: Menghapus tampilan untuk All Chapters dan Volume, hanya menampilkan chapter terbaru, dan memberikan style dasar pada kodenya.
- **Button load more**: sebagai pengganti jika load more scroll tidak bekerja maka bisa menggunakan button untuk load more postingan series.
- **Loader book**: Memperbaiki sedikit bug pada icon loader book. 

# New Demo 
 [My series R2 latest Chapter Only](https://codehiru.blogspot.com/2024/12/my-list-unlimited-v101-r2-latest.html?m=1)


## Contoh Input dan Output Filter Title:

### 1. Input:

Overlord Vol 2 Ch 1.2

**Output**:

Vol 2 Ch 1.2

**Penjelasan**:  
- **Input**: "Overlord Vol 2 Ch 1.2"  
- **Output**: "Vol 2 Ch 1.2"  
 menangkap judul "Vol" dan "Ch" yang diikuti dengan angka dan angka desimal, serta mempertahankan semua bagian tersebut. Bagian "Overlord" dihapus.

### 2. Input:

Overlord Vol 2 end

**Output**:

Vol 2 end

**Penjelasan**:  
- **Input**: "Overlord Vol 2 end"  
- **Output**: "Vol 2 end"  
judul "Vol" dan angka "2" dipertahankan, dan teks setelah angka "end" tetap ada. Bagian awal "Overlord" dihapus.

### 3. Input:

Overlord Vol 2 Ch 1 end

**Output**:

Vol 2 Ch 1 end

**Penjelasan**:  
- **Input**: "Overlord Vol 2 Ch 1 end"  
- **Output**: "Vol 2 Ch 1 end"  
 menangkap judul "Vol 2" dan "Ch 1", serta mempertahankan teks setelahnya, yaitu "end". Bagian "Overlord" dihapus.

### 4. Input:

Overlord Volume 1 Chapter 2 Prologue

**Output**:

Volume 1 Chapter 2 Prologue

**Penjelasan**:  
- **Input**: "Overlord Volume 1 Chapter 2 Prologue"  
- **Output**: "Volume 1 Chapter 2 Prologue"  
judul "Volume" dan angka "1" serta "Chapter" dan angka "2" dipertahankan. Teks setelahnya ("Prologue") juga tetap ada. Bagian "Overlord" dihapus.

### 5. Input:

Overlord Ep 3 Season 1 Episode 2

**Output**:

Ep 3 Season 1 Episode 2

**Penjelasan**:  
- **Input**: "Overlord Ep 3 Season 1 Episode 2"  
- **Output**: "Ep 3 Season 1 Episode 2"  
judul "Ep" dan angka "3", "Season" dan angka "1", serta "Episode" dan angka "2" dipertahankan. Bagian "Overlord" dihapus.

### 6. Input:

Overlord S 4 Chapter 1

**Output**:

S 4 Chapter 1

**Penjelasan**:  
- **Input**: "Overlord S 4 Chapter 1"  
- **Output**: "S 4 Chapter 1"  
menangkap "S" dan angka "4", serta kata "Chapter" dengan angka "1", dan dipertahankan. "Overlord" dihapus.
---