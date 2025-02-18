1. Cari baris kode ini: 
```javascript
document.getElementById("clwd").innerHTML = `${a+e}`
```
2. ganti dengan ini 
```javascript
document.getElementById("clwd").innerHTML = `${a+e}`;
  // **jumlah total chapter**  
let tagch = document.querySelector('.totalsCH');
if (tagch) {
  tagch.innerHTML = `1-${t}`;
}
```
3. lalu save, setelah disave pergi kepostingan series.. 
 1. code post kamu perlu diubah
      awalnya gini:
      ```html 
      <div class="y6x11p">Chapter <span class="dt">1 - ?</span></div>
      ```
  2. tambahkan class `totalsCH` disamping class `dt`
seperti ini: `class="dt totalsCH"`
