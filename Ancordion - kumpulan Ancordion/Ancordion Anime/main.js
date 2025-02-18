class _Anime_char {
  constructor(cc_id, data) {
    this.cc_box = document.getElementById(cc_id);
    this.data = data;
    this.init();
  }
  init() {
    this.cc_box.innerHTML = this.data.map(character => `
      <div class="accordion-item" data-bg="${character.bgColor}" data-bgimg="${character.bgImage}">
        <div class="accordion-header">${character.title}</div>
        <div class="accordion-content">
          <div class="character">
            <img src="${character.img}" alt="${character.title}">
            <div class="character-details">
              <h3>${character.title}</h3>
              <p>${character.description}</p>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  
    this.cc_box.querySelectorAll('.accordion-item').forEach(box => {
      const header_nchar = box.querySelector('.accordion-header');
      const content_char = box.querySelector('.accordion-content');
      const bgColor = box.getAttribute('data-bg');
      const bgImage = box.getAttribute('data-bgimg');
      
      header_nchar.addEventListener('click', () => {
        const is_active = box.classList.contains('active');
        this.cc_box.querySelectorAll('.accordion-item').forEach(el => {
          el.classList.remove('active');
        });
        if (!is_active) {
          box.classList.add('active');
          content_char.style.background = bgColor;
          document.querySelector('.accordion_chara_anime').style.background = `url('${bgImage}') no-repeat center center / cover`;
        } else {
         document.querySelector('.accordion_chara_anime').style.background = `url('asset/zerotwo_hiro.jpeg') no-repeat center center / cover`;
        }
      });
    });
  }
}