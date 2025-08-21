// Global variables
let mangaSeries = [];
let uploadedImageUrls = [];
let generatedPosts = [];
let imgbbApiKey = localStorage.getItem('imgbbApiKey') || '';


let currentPage = 1;
const MAX_SERIES = 250;
let selectedSeries = new Set();

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Load saved API key
  if (imgbbApiKey) {
    document.getElementById('imgbbApiKey').value = imgbbApiKey;
  }
  
  // Add event listeners
  document.getElementById('imgbbApiKey').addEventListener('change', function() {
    imgbbApiKey = this.value;
    localStorage.setItem('imgbbApiKey', imgbbApiKey);
  });
  
  document.getElementById('chapterImages').addEventListener('change', function() {
    const files = this.files;
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.disabled = files.length === 0 || !imgbbApiKey;
  });
  
  document.getElementById('apiSource').addEventListener('change', function() {
    const manualSection = document.getElementById('manualSection');
    if (this.value === 'manual') {
      manualSection.classList.remove('hidden');
    } else {
      manualSection.classList.add('hidden');
    }
  });
  
});

async function fetchMangaData() {
  const apiSource = document.getElementById('apiSource').value;
  const typeData = document.getElementById('typeData').value;
  const searchQuery = document.getElementById('searchQuery').value;
  const limit = parseInt(document.getElementById('seriesLimit').value);
  const fetchBtn = document.getElementById('fetchBtn');
  
  let page = 1;
  currentPage = 1; // global untuk loadMore
  
  fetchBtn.disabled = true;
  fetchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg> Search data...pls wait.';
  
  try {
    let data = [];
    
    if (apiSource === 'jikan') {
      data = await fetchFromJikan(typeData, searchQuery, limit, page);
    } else if (apiSource === 'anilist') {
      data = await fetchFromAnilist(typeData, searchQuery, limit, page);
    } else {
      throw new Error('Unknown API source');
    }
    
    mangaSeries = data;
    displaySeriesList();
    updateGenerateButton();
    
    fetchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipTDatabaseSuccess0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#555555" d="M44 31c0 5.523-4.477 10-10 10c-1.79 0-3.472-.47-4.926-1.295A10.01 10.01 0 0 1 24 31c0-2.568.968-4.91 2.558-6.68A9.98 9.98 0 0 1 34 21c5.523 0 10 4.477 10 10"/><path d="M34 12v9a9.98 9.98 0 0 0-7.442 3.32A9.96 9.96 0 0 0 24 31q.002.87.144 1.698a10.01 10.01 0 0 0 4.93 7.007C26.412 40.51 22.878 41 19 41c-8.284 0-15-2.239-15-5V12"/><path fill="#555555" d="M34 12c0 2.761-6.716 5-15 5S4 14.761 4 12s6.716-5 15-5s15 2.239 15 5"/><path d="M4 28c0 2.761 6.716 5 15 5c1.807 0 3.54-.106 5.144-.302M4 20c0 2.761 6.716 5 15 5c2.756 0 5.339-.248 7.558-.68M38.5 29L33 34.5l-3-3"/></g></mask></defs><path fill="#00fb45" d="M0 0h48v48H0z" mask="url(#ipTDatabaseSuccess0)"/></svg> Got ${data.length} series`;
    setTimeout(() => fetchBtn.disabled = false, 2000);
    
    setupLoadMore(apiSource, typeData, searchQuery, limit);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    fetchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="#fb0c00" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clip-rule="evenodd"/></svg> Error`;
    setTimeout(() => fetchBtn.disabled = false, 3000);
  }
  
  document.getElementById('addSelectedBtn')?.addEventListener('click', () => {
    mangaSeries = Array.from(selectedSeries).map(i => mangaSeries[i]);
    selectedSeries.clear();
    displaySeriesList(); // render mangaSeries
    updateGenerateButton();
  });
  
}

function setupLoadMore(apiSource, typeData, searchQuery, limit) {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  
  let isLoading = false;
  
  btn.onclick = async () => {
    if (isLoading || mangaSeries.length >= MAX_SERIES) return;
    isLoading = true;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Get data... <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>';
    btn.disabled = true;
    
    currentPage++;
    
    try {
      const more = apiSource === 'jikan' ?
        await fetchFromJikan(typeData, searchQuery, Math.min(limit, MAX_SERIES - mangaSeries.length), currentPage) :
        await fetchFromAnilist(typeData, searchQuery, Math.min(limit, MAX_SERIES - mangaSeries.length), currentPage);
      
      mangaSeries.push(...more);
      displaySeriesList();
    } catch (err) {
      console.error('Load more error:', err);
    }
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    isLoading = false;
  };
}

const allowedGenres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Romance', 'Fantasy',
  'Slice of Life', 'Supernatural', 'Isekai', 'Shounen', 'Shoujo',
  'Seinen', 'Josei', 'School', 'Magic', 'Psychological', 'Mystery',
  'Thriller', 'Horror', 'Sci-Fi', 'Game', 'Music', 'Sports',
  'Super Power', 'Martial Arts', 'Mecha', 'Demons', 'Vampire',
  'Ecchi', 'Harem', 'Reverse Harem', 'Tragedy', 'Reincarnation',
  'Parody', 'Military'
];

// ————————————— JIKAN —————————————
async function fetchFromJikan(typeDATA, query, limit, page) {
  const type = typeDATA.toLowerCase(); // anime atau manga
  let url = `https://api.jikan.moe/v4/${type}?limit=${limit}&page=${page}&order_by=popularity`;
  
  let isYear = !isNaN(query) && query.length === 4;
  let isGenre = allowedGenres.includes(capitalizeWords(query));
  
  if (isYear) {
    url += `&start_date=${query}-01-01&end_date=${query}-12-31`;
  } else if (isGenre) {
    url += `&genres=${encodeURIComponent(capitalizeWords(query))}`;
  } else {
    url += `&q=${encodeURIComponent(query)}`;
  }
  
  const resp = await fetch(url);
  const { data } = await resp.json();
  
  const statusMap = {
    'Currently Airing': 'Ongoing',
    'Finished Airing': 'Completed',
    'Not yet aired': 'Upcoming',
    'Publishing': 'Ongoing',
    'Finished': 'Completed',
    'On Hiatus': 'Hiatus',
    'Discontinued': 'Dropped'
  };
  
  return data.map(item => {
    const isAnime = type === 'anime';
    
    const propFrom = item.aired?.prop?.from || item.published?.prop?.from;
    const publishDate = propFrom?.year ?
      new Date(propFrom.year, (propFrom.month || 1) - 1, propFrom.day || 1).toISOString() :
      null;
    
    const rawGenres = item.genres?.map(g => g.name) || [];
    const genres = rawGenres.filter(g => allowedGenres.includes(g));
    
    return {
      id: item.mal_id,
      title: {
        english: item.title_english || item.title,
        romaji: item.title,
        native: item.title_japanese || item.title
      },
      description: item.synopsis || '',
      coverImage: {
        large: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url,
        medium: item.images?.jpg?.image_url
      },
      genres,
      status: statusMap[item.status] || item.status || '',
      averageScore: item.score != null ? Math.round(item.score * 10) : null,
      popularity: item.popularity || 0,
      seasonYear: propFrom?.year || null,
      publishedDateISO: publishDate,
      volumes: item.volumes,
      chapters: item.chapters,
      countryOfOrigin: 'Jepang',
      format: item.type || '' // TV, Movie, OVA, Manga, Novel, One-shot, dll
    };
  });
}

// ———————————— ANILIST ————————————
async function fetchFromAnilist(typeDATA, query, limit, page) {
  const isYear = /^\d{4}$/.test(query);
  const isGenre = allowedGenres.includes(capitalizeWords(query));
  
  const filters = [];
  
  if (isYear) {
    filters.push(`seasonYear: ${query}`);
  }
  
  if (isGenre) {
    filters.push(`genre_in: ["${capitalizeWords(query)}"]`);
  }
  
  const filterQuery = filters.length ? `, ${filters.join(', ')}` : '';
  const searchQuery = (!isYear && !isGenre) ? `search: "${query}",` : '';
  
  const ANILIST_QUERY = `
    query($perPage:Int, $page:Int, $type:MediaType){
      Page(page:$page, perPage:$perPage){
        media(${searchQuery} type:$type${filterQuery}, sort: POPULARITY_DESC){
          id
          title { romaji english native }
          description
          coverImage { large medium }
          genres
          status
          averageScore
          popularity
          startDate { year month day }
          volumes
          chapters
          format
          countryOfOrigin
        }
      }
    }`;
  
  const resp = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: ANILIST_QUERY,
      variables: {
        perPage: limit,
        page: page,
        type: typeDATA.toUpperCase()
      }
    })
  });
  
  const json = await resp.json();
  return json.data.Page.media.map(item => {
    const sd = item.startDate;
    const publishDate = sd.year && sd.month && sd.day ?
      new Date(sd.year, sd.month - 1, sd.day).toISOString() :
      null;
    
    const rawGenres = item.genres || [];
    const genres = rawGenres.filter(g => allowedGenres.includes(g));
    
    const statusMap = {
      FINISHED: 'Completed',
      RELEASING: 'Ongoing',
      NOT_YET_RELEASED: 'Hiatus',
      CANCELLED: 'Dropped'
    };
    
    return {
      id: item.id,
      title: {
        english: item.title?.english || '',
        romaji: item.title?.romaji || '',
        native: item.title?.native || ''
      },
      description: item.description || '',
      coverImage: {
        large: item.coverImage?.large,
        medium: item.coverImage?.medium
      },
      genres,
      status: statusMap[item.status] || '',
      averageScore: item.averageScore || null,
      popularity: item.popularity || 0,
      seasonYear: sd.year || null,
      publishedDateISO: publishDate,
      volumes: item.volumes,
      chapters: item.chapters,
      countryOfOrigin: item.countryOfOrigin || '',
      format: determineAnilistFormat(item.format, item.countryOfOrigin)
    };
  });
}

function determineAnilistFormat(format, country) {
  if (format === 'MANGA') {
    if (country === 'KR') return 'Manhwa';
    if (country === 'CN') return 'Manhua';
    return 'Manga';
  }
  if (format === 'NOVEL') return 'Light Novel';
  if (format === 'ONE_SHOT') return 'One Shot';
  return format;
}

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Inisialisasi dan handler terpadu untuk ImgBB / Placeholder
function initImageSource() {
  const sel = document.getElementById('imageSource');
  const boxPH = document.getElementById('placeholderOptions');
  const boxIB = document.getElementById('boxImgbb');
  const uploadBtn = document.getElementById('uploadBtn');
  const chapterImages = document.getElementById('chapterImages');
  const uploadStatus = document.getElementById('uploadStatus');
  
  function toggleMode() {
    const usePH = sel.value === 'placeholder';
    boxPH.classList.toggle('hidden', !usePH);
    boxIB.classList.toggle('hidden', usePH);
    chapterImages.disabled = usePH;
    uploadBtn.disabled = usePH;
    if (usePH) {
      // Bangun satu URL placeholder
      const tpl = document.getElementById('placeholderUrl').value;
      const w = document.getElementById('placeholderWidth').value;
      const h = document.getElementById('placeholderHeight').value;
      const title = 'Chapter';
      const url = tpl
        .replace('{{width}}', w)
        .replace('{{height}}', h)
        .replace('{{title}}', encodeURIComponent(title))
        .replace('{{chapter}}', '1');
      uploadedImageUrls = [url];
      uploadStatus.textContent = 'Mode Placeholder aktif';
    } else {
      uploadedImageUrls = [];
      uploadStatus.textContent = '';
    }
    updateGenerateButton();
  }
  
  sel.addEventListener('change', toggleMode);
  // Jalankan sekali pada load
  toggleMode();
}

// Upload images to ImgBB
async function uploadImages() {
  if (document.getElementById('imageSource').value === 'placeholder') {
    return; // langsung skip upload jika placeholder
  }
  
  const files = document.getElementById('chapterImages').files;
  const apiKey = document.getElementById('imgbbApiKey').value.trim();
  const uploadBtn = document.getElementById('uploadBtn');
  const uploadStatus = document.getElementById('uploadStatus');
  const preview = document.getElementById('imagePreview');
  
  if (!apiKey) {
    alert('Please enter ImgBB API key');
    return;
  }
  
  if (files.length === 0) {
    alert('Please select images to upload');
    return;
  }
  
  uploadBtn.disabled = true;
  uploadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="#00fb45"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg> Uploading...`;
  uploadStatus.textContent = 'Uploading images...';
  preview.innerHTML = '';
  uploadedImageUrls = [];
  
  for (let i = 0; i < Math.min(files.length, 35); i++) {
    try {
      uploadStatus.textContent = `Uploading image ${i + 1}/${Math.min(files.length, 35)}...`;
      
      const formData = new FormData();
      formData.append('image', files[i]);
      formData.append('key', apiKey);
      
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        uploadedImageUrls.push(result.data.url);
        
        // Create preview
        const img = document.createElement('img');
        img.src = result.data.thumb.url;
        img.className = 'w-full h-12 object-cover rounded border border-gray-600';
        img.title = result.data.url;
        preview.appendChild(img);
      } else {
        throw new Error(result.error?.message || 'Upload failed');
      }
      
      await sleepTime_S(500); // Delay to avoid rate limiting
    } catch (error) {
      console.error('Upload error:', error);
      uploadStatus.textContent = `Error uploading image ${i + 1}: ${error.message}`;
    }
  }
  
  uploadStatus.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#00fb45" d="M28.95 15.24H32v1.52h-3.05Zm0 7.62h1.52v1.52h-1.52Zm0-15.24h1.52v1.52h-1.52Zm-1.53 13.71h1.53v1.53h-1.53Zm0-12.19h1.53v1.53h-1.53Zm-3.04 18.29h1.52v1.52h-1.52Zm0-25.91h1.52v1.53h-1.52ZM22.85 25.9h1.53v1.53h-1.53Zm0-22.85h1.53v1.52h-1.53Zm0 9.14h-4.57v6.1h4.57Zm-1.52 4.57H19.8v-3.05h1.53Zm-4.57 7.62h1.52v1.52h-1.52Zm0-4.57h1.52v1.52h-1.52Zm-1.53 9.14h1.53V32h-1.53Zm0-7.62h1.53v1.53h-1.53Zm0-21.33h1.53v3.05h-1.53Zm-1.52 22.86h1.52v1.52h-1.52Zm3.05-4.57v-6.1h-4.57v6.1Zm-3.05-4.58h1.52v3.05h-1.52Zm4.57-6.09h-1.52V6.09h-1.53v1.53h-1.52V6.09h-1.52v4.58h7.61V6.09h-1.52zm-6.09 16.76h1.52v1.52h-1.52Zm0-4.57h1.52v1.52h-1.52Zm-3.05-7.62h1.52v6.1H9.14ZM7.61 25.9h1.53v1.53H7.61Zm0-22.85h1.53v1.52H7.61ZM6.09 27.43h1.52v1.52H6.09Zm0-25.91h1.52v1.53H6.09ZM3.04 21.33h1.53v1.53H3.04Zm0-12.19h1.53v1.53H3.04ZM1.52 22.86h1.52v1.52H1.52ZM0 15.24h3.04v1.52H0Zm1.52-7.62h1.52v1.52H1.52Z"/></svg> Uploaded ${uploadedImageUrls.length} images successfully`;
  uploadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="loadgin-left-outline"><g fill="#00fb45" fill-rule="evenodd" class="Vector" clip-rule="evenodd"><path d="M12 6.05c3.869 0 7 3.126 7 6.975a6.97 6.97 0 0 1-3.603 6.1a7 7 0 0 1-1.4.587a1 1 0 0 0 .568 1.918a9 9 0 0 0 1.801-.755A8.97 8.97 0 0 0 21 13.025c0-4.96-4.032-8.974-9-8.974c-1.24 0-2.425.25-3.502.705a1 1 0 1 0 .777 1.843A7 7 0 0 1 12 6.05m.6 15.012a1 1 0 0 0-.944-1.052a7 7 0 0 1-2.645-.673a1 1 0 1 0-.86 1.805a9 9 0 0 0 3.397.865a1 1 0 0 0 1.052-.945M5.208 8.687a1 1 0 0 0-1.33.479a9 9 0 0 0-.85 3.4a1 1 0 1 0 1.998.1c.045-.918.27-1.819.66-2.648a1 1 0 0 0-.478-1.331m1.544 10.432a1 1 0 0 0 .074-1.412a7.1 7.1 0 0 1-1.4-2.345a1 1 0 0 0-1.883.674a9.1 9.1 0 0 0 1.797 3.009a1 1 0 0 0 1.412.074"/><path d="M10.194 2.233a.857.857 0 0 0-1.15.385L7.713 5.301a1.086 1.086 0 0 0 .493 1.456l2.691 1.329a.857.857 0 1 0 .758-1.536L9.53 5.5l1.053-2.118a.857.857 0 0 0-.388-1.149Z"/></g></g></svg> Upload to ImgBB';
  uploadBtn.disabled = false;
  updateGenerateButton();
}