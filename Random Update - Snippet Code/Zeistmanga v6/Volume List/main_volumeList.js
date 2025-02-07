//<script defer='defer' fetchpriority='low' type='text/javascript'>
/*<![CDATA[*/
const clwd_volume = {
 arr_volume: [],
 sort_ascending: !1,
 compile_volume: function() {
  let t = {};
  this.arr_volume.forEach(e => {
   let _ = e.title,
    s = _.match(/\b([vV]olume|[sS]eason|[vV]ol)\s*(\d+(?:[\W\d]*\d+)?)/i),
    r = s ? s[1] + " " + s[2] : "Tanpa Volume";
   t[r] || (t[r] = []), t[r].push({
    title: clwd_volume.chapterlist_settingTitle(_),
    link: e.link,
    published: e.published,
    dLink: e.dLink
   })
  });
  let e = Object.keys(t).sort((t, e) => {
    let _ = t => {
      let e = t.match(/[\d]+(?:[.,/\-_&\s][\d]+)?/g);
      if (!e) return 0;
      let _ = parseFloat(e[0].replace(/[^\d.]/g, "."));
      return isNaN(_) ? 0 : _
     },
     s = _(t),
     r = _(e);
    return clwd_volume.sort_ascending ? s - r : r - s
   }),
   _ = `<div class="space-y-3">
            <button onclick="clwd_volume.sort_vol()" class="bg-white dark:bg-gray-800 rounded-full inline-block px-4 py-1 rounded-full hover:bg-accent hover:text-white aria-selected:bg-accent aria-selected:text-white dark:aria-selected:text-white">
              ${clwd_volume.sort_ascending?'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 16.327l1.409 1.486C17.159 18.604 17.534 19 18 19s.841-.396 1.591-1.187L21 16.327m-3 2.586v-4.375c0-2.234 0-3.35-.447-4.335s-1.287-1.72-2.968-3.191L14 6.5m-11 0c0-1.225 0-1.838.238-2.306c.21-.411.545-.746.956-.956C4.662 3 5.274 3 6.5 3s1.838 0 2.306.238c.411.21.746.545.956.956C10 4.662 10 5.274 10 6.5s0 1.838-.238 2.306c-.21.411-.545.746-.956.956C8.338 10 7.726 10 6.5 10s-1.838 0-2.306-.238a2.2 2.2 0 0 1-.956-.956C3 8.338 3 7.726 3 6.5m0 11c0-1.225 0-1.838.238-2.306c.21-.411.545-.746.956-.956C4.662 14 5.274 14 6.5 14s1.838 0 2.306.238c.411.21.746.545.956.956c.238.468.238 1.08.238 2.306s0 1.838-.238 2.306c-.21.411-.545.746-.956.956C8.338 21 7.726 21 6.5 21s-1.838 0-2.306-.238a2.2 2.2 0 0 1-.956-.956C3 19.338 3 18.726 3 17.5" color="currentColor"/></svg> Oldest':'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 7.674l1.409-1.487C17.159 5.396 17.534 5 18 5s.841.396 1.591 1.187L21 7.674m-3-2.587v4.375c0 2.234 0 3.35-.447 4.335s-1.287 1.72-2.968 3.191L14 17.5M3 6.5c0-1.225 0-1.838.238-2.306c.21-.411.545-.746.956-.956C4.662 3 5.274 3 6.5 3s1.838 0 2.306.238c.411.21.746.545.956.956C10 4.662 10 5.274 10 6.5s0 1.838-.238 2.306c-.21.411-.545.746-.956.956C8.338 10 7.726 10 6.5 10s-1.838 0-2.306-.238a2.2 2.2 0 0 1-.956-.956C3 8.338 3 7.726 3 6.5m0 11c0-1.225 0-1.838.238-2.306c.21-.411.545-.746.956-.956C4.662 14 5.274 14 6.5 14s1.838 0 2.306.238c.411.21.746.545.956.956c.238.468.238 1.08.238 2.306s0 1.838-.238 2.306c-.21.411-.545.746-.956.956C8.338 21 7.726 21 6.5 21s-1.838 0-2.306-.238a2.2 2.2 0 0 1-.956-.956C3 19.338 3 18.726 3 17.5" color="currentColor"/></svg> latest'}
            </button>
            `;
  e.forEach(e => {
   (clwd_volume.settings.show_tanpa_volume || "Tanpa Volume" !== e) && (_ += `
                <details class="group border border-gray-300 dark:border-gray-700 rounded-lg">
                    <summary class="flex justify-between items-center px-4 py-2 cursor-pointer bg-gray-200 dark:bg-gray-800 rounded-lg group-open:bg-accent group-open:text-white">
                        <span>${e}</span>
                        <svg class="w-4 h-4 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </summary>
                    <ul class="mt-2 px-4 py-2 space-y-1">`, t[e].forEach(t => {
    _ += `
                    <li class="relative">
                        <a class="eph-num my-1 flex py-1.5 px-2.5 transition-all focus:ring-2 focus:ring-accent duration-300 bg-white dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700" href="${t.link}">
                        <span class="vcn me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><g fill="currentColor"><path d="M232 56v144a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16Z" opacity=".2"/><path d="m205.66 85.66l-96 96a8 8 0 0 1-11.32 0l-40-40a8 8 0 0 1 11.32-11.32L104 164.69l90.34-90.35a8 8 0 0 1 11.32 11.32Z"/></g></svg>
                        </span>
                            <span class="chapternum">${t.title}</span>
                            <span class="ms-auto chapterdate text-gray-400 dark:text-gray-600">${t.published}</span>
                        </a>
                        ${t.dLink?`<div class="dt"><a href="${t.dLink}" rel="nofollow" class="dload" target="_blank"><i class="fas fa-cloud-download-alt"></i></a></div>`:""}
                    </li>`
   }), _ += "</ul></details>")
  }), _ += "</div>", document.getElementById("clwd_volume").innerHTML = _
 },
 sort_vol: function() {
  this.sort_ascending = !this.sort_ascending, this.compile_volume()
 },
 get_volume: function(t) {
  let e = this;
  t.ajax({
   url: `/feeds/posts/default/-/${this.settings.cat}?alt=json-in-script&start-index=${this.settings.start}&max-results=${this.settings.max}`,
   type: "get",
   dataType: "jsonp",
   success: function(_) {
    "entry" in _.feed ? (_.feed.entry.forEach(_ => {
     e.arr_volume.push({
      title: _.title.$t,
      link: _.link.find(t => "alternate" == t.rel).href,
      dLink: "content" in _ && (t(_.content.$t).find("#downBTN").length ? t(_.content.$t).find("#downBTN").attr("href") : ""),
      published: "function" == typeof timeAgo ? timeAgo(new Date(_.updated.$t)) : e.timeString(_.updated.$t)
     })
    }), _.feed.entry.length >= e.settings.max ? (e.settings.start += e.settings.max, e.run_volume(e.settings.cat)) : e.compile_volume()) : e.arr_volume.length > 0 && e.compile_volume()
   },
   error: function(t) {
    console.log(t)
   }
  })
 },
 run_volume: function(t) {
  this.settings.cat = encodeURIComponent(t), "function" == typeof jQuery && document.getElementById("clwd_volume") ? this.get_volume(jQuery) : console.log("Output Nothing")
 },
 settings: {
  max: 150,
  start: 1,
  judul: "Chapter List",
  show_tanpa_volume: !1,
  settingtitle: {
   modif_title_Chapter: ["([cC]hapter|[pP]rolog[ue]?|[eE]pisode|[cC]h|[eE]p)\\s*\\d+(?=[\\s\\W]|$)(.*)"],
   replaceList_ch: [{
    target: "Short Story",
    change_to: "SS"
            }, {
    target: "Extra Chapter",
    change_to: "Etc"
            }, {
    target: "Chapter",
    change_to: "Chapter"
            }, ]
  }
 },
 chapterlist_settingTitle: function(t) {
  let e = t;
  for (let _ of clwd_volume.settings.settingtitle.modif_title_Chapter) {
   let s = RegExp(_, "i"),
    r = e.match(s);
   if (r) {
    e = r[0].trim();
    break
   }
  }
  return clwd_volume.settings.settingtitle.replaceList_ch.forEach(t => {
   e = e.replace(RegExp(t.target, "gi"), t.change_to)
  }), e
 },
 timeString: function(t) {
  if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(t)) {
   var e = t,
    _ = e.substring(0, 4),
    s = e.substring(5, 7);
   return e.substring(8, 10) + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(s, 10) - 1] + " " + _
  }
  return !1
 }
};
/*]]>*/
//</script>
