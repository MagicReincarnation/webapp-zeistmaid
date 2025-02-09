// SeriesLibrary: Series dan Chapters
const SeriesLibrary = {
 domain: "https://zeistmaid.blogspot.com",
 //domain: "https://zeistmanga-bt.blogspot.com",
 labelSeries: "Series",
 maxChapters: 4, // 3 chapter terbaru.. kenapa aku sebut angka 4 sebagai 3 chapter terbaru? ya.. itu karena 1 nya itu series yang dibuang supaya gak keindex.

 sortBy: "date",
 /* bootlean
date: Urutkan tanggal terbaru.
titleAZ: Urutkan alfabetis (A-Z).
titleZA: Urutkan alfabetis terbalik (Z-A).
]*/

 default_showChapter: true, //true = buka chapter langsung sebagai default. false = tutup chapter sebagai default.
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


  statusLabel: ["Coming Soon", "Ongoing", "Completed", "Cancelled", "Hiatus", "Dropped", "Delay", "Drop"], // Status yang ditampilkan (Ongoing, Completed, dll)
  typeLabel: ["Manga", "Novel", "Doujin", "WN", "LN", "Raw Novel", "Light Novel (JP)", "Web Novel (CN)", "Web Novel (JP)", "Web Novel (KR)", "Manga", "Manhua", "Manhwa", "Doujinshi", "Long Strip", "Full Color", "One Shot", "Web Comic", "Official Colored", "Color", "Webtoon", "One-Shot"], // Type yang ditampilkan

  languageLabel: ["EN", "ID", "JP", "CN", "KR"], // Status yang ditampilkan (EN,ID,JP, dll)
  
  countryLabel: ["Jepang", "Indonesia", "Cina", "Korea", "JP", "CN", "KR"], // Status yang ditampilkan (Indonesia,Jepang, dll)

  otherLabel: ["NSFW", "Lock"], // Status yang ditampilkan (dll)

  scoreRegex: /Score\s*([\d\.]+)/, // Regex untuk mencari score (misal Score: 8.5)

  durationRegex: /(\d{2}:\d{2}:\d{2})/, // Regex untuk mencari durasi (misal 00:00:00)

  newBadgeThreshold: 7, // 7 Hari maksimum untuk menampilkan "New" badge        

  image_default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjbMyZwf0T4z9RgOoWe8wdvktWrhgthPIXM2lNIavzniNi-tC90SQMOg&s=10",


  modif_title_Chapter: ["([vV]olume|[cC]hapter|[pP]rolog[ue]?|[eE]pisode|[sS]eason|[cC]h|[vV]ol|[eE]p|[sS])\\s*\\d+(?=[\\s\\W]|$)(.*)"], //Regex Filter Title Chapter/Episode/Volume dll.
  replaceList_ch: [
   { target: /Volume/, change_to: 'Vol' },
   { target: /Season/, change_to: 'S' },
   { target: /Short Story/, change_to: 'SS' },
   { target: /Extra Chapter/, change_to: 'Etc' },
   { target: /Chapter/, change_to: 'Ch' }
    	], // Replace penyingkat judul Chapter/Episode/Volume dll.
 },
 seriesData: {}, // data series
 feedIndex: 1, //index awal
 maxFeedResults: 4, // Jumlah entri series feed per request
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
   if (this.consolActive) {
    console.log(`Script untuk ${urlMyseries} telah dimuat.`);
   }
   const exsScript = document.querySelector(`script[src^="${urlMyseries}"]`);
   if (exsScript) {
    if (this.consolActive) {
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

  const session_seriesFD = sessionStorage.getItem("seriesFD");
  if (session_seriesFD) {
   const true_session_seriesFD = session_seriesFD ? JSON.parse(session_seriesFD) : {};
   this.seriesData = { ...true_session_seriesFD, ...this.seriesData };
   console.log("session_seriesFD ditemukan.");
  }

  const feedPost = await feed.feed;
  let totalResults = feedPost.openSearch$totalResults?.$t ? parseInt(feedPost.openSearch$totalResults.$t, 10) : 0;

  if (feedPost.entry && Array.isArray(feedPost.entry) && feedPost.entry.length > 0) {
   feedPost.entry.forEach((entry) => {
    const title = entry.title.$t;
    const published = entry.published.$t;
    const idpost = entry.id.$t.split("-").pop();
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
    const language = this.extractLanguage(labels);
    const country = this.extractCountry(labels);
    const other = this.extractOther(labels);
    const score = this.extractScore(labels);
    const duration = this.extractDuration(labels);
    const isNew = this.isNewPost(published);

    const contentHTML = new DOMParser().parseFromString(entry.content.$t, "text/html");
    const labelsAttr = Array.from(contentHTML.querySelectorAll('[chapters]')).map(el => el.getAttribute('chapters')) || [];

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
      language,
      country,
      other,
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
    if (feedPost.entry.length >= this.maxFeedResults) {
     this.feedIndex += this.maxFeedResults;
     await this.fetchFeed("SeriesLibrary.processFeed");
     if (this.consolActive) {
      console.log(`Hasil data load: 
          - Total Entry Series: ${feedPost.entry.length} 
          - Max Post per Batch: ${this.maxFeedResults} 
          - Total Post Tersedia: ${totalResults} 
          - Feed Index Saat Ini: ${this.feedIndex} 
          - Total Series Terkini: ${totalSeries}`);
     }
    } else {
     if (stfeed) stfeed.style.display = "none";
     document.getElementById('btn_seriesUnlimited').style.display = "none";
     stfeed.style.display = "none";
     ntffeed.innerHTML = `Semua series telah dimuat:${totalSeries}`;
    }
   }

   this.renderPage();
   sessionStorage.setItem("seriesFD", JSON.stringify(this.seriesData));

  } else {
   if (stfeed) stfeed.style.display = "none";
   document.getElementById('btn_seriesUnlimited').style.display = "none";
   stfeed.style.display = "none";
   ntffeed.innerHTML = "Tidak ada series baru untuk dimuat.";
  }
  setTimeout(() => {
   stfeed.style.display = "none";
  }, 3000);
 },

 renderPage() {
  const id_outputDiv = document.getElementById("libarySeries");
  if (!id_outputDiv) return;

  id_outputDiv.innerHTML = "";

  const seriesArray = Object.values(this.seriesData);
  let htmlOutput = seriesArray
   .map(series => {
    const chapterLabels = series.customAttributes.labelsAttr;
    const hasChapters = chapterLabels.length > 0;

    const buttonDisplay = hasChapters ? "" : "style='display:none;'";

    const btnLihatCh = `<button class="load-chapter-btn" data-series-id="${series.id}" data-labels="${chapterLabels}" ${buttonDisplay}> Lihat Chapter</button>`;

    return `
        <div class="series" hS="${series.image === this.config.image_default ? 'false' : 'true'}">
         <a class="boxT_zero" href="${series.url}" title="${series.title}">
         <div class="boxS_zero snippet-thumbnail">   
          <img loading="lazy" src="${series.image}" alt="${series.title}"/>
          
          ${series.type? `<span class="typeS po_S">${series.type}</span>`:''}
          
          ${series.status? `<span class="statusS po_S">${series.status}</span>`:''}
          
          ${series.score? `<span class="scoreS po_S"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M263.813 18.594c-50.387 12.75-80.69 66.325-50.813 111.22c22.477 33.773 44.967 61.167 8.75 79.06c-23.353 11.54-50.027-16.454-46.125-49.28c4.812-40.485-18.705-79.927-46.125-88.188c46.237 106.42-43.46 176.998-24.53 77.094c-30.286 16.095-32.784 59.017-11.25 122.72c-40.372-17.2-55.07-66.767-38.282-120.564c-35.866 28.35-53.3 130.904-14.626 183.47C136.425 464.08 248.156 496.343 268 496.343c21.144 0 117.334-33.716 189.594-115.125c41.782-47.074 50.926-168.9 9.22-243.658c5.98 25.335-6.117 76.786-33.845 94.032c4.998-57.774-3.913-140.944-36.69-171.53c32.622 172.802-93.01 152.202-48.374 99.53c29.51-34.825-.17-102.5-17.5-112.375c10.894 42.12-14.24 69.676-54.72 61.436c-27.252-5.547-44.743-44.957-11.873-90.062zm-115.157 211.47h18.688V395.25l102.72 55.813L372.78 395.25V230.094h18.69v176.28l-4.908 2.657L274.5 469.876l-4.438 2.438l-4.468-2.438L153.53 409.03l-4.874-2.655V230.062zm37.53.217l73.533 44.532v148.313l-73.533-41.438V230.28zm167.72 0v151.407l-75.5 42.563V276.03l75.5-45.75z"/></svg>${series.score}</span>`:''}
	         </div>
		  </a>
          <div class="bChapterS">
          
          <h2 class="titleS">${series.title}</h2>
    
          ${series.language? `<span class="languageS po_S">${series.language}</span>`: ''}
          
          ${series.country? `<span class="countryS po_S">${series.country}</span>`:''}
          
          ${series.other? `<span class="otherS po_S">${series.other}</span>`:''}
          
          ${series.isNew ? '<span class="badge new-badge po_S">New</span>' : ''}      
          
          <div class="latest_chapters" seriesIdlatestCh="${series.id}">
           </div>
          ${!this.default_showChapter ? btnLihatCh : ''}
          </div>
          
        </div>`;
   })
   .join("");

  id_outputDiv.innerHTML = htmlOutput;

  if (this.default_showChapter) {
   seriesArray.forEach(series => {
    const chapterLabels = series.customAttributes.labelsAttr;
    if (chapterLabels.length > 0) {
     this.runLoadChapterNow(chapterLabels, series.id);
    }
   });
  }
 },


 loadedFeeds: [],
 runLoadChapterNow(labels, seriesId, loadCH) {
  const targetDiv = document.querySelector(`[seriesIdlatestCh="${seriesId}"]`);

  const button = document.querySelector(`.load-chapter-btn[data-series-id="${seriesId}"]`);

  if (!targetDiv) {
   console.error(`Elemen latest_chapters dengan seriesIdlatestCh "${seriesId}" tidak ditemukan.`);
   return;
  }
  if (loadCH && !this.default_showChapter && button) {
   const isHidden = targetDiv.style.display === "none";
   targetDiv.style.display = isHidden ? "block" : "none";
   button.innerHTML = isHidden ? "Tutup" : "Lihat Chapter";
   return;
  }

  targetDiv.style.display = "block";
  targetDiv.innerHTML = "<p>Memuat chapter...</p>";
  if (!loadCH && !this.default_showChapter && button) {
   button.innerHTML = "Tutup";
  }
  this.fetchFeedByLabel(labels, seriesId);
 },

 fetchFeedByLabel(labels, seriesId) {
  const targetDiv = document.querySelector(`[seriesIdlatestCh="${seriesId}"]`);
  if (!targetDiv) return;
  const self = this;
  const latestChapters_callback_name = `processlatestChapters_${seriesId}`;

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

  const maxlatestChapters = this.maxChapters;
  const latestChaptersUrl = `${SeriesLibrary.domain}/feeds/posts/default/-/${labels}?alt=json&callback=window.${latestChapters_callback_name}&max-results=${maxlatestChapters}`;

  const latestChaptersScript = document.createElement("script");
  latestChaptersScript.src = latestChaptersUrl;
  if (this.consolActive) {
   console.warn(`Memuat script untuk Latest Chapters dengan seriesId ${seriesId} dari URL: ${latestChaptersUrl}`);
  }

  latestChaptersScript.onerror = function() {
   if (this.consolActive) {
    console.error(`Error memuat script Latest Chapters untuk seriesId ${seriesId} dari URL: ${latestChaptersUrl}`);
   }
   targetDiv.innerHTML = "<p>Error memuat Latest Chapters. Silakan coba lagi nanti.</p>";
   delete window[latestChapters_callback_name];
  };
  latestChaptersScript.onload = function() {
   const exsScript = document.querySelector(`script[src^="${latestChaptersUrl}"]`);
   if (exsScript) {
    if (this.consolActive) {
     console.log(`Menghapus script untuk Latest Chapters seriesId ${seriesId}...`);
    }
    exsScript.remove();
   }
  };

  this.loadedFeeds = this.loadedFeeds || [];
  this.loadedFeeds.push(seriesId);
  document.body.appendChild(latestChaptersScript);
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
   title: this.filterTitle(entry.title.$t),
   url: entry.link.find(link => link.rel === "alternate").href,
   published: this.formatTimestamp(entry.published.$t),
   isNew: this.isNewPost(entry.published.$t),
   labels: entry.category.map(cat => cat.term),
  })).sort(this.sortByConfig());
  const latestChapters = chapters.slice(0, this.maxChapters);
  let latestChaptersHtml = `
    <ul class="latest-chapters">
      ${latestChapters
        .map(
          (chapter) => `
        <li class="li_chapter"><a title="${chapter.title}" href="${chapter.url}" target="_blank">${chapter.title}</a> <time>${chapter.published}</time>${chapter.isNew ? '<span class="badge new-badge">New</span>' : ''}</li>
      `
        )
        .join("")}
    </ul>
  `;
  if (targetDiv) {
   targetDiv.innerHTML = latestChaptersHtml;
  }
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
   }
   return 0;
  };
 },

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


 filterTitle(title) {
  let filteredTitle = title;
  for (const filterText of this.config.modif_title_Chapter) {
   const pattern = new RegExp(filterText, "i");
   const match = filteredTitle.match(pattern);
   if (match) { filteredTitle = match[0].trim(); break; }
  }
  this.config.replaceList_ch.forEach(replaceList_ch_array => {
   filteredTitle = filteredTitle.replace(replaceList_ch_array.target, replaceList_ch_array.change_to);
  });
  return filteredTitle;
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
  return status || "";
 },
 // Ekstraksi Type dari label
 extractType(labels) {
  const type = labels.find(label => this.config.typeLabel.includes(label));
  return type || "";
 },
 // Ekstraksi Language dari label
 extractLanguage(labels) {
  const language = labels.find(label => this.config.languageLabel.includes(label));
  return language || "";
 },


 // Ekstraksi Country dari label
 extractCountry(labels) {
  const country = labels.find(label => this.config.countryLabel.includes(label));
  return country || "";
 },


 // Ekstraksi Other dari label
 extractOther(labels) {
  const other = labels.find(label => this.config.otherLabel.includes(label));
  return other || "";
 },

 // Ekstraksi Score dari label menggunakan regex
 extractScore(labels) {
  const scoreLabel = labels.find(label => label.startsWith("Score"));
  if (scoreLabel) {
   const match = scoreLabel.match(this.config.scoreRegex);
   return match ? match[1] : "";
  }
  return "";
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
  if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
   const totalSeries = Object.keys(this.seriesData).length;

   const last_IndexSeries = sessionStorage.getItem("last_IndexSeries");
   if (last_IndexSeries) {
    this.feedIndex = parseInt(last_IndexSeries, 10);
   }
   if (!this.modemax_infinitySeries) {
    if (this.totalEntry_Series >= this.maxFeedResults) {
     this.feedIndex += this.maxFeedResults;
     await this.fetchFeed("SeriesLibrary.processFeed");

     sessionStorage.setItem("last_IndexSeries", this.feedIndex);
     if (this.consolActive) {
      console.log(`Hasil data scroll: 
          - Total Entry Series: ${this.totalEntry_Series} 
          - Max Post per Batch: ${this.maxFeedResults} 
          - Total Post Tersedia: ${this.totalResults_Series} 
          - Feed Index Saat Ini: ${this.feedIndex} 
          - Total Series Terkini: ${totalSeries}`);
     }
    }
   }
  }
 },
};

SeriesLibrary.fetchFeed("SeriesLibrary.processFeed");

document.getElementById("seriesUnlimited").addEventListener("scroll", function() {
 SeriesLibrary.checkScroll.call(SeriesLibrary);
});

document.getElementById("btn_seriesUnlimited").addEventListener("click", function() {
 SeriesLibrary.checkScroll.call(SeriesLibrary);
});

if (!SeriesLibrary.default_showChapter) {
 document.getElementById("libarySeries").addEventListener("click", (event) => {
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
    if (this.consolActive) {
     console.log(`SeriesId ${seriesId} dihapus dari loadedFeeds untuk pemuatan ulang.`);
    }
    seriesLibrary.runLoadChapterNow(labels, seriesId, true);
    return;
   } else {
    seriesLibrary.runLoadChapterNow(labels, seriesId, false);
   }
  }
 });
}