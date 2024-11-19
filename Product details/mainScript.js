<script>
  /*<![CDATA[*/
    function getProductById(id) {
        return data_product_JSON.products.find(product => product.id === id);
    }

    function setMainPreview(mediaSrc) {
        const mainPreview = document.getElementById("main-preview");
        mainPreview.innerHTML = ""; // Kosongkan sebelumnya

        // Buat elemen HTML berdasarkan jenis media
        if (mediaSrc.includes("youtube.com") || mediaSrc.includes("youtu.be")) {
            mainPreview.innerHTML = `
                <iframe src="${mediaSrc}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            `;
        } else if (mediaSrc.endsWith(".mp4")) {
            mainPreview.innerHTML = `
                <video src="${mediaSrc}" width="100%" height="100%" controls></video>
            `;
        } else {
            mainPreview.innerHTML = `
                <img src="${mediaSrc}" alt="Preview Gambar" style="width: 100%; height: auto;">
            `;
        }
    }

    function displayProduct(id) {
        const product = getProductById(id);
        if (!product || !product.media || product.media.length === 0) return;

        // Set preview utama ke media pertama
        setMainPreview(product.media[0]);

        const thumbnailsContainer = document.getElementById("product-thumbnails");
        thumbnailsContainer.innerHTML = ""; // Kosongkan thumbnail sebelumnya

        // Menampilkan preview thumbnail berdasarkan media
        product.media.forEach((media, index) => {
            const thumbLink = document.createElement("a");
             thumbLink.setAttribute("onclick", `setMainPreview('${media}')`); // Gunakan onclick untuk memilih preview
            thumbLink.dataset.index = index; // Set index sebagai data attribute untuk referensi

            let thumb;
            if (media.includes("youtube.com") || media.includes("youtu.be")) {
                const videoId = media.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/]+)/);
                if (videoId) {
                    thumb = document.createElement("img");
                    thumb.src = `https://img.youtube.com/vi/${videoId[1]}/0.jpg`;
                    thumb.alt = "YouTube Video";
                    thumb.style.width = "100px";
                    thumb.style.height = "auto";
                }
            } else if (media.endsWith(".mp4")) {
                thumb = document.createElement("video");
                thumb.src = media;
                thumb.width = 100;
                thumb.height = 60;
                thumb.muted = true;
                thumb.loop = true; // Memutar video secara otomatis pada thumbnail
                thumb.autoplay = true;
            } else {
                thumb = document.createElement("img");
                thumb.src = media;
                thumb.alt = "Thumbnail Gambar";
                thumb.style.width = "100px";
                thumb.style.height = "auto";
            }

            if (thumb) {
                thumbLink.appendChild(thumb);
                thumbnailsContainer.appendChild(thumbLink);
            }
        });
              // Menampilkan detail produk
        const productContainer = document.getElementById("product_cc");
        productContainer.innerHTML += `
        <div class="product-detailsPrice">
              <span class="pc0_Price">
                <p class="pc1_Price pcColor pc_bold">${product.premium_Or_free}</p>
           <span class="pc2_Price pcColor">	
	  <p class="pcColor" data-currency="Rp">${product.priceRp}</p>/
      <p class="pcColor" data-currency="$">${product.priceUSD}</p>
 				</span>
              </span>
          </div>
		<div class="product-details brtop_pc">
              <span class="pc0">
                <p class="pc1">Name</p>
                <p class="pc2">${product.name}</p>
              </span>

              <span class="pc0">
                <p class="pc1">Latest version:</p>
                <p class="pc2">${product.version}</p>
              </span>
              <span>
                <p class="pc1">Release Date:</p>
                <p class="pc2">${product.release_date}</p>
              </span>

              <span class="pc0">
                <p class="pc1">Latest Updates:</p>
                <p class="pc2">${product.last_update}</p>
              </span>
              
              <ul class="product-requirements brtop_pc">
                ${product.requirements.map(req => `<li class="${req.mandatory ? 'mandatory' : 'not-mandatory'}">${req.requirement}</li>`).join('')}
              </ul>
            </div>
            
            <div class="btnlink brtop_pc">
              <a class="btnlink_dwn" href="${product.download_link}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="gold" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M16 12L4 24.4322L16 36"/><path stroke-linejoin="round" d="M32 12L44 24.4322L32 36"/><path d="M24 17V31"/><path stroke-linejoin="round" d="M18 25L24 31L30 25"/></g></svg>Download</a>
              <a class="btnlink_help" href="${product.help_link}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="gold" d="m12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5zm0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3zM16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14zm1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33z"/></svg>Bantuan (Help)</a>
            </div>
        `;
    }
        displayProduct(produkID);
 /*]]>*/
</script>
