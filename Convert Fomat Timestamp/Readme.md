# Format Timestamp (timeago, 12hour, 24hour)

Fungsi `formatTimestamp` digunakan untuk memformat waktu (*timestamp*) ke beberapa jenis format, seperti:

- **12-hour (v1 & v2):**  
  - **v1:** Format tanggal saja, contoh: `15/08/2024`.  
  - **v2:** Format waktu 12 jam dengan periode, contoh: `15/08/2024 02:30 PM`.
- **24-hour:** Format waktu 24 jam, contoh: `15/08/2024 14:30`.
- **timeago:** Format waktu relatif, contoh:  
  - Dalam bahasa Inggris: `5 minutes ago`.  
  - Dalam bahasa Indonesia: `5 menit yang lalu`.

## Parameter

1. **`timestamp`**  
   - Waktu dalam milidetik (contoh: `Date.now()`).  
   - **Wajib diberikan** sebagai parameter untuk menentukan waktu yang akan diformat.

2. **`format`** *(opsional)*  
   - Jenis format yang diinginkan. Pilihan format:  
     - `'12hourv1'`: Format tanggal saja.  
     - `'12hourv2'`: Format waktu 12 jam dengan periode (AM/PM).  
     - `'24hour'`: Format waktu 24 jam.  
     - `'timeago_en'`: Format waktu relatif dalam bahasa Inggris.  
     - `'timeago_id'`: Format waktu relatif dalam bahasa Indonesia.  
   - Default: Format yang ditentukan oleh konfigurasi `config.modeFormat`.

## Config

```javascript
const config = {
    modeFormat: "24hour", // Format default jika parameter 'format' tidak diberikan
    timeago_auto12hourv1: true, // Aktifkan pengubahan otomatis ke format '12hourv1'
    auto12hourv1_dalam: 7, // Jumlah hari setelah timestamp untuk mengubah ke '12hourv1'
};
```
## contoh pakai


1. **Format**: '12hour'

```javascript
const formattedTime = formatTimestamp_hstry(Date.now(), '12hour');
console.log(formattedTime); 
// Output: 15/08/2024 02:30 PM

```


2. **Format**: '24hour'

```javascript
const formattedTime = formatTimestamp_hstry(Date.now(), '24hour');
console.log(formattedTime); 
// Output: 15/08/2024 14:30
```


1. **Format**: 'timeago'

```javascript
const oneHourAgo = Date.now() - 3600000; // 1 jam yang lalu
const formattedTime = formatTimestamp_hstry(oneHourAgo, 'timeago');
console.log(formattedTime); 
// Output: 1 hours ago
```
