// SeriesLibrary: Series dan Chapters
const SeriesLibrary = {
    domain: "https://zeistmaid.blogspot.com",
  // domain: "https://zeistmanga-bt.blogspot.com",
    labelSeries: "Series",
    maxChapters: 4, // 3 chapter terbaru.. kenapa aku sebut angka 4 sebagai 3 chapter terbaru? ya.. itu karena 1 nya itu series yang dibuang supaya gak keindex.
 
    maxChapters_batch: 150,// max Bacth chapter atau All chapter perSeries
  

	sortBy: "date", /* bootlean
date: Urutkan tanggal terbaru.
titleAZ: Urutkan alfabetis (A-Z).
titleZA: Urutkan alfabetis terbalik (Z-A).
title_chapter: Urutkan nomor Chapter.
title_volume: Urutkan nomor Volume.
]*/

    default_showChapter: true,//true = buka chapter langsung sebagai default. false = tutup chapter sebagai default.
     config: {    
/*
Format jam: 
12hourv1 = 25/07/2023;
12hourv2 = 25/07/2023 2:39 PM;
24hour   = 25/07/2023 14:10;
timeago_en  = 1 hour - year;
timeago_id  = 1 jam - tahun;
*/
 	   modeFormat: 'timeago_id', 
	    auto12hourv1_dalam: 14, // 14 hari terlewat timeAgo akan diFormat jadi 12hourv1.
	    timeago_auto12hourv1: true, // Mengaktifkan Format 12hourv1 pada timeAgo jika lebih dari 2 minggu
   
   
        statusLabel: ["Coming Soon","Ongoing","Completed","Cancelled","Hiatus","Dropped","Delay","Drop"], // Status yang ditampilkan (Ongoing, Completed, dll)
        typeLabel: ["Manga", "Novel","Doujin","WN","LN","Raw Novel","Light Novel (JP)","Web Novel (CN)","Web Novel (JP)","Web Novel (KR)","Manga","Manhua","Manhwa","Doujinshi","Long Strip","Full Color","One Shot","Web Comic","Official Colored","Color","Webtoon"], // Type yang ditampilkan
        
        scoreRegex: /Score\s*([\d\.]+)/, // Regex untuk mencari score (misal Score: 8.5)
        durationRegex: /(\d{2}:\d{2}:\d{2})/, // Regex untuk mencari durasi (misal 00:00:00)
        
        newBadgeThreshold: 7, // 7 Hari maksimum untuk menampilkan "New" badge        
        
  	  image_default: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8o8jlwaO1aAXDzVCsLhkMLIwRzAzuoMO3235-3NJ2wfejkM5elc6WzFoeHxUsrHhpbNb5U4QOyW-4MmkDPLsMrd7GxcTbNU6q4yMLraOF0Kp97Z4F4RHsshFp6iW3TjKPAnjhIcCpTR9nQHpFNKu-8pFej7qxHPwKDyVzYlJt9SEa6VyKCO0fot_O0Q/s449/No-Image-Placeholder.svg.png",
    },
    seriesData: {}, // data series
    feedIndex: 1,//index awal
    maxFeedResults: 2, // Jumlah entri series feed per request
    consolActive: false, // aktifkan mode debuging.
    modemax_infinitySeries: false, 
  /*true: mode untuk menggunakan loop. false: tidak menggunakan loop*/
    				
    
    
/*===================BATAS MAINSCRIPT==================*/

fetchFeed(callback) {
    const script = document.createElement("script");
    const urlMyseries = `${SeriesLibrary.domain}/feeds/posts/default/-/${this.labelSeries}?alt=json&callback=${callback}&start-index=${this.feedIndex}&max-results=${this.maxFeedResults}`;
    script.src = urlMyseries;
    document.body.appendChild(script);
   script.onload = () => {
      if(this.consolActive){
      console.log(`Script untuk ${urlMyseries} telah dimuat.`);
      }
   const exsScript = document.querySelector(`script[src^="${urlMyseries}"]`);
      if (exsScript) {
      if(this.consolActive){
        console.log("Menghapus script SeriesLibrary...");
        }
	 exsScript.remove();
      }
    };
},


totalResults_Series: null,
totalEntry_Series: 0,

async processFeed(feed) {
    const stfeed = document.getElementById('info_statusLoader');
    
    const ntffeed = document.getElementById('info_status')
    
    if (stfeed) {
        stfeed.style.display = "block";
    } else {
        console.warn("ID 'info_statusLoader' tidak ditemukan.");
    }

    const feedPost = await feed.feed;
    let totalResults = feedPost.openSearch$totalResults?.$t ? parseInt(feedPost.openSearch$totalResults.$t, 10) : 0;
    
    if (feedPost.entry && Array.isArray(feedPost.entry) && feedPost.entry.length > 0) {   
        feedPost.entry.forEach((entry) => {
        const title = entry.title.$t;
        const published = entry.published.$t;
        const pid = entry.id.$t;
        const idpost = pid.split("-").pop();
        const labels = Array.isArray(entry.category) ? entry.category.map(cat => cat.term).filter(label => label) : [];
        const link = entry.link.find(l => l.rel === "alternate")?.href || "#";
        let image = entry.media$thumbnail ? entry.media$thumbnail.url.replace('/s72-c', '/w135-h175') : '';

        if (!image) {
            const content = entry.content.$t || '';
            const imgMatch = this.imageString(content);
            image = imgMatch || this.config.image_default;
        }

        const status = this.extractStatus(labels);
        const type = this.extractType(labels);
        const score = this.extractScore(labels);
        const duration = this.extractDuration(labels);
        const isNew = this.isNewPost(published);

        // Ekstraksi elemen custom dalam konten
        const contentHTML = new DOMParser().parseFromString(entry.content.$t, "text/html");
        const labelsAttr = Array.from(contentHTML.querySelectorAll('[chapters]')).map(el => el.getAttribute('chapters')) || [];

        // Simpan data series
        if (!this.seriesData[idpost]) {
            this.seriesData[idpost] = {
                id: idpost,
                title,
                url: link,
                image,
                published,
                labels,
                status,
                type,
                score,
                duration,
                isNew,
                customAttributes: {
                    labelsAttr,
                },
            };
            if (this.consolActive) {
                console.log(`Menambahkan series: ${title}`);
            }
        }
    });

    	this.totalResults_Series = totalResults;
        this.totalEntry_Series = feedPost.entry.length;
   
   if (this.modemax_infinitySeries) {
    const totalSeries = Object.keys(this.seriesData).length; 
      if(feedPost.entry.length >= this.maxFeedResults){
        this.feedIndex += this.maxFeedResults;
        await this.fetchFeed("SeriesLibrary.processFeed");
        if(this.consolActive){
        console.log(`Hasil data load: 
          - Total Entry Series: ${feedPost.entry.length} 
          - Max Post per Batch: ${this.maxFeedResults} 
          - Total Post Tersedia: ${totalResults} 
          - Feed Index Saat Ini: ${this.feedIndex} 
          - Total Series Terkini: ${totalSeries}`);
          }
    } else {
        if (stfeed) stfeed.style.display = "none";
        ntffeed.innerHTML = `Semua series telah dimuat:${totalSeries}`;
    }
}
        
        this.renderPage();
    } else {
        if (stfeed) stfeed.style.display = "none";
        ntffeed.innerHTML = "Tidak ada series baru untuk dimuat.";
    }
},    
 
renderPage() {
  const id_outputDiv = document.getElementById("Chapterlist");
  if (!id_outputDiv) return;
  
  id_outputDiv.innerHTML = "";
  document.getElementById('info_statusLoader').style.display = "block";
    
  const seriesArray = Object.values(this.seriesData);
  let htmlOutput = seriesArray
    .map(series => {
      const chapterLabels = series.customAttributes.labelsAttr;
      const hasChapters = chapterLabels.length > 0;
      const buttonDisplay = hasChapters ? "" : "style='display:none;'";

      return `
        <div class="series">
          <img src="${series.image}" alt="${series.title}" />
          <h2><a href="${series.url}">${series.title}</a></h2>
          ${series.isNew ? '<span class="badge new-badge">New</span>' : ''}
          <div><strong>Published:</strong> ${this.formatTimestamp(series.published)}</div>
          <div><strong>Status:</strong> ${series.status}</div>
          <div><strong>Type:</strong> ${series.type}</div>
          <div><strong>Score:</strong> ${series.score}</div>
          <div><strong>Duration:</strong> ${series.duration}</div>
          <div><strong>Labels:</strong> ${series.labels.join(", ")}</div>
          
          
          <div class="latest-chapters" seriesIdlatestCh="${series.id}">
           </div>
          <div class="batch-chapters" seriesIdbatch="${series.id}">
          </div>
          
          <button class="load-chapter-btn" data-series-id="${series.id}" data-labels="${chapterLabels}" ${buttonDisplay}>Lihat Chapter</button>
        </div>`;
    })
    .join("");

  id_outputDiv.innerHTML = htmlOutput;
  if(this.default_showChapter){
   seriesArray.forEach(series => {
    const chapterLabels = series.customAttributes.labelsAttr;
    if (chapterLabels.length > 0) {
      this.runLoadChapterNow(chapterLabels, series.id);
    }
  });
 }
 
 document.getElementById('info_statusLoader').style.display = "none";
    
},


loadedFeeds: [],
runLoadChapterNow(labels, seriesId, loadCH) {
  const targetDiv = document.querySelector(`[seriesIdbatch="${seriesId}"]`);
  const button = document.querySelector(`.load-chapter-btn[data-series-id="${seriesId}"]`);

  if (!targetDiv || !button) {
    console.error(`Elemen dengan seriesIdbatch "${seriesId}" atau tombol tidak ditemukan.`);
    return;
  }
   if (loadCH) {
    const isHidden = targetDiv.style.display === "none";
    targetDiv.style.display = isHidden ? "block" : "none";
    button.innerHTML = isHidden ? "Tutup" : "Lihat Chapter";
    return;
  }
  targetDiv.style.display = "block";
  targetDiv.innerHTML = "<p>Memuat chapter...</p>";
  button.innerHTML = "Tutup";  
  this.fetchFeedByLabel(labels, seriesId);
},

fetchFeedByLabel(labels, seriesId) {
  const targetDiv = document.querySelector(`[seriesIdbatch="${seriesId}"]`);
  if (!targetDiv) return;
  const self = this;
  const latestChapters_callback_name = `processlatestChapters_${seriesId}`;
  const allChapters_callback_name = `processAllChapters_${seriesId}`;
  
  window[latestChapters_callback_name] = function(feed) {
    try {
      self.processlatestChapters(feed, seriesId); 
    } catch (error) {
      console.error(`Error memproses Latest Chapters untuk seriesId ${seriesId}:`, error);
      targetDiv.innerHTML = "<p>Error saat memproses chapter. Silakan coba lagi nanti.</p>";
    } finally {
      delete window[latestChapters_callback_name];
    }
  };

  window[allChapters_callback_name] = function(feed) {
    try {
      self.processAllChapters(feed, seriesId); 
    } catch (error) {
      console.error(`Error memproses All Chapters untuk seriesId ${seriesId}:`, error);
      targetDiv.innerHTML = "<p>Error saat memproses chapter. Silakan coba lagi nanti.</p>";
    } finally {
      delete window[allChapters_callback_name]; 
    }
  };

  const maxlatestChapters = this.maxChapters;
  const maxAllChapters = this.maxChapters_batch;
  const latestChaptersUrl = `${SeriesLibrary.domain}/feeds/posts/default/-/${labels}?alt=json&callback=window.${latestChapters_callback_name}&max-results=${maxlatestChapters}`;
  const allChaptersUrl = `${SeriesLibrary.domain}/feeds/posts/default/-/${labels}?alt=json&callback=window.${allChapters_callback_name}&max-results=${maxAllChapters}`;
  
  const latestChaptersScript = document.createElement("script");
  latestChaptersScript.src = latestChaptersUrl;
  if(this.consolActive) {
    console.warn(`Memuat script untuk Latest Chapters dengan seriesId ${seriesId} dari URL: ${latestChaptersUrl}`);
  }

  latestChaptersScript.onerror = function () {
    if(this.consolActive) {
      console.error(`Error memuat script Latest Chapters untuk seriesId ${seriesId} dari URL: ${latestChaptersUrl}`);
    }
    targetDiv.innerHTML = "<p>Error memuat Latest Chapters. Silakan coba lagi nanti.</p>";
    delete window[latestChapters_callback_name]; 
  };
  latestChaptersScript.onload = function () {
    const exsScript = document.querySelector(`script[src^="${latestChaptersUrl}"]`);
    if (exsScript) {
      if(this.consolActive) {
        console.log(`Menghapus script untuk Latest Chapters seriesId ${seriesId}...`);
      }
      exsScript.remove();
    }
  };
  
  const allChaptersScript = document.createElement("script");
  allChaptersScript.src = allChaptersUrl;
  if(this.consolActive) {
    console.log(`Memuat script untuk All Chapters dan Batch Volume dengan seriesId ${seriesId} dari URL: ${allChaptersUrl}`);
  }
  allChaptersScript.onerror = function () {
    if(this.consolActive) {
      console.error(`Error memuat script All Chapters dan Batch Volume untuk seriesId ${seriesId} dari URL: ${allChaptersUrl}`);
    }
    targetDiv.innerHTML = "<p>Error memuat All Chapters. Silakan coba lagi nanti.</p>";
    delete window[allChapters_callback_name]; 
  };
  allChaptersScript.onload = function () {
    const exsScript = document.querySelector(`script[src^="${allChaptersUrl}"]`);
    if (exsScript) {
      if(this.consolActive) {
        console.log(`Menghapus script untuk All Chapters seriesId ${seriesId}...`);
      }
      exsScript.remove();
    }
  };
  this.loadedFeeds = this.loadedFeeds || [];
  this.loadedFeeds.push(seriesId);
  document.body.appendChild(latestChaptersScript);
  document.body.appendChild(allChaptersScript);
},

processlatestChapters(feed, seriesId) {
  const feedEntries = feed.feed.entry;
  const targetDiv = document.querySelector(`[seriesIdlatestCh="${seriesId}"]`);

  if (!feedEntries) {
    if (targetDiv) {
      targetDiv.innerHTML = "<p>Latest Chapters tidak tersedia.</p>";
    }
    return;
  }
  const filteredFeed = feedEntries.filter(entry => {
    return !entry.category.some(cat => cat.term === this.labelSeries);
  });
  const chapters = filteredFeed.map(entry => ({
    id: entry.id.$t.split("-").pop(),
    title: entry.title.$t,
    url: entry.link.find(link => link.rel === "alternate").href,
    published: entry.published.$t,
    isNew: this.isNewPost(entry.published.$t),
    labels: entry.category.map(cat => cat.term),
    volume: this.extractVolume_title(entry.title.$t),
  })).sort(this.sortByConfig());
  const latestChapters = chapters.slice(0, this.maxChapters);
  let latestChaptersHtml = `
   <h3>Latest Chapters:</h3>
    <ul class="latest-chapters">
      ${latestChapters
        .map(
          (chapter) => `
        <li><a href="${chapter.url}" target="_blank">${chapter.title}</a> <time>${this.formatTimestamp(chapter.published)}</time>${chapter.isNew ? '<span class="badge new-badge">New</span>' : ''}</li>
      `
        )
        .join("")}
    </ul>
  `;
  if (targetDiv) {
    targetDiv.innerHTML = latestChaptersHtml;
  }
},


addToggleListeners(seriesId) {
  const allChaptersButton = document.querySelector(`.toggle-all-chapters[data-series-id="${seriesId}"]`);
  const allChaptersList = document.getElementById(`all-chapters-${seriesId}`);
  const volumeChapters = document.querySelector(`.volume-chapters`);

  if (allChaptersButton && allChaptersList) {
    let toggleState = "all"; 
    allChaptersButton.addEventListener("click", () => {
      if (toggleState === "all") {
        allChaptersList.style.display = "block";
        volumeChapters.style.display = "none";
        allChaptersButton.textContent = "Tampilkan Batch Volume";
        toggleState = "volume";
      } else {
        allChaptersList.style.display = "none";
        volumeChapters.style.display = "block";
        allChaptersButton.textContent = "Tampilkan Semua Chapter";
        toggleState = "all";
      }
    });
  }
  const volumeButtons = document.querySelectorAll(`.btn-volume[data-series-id="${seriesId}"]`);
  volumeButtons.forEach((button) => {
    const volume = button.getAttribute("data-volume");
    const volumeList = document.getElementById(`volume-${seriesId}-${volume}`);

    button.addEventListener("click", () => {
      const isHidden = volumeList.style.display === "none";
      volumeList.style.display = isHidden ? "block" : "none";
      button.querySelector(".toggle-text").textContent = isHidden ? "[Tutup]" : "[Buka]";
    });
  });
},

processAllChapters(feed, seriesId) {
  const feedEntries = feed.feed.entry;
  const targetDiv = document.querySelector(`[seriesIdbatch="${seriesId}"]`);

  if (!feedEntries) {
    if (targetDiv) {
      targetDiv.innerHTML = "<p>Chapter tidak tersedia.</p>";
    }
    return;
  }
	const filteredFeed = feedEntries.filter(entry => {
    return !entry.category.some(cat => cat.term === this.labelSeries);
  });
  const chapters = filteredFeed.map(entry => ({
    id: entry.id.$t.split("-").pop(),
    title: entry.title.$t,
    url: entry.link.find(link => link.rel === "alternate").href,
    published: entry.published.$t,
    isNew: this.isNewPost(entry.published.$t),
    labels: entry.category.map(cat => cat.term),
    volume: this.extractVolume_title(entry.title.$t), // Ambil volume dari judul
  })).sort(this.sortByConfig());
  chapters.sort((a, b) => a.volume - b.volume);
  const allChapters = chapters;
  const groupedChapters = this.group_Chapters_by_Volume(chapters);
  let dropdownHtml = `
    <div class="dropdown-chapters">
      <button class="toggle-all-chapters" data-series-id="${seriesId}" style="display: block;">Tampilkan Semua Chapter</button>
      <ul class="all-chapters" id="all-chapters-${seriesId}" style="display: none;">
        ${allChapters
          .map(
            (chapter) => `
          <li><a href="${chapter.url}" target="_blank">${chapter.title}</a> <time>${this.formatTimestamp(chapter.published)}</time>${chapter.isNew ? '<span class="badge new-badge">New</span>' : ''}</li>
        `
          )
          .join("")}
      </ul>
      <ul class="volume-chapters" style="display: none;">
        <h3>Volume Chapters</h3>
		 ${Object.keys(groupedChapters)
          .map((volume) => `
          <li>
            <button class="btn-volume" data-volume="${volume}" data-series-id="${seriesId}">Lihat Volume ${volume} <span class="toggle-text">[Buka]</span></button>
            <ul class="volume-list" id="volume-${seriesId}-${volume}" style="display: none;">
              ${groupedChapters[volume]
                .map(
                  (chapter) => `
              <li><a href="${chapter.url}" target="_blank">${chapter.title}</a> <time>${this.formatTimestamp(chapter.published)}</time>${chapter.isNew ? '<span class="badge new-badge">New</span>' : ''}</li>
            `).join("")}
            </ul>
          </li>
        `)
          .join("")}
      </ul>
    </div>
  `;

  if (targetDiv) {
    targetDiv.innerHTML = dropdownHtml;
    this.addToggleListeners(seriesId);
  } else {
    console.error(`Elemen dengan seriesIdbatch "${seriesId}" tidak ditemukan.`);
  }
},

extractVolume_title(title) {
  const volumeMatch = title.match(/(Vol|Volume|Season|S)\s?(\d+|\d+\.\d+)/i);
  if (volumeMatch) {
    const volumeNumber = parseFloat(volumeMatch[2]);
    return isNaN(volumeNumber) ? 0 : volumeNumber;
  }
  return 0; 
},

group_Chapters_by_Volume(chapters) {
  return chapters.reduce((groups, chapter) => {
    const volume = chapter.volume || "Tanpa Volume";
    if (!groups[volume]) {
      groups[volume] = [];
    }
    groups[volume].push(chapter);
    return groups;
  }, {});
},

extractChapter_title(title) {
  const chMatch = title.match(/(Ch|Chapter)\s?(\d+|\d+\.\d+)/i);
  if (chMatch) {
    const ch_number = parseFloat(chMatch[2]);
    return isNaN(ch_number) ? 0 : ch_number;
  }
  return 0; 
},

sortByConfig() {
  return (a, b) => {
    if (this.sortBy === 'date') {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);
      return dateB - dateA;
    } else if (this.sortBy === 'titleAZ') {
      return a.title.localeCompare(b.title);
    } else if (this.sortBy === 'titleZA') {
      return b.title.localeCompare(a.title);
    } else if (this.sortBy === 'title_chapter') {
      const numberA = this.extractChapter_title(a.title);
      const numberB = this.extractChapter_title(b.title);
      return numberA - numberB;
    } else if (this.sortBy === 'title_volume') {
      const volumeA = this.extractVolume_title(a.title);
      const volumeB = this.extractVolume_title(b.title);
      return volumeA - volumeB;
    }
    return 0;
  };
},

// end countSeries 
formatTimestamp(timestamp, format = this.config.modeFormat) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours24 < 12 ? 'AM' : 'PM';

    const time24 = `${String(hours24).padStart(2, '0')}:${minutes}`;
    const time12 = `${hours12}:${minutes} ${period}`;

    if (
        this.config.timeago_auto12hourv1 &&
        diffInDays > this.config.auto12hourv1_dalam &&
        (format === 'timeago_id' || format === 'timeago_en')
    ) {
        return `${day}/${month}/${year}`;
    }

    switch (format) {
        case 'timeago_en':
            if (diffInSeconds < 60) return `${diffInSeconds} seconds`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
            if (diffInDays < 7) return `${diffInDays} days ago`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months`;
            return `${Math.floor(diffInDays / 365)} years`;

        case 'timeago_id':
            if (diffInSeconds < 60) return `${diffInSeconds} baru saja`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
            if (diffInDays < 7) return `${diffInDays} hari`;
            if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu`;
            if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} bulan`;
            return `${Math.floor(diffInDays / 365)} tahun`;

        case '24hour':
            return `${day}/${month}/${year} ${time24}`;

        case '12hourv1':
            return `${day}/${month}/${year}`;

        case '12hourv2':
            return `${day}/${month}/${year} ${time12}`;

        default:
            return `${day}/${month}/${year} ${time24}`;
    }
},
    // Mengecek apakah post adalah post baru (kurang dari 7 hari)
    isNewPost(published) {
        const publishedDate = new Date(published);
        const now = new Date();
        const diffInDays = Math.floor((now - publishedDate) / (1000 * 60 * 60 * 24));
        return diffInDays <= this.config.newBadgeThreshold;
    },   
    // Ekstraksi Status dari label
    extractStatus(labels) {
        const status = labels.find(label => this.config.statusLabel.includes(label));
        return status || "Unknown";
    },
    // Ekstraksi Type dari label
    extractType(labels) {
        const type = labels.find(label => this.config.typeLabel.includes(label));
        return type || "Unknown";
    },
    // Ekstraksi Score dari label menggunakan regex
    extractScore(labels) {
        const scoreLabel = labels.find(label => label.startsWith("Score"));
        if (scoreLabel) {
            const match = scoreLabel.match(this.config.scoreRegex);
            return match ? match[1] : "Unknown";
        }
        return "Unknown";
    },
    // Ekstraksi Duration dari label menggunakan regex
    extractDuration(labels) {
        const durationLabel = labels.find(label => label.match(this.config.durationRegex));
        if (durationLabel) {
            const match = durationLabel.match(this.config.durationRegex);
            return match ? match[1] : "00:00:00";
        }
        return "00:00:00";
    },
    imageString(t) {
      var e = t.indexOf("<img"),
        i = t.indexOf('src="', e),
        n = t.indexOf('"', i + 5),
        r = t.substr(i + 5, n - i - 5);
      return -1 != e && -1 != i && -1 != n && "" != r ? r : this.config.image_default
      },
      
 async checkScroll() {
  const container = document.getElementById('seriesUnlimited');
  const ntffeed = document.getElementById('info_status');
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
    
   const totalSeries = Object.keys(this.seriesData).length;
 
   if (!this.modemax_infinitySeries) {
if (this.totalEntry_Series >= this.maxFeedResults) {           		this.feedIndex += this.maxFeedResults;
        await this.fetchFeed("SeriesLibrary.processFeed");
                if(this.consolActive){
        console.log(`Hasil data scroll: 
          - Total Entry Series: ${this.totalEntry_Series} 
          - Max Post per Batch: ${this.maxFeedResults} 
          - Total Post Tersedia: ${this.totalResults_Series} 
          - Feed Index Saat Ini: ${this.feedIndex} 
          - Total Series Terkini: ${totalSeries}`);
 			}
        
     } else {
        document.getElementById('info_statusLoader').style.display = "none";
         ntffeed.innerHTML = `Semua series telah dimuat:${totalSeries}`;
      }
    }     
  
    
  }
},


};
  
SeriesLibrary.fetchFeed("SeriesLibrary.processFeed");

document.getElementById("seriesUnlimited").addEventListener("scroll", function() {
    SeriesLibrary.checkScroll.call(SeriesLibrary);
});


document.getElementById("Chapterlist").addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("load-chapter-btn")) {
    const button = event.target;
    const seriesId = button.getAttribute("data-series-id");
    const labels = button.getAttribute("data-labels");
    const seriesLibrary = SeriesLibrary;
    if (!seriesLibrary.loadedFeeds) {
      seriesLibrary.loadedFeeds = []; 
    }
    if (seriesLibrary.loadedFeeds.includes(seriesId)) {
      seriesLibrary.loadedFeeds = seriesLibrary.loadedFeeds.filter(id => id !== seriesId);
		      if(this.consolActive) {
      console.log(`SeriesId ${seriesId} dihapus dari loadedFeeds untuk pemuatan ulang.`);
			}
	  seriesLibrary.runLoadChapterNow(labels, seriesId, true);
      return;
    } else {
      seriesLibrary.runLoadChapterNow(labels, seriesId, false);
    }
  }
});