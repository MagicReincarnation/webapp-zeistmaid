const config_settingtitle = {
 modif_title_Chapter: ["([vV]olume|[cC]hapter|[pP]rolog[ue]?|[eE]pisode|[sS]eason|[cC]h|[vV]ol|[eE]p|[sS])\\s*\\d+(?=[\\s\\W]|$)(.*)"],

 replaceList_ch: [
  { target: "Volume", change_to: "Vol" },
  { target: "Season", change_to: "S" },
  { target: "Short Story", change_to: "SS" },
  { target: "Extra Chapter", change_to: "Etc" },
  { target: "Chapter", change_to: "Ch" },
    ]
};

function mangaPost_settingTitle(title) {
 let filteredTitle = title;
 for (const filterText of config_settingtitle.modif_title_Chapter) {
  const pattern = new RegExp(filterText, "i");
  const match = filteredTitle.match(pattern);
  if (match) {
   filteredTitle = match[0].trim();
   break;
  }
 }
 config_settingtitle.replaceList_ch.forEach(replaceList_ch_array => {
  filteredTitle = filteredTitle.replace(new RegExp(replaceList_ch_array.target, "gi"), replaceList_ch_array.change_to);
 });
 return filteredTitle;
}


// Contoh
console.log(mangaPost_settingTitle("Volume 12 Chapter 5 Extra Chapter")); // Output: "Vol 12 Ch 5 Etc"
console.log(mangaPost_settingTitle("Season 3 Episode 10")); // Output: "S 3 Ep 10"
