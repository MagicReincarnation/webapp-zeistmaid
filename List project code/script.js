// ganti data.json dengan link json yang disimpan digithub
//contoh: https://raw.githubusercontent.com/MagicReincarnation/webapp-zeistmaid/refs/heads/main/List%20project%20code/data.json

function openDrawer(e) {
    let t = document.getElementById("update-drawer"),
        a = document.getElementById("drawer-content");
    (a.innerHTML = e.updates
        .map(
            (e) => `
        <div class="update">${e.date}: ${e.description}</div>
    `
        )
        .join("")),
        t.classList.add("visible");
}
function closeDrawer() {
    let e = document.getElementById("update-drawer");
    e.classList.remove("visible");
}
function showRecentUpdates(e) {
    let t = document.getElementById("recent-updates-content"),
        a = document.getElementById("update-count"),
        n = document.getElementById("recent-update-badge");
    (a.innerText = e.length), e.length > 0 && (n.style.display = "inline-block"), (t.innerHTML = "");
    let d = e.reduce((e, t) => (e[t.projectName] || (e[t.projectName] = []), e[t.projectName].push(t), e), {});
    for (let [r, s] of Object.entries(d)) {
        let i = s.reduce((e, t) => {
            let a = new Date(t.date).toLocaleDateString();
            return e[a] || (e[a] = []), e[a].push(t.description), e;
        }, {});
        for (let [c, l] of Object.entries(i))
            t.innerHTML += `
                <h3>${r}</h3>
                <h4>${c}</h4>
                <div>${l.join("<br>")}</div>
            `;
    }
    document.getElementById("recent-updates-drawer").classList.add("visible");
    let o = document.querySelectorAll(".recent-update");
    o.forEach((e) => {
        e.addEventListener("click", () => {
            let t = e.getAttribute("data-date");
            markAsRead(t);
        });
    });
}
function markAsRead(e) {
    let t = JSON.parse(localStorage.getItem("readUpdates"));
    t || (t = []), t.includes(e) || (t.push(e), localStorage.setItem("readUpdates", JSON.stringify(t))), closeRecentDrawer();
}
function closeRecentDrawer() {
    let e = document.getElementById("recent-updates-drawer");
    e.classList.remove("visible");
}
document.addEventListener("DOMContentLoaded", () => {
    
  // contoh : https://raw.githubusercontent.com/MagicReincarnation/webapp-zeistmaid/refs/heads/main/List%20project%20code/data.json
  
  fetch("data.json")
        .then((e) => e.json())
        .then((e) => {
            let t = document.getElementById("projects"),
                a = new Date(),
                n = [];
            if (
                (e.forEach((e) => {
                    let d = document.createElement("div");
                    d.classList.add("project-card"),
                        (d.innerHTML = `
                  		<a href="${e.link}" title="${e.name}">
					  <img src="${e.image}" alt="${e.name}">
					</a>
                    <div class="project-name">${e.name}</div>
                    <div class="project-version">Versi: ${e.version}</div>
                    <div class="project-developer">Dikembangkan oleh: ${e.developer}</div>
                    <div class="project-description">${e.description}</div>
                    <div class="project-details">Unduhan: ${e.downloads}</div>
                    <div class="updates">
                        <strong>Daftar Pembaruan:</strong>
                        <div class="update">${e.updates[0].date}: ${e.updates[0].description}</div>
                        <button class="see-more" data-id="${e.id}">Lihat lebih banyak pembaruan</button>
                    </div>
                `),
                        t.appendChild(d),
                        e.updates.forEach((t) => {
                            let d = new Date(t.date),
                                r = a - d,
                                s = r / 864e5;
                            s <= 7 && n.push({ projectName: e.name, description: t.description, date: t.date });
                        });
                }),
                n.length > 0)
            ) {
                let d = document.getElementById("update-count-badge");
                d.innerText = n.length;
            }
            let r = document.querySelectorAll(".see-more");
            r.forEach((t) => {
                t.addEventListener("click", (a) => {
                    a.stopPropagation();
                    let n = t.getAttribute("data-id");
                    openDrawer(e.find((e) => e.id == n));
                });
            }),
                document.getElementById("close-drawer").addEventListener("click", () => {
                    closeDrawer();
                }),
                document.getElementById("close-recent-drawer").addEventListener("click", () => {
                    closeRecentDrawer();
                }),
                document.getElementById("recent-update-badge").addEventListener("click", () => {
                    showRecentUpdates(n);
                }),
                document.addEventListener("click", (e) => {
                    let t = document.getElementById("recent-updates-drawer"),
                        a = document.getElementById("update-drawer"),
                        n = t.classList.contains("visible"),
                        d = a.classList.contains("visible");
                    !n || t.contains(e.target) || document.getElementById("recent-update-badge").contains(e.target) || closeRecentDrawer(), d && !a.contains(e.target) && closeDrawer();
                });
        })
        .catch((e) => console.error("Error fetching data:", e));
});
