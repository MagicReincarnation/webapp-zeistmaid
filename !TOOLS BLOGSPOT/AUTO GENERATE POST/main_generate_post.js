// Panggil di akhir script utama
document.addEventListener('DOMContentLoaded', initImageSource);

// Display series list
function displaySeriesList() {
  const seriesSection = document.getElementById('seriesSection');
  const seriesList = document.getElementById('seriesList');
  const seriesCount = document.getElementById('seriesCount');
  
  seriesSection.classList.remove('hidden');
  seriesList.innerHTML = '';
  seriesCount.textContent = mangaSeries.length;
  
  mangaSeries.forEach((manga, index) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-800 rounded p-2 border border-gray-700';
    console.log('manga', manga);
    const title = manga.title.english || manga.title.romaji || manga.title.native;
    const genres = Array.isArray(manga.genres) ? manga.genres.slice(0, 2).join(', ') : '';
    const score = typeof manga.averageScore === 'number' ? (manga.averageScore / 10).toFixed(1) : 'N/A';
    const type = manga.format || 'Unknown';
    const year = manga.seasonYear || '????';
    const status = manga.status || 'Unknown';
    
    div.innerHTML = `
      <div class="flex gap-2">
        <input type="checkbox" class="series-cb" data-idx="${index}">
        <img src="${manga.coverImage?.medium || `https://placehold.co/800x600?text=${title}`}" 
             alt="${title}" class="w-12 h-16 object-cover rounded">
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-white text-xs truncate">${title}</h4>
          <p class="text-gray-400 text-xs">${genres}</p>
          <div class="flex gap-1 text-xs mt-1">
            <span class="bg-gray-700 px-1 py-0.5 rounded">${score}</span>
            <span class="bg-gray-700 px-1 py-0.5 rounded">${status}</span>
            <span class="bg-gray-700 px-1 py-0.5 rounded">${type}</span>
            <span class="bg-gray-700 px-1 py-0.5 rounded">${year}</span>
          </div>
        </div>
        <pre class="hidden text-gray-500 text-[10px] whitespace-pre-wrap overflow-auto max-h-48 mt-1">${JSON.stringify(manga, null, 2)}</pre>
      </div>
    `;
    
    seriesList.appendChild(div);
  });
  
  bindCheckboxes();
  document.getElementById('loadMoreBtn').disabled = mangaSeries.length >= MAX_SERIES;
}

function bindCheckboxes() {
  document.querySelectorAll('.series-cb').forEach(cb => {
    cb.addEventListener('change', e => {
      const idx = +e.target.dataset.idx;
      e.target.checked ? selectedSeries.add(idx) : selectedSeries.delete(idx);
      document.getElementById('addSelectedBtn').disabled = selectedSeries.size === 0;
    });
  });
}

// Load manual data
function loadManualData() {
  const input = document.getElementById('manualInput').value.trim();
  
  try {
    const data = JSON.parse(input);
    if (Array.isArray(data)) {
      mangaSeries = data;
      displaySeriesList();
      updateGenerateButton();
      alert(`Loaded ${data.length} series manually`);
    } else {
      throw new Error('Data must be an array');
    }
  } catch (error) {
    alert('Invalid JSON format: ' + error.message);
  }
}

// Update generate button state
function updateGenerateButton() {
  const generateBtn = document.getElementById('generateBtn');
  const hasImages = uploadedImageUrls.length > 0;
  const hasSeries = mangaSeries.length > 0;
  
  generateBtn.disabled = !(hasImages && hasSeries);
}

// Generate posts
async function generatePosts() {
  const postType = document.getElementById('postType').value;
  const avgChapters = parseInt(document.getElementById('avgChapters').value);
  const chapterVariation = parseInt(document.getElementById('chapterVariation').value);
  const seriesTemplate = document.getElementById('seriesTemplate').value;
  const chapterTemplate = document.getElementById('chapterTemplate').value;
  
  const progressSection = document.getElementById('progressSection');
  progressSection.classList.remove('hidden');
  
  generatedPosts = [];
  let totalPosts = 0;
  let seriesCount = 0;
  let chapterCount = 0;
  
  // Calculate total posts
  if (postType === 'series' || postType === 'both') {
    totalPosts += mangaSeries.length;
  }
  if (postType === 'chapter' || postType === 'both') {
    mangaSeries.forEach(() => {
      const chapters = Math.max(1, avgChapters + Math.floor(Math.random() * (chapterVariation * 2 + 1)) - chapterVariation);
      totalPosts += chapters;
    });
  }
  
  document.getElementById('totalCount').textContent = totalPosts;
  let processed = 0;
  
  for (let i = 0; i < mangaSeries.length; i++) {
    const manga = mangaSeries[i];
    const title = manga.title.english || manga.title.romaji || manga.title.native;
    
    document.getElementById('currentProcessing').textContent = `Processing: ${title.substring(0, 20)}...`;
    
    // Generate series post
    if (postType === 'series' || postType === 'both') {
      const seriesPost = generateSeriesPost(manga, seriesTemplate);
      generatedPosts.push(seriesPost);
      seriesCount++;
      processed++;
      
      document.getElementById('seriesGenerated').textContent = seriesCount;
      updateProgress(processed, totalPosts);
      await sleepTime_S(50);
    }
    
    // Generate chapter posts
    if (postType === 'chapter' || postType === 'both') {
      const chapters = Math.max(1, avgChapters + Math.floor(Math.random() * (chapterVariation * 2 + 1)) - chapterVariation);
      
      for (let ch = 1; ch <= chapters; ch++) {
        const chapterPost = generateChapterPost(manga, ch, chapterTemplate);
        generatedPosts.push(chapterPost);
        chapterCount++;
        processed++;
        
        document.getElementById('chaptersGenerated').textContent = chapterCount;
        updateProgress(processed, totalPosts);
        await sleepTime_S(30);
      }
    }
  }
  
  document.getElementById('currentProcessing').textContent = 'Generation completed!';
  
  displayGeneratedPosts();
  document.getElementById('downloadBtn').disabled = false;
}

// —————— generateSeriesPost ——————
function generateSeriesPost(manga, template) {
  const title = manga.title.english || manga.title.romaji || manga.title.native || '';
  
  const genreList = Array.isArray(manga.genres) ? manga.genres.filter(Boolean) : [];
  const genres = genreList.length ? genreList.join(', ') : '';
  
  const description = (manga.description || '')
    .replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim();
  
  const rawStatus = (manga.status || '').toUpperCase();
  const statusMap = {
    FINISHED: 'Completed',
    RELEASING: 'Ongoing',
    NOT_YET_RELEASED: 'Hiatus',
    CANCELLED: 'Dropped'
  };
  const status = statusMap[rawStatus] || '';
  
  const score = typeof manga.averageScore === 'number' ?
    (manga.averageScore / 10).toFixed(1) :
    '';
  const type = manga.format || '';
  const country = manga.countryOfOrigin || '';
  
  // kalau API sudah punya tanggal asli, pakai itu
  let publishDate = manga.publishedDateISO ||
    manga.publishedDateISO // Jikan
    ||
    manga.publishedDateISO // Anilist
    ||
    generateRandomDate();
  
  const data = {
    title,
    description,
    coverImage: manga.coverImage.large || manga.coverImage.medium || 'https://placehold.co/600x400',
    genres,
    score,
    status,
    year: manga.seasonYear || '',
    volumes: manga.volumes || '',
    chapters: manga.chapters || ''
  };
  
  const content = renderTemplate(template, data);
  
  const categories = [
    'Series',
    title,
    score || null,
    type || null,
    status || null,
    country || null,
    ...genreList
  ].filter(Boolean);
  
  const tags = genreList.length ? genreList : ['Manga'];
  
  return {
    type: 'series',
    title,
    content,
    publishDate,
    categories,
    tags
  };
}

function generateChapterPost(manga, chapterNumber, template) {
  const seriesTitle = manga.title.english || manga.title.romaji || manga.title.native;
  const chapterTitle = `${seriesTitle} Chapter ${chapterNumber}`;
  
  // 1) Hitung jumlah gambar acak (22–55)
  const minImages = 22;
  const maxImages = 55;
  const imageCount = Math.floor(Math.random() * (maxImages - minImages + 1)) + minImages;
  
  // 2) Siapkan daftar gambar (duplikat placeholder atau acak dari uploadedImageUrls)
  const isSinglePlaceholder = uploadedImageUrls.length === 1 && !uploadedImageUrls[0].includes("imgbb.com");
  let chapterImages = [];
  
  if (isSinglePlaceholder) {
    // placeholder tunggal—duplikat sebanyak imageCount
    const placeholder = `https://placehold.co/800x1200?text=${encodeURIComponent(`${seriesTitle} Chapter ${chapterNumber}`)}`;
    for (let i = 0; i < imageCount; i++) {
      chapterImages.push(placeholder);
    }
  } else {
    // acak dan slice
    chapterImages = [...uploadedImageUrls]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(imageCount, uploadedImageUrls.length));
  }
  
  // 3) Bangun HTML & link list
  const imageHtml = chapterImages
    .map(url => `<img src="${url}" alt="${chapterTitle}" loading="lazy">`)
    .join('\n');
  const imageLink = chapterImages.join('\n');
  
  // 4) Tentukan publishDate:
  //    - kalau ada tanggal asli di manga.publishedDateISO, pakai itu sebagai base
  //    - else jika ada seasonYear, base = 1 Jan seasonYear
  //    - chapter ke-n terbit base + (n-1)*7 hari
  let baseDate;
  if (manga.publishedDateISO) {
    baseDate = new Date(manga.publishedDateISO);
  } else if (manga.seasonYear) {
    baseDate = new Date(manga.seasonYear, 0, 1);
  }
  
  let publishDateISO;
  if (baseDate) {
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    let timeOffset = (chapterNumber - 1) * sevenDaysMs;
    // Tambahkan 1 jam (3600000 ms) untuk Chapter 1 agar tidak sama persis
    if (chapterNumber === 1) timeOffset += 3600000;
    
    publishDateISO = new Date(baseDate.getTime() + timeOffset).toISOString();
  } else {
    // fallback ke random (30 hari terakhir)
    publishDateISO = generateRandomDate();
  }
  
  // 5) Render konten
  const data = {
    title: seriesTitle,
    chapterNumber,
    chapterTitle,
    chapterImage: chapterImages[0],
    seriesTitle,
    nextChapter: chapterNumber + 1,
    prevChapter: chapterNumber > 1 ? chapterNumber - 1 : null,
    chapterImagesHtml: imageHtml,
    chapterImagesLink: imageLink
  };
  const content = renderTemplate(template, data);
  
  return {
    type: 'chapter',
    title: chapterTitle,
    content,
    publishDate: publishDateISO,
    categories: ['Chapter', seriesTitle],
    tags: [seriesTitle, `Chapter ${chapterNumber}`, ...(manga.genres || [])]
  };
}

// Simple template renderer with Mustache-like syntax
function renderTemplate(template, data) {
  let rendered = template;
  
  // Handle conditional blocks {{#variable}} ... {{/variable}}
  rendered = rendered.replace(/\{\{#(\w+)\}\}(.*?)\{\{\/\1\}\}/gs, (match, key, content) => {
    return data[key] ? content : '';
  });
  
  // Handle simple variable substitution {{variable}}
  rendered = rendered.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined && data[key] !== null ? data[key] : '';
  });
  
  return rendered;
}

// Update progress bar
function updateProgress(current, total) {
  const percentage = Math.min((current / total) * 100, 100);
  document.getElementById('progressBar').style.width = percentage + '%';
}

// Display generated posts
function displayGeneratedPosts() {
  const postsSection = document.getElementById('postsSection');
  const postsList = document.getElementById('postsList');
  
  postsSection.classList.remove('hidden');
  
  // Update counts
  const seriesPosts = generatedPosts.filter(p => p.type === 'series');
  const chapterPosts = generatedPosts.filter(p => p.type === 'chapter');
  
  document.getElementById('countAll').textContent = generatedPosts.length;
  document.getElementById('countSeries').textContent = seriesPosts.length;
  document.getElementById('countChapters').textContent = chapterPosts.length;
  
  renderPostsList(generatedPosts);
}

// Render posts list
function renderPostsList(posts) {
  const postsList = document.getElementById('postsList');
  postsList.innerHTML = '';
  
  posts.forEach((post) => {
    const formattedDate = new Date(post.publishDate).toLocaleDateString();
    const div = document.createElement('div');
    div.className = 'bg-gray-800 rounded p-2 border border-gray-700';
    
    div.innerHTML = `
      <div class="flex justify-between items-start gap-2">
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-white text-xs truncate">${post.title}</h4>
          ${post.categories.length
            ? `<p class="text-gray-400 text-xs">Categories: ${post.categories.join(', ')}</p>`
            : ''}
          <p class="text-gray-400 text-2xs">Published: ${formattedDate}</p>
          <div class="flex gap-1 mt-1">
            <span class="bg-${post.type === 'series' ? '[1a1a1a]' : '85d5c8'} px-1 py-0.5 rounded text-xs">
              ${post.type}
            </span>
            <span class="bg-gray-600 px-1 py-0.5 rounded text-xs">
              ${post.categories?.length || 0} categories
            </span>
          </div>
        </div>
        <button class="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-green-700 preview-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#00fb45" d="M5 3h6v2H5v14h14v-6h2v8H3V3zm8 0h8v8h-2V7h-2V5h-4zm0 8h-2v2H9v2h2v-2h2zm4-4h-2v2h-2v2h2V9h2z"/>
          </svg>
        </button>
      </div>
    `;
    
    const previewButton = div.querySelector('.preview-button');
    previewButton.addEventListener('click', () => previewPostWithBlob(post));
    
    postsList.appendChild(div);
  });
}

// Filter posts
function filterPosts(type) {
  // Update button states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-gray-700');
    btn.classList.add('bg-gray-600');
  });
  event.target.classList.remove('bg-gray-600');
  event.target.classList.add('bg-gray-700');
  
  // Filter and display posts
  let filteredPosts = generatedPosts;
  if (type === 'series') {
    filteredPosts = generatedPosts.filter(p => p.type === 'series');
  } else if (type === 'chapter') {
    filteredPosts = generatedPosts.filter(p => p.type === 'chapter');
  }
  
  renderPostsList(filteredPosts);
}

// Preview post with Blob
function previewPostWithBlob(post) {
  const htmlContent = htmlPreview(post);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank', 'width=800,height=600');
}

// Download XML
function downloadXML() {
  if (generatedPosts.length === 0) {
    alert('No posts to download');
    return;
  }
  
  const xml = generateBlogspotXML();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `manga-posts-${new Date().toISOString().split('T')[0]}.xml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate Blogspot XML
// Generate Blogspot XML yang diperbaiki
function generateBlogspotXML() {
  const blogId = '1234567890123456789'; // Gunakan blog ID yang valid
  const baseUrl = 'https://datacodehiru.blogspot.com';
  
  const posts = generatedPosts.map((post, index) => {
    const postId = `tag:blogger.com,1999:blog-${blogId}.post-${Date.now() + index}`;
    const publishDate = new Date(post.publishDate).toISOString();
    const postUrl = `${baseUrl}/${new Date(post.publishDate).getFullYear()}/${String(new Date(post.publishDate).getMonth() + 1).padStart(2, '0')}/post-${index + 1}.html`;
    
    // Escape HTML content dengan benar
    const escapedContent = post.content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    
    function escapeXml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
    
    const categories = Array.isArray(post.categories) && post.categories.length ?
      post.categories.map(cat =>
        `    <category scheme="http://www.blogger.com/atom/ns#" term="${escapeXml(cat)}" />`
      ).join('\n') :
      '';
    
    const labels = post.tags.map(tag =>
      `    <category scheme="http://schemas.google.com/g/2005/categories#kind" term="http://schemas.google.com/blogger/2008/kind#post" label="${tag.replace(/"/g, '&quot;')}" />`
    ).join('\n');
    
    return `  <entry>
    <id>${postId}</id>
    <published>${publishDate}</published>
    <updated>${publishDate}</updated>
    <category scheme="http://schemas.google.com/g/2005#kind" term="http://schemas.google.com/blogger/2008/kind#post" />
    <title type="text">${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>
    <content type="html">${escapedContent}</content>
    <link rel="alternate" type="text/html" href="${postUrl}" title="${post.title.replace(/"/g, '&quot;')}" />
    <link rel="edit" type="application/atom+xml" href="https://www.blogger.com/feeds/${blogId}/posts/default/${Date.now() + index}" />
    <link rel="self" type="application/atom+xml" href="https://www.blogger.com/feeds/${blogId}/posts/default/${Date.now() + index}" />
    <author>
      <name>Admin</name>
      <uri>https://www.blogger.com/profile/00000000000000000000</uri>
      <email>noreply@blogger.com</email>
    </author>
${categories}
${labels}
    <thr:total>0</thr:total>
  </entry>`;
  }).join('\n');
  
  return `<?xml version='1.0' encoding='UTF-8'?>
<?xml-stylesheet type="text/xsl" href="https://resources.blogblog.com/blogblog/data/1kt/travel/blog-atom-feed.xsl"?>
<feed xmlns='http://www.w3.org/2005/Atom' xmlns:openSearch='http://a9.com/-/spec/opensearch/1.1/' xmlns:blogger='http://schemas.google.com/blogger/2008' xmlns:georss='http://www.georss.org/georss' xmlns:gd='http://schemas.google.com/g/2005' xmlns:thr='http://purl.org/syndication/thread/1.0'>
  <id>tag:blogger.com,1999:blog-${blogId}</id>
  <updated>${new Date().toISOString()}</updated>
  <title type='text'>Manga Generator Export</title>
  <subtitle type='html'>Generated manga posts for Blogspot</subtitle>
  <link rel='http://schemas.google.com/g/2005#feed' type='application/atom+xml' href='${baseUrl}/feeds/posts/default' />
  <link rel='self' type='application/atom+xml' href='${baseUrl}/feeds/posts/default' />
  <link rel='alternate' type='text/html' href='${baseUrl}/' />
  <link rel='hub' href='http://pubsubhubbub.appspot.com/' />
  <author>
    <name>Admin</name>
    <uri>https://www.blogger.com/profile/00000000000000000000</uri>
    <email>noreply@blogger.com</email>
  </author>
  <generator version='7.00' uri='https://www.blogger.com'>Blogger</generator>
  <openSearch:totalResults>${generatedPosts.length}</openSearch:totalResults>
  <openSearch:startIndex>1</openSearch:startIndex>
  <openSearch:itemsPerPage>${generatedPosts.length}</openSearch:itemsPerPage>
${posts}
</feed>`;
}

// Utility function for delays
function sleepTime_S(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}