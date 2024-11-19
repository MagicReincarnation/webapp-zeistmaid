# Format Timestamp (timeago, 12hour, 24hour)

Fungsi `formatTimestamp_hstry` digunakan untuk memformat waktu (*timestamp*) ke beberapa jenis format, seperti:

- **12-hour:** Format waktu 12 jam, contoh: `15/08/2024 02:30 PM`.
- **24-hour:** Format waktu 24 jam, contoh: `15/08/2024 14:30`.
- **timeago:** Format waktu relatif, contoh: `5 minutes ago`.

## Parameter

1. **`timestamp`**: 
   - Waktu dalam milidetik (contoh: `Date.now()`).
   - Wajib diberikan sebagai parameter untuk menentukan waktu yang akan diformat.

2. **`format`**:
   - Jenis format yang diinginkan. Pilihan format:
     - `'12hour'` (default): Untuk format 12 jam.
     - `'24hour'`: Untuk format 24 jam.
     - `'timeago'`: Untuk format waktu relatif seperti "5 minutes ago".


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