const config_riwayatbaca = {
	...config_historyread, 
	folder: "historyread",
	showImage: true,
	showInitialTime: true,
	showLatestTimeRead: true,
	showCountRead: true,
	orderLatest: true,
  	formatJam: "timeago_id", 
		timeago_auto12hourv1: true, 
		auto12hourv1_dalam: 7, 
	maxpages: 5,
    noimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTluRfud2QZF1IKk-rjHzI5CxOUZoxJVrcPfy9TGk8vvXv9Vs6_6CKEciy5&s=10",

};
Object.assign(config_riwayatbaca, config_historyread);
let db_riwayatbaca;
let db_get_riwayatbaca = window.indexedDB.open("historyread", 1);
let noimage_hstry = config_riwayatbaca.noimage;
let page_total_riwayatbaca = config_riwayatbaca.maxpages;
let pages_active_riwayatbaca = 1;
let array_histories_riwayatbaca = [];
db_get_riwayatbaca.onupgradeneeded = function(event) {
  db_riwayatbaca = event.target.result;
  let objectStore = db_riwayatbaca.createObjectStore("history", { keyPath: "key" });
  objectStore.createIndex("folder", "folder", { unique: false });
  objectStore.createIndex("initialtime", "initialtime", { unique: false });
};
db_get_riwayatbaca.onsuccess = function(event) {
  db_riwayatbaca = event.target.result;
  display_history_riwayatbaca(config_riwayatbaca.folder);
 if (datapost && typeof datapost === 'object') {
	Object.values(datapost).forEach((config) => {
		add_hstry(
			config.folder,
			config.id,
			config.title,
			config.url,
			config.cover || "" 
		   );
	  });
  }
};
db_get_riwayatbaca.onerror = function(event) {
	console.error("IndexedDB error:", event.target.errorCode);
};
function add_hstry(folder, postId, title, url, imgcover = "") {
  let key = folder + "_" + postId;
  let transaction = db_riwayatbaca.transaction(["history"], "readwrite");
  let store = transaction.objectStore("history");
  let request = store.get(key);
  request.onsuccess = function(event) {
    let currentTime = new Date().toISOString();
    let data = event.target.result;
    if (data) {
      data.imgcover = imgcover;
      data.title = title;
      data.url = url;
      data.latesttimeread = currentTime;
      data.count_read = (data.count_read || 0) + 1;
      let updateRequest = store.put(data);
      updateRequest.onsuccess = function() {
        console.log("Riwayat diperbarui");
        display_history_riwayatbaca(folder);
      };
    } else {
      let newData = {
        key: key,
        folder: folder,
        postId: postId,
        imgcover: imgcover,
        title: title,
        url: url,
        initialtime: currentTime,
        latesttimeread: "",
        count_read: 1
      };
      let addRequest = store.add(newData);
      addRequest.onsuccess = function() {
        console.log("Riwayat ditambahkan");
        display_history_riwayatbaca(folder);
      };
    }
  };
}
function load__riwayatbaca_user(folder) {
  return new Promise(function(resolve, reject) {
    let transaction = db_riwayatbaca.transaction(["history"], "readonly");
    let store = transaction.objectStore("history");
    let index = store.index("folder");
    let request = index.getAll(IDBKeyRange.only(folder));
    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
    request.onerror = function(event) {
      reject(event.target.error);
    };
  });
}
function display_history_riwayatbaca(folder, page = pages_active_riwayatbaca) {
  load__riwayatbaca_user(folder).then(function(histories) {
    histories.sort(function(a, b) {
      if (config_riwayatbaca.orderLatest) {
        return new Date(b.initialtime) - new Date(a.initialtime);
      } else {
        return new Date(a.initialtime) - new Date(b.initialtime);
      }
    });
    array_histories_riwayatbaca = histories;
    renderPage(page);
    render_pagination_riwayatbaca(histories.length, page);
  });
}
function renderPage(page) {
  pages_active_riwayatbaca = page;
  let historyList = document.getElementById('history-list');
  if (historyList) historyList.innerHTML = "";
  else {
    console.log('#history-list tidak ditemukan');
    return;
  }
  let start = (page - 1) * page_total_riwayatbaca;
  let end = start + page_total_riwayatbaca;
  let pageHistories = array_histories_riwayatbaca.slice(start, end);
  pageHistories.forEach(function(history) {
    let imgcover = history.imgcover ? history.imgcover : noimage_hstry;
    let historyItem = document.createElement('div');
    historyItem.classList.add('recent_history');
    let content = "";
    if (config_riwayatbaca.showImage) {
      content += `<div class="boxcover">
                  <a class="boxCover_hstry" href="${history.url}"><img class="imgcover_hstry" src="${imgcover}" alt="${history.title}" width="60" height="60">
                      </a></div>`;
    }
    content += `<div class="boxdts_hstry">
                      <a class="linktitle_hstry" href="${history.url}">
                        <span class="title_hstry">${history.title}</span>
                      </a>
                      <div class="boxtimeread">`;
    if (config_riwayatbaca.showLatestTimeRead && history.latesttimeread) {
      content += `<time class="lastread_hstry">${formatTimestamp_hstry(history.latesttimeread)}</time>`;
    }
    if (config_riwayatbaca.showInitialTime) {
      content += `<time class="initialtime_hstry">${formatTimestamp_hstry(history.initialtime)}</time>`;
    }
    content += `</div></div>`;
    if (config_riwayatbaca.showCountRead) {
      content += `<p class="readcount_hstry">${history.count_read}</p>`;
    }
    historyItem.innerHTML = content;
    historyList.appendChild(historyItem);
  });
}
function render_pagination_riwayatbaca(e, n) {
	let t = document.getElementById("pagination_history");
	if (t) t.innerHTML = "";
	else {
		console.log("#pagination_history tidak ditemukan");
		return
	}
	let i = Math.ceil(e / page_total_riwayatbaca);
	if (i <= 1) return;
	let a = document.createElement("button");
	a.innerText = "Prev", a.disabled = 1 === n, a.onclick = function() {
		n > 1 && (renderPage(n - 1), render_pagination_riwayatbaca(e, n - 1))
	}, t.appendChild(a);
	let r = [];
	if (i <= 5)
		for (let l = 1; l <= i; l++) r.push(l);
	else {
		let d = Math.max(2, n - 1),
			o = Math.min(i - 1, n + 1);
		r.push(1), d > 2 && r.push("...");
		for (let c = d; c <= o; c++) r.push(c);
		o < i - 1 && r.push("..."), r.push(i)
	}
	r.forEach(function(i) {
		let a = document.createElement("button"),
			r = document.createElement("span");
		"..." === i ? (r.innerText = "...", a.disabled = !0) : (a.innerText = i, i === n && (a.disabled = !0), a.onclick = function() {
			renderPage(i), render_pagination_riwayatbaca(e, i)
		}), "..." === i ? t.appendChild(r) : t.appendChild(a)
	});
	let p = document.createElement("button");
	p.innerText = "Next", p.disabled = n === i, p.onclick = function() {
		n < i && (renderPage(n + 1), render_pagination_riwayatbaca(e, n + 1))
	}, t.appendChild(p)
}
function formatTimestamp_hstry(r, t = config_riwayatbaca.formatJam) {
	let e = new Date(r),
		o = new Date,
		a = Math.floor((o - e) / 1e3),
		u = Math.floor(a / 86400),
		n = String(e.getDate()).padStart(2, "0"),
		f = String(e.getMonth() + 1).padStart(2, "0"),
		$ = e.getFullYear(),
		i = e.getHours(),
		l = String(e.getMinutes()).padStart(2, "0"),
		s = `${String(i).padStart(2,"0")}:${l}`,
		m = `${i%12||12}:${l} ${i<12?"AM":"PM"}`;
	if (config_riwayatbaca.timeago_auto12hourv1 && u > config_riwayatbaca.auto12hourv1_dalam && ("timeago_id" === t || "timeago_en" === t)) return `${n}/${f}/${$}`;
	switch (t) {
		case "timeago_en":
			if (a < 60) return `${a} seconds`;
			if (a < 3600) return `${Math.floor(a/60)} minutes`;
			if (a < 86400) return `${Math.floor(a/3600)} hours`;
			if (u < 7) return `${u} days ago`;
			if (u < 30) return `${Math.floor(u/7)} weeks`;
			if (u < 365) return `${Math.floor(u/30)} months`;
			return `${Math.floor(u/365)} years`;
		case "timeago_id":
			if (a < 60) return `${a} baru saja`;
			if (a < 3600) return `${Math.floor(a/60)} menit`;
			if (a < 86400) return `${Math.floor(a/3600)} jam yang lalu`;
			if (u < 7) return `${u} hari`;
			if (u < 30) return `${Math.floor(u/7)} minggu`;
			if (u < 365) return `${Math.floor(u/30)} bulan`;
			return `${Math.floor(u/365)} tahun`;
		case "24hour":
		default:
			return `${n}/${f}/${$} ${s}`;
		case "12hourv1":
			return `${n}/${f}/${$}`;
		case "12hourv2":
			return `${n}/${f}/${$} ${m}`
	}
}