// <script defer='defer' fetchpriority='low'>
     /*<![CDATA[*/
      /*]]>*/ 
// </script>
 const npXbottom = {
  arr: new Array,
  config: {
   max: 150,
   start: 1,
   labelMain: "Series"
  },
  config_settingtitle_nextPrev: {
   modif_title_Chapter: ["([vV]olume|[cC]hapter|[pP]rolog[ue]?|[eE]pisode|[sS]eason|[cC]h|[vV]ol|[eE]p|[sS])\\s*\\d+(?=[\\s\\W]|$)(.*)"],

   replaceList_ch: [
    { target: "Volume", change_to: "Vol" },
    { target: "Season", change_to: "S" },
    { target: "Short Story", change_to: "SS" },
    { target: "Extra Chapter", change_to: "Etc" },
    { target: "Chapter", change_to: "Ch" },
    ]
  },
  sort: e => e.sort((e, t) => e.title.localeCompare(t.title, void 0, {
   numeric: !0
  })),
  compile: function() {
   let e = this.sort(this.arr).reverse(),
    t = this.config,
    a = (window || document).location.pathname,
    r = $('<ul id="clwd" class="grid gap-1" name="npx-list"></ul>'),
    n = "",
    i = "",
    l = "";
   $.each(e, (o, s) => {
    s.cat.some(e => t.labelMain == e) ? n = $(`<a class="text-white bg-accent hover:bg-accent/80 focus:ring-2 focus:outline-none focus:ring-accent/30 font-medium px-4 text-center dark:focus:ring-accent/80 rounded-full py-1 flex items-center gap-1" type="button" rel="home" href="${s.url}"><span class="sr-only">All Chapter List</span><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z"/><path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z"/><path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z"/></svg><span class="hidden md:inline-block">${t.home||"All Chapter"}</span></a>`) : (r.append($(`<li><a class="px-2 py-1 rounded-full bg-gray-100 dark:visited:text-gray-500 visited:text-gray-400 text-black dark:text-gray-200 dark:bg-gray-700 block" ${s.url.includes(a)?'selected="selected"':""} href="${s.url}">${nextPrev_settingTitle(s.title)}</a></li>`)), s.url.includes(a) && (e[o + 1] && (i = e[o + 1].cat.some(e => t.labelMain == e) ? "" : $(`<a class="text-gray-800 bg-gray-100 dark:bg-gray-700 border border-gray-300 hover:text-accent focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium px-4 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 rounded-full py-1 flex items-center gap-1" type="button" rel="prev" href="${e[o+1].url}"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fill-rule="evenodd"></path></svg><span class="sr-only">Previous</span><span class="hidden md:inline-block">${t.prev||"Prev"}</span></a>`)), e[o - 1] && (l = e[o - 1].cat.some(e => t.labelMain == e) ? "" : $(`<a class="text-gray-800 bg-gray-100 dark:bg-gray-700 border border-gray-300  hover:text-accent focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium px-4 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 rounded-full py-1 flex items-center gap-1" type="button" rel="next" href="${e[o-1].url}"><span class="hidden md:inline-block">${t.next||"Next"}</span><span class="sr-only">Next</span><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fill-rule="evenodd"></path></svg></a>`))))
   });
   let o = $('<div class="flex gap-3 justify-center"></div>');
   o.html(i).append(n).append(l), $("#nextPrevJSbottom").html(o), $("#m91YjOFga6").append(r)
  },
  jqCheck: () => "function" == typeof jQuery,
  xhr: function() {
   const e = this,
    t = e.config;
   $.ajax({
    type: "get",
    url: `${t.site||""}/feeds/posts/summary/-/${t.cat}`,
    data: {
     alt: "json",
     "start-index": t.start,
     "max-results": t.max
    },
    dataType: "jsonp",
    success: a => {
     "entry" in a.feed ? ($.each(a.feed.entry, (t, a) => {
      e.arr.push({
       title: a.title.$t,
       url: a.link.find(e => "alternate" == e.rel).href,
       cat: a.category.map(e => e.term)
      })
     }), a.feed.entry.length >= t.max ? (e.config.start += e.config.max, e.xhr()) : e.compile()) : 0 != e.arr.length && e.compile()
    },
    error: () => {
     $("#nextPrevJSbottom").html(`<p>${t.textError||"Error"}</p>`)
    }
   })
  },
  run: function() {
   return this.jqCheck() ? 0 == $("#nextPrevJSbottom").length ? "element tidak ada" : (this.config.cat = $("#nextPrevJSbottom").data("label") || !1, 0 == this.config.cat ? "Category Tidak ada" : void this.xhr()) : "jquery tidak ada"
  }
 };

 function nextPrev_settingTitle(title) {
  let filteredTitle = title;
  for (const filterText of npXbottom.config_settingtitle_nextPrev.modif_title_Chapter) {
   const pattern = new RegExp(filterText, "i");
   const match = filteredTitle.match(pattern);
   if (match) {
    filteredTitle = match[0].trim();
    break;
   }
  }
  npXbottom.config_settingtitle_nextPrev.replaceList_ch.forEach(replaceList_ch_array => {
   filteredTitle = filteredTitle.replace(new RegExp(replaceList_ch_array.target, "gi"), replaceList_ch_array.change_to);
  });
  return filteredTitle;
 }

 npXbottom.run();