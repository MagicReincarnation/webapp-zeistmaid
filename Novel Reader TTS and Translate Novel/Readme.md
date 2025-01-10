
# Novel Reader TTS & Translator

# Set tag dibaca 
 Cari ini `this.readableTags=["p","b","span","div","h1","h2","h3","h4","strong"]` tambahkan element lain disitu.
 
 # Catatan 
untuk memasangnya ketema.
 1. letakan kode `script.xml` diatas `</body>`.
 2. setelahnya cari `<data:post.body/>` dan kurung dengan div yang memiliki `id="novel_reader_tts_translate"`.  
    - **Lihat digambar untuh contohnya**
 3. Terakhir letakan `constrols_Setting.xml` ditempat yang bisa kamu manfaatkan.. ini adalah button untuk memunculkan modal popup.
 
 Untuk tema **Zeistmaid** bisa lihat Video tutorialnya disini [link video](https://youtu.be/JVBwECaT05U?si=ewVjh1vrIX3MV-JB)

## Fitur Kode
- **Text-to-Speech**: Membaca teks menggunakan `speechSynthesis` API.
- **Terjemahan Teks**: Menerjemahkan teks menggunakan Google Translate API.
- **Select Bahasa**: Memilih bahasa suara dan terjemahan.
- **Setting**: Mengatur kecepatan, pitch, dan volume suara.
- **Auto Restart**: Memulai pembacaan dari awal saat selesai (opsional).
- **Highlight Text**: Menandai teks yang sedang dibaca.
- **Tag dibaca**: Text diElement tag yang akan dibaca  ['p', 'b', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'strong'].

 
# Credit
 - roka (Original code)
 - hirutshuji (Improve code)