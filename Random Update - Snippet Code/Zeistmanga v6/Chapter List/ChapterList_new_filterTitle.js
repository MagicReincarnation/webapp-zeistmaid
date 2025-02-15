//<script defer='defer' fetchpriority='low' type='text/javascript'>
/*<![CDATA[*/
const clwd = {
 arr: [],
 compile: function() {
  let t = this.arr.length;
  this.arr.push(this.arr.shift());
  let e = "<ul>",
   a = '<div class="lastend grid grid-cols-2 gap-1">';
  jQuery.each(this.arr, function(s, n) {
   let r = clwd.chapterlist_settingTitle(n.title);
   s == t - 2 && (a += `<div class="inepcx" data-id="1">
                        <a class="mt-1 flex justify-between py-1.5 px-2.5 transition-all focus:ring-2 focus:ring-accent duration-300 bg-white dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700" href="${n.link}">
                            <span class="epcur epcurfirst">${r}</span>
                            <span class="text-gray-400 dark:text-gray-600">Chapter Awal</span>
                        </a>
                      </div>`), 0 == s && (a += `<div class="inepcx" data-id="2">
                        <a class="mt-1 flex justify-between py-1.5 px-2.5 transition-all focus:ring-2 focus:ring-accent duration-300 bg-white dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700" href="${n.link}">
                            <span class="epcur epcurlast">${r}</span>
                            <span class="text-gray-400 dark:text-gray-600">Chapter Baru</span>
                        </a>
                      </div>`), s != t - 1 && (e += `<li class="relative">
                        <a class="eph-num my-1 flex py-1.5 px-2.5 transition-all focus:ring-2 focus:ring-accent duration-300 bg-white dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700" href="${n.link}">
                            <span class="vcn me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><g fill="currentColor"><path d="M232 56v144a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h176a16 16 0 0 1 16 16Z" opacity=".2"/><path d="m205.66 85.66l-96 96a8 8 0 0 1-11.32 0l-40-40a8 8 0 0 1 11.32-11.32L104 164.69l90.34-90.35a8 8 0 0 1 11.32 11.32Z"/></g></svg>
                            </span>
                            <span class="chapternum">${r}</span> 
                            <span class="ms-auto chapterdate text-gray-400 dark:text-gray-600">${n.published}</span>
                        </a>
                        ${0==n.dLink?"":`<div class="dt"><a href="${n.dLink}" rel="nofollow" class="dload" target="_blank"><i class="fas fa-cloud-download-alt"></i></a></div>`}
                      </li>`)
  }), a += "</div>", e += "</ul>", document.getElementById("clwd").innerHTML = `${a+e}`
 },
 get: function(t) {
  let e = this;
  t.ajax({
   url: `/feeds/posts/default/-/${this.settings.cat}?alt=json-in-script&start-index=${this.settings.start}&max-results=${this.settings.max}`,
   type: "get",
   dataType: "jsonp",
   success: function(a) {
    "entry" in a.feed ? (a.feed.entry.forEach(a => {
     let l = a.category ? a.category.map(c => c.term) : [];
     l.includes("Series") || e.arr.push({
      title: a.title.$t,
      link: a.link.find(t => "alternate" == t.rel).href,
      dLink: "content" in a ? (a.content.$t.match(/id=["']downBTN["'][^>]*href=["']([^"']+)["']/i) || [])[1] || "" : "",
      published: "function" == typeof timeAgo ? timeAgo(new Date(a.updated.$t)) : e.timeStirng(a.updated.$t)
     })
    }), a.feed.entry.length >= e.settings.max ? (e.settings.start += e.settings.max, e.run(e.settings.cat)) : e.compile()) : 0 != e.arr.length && e.compile()
   },
   error: function(t) {
    console.log(t)
   }
  })
 },
 run: function(t) {
  this.settings.cat = encodeURIComponent(t), "function" == typeof jQuery && document.getElementById("clwd") ? this.get(jQuery) : console.log("Output Nothing")
 },
 settings: {
  max: 150,
  start: 1,
  judul: "Chapter List",
  settingtitle: {
   modif_title_Chapter: ["([vV]olume|[cC]hapter|[pP]rolog[ue]?|[eE]pisode|[sS]eason|[cC]h|[vV]ol|[eE]p|[sS])\\s*\\d+(?=[\\s\\W]|$)(.*)"],
   replaceList_ch: [
    { target: "Volume", change_to: "Vol" },
    { target: "Season", change_to: "S" },
    { target: "Short Story", change_to: "SS" },
    { target: "Extra Chapter", change_to: "Etc" },
    { target: "Chapter", change_to: "Ch" },
   ]
  }
 },
 chapterlist_settingTitle: function(t) {
  let e = t;
  for (let a of clwd.settings.settingtitle.modif_title_Chapter) {
   let s = RegExp(a, "i"),
    n = e.match(s);
   if (n) {
    e = n[0].trim();
    break
   }
  }
  return clwd.settings.settingtitle.replaceList_ch.forEach(t => {
   e = e.replace(RegExp(t.target, "gi"), t.change_to)
  }), e
 },
 timeStirng: function(t) {
  if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(t)) {
   var e = t,
    a = e.substring(0, 4),
    s = e.substring(5, 7),
    n = e.substring(8, 10),
    r = [];
   return r[1] = "Jan", r[2] = "Feb", r[3] = "Mar", r[4] = "Apr", r[5] = "May", r[6] = "Jun", r[7] = "Jul", r[8] = "Aug", r[9] = "Sep", r[10] = "Oct", r[11] = "Nov", r[12] = "Dec", n + " " + r[parseInt(s, 10)] + " " + a
  }
  return !1
 }
};
/*]]>*/
//</script>