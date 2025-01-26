const url_fileJSON = "https://raw.githubusercontent.com/MagicReincarnation/webapp-zeistmaid/refs/heads/main/file-structure.json";

const icon_file_manager = {
 "txt": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><g fill="none" stroke="#cad3f5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6.5v6a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h4.01"/><path d="m8.5 1.5l5 5h-4a1 1 0 0 1-1-1zm-3 10h5m-5-3h5m-5-3h1"/></g></svg>',
 
 "md": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM.706 13.189v2.66H0V11.85h.806l1.14 2.596h.026l1.14-2.596h.8v3.999h-.716v-2.66h-.038l-.946 2.159h-.516l-.952-2.16H.706Zm3.919 2.66V11.85h1.459q.609 0 1.005.234t.589.68q.195.445.196 1.075q0 .634-.196 1.084q-.197.451-.595.689q-.396.237-1 .237H4.626Zm1.353-3.354h-.562v2.707h.562q.279 0 .484-.082a.8.8 0 0 0 .334-.252a1.1 1.1 0 0 0 .196-.422q.067-.252.067-.592a2.1 2.1 0 0 0-.117-.753a.9.9 0 0 0-.354-.454q-.238-.152-.61-.152"/></svg>',
 
 "xml": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#e8d3a0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#e8d3a0"><path d="m7 13l1.647 2.5m0 0l1.647 2.5m-1.647-2.5l1.647-2.5m-1.647 2.5L7 18m14 0h-.823c-.777 0-1.165 0-1.406-.244c-.242-.244-.242-.637-.242-1.423V13m-6.176 5l.342-4.165c.029-.354.043-.53.15-.563s.216.105.435.382l.873 1.104c.119.15.178.225.257.225s.139-.075.257-.225l.874-1.105c.218-.276.328-.415.434-.382c.107.033.122.21.151.563L16.471 18"/><path d="M15 22h-4.273c-3.26 0-4.892 0-6.024-.798a4.1 4.1 0 0 1-.855-.805C3 19.331 3 17.797 3 14.727v-2.545c0-2.963 0-4.445.469-5.628c.754-1.903 2.348-3.403 4.37-4.113C9.095 2 10.668 2 13.818 2c1.798 0 2.698 0 3.416.252c1.155.406 2.066 1.263 2.497 2.35C20 5.278 20 6.125 20 7.818V10"/><path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2"/></g></svg>',
 
 "pdf": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#f76c6c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="#f76c6c"><path d="M3.5 13v-.804c0-2.967 0-4.45.469-5.636c.754-1.905 2.348-3.407 4.37-4.118C9.595 2 11.168 2 14.318 2c1.798 0 2.698 0 3.416.253c1.155.406 2.066 1.264 2.497 2.353c.268.677.268 1.525.268 3.22V13"/><path d="M3.5 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057a1.67 1.67 0 0 0 1.179-1.18c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13.5 2m-10 20v-3m0 0v-1.8c0-.566 0-.848.176-1.024C3.85 16 4.134 16 4.7 16h.8a1.5 1.5 0 0 1 0 3zm17-3H19c-.943 0-1.414 0-1.707.293S17 17.057 17 18v1m0 3v-3m0 0h2.5M14 19a3 3 0 0 1-3 3c-.374 0-.56 0-.7-.08c-.333-.193-.3-.582-.3-.92v-4c0-.338-.033-.727.3-.92c.14-.08.326-.08.7-.08a3 3 0 0 1 3 3"/></g></svg>',
 
 "jpg": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M15 22h-4.273c-3.26 0-4.892 0-6.024-.798a4.1 4.1 0 0 1-.855-.805C3 19.331 3 17.797 3 14.727v-2.545c0-2.963 0-4.445.469-5.628c.754-1.903 2.348-3.403 4.37-4.113C9.095 2 10.668 2 13.818 2c1.798 0 2.698 0 3.416.252c1.155.406 2.066 1.263 2.497 2.35C20 5.278 20 6.125 20 7.818V10"/><path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2m-3 11v2.623c0 .901-.101 1.989-.952 2.289c-.636.224-1.412-.047-1.771-.618C7.108 17.026 7 16.736 7 16.5m5.5 1.5v-5h1.383c.694 0 1.448.34 1.525 1.03a1.7 1.7 0 0 1-.055.633c-.146.54-.703.837-1.262.837H13.5M21 14c-.052-.765-.378-.986-1.5-1h-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1H20a1 1 0 0 0 1-1v-.5a.5.5 0 0 0-.5-.5h-1"/></g></svg>',
 
 "png": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M15 22h-4.273c-3.26 0-4.892 0-6.024-.798a4.1 4.1 0 0 1-.855-.805C3 19.331 3 17.797 3 14.727v-2.545c0-2.963 0-4.445.469-5.628c.754-1.903 2.348-3.403 4.37-4.113C9.095 2 10.668 2 13.818 2c1.798 0 2.698 0 3.416.252c1.155.406 2.066 1.263 2.497 2.35C20 5.278 20 6.125 20 7.818V10"/><path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2M7 18v-4.5a.5.5 0 0 1 .5-.5h1.198c.501 0 1.015.234 1.165.712c.1.322.096.624-.004.966c-.156.53-.704.822-1.257.822H7.5M12 18l.1-4.63a.1.1 0 0 1 .182-.058l2.943 4.4a.1.1 0 0 0 .182-.058L15.5 13m5.5.873c-.12-.718-.253-.873-1-.873h-1.5c-.552 0-.801.448-.801 1v3c0 .552.249 1 .801 1h1.7a.8.8 0 0 0 .8-.8v-.8a.4.4 0 0 0-.4-.4h-.75"/></g></svg>',
 
 "zip": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.08 15.106q.222 0 .356-.115a.4.4 0 0 0 .139-.314a.4.4 0 0 0-.14-.32a.5.5 0 0 0-.356-.122h-.508q-.03 0-.03.03v.81q0 .03.03.03z"/><path fill="currentColor" d="M17.25 22a2.25 2.25 0 0 0 2.25-2.25v-.744h1a1.5 1.5 0 0 0 1.5-1.5V13.25a1.5 1.5 0 0 0-1.5-1.5h-10a1.5 1.5 0 0 0-1.5 1.5v4.256a1.5 1.5 0 0 0 1.5 1.5H18v.744a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75v-10h4a2.25 2.25 0 0 0 2.25-2.252L12.249 3.5h5.002a.75.75 0 0 1 .75.75v7.488h1.5V4.25A2.25 2.25 0 0 0 17.25 2h-5.132a2.25 2.25 0 0 0-1.592.66L5.16 8.03a2.25 2.25 0 0 0-.66 1.592V19.75A2.25 2.25 0 0 0 6.75 22zM10.749 4.559l.002 2.94a.75.75 0 0 1-.75.751H7.06zm7.518 8.703q.43 0 .755.175q.327.17.502.49q.182.315.182.725q0 .405-.188.714a1.26 1.26 0 0 1-.526.478q-.339.168-.78.169h-.64q-.03 0-.031.03v1.36a.1.1 0 0 1-.024.067a.1.1 0 0 1-.067.024h-.955a.1.1 0 0 1-.067-.024a.1.1 0 0 1-.024-.066v-4.052a.1.1 0 0 1 .024-.066a.1.1 0 0 1 .067-.024zM14.84 17.47a.1.1 0 0 1-.025-.066v-4.052a.1.1 0 0 1 .024-.066a.1.1 0 0 1 .067-.024h.955a.1.1 0 0 1 .067.024a.1.1 0 0 1 .024.066v4.052a.1.1 0 0 1-.024.066a.1.1 0 0 1-.067.024h-.955a.1.1 0 0 1-.066-.024m-3.42.024a.1.1 0 0 1-.067-.024a.1.1 0 0 1-.024-.066v-.877a.16.16 0 0 1 .042-.109l1.76-2.146q.012-.013.006-.025t-.024-.012H11.42a.1.1 0 0 1-.067-.024a.1.1 0 0 1-.024-.066v-.793a.1.1 0 0 1 .024-.066a.1.1 0 0 1 .067-.024h2.908a.1.1 0 0 1 .067.024a.1.1 0 0 1 .024.066v.871a.16.16 0 0 1-.043.115l-1.771 2.147q-.012.012-.006.024t.024.012h1.705a.1.1 0 0 1 .067.024a.1.1 0 0 1 .024.066v.793a.1.1 0 0 1-.024.066a.1.1 0 0 1-.067.024z"/></svg>',
 
 "html": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#e14e1d" rx="60"/><path fill="#fff" d="m48 38l8.61 96.593h110.71l-3.715 41.43l-35.646 9.638l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l65.51-18.172l8.783-98.061H85.824l-2.923-32.71h122.238L208 38z"/><path fill="#ebebeb" d="M128 38H48l8.61 96.593H128v-31.938H85.824l-2.923-32.71H128zm0 147.647l-.041.014l-35.579-9.624l-2.379-26.602H57.94l4.585 51.281l65.427 18.172l.049-.014z"/></g></svg>',
 
 "css": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#0277bd" rx="60"/><path fill="#ebebeb" d="m53.753 102.651l2.862 31.942h71.481v-31.942zM128.095 38H48l2.904 31.942h77.191zm0 180.841v-33.233l-.14.037l-35.574-9.605l-2.274-25.476H58.042l4.475 50.154l65.431 18.164z"/><path fill="#fff" d="m167.318 134.593l-3.708 41.426l-35.625 9.616v33.231l65.483-18.148l.48-5.397l7.506-84.092l.779-8.578L208 38h-80.015v31.942h45.009l-2.906 32.709h-42.103v31.942z"/></g></svg>',
 
 "js": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#f0db4f" rx="60"/><path fill="#323330" d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.579c-17.357-7.388-28.871-16.668-28.871-36.258c0-18.044 13.748-31.792 35.229-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.139 14.778 14.608l6.014 2.577c20.449 8.765 31.963 17.699 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574"/></g></svg>',
 
  "json": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="#f7b60b" fill-rule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM4.151 15.29a1.2 1.2 0 0 1-.111-.449h.764a.58.58 0 0 0 .255.384q.105.073.25.114q.142.041.319.041q.245 0 .413-.07a.56.56 0 0 0 .255-.193a.5.5 0 0 0 .084-.29a.39.39 0 0 0-.152-.326q-.152-.12-.463-.193l-.618-.143a1.7 1.7 0 0 1-.539-.214a1 1 0 0 1-.352-.367a1.1 1.1 0 0 1-.123-.524q0-.366.19-.639q.192-.272.528-.422q.337-.15.777-.149q.456 0 .779.152q.326.153.5.41q.18.255.2.566h-.75a.56.56 0 0 0-.12-.258a.6.6 0 0 0-.246-.181a.9.9 0 0 0-.37-.068q-.324 0-.512.152a.47.47 0 0 0-.185.384q0 .18.144.3a1 1 0 0 0 .404.175l.621.143q.326.075.566.211a1 1 0 0 1 .375.358q.135.222.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158q-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252a1.1 1.1 0 0 1-.29-.375m-3.104-.033a1.3 1.3 0 0 1-.082-.466h.764a.6.6 0 0 0 .074.27a.5.5 0 0 0 .454.246q.285 0 .422-.164q.137-.165.137-.466v-2.745h.791v2.725q0 .66-.357 1.005q-.355.345-.985.345a1.6 1.6 0 0 1-.568-.094a1.15 1.15 0 0 1-.407-.266a1.1 1.1 0 0 1-.243-.39m9.091-1.585v.522q0 .384-.117.641a.86.86 0 0 1-.322.387a.9.9 0 0 1-.47.126a.9.9 0 0 1-.47-.126a.87.87 0 0 1-.32-.387a1.55 1.55 0 0 1-.117-.641v-.522q0-.386.117-.641a.87.87 0 0 1 .32-.387a.87.87 0 0 1 .47-.129q.265 0 .47.129a.86.86 0 0 1 .322.387q.117.255.117.641m.803.519v-.513q0-.565-.205-.973a1.46 1.46 0 0 0-.59-.63q-.38-.22-.916-.22q-.534 0-.92.22a1.44 1.44 0 0 0-.589.628q-.205.407-.205.975v.513q0 .562.205.973q.205.407.589.626q.386.217.92.217q.536 0 .917-.217q.384-.22.589-.626q.204-.41.205-.973m1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676z"/></svg>',
  
  "mp4": '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="#f3fefe" fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM.706 15.849v-2.66h.038l.952 2.16h.516l.946-2.16h.038v2.66h.715V11.85h-.8l-1.14 2.596h-.026L.805 11.85H0v3.999zm5.278-3.999h-1.6v3.999h.792v-1.342h.803q.43 0 .732-.173q.304-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477a1.4 1.4 0 0 0-.733-.179m.545 1.333a.8.8 0 0 1-.085.38a.57.57 0 0 1-.237.241a.8.8 0 0 1-.375.082h-.66V12.48h.66q.329 0 .513.181q.184.183.184.522m1.505-.032q.4-.65.791-1.301h1.14v2.62h.49v.638h-.49v.741h-.741v-.741H7.287v-.648q.353-.66.747-1.31Zm-.029 1.298v.02h1.219v-2.021h-.041q-.302.477-.607.984q-.3.507-.571 1.017"/></svg>',
 
 "default": "<img src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0VF3y5NwNAUOrTLYqQw4u7gfG6nfHRy1G8h8sS3KK3uhAcu2loo-Hx9MaXv2ctM8uPCx9a0RSvnASpS9_-8lYhhnGQGObRvZeqbfVKD-cM9p1aBVprpg9t1G5TrS0IIfRGVGmIQGQ_Zda7S05TJpcDAJyKp-NpDhld5EuV8uuQ59xpyxYLJuuqYCrGtF6/s1600/1000050282.png' alt='icon default folder'/>"
};




let fileStructure = [];
let currentPath = "";
const fileListElement = document.getElementById("fileList");
const breadcrumbElement = document.getElementById("breadcrumb");
const backButton = document.getElementById("backButton");
const homeButton = document.getElementById("homeButton");
const downloadSelectedButton = document.getElementById("downloadSelectedButton");
let selectedFiles = [];
let downloadZipEnabled = false; // Checkbox state ZIP download

//  memuat data JSON
async function get_fect_files() {
 const cachedFiles = sessionStorage.getItem('fileStructure');

 if (cachedFiles) {
  fileStructure = JSON.parse(cachedFiles); 
  renderFiles(getCurrentFiles());
  updateBreadcrumb();
 } else {
  const response = await fetch(url_fileJSON);
  fileStructure = await response.json();
  sessionStorage.setItem('fileStructure', JSON.stringify(fileStructure));
  renderFiles(getCurrentFiles());
  updateBreadcrumb();
 }
}

//  mendapatkan path saat ini
function getCurrentFiles() {
 return fileStructure.filter(file => {
  const parentPath = currentPath.endsWith("/") ? currentPath : currentPath + "/";
  return (
   (currentPath === "" && !file.path.includes("/")) || 
   file.path.startsWith(parentPath) && file.path.split("/").length === parentPath.split("/").length
  );
 });
}


const kecualikan_file_folder = ["file-structure.json", ".github/workflows", "."];
/*render Data json*/
function renderFiles(files) {
 fileListElement.innerHTML = "";
 let visibleIndex = 0;
 files.forEach((file) => {
  if (kecualikan_file_folder.includes(file.name)) {
   return;
  }

  visibleIndex++; 
  const item = document.createElement("div");
  item.className = "file-item";
  item.setAttribute("data-type", file.type);
  item.setAttribute("data-path", file.path);
  const isFolder = file.type === "dir";
  const fileExtension = file.name.split(".").pop();
  const icon = icon_file_manager[fileExtension] || icon_file_manager["default"];

  item.innerHTML = `
            ${downloadZipEnabled && !isFolder ? 
                `<label class="input-container">
                    <input type="checkbox" class="file-checkbox" data-path="${file.path}" />
                    <span>${visibleIndex}</span>
                    ${!isFolder ? `${icon} <p>${file.name}</p>` : "Error"}
                    <div class="details">
                        <p class="sizeFF">${file.size ? convertBytes_listGithub(file.size) : ""}</p>
                        <time class="dateFFx">${file.updated_at ? formatTimestamp_listGithub(file.updated_at) : ""}</time>
                        
                    </div>
                </label>`
            : `
                <span>${visibleIndex}</span>
                ${!isFolder ? `<a class="downloadFF" data-url="${file.download_url}">${icon}<p>${file.name}</p></a>` : `${icon} <p>${file.name}</p>`}
                <div class="details">
                    <p class="sizeFF">${file.size ? convertBytes_listGithub(file.size) : ""}</p>
                        <time class="dateFF">${file.updated_at ? formatTimestamp_listGithub(file.updated_at) : ""}</time>
                        
                </div>
            `}
        `;

  item.querySelector(".downloadFF")?.addEventListener("click", (e) => {
   const fileExtension = file.name.split('.').pop();
   if (fileExtension === "html") {
    renderFileInIframe(file.download_url);
   } else {
    window.open(file.download_url, "_blank");
   }
  });

  if (downloadZipEnabled) {
   item.querySelector(".file-checkbox")?.addEventListener("change", (e) => {
    const path = e.target.getAttribute("data-path");
    if (e.target.checked) {
     selectedFiles.push(path);
     document.querySelector("#downloadSelectedButton").style.display = "block";
    } else {
     selectedFiles = selectedFiles.filter(filePath => filePath !== path);
    }
   });
  } else {
   document.querySelector("#downloadSelectedButton").style.display = "none";
  }

  // Navigasi folder
  item.addEventListener("click", () => {
   if (isFolder) {
    currentPath = file.path; 
    renderFiles(getCurrentFiles()); 
    updateBreadcrumb();
    navigateToFolder(file.path);
   }
  });

  fileListElement.appendChild(item);
 });
}


//  breadcrumb
function updateBreadcrumb() {
 const pathParts = currentPath.split("/").filter(Boolean);
 const pathLinks = pathParts.map((part, index) => {
  const partialPath = pathParts.slice(0, index + 1).join("/");
  return `<span data-folder="${partialPath}">${part}</span>`;
 });

 breadcrumbElement.innerHTML = pathParts.length ?
  `<span data-folder="">Home</span> / ${pathLinks.join(" / ")}` :
  "Home";

 document.querySelectorAll("#breadcrumb span").forEach(span => {
  span.addEventListener("click", (e) => {
   currentPath = e.target.getAttribute("data-folder");
   renderFiles(getCurrentFiles());
   updateBreadcrumb();
   navigateToFolder(currentPath);
  });
 });
}

//  mendownload file yang dipilih dalam bentuk ZIP
async function downloadSelectedFiles() {
 if (selectedFiles.length === 0) {
  alert("No files selected!");
  return;
 }
 const zip = new JSZip();
 selectedFiles.forEach(filePath => {
  const file = fileStructure.find(f => f.path === filePath);
  if (file) {
   zip.file(file.name, fetch(file.download_url).then(res => res.text()));
  }
 });
 zip.generateAsync({ type: "blob" }).then(content => {
  const blob = new Blob([content], { type: "application/zip" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = currentPath ? currentPath.split("/").pop() : "datakodehiru_file" + ".zip";
  link.click();
 });
}


// kembali ke folder sebelumnya
backButton.addEventListener("click", () => {
    if (currentPath) {
        const pathParts = currentPath.split("/").filter(Boolean);
        pathParts.pop();
        currentPath = pathParts.join("/");
        renderFiles(getCurrentFiles());
        updateBreadcrumb();
        navigateToFolder(currentPath);
    }
});

// kembali ke Home
homeButton.addEventListener("click", () => {
    currentPath = "";
    renderFiles(getCurrentFiles());
    updateBreadcrumb();
    history.pushState(null, "", `${window.location.origin}/`); // Update URL
});

// tombol download selected
downloadSelectedButton.addEventListener("click", downloadSelectedFiles);

// checkbox on/off download zip
document.getElementById("downloadZipCheckbox").addEventListener("change", (e) => {
 downloadZipEnabled = e.target.checked;
 renderFiles(getCurrentFiles());
});

/*New code*/
function renderFileInIframe(url) {
 fetch(url)
  .then(response => response.text())
  .then(htmlContent => {
   const blob = new Blob([htmlContent], { type: 'text/html' });
   const iframeUrl = URL.createObjectURL(blob);
   let iframe = document.getElementById("previewIframe");
   if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "previewIframe";
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
   }
   iframe.src = iframeUrl;
   document.querySelectorAll(".hiddeNotIframe").forEach(el => {
    el.style.display = "none";
   });
   iframe.style.display = "block";
   const backButton = document.getElementById("backButtonIframe") || createBackButton();
   backButton.style.display = "block";
  })
  .catch(error => {
   console.error("Gagal memuat file:", error);
  });
}

// Buat tombol kembali
function createBackButton() {
 const backButton = document.createElement("button");
 backButton.id = "backButtonIframe";
 backButton.textContent = "Kembali";
 backButton.style.position = "fixed";
 backButton.style.top = "10px";
 backButton.style.left = "10px";
 backButton.style.zIndex = "1000";

 backButton.addEventListener("click", () => {
  document.querySelectorAll(".hiddeNotIframe").forEach(el => {
   el.style.display = "";
  });
  document.getElementById("previewIframe").remove();
  backButton.remove();
 });

 document.body.appendChild(backButton);
 return backButton;
}
/*
Format jam: 
12hour: 12:00 - 01:00 PM/AM
24hour: 00:00 - 23:00
timeago: 1hour - year
*/
function formatTimestamp_listGithub(timestamp, format = '12hour') {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = hours24 < 12 ? 'AM' : 'PM';

    const time24 = `${String(hours24).padStart(2, '0')}:${minutes}`;
    const time12 = `${hours12}:${minutes} ${period}`;

    switch (format) {
        case 'timeago':
            if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
            if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
            return `${Math.floor(diffInSeconds / 2419200)} months ago`;

        case '24hour':
            return `${day}/${month}/${year} ${time24}`;

        case '12hour':
            return `${day}/${month}/${year} ${time12}`;

        default:
            return `${day}/${month}/${year} ${time24}`;
    }
}
/*Convert hitung size file*/
function convertBytes_listGithub(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(2); // Membatasi hingga 2 desimal
    return `${size} ${sizes[i]}`;
}

// mengatur URL berdasarkan path
function updateURL(path) {
    const url = path ? `${location.origin}${location.pathname}?path=${encodeURIComponent(path)}` : location.origin + location.pathname;
    history.pushState({ path }, "", url);
}

//  menangani popstate
window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (state && state.path !== undefined) {
        currentPath = state.path; 
        renderFiles(getCurrentFiles()); 
        updateBreadcrumb(); 
        }
});

// navigasi folder untuk memperbarui URL
function navigateToFolder(folderPath) {
    currentPath = folderPath;
    renderFiles(getCurrentFiles()); 
    updateBreadcrumb(); 
    updateURL(folderPath); 
}

// Periksa URL saat load web
const urlParams = new URLSearchParams(window.location.search);
const initialPath = urlParams.get("path");
if (initialPath) {
    currentPath = decodeURIComponent(initialPath);
}

get_fect_files();