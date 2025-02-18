// Data Anime (contoh)
const anime_data = [
  /*data 1*/
  {
    "id": "attack_titan",
    "title": "Attack on Titan",
    "description": "Anime tentang umat manusia yang bertarung melawan Titan untuk bertahan hidup.",
    "icon": "asset/Attack on Titan/coverTitan.jpg",
    "bg": "asset/Attack on Titan/bgTitan.jpeg",
    "characters": [
    {
      "name": "Eren Yeager",
      "role": "Protagonis",
      "img": "asset/Attack on Titan/eren2.png",
      "detail": "Terobsesi menghancurkan Titan setelah tragedi masa kecil (maknya koit wkwkw)."
    },
    {
      "name": "Mikasa Ackerman",
      "role": "Petarung Handal",
      "img": "asset/Attack on Titan/mikasa_v1HD.png",
      "detail": "Salah satu prajurit terbaik, setia melindungi Eren."
    },
    {
      "name": "Levi Ackerman",
      "role": "Kapten Pasukan",
      "img": "asset/Attack on Titan/levi.png",
      "detail": "Dikenal sebagai prajurit terkuat, pendiam namun mematikan."
    }]
  },
  /*batas data 1*/
  {
    "id": "darling_franxx",
    "title": "Darling in the Franxx",
    "description": "Anime tentang pilot mecha yang bertarung melawan monster dengan sistem pasangan.",
    "icon": "asset/Darling in the Franxx/cover_DarlingInTheFranxx.jpeg",
    "bg": "asset/Darling in the Franxx/darlingIntheFranxx_bg_HD.jpg",
    "characters": [
    {
      "name": "Zero Two (002)",
      "role": "Heroine",
      "img": "asset/Darling in the Franxx/zerotwo2.png",
      "detail": "Misterius dan kuat, Zero Two adalah partner yang sulit ditebak."
    },
    {
      "name": "Hiro (016)",
      "role": "Protagonis",
      "img": "asset/Darling in the Franxx/hiroHD.png",
      "detail": "Pemuda potensial yang sempat kehilangan kepercayaan diri."
    },
    {
      "name": "Ichigo (015)",
      "role": "Teman Hiro",
      "img": "asset/Darling in the Franxx/ichigo.png",
      "detail": "Pemimpin Skuad yang peduli dan kadang cemburu pada Zero Two."
    }]
  },
  
  {
    "id": "attack_titan",
    "title": "Attack on Titan",
    "description": "Anime tentang umat manusia yang bertarung melawan Titan untuk bertahan hidup.",
    "icon": "asset/Attack on Titan/coverTitan.jpg",
    "bg": "asset/Attack on Titan/bgTitan.jpeg",
    "characters": [
    {
      "name": "Eren Yeager",
      "role": "Protagonis",
      "img": "asset/Attack on Titan/eren2.png",
      "detail": "Terobsesi menghancurkan Titan setelah tragedi masa kecil (maknya koit wkwkw)."
    },
    {
      "name": "Mikasa Ackerman",
      "role": "Petarung Handal",
      "img": "asset/Attack on Titan/mikasa_v1HD.png",
      "detail": "Salah satu prajurit terbaik, setia melindungi Eren."
    },
    {
      "name": "Levi Ackerman",
      "role": "Kapten Pasukan",
      "img": "asset/Attack on Titan/levi.png",
      "detail": "Dikenal sebagai prajurit terkuat, pendiam namun mematikan."
    }]
  },
  
  {
    "id": "darling_franxx",
    "title": "Darling in the Franxx",
    "description": "Anime tentang pilot mecha yang bertarung melawan monster dengan sistem pasangan.",
    "icon": "asset/Darling in the Franxx/cover_DarlingInTheFranxx.jpeg",
    "bg": "asset/Darling in the Franxx/darlingIntheFranxx_bg_HD.jpg",
    "characters": [
    {
      "name": "Zero Two (002)",
      "role": "Heroine",
      "img": "asset/Darling in the Franxx/zerotwo2.png",
      "detail": "Misterius dan kuat, Zero Two adalah partner yang sulit ditebak."
    },
    {
      "name": "Hiro (016)",
      "role": "Protagonis",
      "img": "asset/Darling in the Franxx/hiroHD.png",
      "detail": "Pemuda potensial yang sempat kehilangan kepercayaan diri."
    },
    {
      "name": "Ichigo (015)",
      "role": "Teman Hiro",
      "img": "asset/Darling in the Franxx/ichigo.png",
      "detail": "Pemimpin Skuad yang peduli dan kadang cemburu pada Zero Two."
    }]
  },
];

// function untuk update detail Anime & karakter
function load_series_char_details(active_Index_slide) {
  if (active_Index_slide < 0 || active_Index_slide >= anime_data.length) return;
  
  const selected_anime_series = anime_data[active_Index_slide];
  
  // Update background
  document.querySelector('.anime_container').style.background = `url('${selected_anime_series.bg}') no-repeat center center / cover`;
  
  // Update info anime
  const animeInfo = document.getElementById('anime_info');
  animeInfo.innerHTML = `
        <h2>${selected_anime_series.title}</h2>
        <p>${selected_anime_series.description}</p>
      `;
  
  // Update karakter
  const char_cc = document.getElementById('characters_list');
  char_cc.innerHTML = selected_anime_series.characters.map(char => `
        <div class="character_card">
          <div class="char_anime">
          <img src="${char.img}" alt="${char.name}">
          </div>
          <div class="deskripsi">
          <h3 class="char-name">${char.name}</h3>
          <span class="char-role">${char.role}</span>
          <div class="char-detail">${char.detail || ''}</div>
          </div>
        </div>
      `).join("");
}

// Generate slide anime
const slider_wrapper_series = document.getElementById('animeSliderWrapper');
slider_wrapper_series.innerHTML = anime_data.map((anime, idx) => `
      <div class="swiper-slide" data-index="${idx}">
        <img src="${anime.icon}" alt="${anime.title}">
        <p style="margin-top:5px">${anime.title}</p>
      </div>
    `).join("");

// Swiper
const run_init_swiper = new Swiper('.swiper', {
  slidesPerView: 3, // jumlah slide yang ditampilkan
  centeredSlides: true, // slide aktif berada di tengah
  spaceBetween: 30, // jarak antar slide
  loop: false, // matikan loop agar index mudah dihitung
  initialSlide: Math.floor(anime_data.length / 2), // slide awal (di tengah)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  on: {
    init: function() {
      // Saat pertama kali load, langsung update detail sesuai slide aktif
      load_series_char_details(this.activeIndex);
    },
    slideChange: function() {
      // Update detail saat slide berganti
      load_series_char_details(this.activeIndex);
    },
  }
});