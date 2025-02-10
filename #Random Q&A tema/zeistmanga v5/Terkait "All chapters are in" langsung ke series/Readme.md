# Tanya 
bisa ga kalau tujuan dari "All chapters are in"
![Contoh Gambar](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3YrJUvjJaUCiHeUULhxwRn3tdxvdcfh0pgABOEVDv_rYcH6ZWZICRhjGdtP0f3JT7BOUSVglJN-ilsISAB-NAT7G3NLJwfQdfCNBT_xVNLHdhXD2ZO-_nIF4IyltBS69EFIMqclYRl8G8zZlsB-_QxZRqvGMA4sMf90-n6L6ZHzPHjANwvE2rZBmX23E/s1600/Screenshot%202025-02-09%20at%2002-20-52%20Lock%20-%20Katainaka%20no%20Ossan%20Chapter%2005.png)

langsung ke post series dan bukan ke sini
![Contoh Gambar](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuWPL7FKxJR-51biBlyQiiIGMyGsCjY3ekYdshdezeDLru6jzvqs-J22Aye6C821ZOVIicbWGohM53YJsN0Z22EyeJ4xvOeOmOVH19Mo-aYlfvJI0uiF5wqUWHkRcKqi04M7XiyNYj-LxZGDHDUs3JC3DMktfy4GZGXfLE9ORcrJHM8S3BB0iTNjgFWRc/s1600/Screenshot%202025-02-09%20at%2002-22-09%20Rekomendasi%20Komik%20Katainaka%20no%20Ossan%20Terbaik.png)

sama seperti tombol home yg ada di sini
![Contoh Gambar](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTpi22t65Ch7OeEJiC3tsDvcs4kSPKdXZ6-Gi_pbrGDDt1tBSE245uLLI9iJb5rnfJMgzdgpPjWAadyPVtoI4c6EWD5rjGL4W8Dop8FxaB9x-uWAnuo6tP18Pn4x8VULH6GhddHG5kUkU7cc__drzEuTJT7At99Ni0h5Zasc0Sj3mdPZ0e30HZF1u6vxc/s1600/Screenshot%202025-02-09%20at%2002-26-14%20Lock%20-%20Katainaka%20no%20Ossan%20Chapter%2004.png)

# Jawaban 

letakan script ini
```html
<script> /*<![CDATA[*/
window.onload = (event) => {
var homeLink = document.querySelector("#nextPrevJS .nav-right a[rel='home']");
if (homeLink) {
var linkHomepageSeries = document.querySelector(".tac a.c-theme.fw-600[rel='tag']");
if (linkHomepageSeries) {
linkHomepageSeries.href = homeLink.href;
}
}
};
/*]]>*/
</script>
```
dibagian bawah alias diatasnya `</body>`