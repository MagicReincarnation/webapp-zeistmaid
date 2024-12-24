function searchlistchapt() {
    var e, t, n, a, l, s, m;
    for (e = document.getElementById("searchchapter"), t = e.value.toUpperCase(), n = document.getElementById("listItem"), a = n.getElementsByTagName("li"), s = 0; s < a.length; s++) l = a[s].getElementsByTagName("chapter")[0], m = l.textContent || l.innerText, m.toUpperCase().indexOf(t) > -1 ? a[s].style.display = "" : a[s].style.display = "none"
}