const hrSliderRandom = {
 feeds: 'https://datakodehiru.blogspot.com',
 noImage: 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
 thumbnailSize: '1600',
 post: 5,
 duration: 3000,
 auto: true,
 button_nextprev: true,
 indikator: true,
 swipe: true,
 credit: 'Hirutshuji'
};

function loadBlogspotFeed() {
 if (hrSliderRandom.credit !== "Hirutshuji") {
  alert("Slider tidak dapat digunakan karena credit telah dihapus.");
  return;
 }
 const script = document.createElement("script");
 script.src = `${hrSliderRandom.feeds? hrSliderRandom.feeds: ''}/feeds/posts/default?alt=json-in-script&callback=renderSlider`;
 document.body.appendChild(script);
}

function renderSlider(data) {
 const slider_cc = document.getElementById("hr_sliderpost_cc");
 if (!slider_cc) {
  console.error("Element #hr_sliderpost_cc tidak ditemukan.");
  return;
 }

 const entry = data.feed.entry;
 if (!entry) return;

 let boxslide_HTML = "";
 entry.slice(0, hrSliderRandom.post).forEach(entry => {
  const title = entry.title.$t;
  const link = entry.link.find(l => l.rel === "alternate").href;
  const media = entry.media$thumbnail ? entry.media$thumbnail.url.replace(/s72-c/, `s${hrSliderRandom.thumbnailSize}`) : hrSliderRandom.noImage;

  boxslide_HTML += `
      <div class="slide_post_hr">
        <a class="link_post" href="${link}" target="_blank">
          <img class="image_slider_hr" src="${media}" alt="${title}" width="300" heigth="257">
          <div class="caption_post">${title}</div>
        </a>
      </div>
    `;
 });

 slider_cc.innerHTML = `
    <div class="cc_sliderpost">${boxslide_HTML}</div>
    ${hrSliderRandom.button_nextprev ? `<button class="prev_sliderpost">&#10094;</button><button class="next_sliderpost">&#10095;</button>` : ""}
    ${hrSliderRandom.indikator ? `<div class="indikator_sliderpost"></div>` : ""}
    `;

 run_slider_hr();
}

function run_slider_hr() {
 const box_slider = document.querySelectorAll(".slide_post_hr");
 const prev_slide_btn = document.querySelector(".prev_sliderpost");
 const next_slide_btn = document.querySelector(".next_sliderpost");
 const indikator_slide_cc = document.querySelector(".indikator_sliderpost");

 let slide_index = 0;
 let time_slide_interval;

 function show_slide_hr(index) {
  if (index >= box_slider.length) slide_index = 0;
  else if (index < 0) slide_index = box_slider.length - 1;
  else slide_index = index;

  document.querySelector(".cc_sliderpost").style.transform = `translateX(-${slide_index * 100}%)`;
  updateIndikator_hr();
 }

 function updateIndikator_hr() {
  if (!indikator_slide_cc) return;
  indikator_slide_cc.innerHTML = "";
  box_slider.forEach((_, i) => {
   const dot_slide = document.createElement("span");
   dot_slide.classList.add("dot_slide_post");
   if (i === slide_index) dot_slide.classList.add("active");
   dot_slide.addEventListener("click", () => show_slide_hr(i));
   indikator_slide_cc.appendChild(dot_slide);
  });
 }

 if (hrSliderRandom.button_nextprev) {
  prev_slide_btn.addEventListener("click", () => show_slide_hr(slide_index - 1));
  next_slide_btn.addEventListener("click", () => show_slide_hr(slide_index + 1));
 }

 if (hrSliderRandom.auto) {
  time_slide_interval = setInterval(() => show_slide_hr(slide_index + 1), hrSliderRandom.duration);
 }

 if (hrSliderRandom.swipe) {
  let _slide_startX = 0;
  document.getElementById("hr_sliderpost_cc").addEventListener("touchstart", e => _slide_startX = e.touches[0].clientX);
  document.getElementById("hr_sliderpost_cc").addEventListener("touchend", e => {
   const _slide_endX = e.changedTouches[0].clientX;
   if (_slide_startX - _slide_endX > 50) show_slide_hr(slide_index + 1);
   else if (_slide_endX - _slide_startX > 50) show_slide_hr(slide_index - 1);
  });
 }

 show_slide_hr(slide_index);
}

document.addEventListener("DOMContentLoaded", loadBlogspotFeed);